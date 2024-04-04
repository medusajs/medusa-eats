import {
  createStep,
  createWorkflow,
  parallelize,
  StepResponse,
  WorkflowData,
} from "@medusajs/workflows-sdk"
import ProjectModuleService from "../../modules/project/service"
import PulumiService from "../../modules/pulumi/service"
import { UpdateBuildDTO } from "../../types/project/mutations"
import { collectProjectCredentials } from "./steps/collect-project-credentials"
import { triggerPulumiBuildStep } from "./steps/trigger-pulumi-build"
import { createBuild } from "./steps/create-build"
import { getStackNameFromEnvironmentStep } from "./steps/get-stack-name"
import { maybeDeployAppStackStep } from "./steps/maybe-deploy-app-stack"
import { recordInfraInEnvironment } from "./steps/record-infra-in-environment"
import { validateOrGetLatestCommitHash } from "./steps/validate-or-get-latest-commit-hash"

type AsyncResultType = {
  id: string
  message: string
}

export const waitForBuildStartId = "wait-for-build-start-step"
const waitForBuildStartStep = createStep(
  { name: waitForBuildStartId, async: true },
  async (_, { container }) => {
    return new StepResponse({} as AsyncResultType)
  }
)

export const waitForBuildResultId = "async-build-result-step"
const waitForBuildResultStep = createStep(
  { name: waitForBuildResultId, async: true },
  async (_, { container }) => {
    return new StepResponse({} as AsyncResultType)
  }
)

type RecordBuildResultInput = {
  build_arn: string
  build_id: string
}

const recordBuildResult = createStep(
  "record-build-result-step",
  async (input: RecordBuildResultInput, { container }) => {
    const { build_arn, build_id } = input
    const projectService = container.resolve<ProjectModuleService>(
      "projectModuleService"
    )

    const pulumiService = container.resolve<PulumiService>(
      "pulumiModuleService"
    )

    const build = await pulumiService.retrieveCodeBuildResult(build_arn)

    const update: UpdateBuildDTO = {}
    if (build.status === "SUCCEEDED") {
      update.succeeded_at = new Date()
    } else if (build.status === "STOPPED") {
      update.canceled_at = new Date()
    } else {
      update.failed_at = new Date()
    }

    const [projectEnv] = await projectService.listProjectEnvironments({
      builds: { id: build_id },
      first_build_completed_at: null,
    })

    if (projectEnv) {
      await projectService.updateEnvironment(projectEnv.id, {
        first_build_completed_at: new Date(),
      })
    }

    await projectService.updateBuild(build_id, update)

    return new StepResponse({})
  }
)

type MaybeCancelCurrentBuildInput = {
  environment_id: string
}

const maybeCancelCurrentBuild = createStep(
  "maybe-cancel-current-build-step",
  async (input: MaybeCancelCurrentBuildInput, { container }) => {
    const projectService = container.resolve<ProjectModuleService>(
      "projectModuleService"
    )

    const pulumiService = container.resolve<PulumiService>(
      "pulumiModuleService"
    )

    const builds = await projectService.listBuilds(
      {
        environment_id: input.environment_id,
        succeeded_at: null,
        failed_at: null,
      },
      { select: ["id", "external_build_id"] }
    )

    if (builds.length !== 0) {
      await Promise.all(
        builds.map((build) => {
          if (build.external_build_id) {
            return pulumiService.cancelCodeBuild(build.external_build_id)
          }

          return Promise.resolve()
        })
      )
    }

    return new StepResponse({})
  }
)

type BuildProjectEnvironmentInput = {
  environment_id: string
  created_by: string
  commit_ref?: string
}

const ONE_DAY = 60 * 60 * 24
export const buildProjectEnvironmentId = "build-project-environment-workflow"
export const buildProjectEnvironmentWorkflow = createWorkflow(
  { name: buildProjectEnvironmentId, store: true, retentionTime: ONE_DAY },
  (input: WorkflowData<BuildProjectEnvironmentInput>) => {
    const [stackName, credentials, commitHash] = parallelize(
      getStackNameFromEnvironmentStep(input),
      collectProjectCredentials(input),
      validateOrGetLatestCommitHash({
        environment_id: input.environment_id,
        commit_ref: input.commit_ref,
      })
    )

    maybeCancelCurrentBuild({
      environment_id: input.environment_id,
    })

    const codebuild = triggerPulumiBuildStep({
      stack_name: stackName,
      github_credentials: credentials.github_credentials,
      commit_hash: commitHash,
    })

    const build = createBuild({
      build_arn: codebuild.arn!,
      commit_hash: commitHash,
      environment_id: input.environment_id,
      created_by: input.created_by,
    })

    waitForBuildStartStep()

    waitForBuildResultStep()

    recordBuildResult({ build_arn: codebuild.arn!, build_id: build.id })

    maybeDeployAppStackStep({
      build_id: build.id,
      stack_name: stackName,
      workflow_id: buildProjectEnvironmentId,
    })

    recordInfraInEnvironment({
      environment_id: input.environment_id,
      build_id: build.id,
    })

    return build
  }
)
