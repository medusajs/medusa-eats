import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import {
  createStep,
  IWorkflowEngineService,
  StepResponse,
} from "@medusajs/workflows-sdk"
import ProjectModuleService from "src/modules/project/service"
import PulumiService from "../../../modules/pulumi/service"

type MaybeDeployBuildInput = {
  stack_name: string
  build_id?: string
  environment_id?: string
  workflow_id: string
}

export const maybeDeployAppStackStepId = "deploy-app-stack-step"
export const maybeDeployAppStackStep = createStep(
  { name: maybeDeployAppStackStepId, async: true },
  async (input: MaybeDeployBuildInput, { container }) => {
    const projectService = container.resolve<ProjectModuleService>(
      "projectModuleService"
    )

    let shouldDeploy = true
    let environmentId: string | undefined
    let commitHash: string | undefined
    let errorMessage: string | undefined

    if (input.build_id) {
      const details = await getDeploymentDetailsForBuild(
        input.build_id,
        projectService
      )
      environmentId = details.environment_id
      commitHash = details.commit_hash
      shouldDeploy = details.should_deploy
    } else if (input.environment_id) {
      await getDeploymentDetailsForEnvironment(
        input.environment_id,
        projectService
      )
        .then((details) => {
          environmentId = details.environment_id
          commitHash = details.commit_hash
          shouldDeploy = details.should_deploy
        })
        .catch((error) => {
          errorMessage = error.message
        })
    } else {
      errorMessage = "Environment ID or build ID is required"
    }

    if (errorMessage) {
      throw new Error(errorMessage)
    }

    if (!environmentId) {
      throw new Error("No environment ID found")
    }

    const configuration =
      await projectService.getEnvironmentConfiguration(environmentId)

    const variables = await projectService.listEnvironmentVariables(
      { environment_id: environmentId },
      { select: ["id", "key", "value"] }
    )

    if (shouldDeploy) {
      if (!commitHash) {
        throw new Error("No commit hash found")
      }
      const pulumiService = container.resolve<PulumiService>(
        "pulumiModuleService"
      )

      await pulumiService.appStackUp(input.stack_name, {
        environment: variables.map((v) => ({ name: v.key, value: v.value })),
        region: configuration.region,
        dbInstance: configuration.dbInstance,
        redisInstance: configuration.redisInstance,
        cpu: configuration.cpu,
        memory: configuration.memory,
        numServers: configuration.numServers,
        numWorkers: configuration.numWorkers,
        commitHash,
      })

      return new StepResponse({ skipped_deployment: false })
    }

    return new StepResponse({ skipped_deployment: true })
  }
)

type DeploymentDetails = {
  environment_id: string
  commit_hash?: string
  should_deploy: boolean
}

/*
 * If the deplyment happens as part of a new build, we must use that build's
 * commit hash.
 *
 * We only want to deploy if the build was successful and the environment is
 * ready.
 */
const getDeploymentDetailsForBuild = async (
  buildId: string,
  service: ProjectModuleService
): Promise<DeploymentDetails> => {
  const [build] = await service.listBuilds({ id: buildId })
  const environmentId = build.environment_id
  const commitHash = build.commit_hash

  const environment = await service.retrieveProjectEnvironment(environmentId, {
    select: ["id", "infra_ready_at"],
  })

  return {
    environment_id: environmentId,
    commit_hash: commitHash,
    should_deploy: !!build.succeeded_at && !!environment.infra_ready_at,
  }
}

/*
 * If we are redeploying the environment without a new build (e.g., we updated
 * env vars) we just want to use the latest build that was deployed to the
 * environment.
 *
 * Alternatively, if there has never been a deployment of the environment, but
 * a build is available we want to use that build.
 *
 * This function finds the relevant commit hash for the deployment.
 */
const getDeploymentDetailsForEnvironment = async (
  environmentId: string,
  service: ProjectModuleService
): Promise<DeploymentDetails> => {
  const environment = await service.retrieveProjectEnvironment(environmentId, {
    select: ["id", "infra_ready_at", "first_build_completed_at"],
    relations: ["deployed_build"],
  })

  const shouldDeploy =
    !!environment.infra_ready_at && !!environment.first_build_completed_at

  let commitHash = environment.deployed_build?.commit_hash
  if (!commitHash && shouldDeploy) {
    const [latestBuild] = await service.listBuilds(
      { environment_id: environmentId },
      { take: 1, order: { created_at: "DESC" } }
    )

    commitHash = latestBuild?.commit_hash
  }

  return {
    environment_id: environmentId,
    commit_hash: commitHash,
    should_deploy: shouldDeploy,
  }
}
