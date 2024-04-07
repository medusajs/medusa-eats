import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { MedusaError } from "@medusajs/utils"
import {
  createStep,
  createWorkflow,
  IWorkflowEngineService,
  StepResponse,
  transform,
  WorkflowData,
} from "@medusajs/workflows-sdk"
import crypto from "crypto"
import GithubModuleService from "../../modules/github/service"
import ProjectModuleService from "../../modules/project/service"
import PulumiService from "../../modules/pulumi/service"
import { getStackNameFromEnvironmentStep } from "./steps/get-stack-name"
import { maybeDeployAppStackStep } from "./steps/maybe-deploy-app-stack"

type CreateProjectWorkflowInput = {
  name: string
  alias?: string
  source_data: Record<string, any>
  created_by: string | null
  account_id: string
}

type CreateProjectStepInput = {
  name: string
  external_source_id: string | null
  source_data: Record<string, any>
  created_by: string | null
  account_id: string
}

const createProjectStep = createStep(
  "create-project-step",
  async (input: CreateProjectStepInput, { container }) => {
    const service = container.resolve<ProjectModuleService>(
      "projectModuleService"
    )

    const project = await service.create(input)

    return new StepResponse(project, project.id)
  },
  (input: string, { container }) => {
    const service = container.resolve<ProjectModuleService>(
      "projectModuleService"
    )

    return service.delete(input)
  }
)

type CreateEnvironmentInput = {
  project_id: string
  rules: Record<string, any>
  variables: Record<string, any>
  region: string
  created_by: string | null
  alias: string
  type: "prod" | "dev"
}

const createProjectEnvironmentStep = createStep(
  "create-project-environment-step",
  async (input: CreateEnvironmentInput, { container }) => {
    const service = container.resolve<ProjectModuleService>(
      "projectModuleService"
    )

    const environment = await service.createEnvironment(input)

    return new StepResponse(environment, environment.id)
  },
  (input: string, { container }) => {
    const service = container.resolve<ProjectModuleService>(
      "projectModuleService"
    )

    return service.deleteProjectEnvironments(input)
  }
)

const verifyProjectIntegrationStep = createStep(
  "verify-project-integration-step",
  async (input: CreateProjectWorkflowInput, { container }) => {
    const service = container.resolve<GithubModuleService>(
      "githubModuleService"
    )

    // This throws if the app is not installed
    const installation = await service
      .getInstallation(input.source_data.owner, input.source_data.repo)
      .catch((error) => {
        if (error.status === 404) {
          throw new MedusaError(
            MedusaError.Types.NOT_ALLOWED,
            "Could not find repository. Verify that your repository details are correct and that it has the Medusa GitHub app installed."
          )
        }
        throw error
      })

    const repoData = await service.getRepository(
      input.source_data.owner,
      input.source_data.repo
    )

    return new StepResponse({
      installationId: installation.id,
      defaultBranch: repoData.default_branch,
    })
  }
)

type ProvisionInfrastructureInput = {
  stack_name: string
  environment_id: string
}

const provisionInfrastructureId = "provision-infrastructure-step"
const provisionInfrastructureStep = createStep(
  { name: provisionInfrastructureId, async: true },
  async (input: ProvisionInfrastructureInput, { container, metadata }) => {
    const pulumiService = container.resolve<PulumiService>(
      "pulumiModuleService"
    )

    const projectService = container.resolve<ProjectModuleService>(
      "projectModuleService"
    )

    const configuration = await projectService.getEnvironmentConfiguration(
      input.environment_id
    )

    const stackName = input.stack_name

    await pulumiService.appStackUp(stackName, {
      region: configuration.region,
      dbInstance: configuration.dbInstance,
      redisInstance: configuration.redisInstance,
      cpu: configuration.cpu,
      memory: configuration.memory,
      numServers: configuration.numServers,
      numWorkers: configuration.numWorkers,
    })

    return new StepResponse(void 0)
  }
)

type SetupCodePipelineInput = {
  stack_name: string
  environment_id: string
}

