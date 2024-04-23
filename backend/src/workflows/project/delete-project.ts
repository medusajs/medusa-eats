import {
  createStep,
  createWorkflow,
  parallelize,
  StepResponse,
  WorkflowData,
} from "@medusajs/workflows-sdk"
import ProjectModuleService from "../../modules/project/service"
import PulumiService from "../../modules/pulumi/service"
import { ProjectDTO, ProjectEnvironmentDTO } from "../../types/project/common"

function buildPulumiStackName(
  project: ProjectDTO,
  environment: ProjectEnvironmentDTO
) {
  const extract = (str: string) => str.slice(-6).toLowerCase()
  return `s${extract(project.account_id)}${extract(environment.id)}`
}

const getStackNameStep = createStep(
  { name: "get-stack-name-step", async: false },
  async (input: string, { container }) => {
    const service = container.resolve<ProjectModuleService>(
      "projectModuleService"
    )

    const [project] = await service.list(
      { id: input },
      {
        relations: ["environments"],
        withDeleted: true,
      }
    )

    const stackName = buildPulumiStackName(project, project.environments![0])

    return new StepResponse(stackName)
  }
)

const destroyPulumiAppStack = createStep(
  { name: "destroy-pulumi-app-stack", noWait: true },
  async (input: { stack: string }, { container }) => {
    const pulumiService = container.resolve<PulumiService>(
      "pulumiModuleService"
    )

    await pulumiService.deleteStack(input.stack)
  }
)

const destroyPulumiBuildStack = createStep(
  { name: "destroy-pulumi-build-stack", noWait: true },
  async (input: { stack: string }, { container }) => {
    const pulumiService = container.resolve<PulumiService>(
      "pulumiModuleService"
    )

    await pulumiService.deleteStack(input.stack, "build-stack")
  }
)

const deleteProjectStep = createStep(
  { name: "delete-project-step", async: false },
  async (input: { id: string }, { container }) => {
    const service = container.resolve<ProjectModuleService>(
      "projectModuleService"
    )

    await service.softDelete(input.id)
  }
)

type WorkflowInput = {
  id: string
}

const ONE_DAY = 24 * 60 * 60 * 1000
export const deleteProjectWorkflowId = "delete-project-workflow"
export const deleteProjectWorkflow = createWorkflow(
  { name: deleteProjectWorkflowId, store: true, retentionTime: ONE_DAY },
  (input: WorkflowData<WorkflowInput>) => {
    const stackName = getStackNameStep(input.id)

    deleteProjectStep({ id: input.id })

    parallelize(
      destroyPulumiAppStack({ stack: stackName }),
      destroyPulumiBuildStack({ stack: stackName })
    )
  }
)