const setupCodePipelineStepId = "setup-code-pipeline-step"
const setupCodePipelineStep = createStep(
  { name: setupCodePipelineStepId, async: true },
  async (input: SetupCodePipelineInput, { container, metadata }) => {
    const workflowEngine = container.resolve<IWorkflowEngineService>(
      ModuleRegistrationName.WORKFLOW_ENGINE
    )

    const projectService = container.resolve<ProjectModuleService>(
      "projectModuleService"
    )

    const pulumiService = container.resolve<PulumiService>(
      "pulumiModuleService"
    )

    const configuration = await projectService.getEnvironmentConfiguration(
      input.environment_id
    )

    const stackName = input.stack_name

    const result = await pulumiService.setupCiCdPipeline(stackName, {
      region: configuration.region,
      buildSize: configuration.buildSize,
    })

    return new StepResponse(result)
  }
)

const ensureRootInfraStepId = "ensure-root-infra-step"
const ensureRootInfraStep = createStep(
  { name: ensureRootInfraStepId, async: true },
  async (_, { container, metadata }) => {
    const pulumiService = container.resolve<PulumiService>(
      "pulumiModuleService"
    )

    const result = await pulumiService.ensureCodeBuildEvents()

    return new StepResponse(result)
  }
)

type RecordProjectInfraReadyInput = {
  environment_id: string
}

const recordProjectInfraReadyId = "record-project-infra-ready"
const recordProjectInfraReady = createStep(
  recordProjectInfraReadyId,
  async (input: RecordProjectInfraReadyInput, { container }) => {
    const service = container.resolve<ProjectModuleService>(
      "projectModuleService"
    )

    const env = await service.retrieveProjectEnvironment(input.environment_id, {
      select: ["id", "infra_ready_at"],
    })

    if (env.infra_ready_at) {
      return new StepResponse({ success: true })
    }

    await service.updateEnvironment(input.environment_id, {
      infra_ready_at: new Date(),
    })

    return new StepResponse({ success: true })
  }
)

type WorkflowInput = {
  project: CreateProjectWorkflowInput
  initial_variables?: Record<string, string>
  auth_user_id: string
  region: string
}

const ONE_DAY = 24 * 60 * 60 * 1000
export const createProjectWorkflowId = "create-project-workflow"
export const createProjectWorkflow = createWorkflow(
  { name: createProjectWorkflowId, store: true, retentionTime: ONE_DAY },
  (input: WorkflowData<WorkflowInput>) => {
    const { installationId, defaultBranch } = verifyProjectIntegrationStep(
      input.project
    )

    const createProjectInput = transform(
      { installationId, input },
      ({ installationId, input }) => {
        return {
          external_source_id: `${installationId}`,
          ...input.project,
        }
      }
    )

    const project = createProjectStep(createProjectInput)

    const variables = transform({ input }, ({ input }) => {
      const vars = input.initial_variables || {}
      const normalized = Object.keys(vars).reduce((acc, key) => {
        acc[key.toUpperCase()] = vars[key]
        return acc
      }, {})

      return Object.assign(
        {},
        {
          JWT_SECRET: crypto.randomBytes(32).toString("hex"),
          COOKIE_SECRET: crypto.randomBytes(32).toString("hex"),
        },
        normalized
      )
    })

    const environment = createProjectEnvironmentStep({
      type: "prod",
      alias: "production",
      region: input.region,
      project_id: project.id,
      rules: { branch: defaultBranch },
      variables,
      created_by: input.project.created_by,
    })

    const stackName = getStackNameFromEnvironmentStep({
      environment_id: environment.id,
    })

    ensureRootInfraStep()

    setupCodePipelineStep({
      stack_name: stackName,
      environment_id: environment.id,
    })

    provisionInfrastructureStep({
      stack_name: stackName,
      environment_id: environment.id,
    })

    recordProjectInfraReady({
      environment_id: environment.id,
    })

    // If a build was created while infra was provisioned we want to deploy now
    maybeDeployAppStackStep({
      stack_name: stackName,
      environment_id: environment.id,
      workflow_id: createProjectWorkflowId,
    })

    return project
  }
)
