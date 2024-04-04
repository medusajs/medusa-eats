import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowData,
} from "@medusajs/workflows-sdk"
import ProjectModuleService from "../../modules/project/service"
import { UpdateProjectEnvironmentDTO } from "../../types/project/mutations"
import { getStackNameFromEnvironmentStep } from "./steps/get-stack-name"
import { maybeDeployAppStackStep } from "./steps/maybe-deploy-app-stack"
import { recordInfraInEnvironment } from "./steps/record-infra-in-environment"

type UpdateEnvironmentInput = {
  environment_id: string
  data: UpdateProjectEnvironmentDTO
}

const updateEnvironmentStep = createStep(
  "update-environment-step",
  async (input: UpdateEnvironmentInput, { container }) => {
    const projectService = container.resolve<ProjectModuleService>(
      "projectModuleService"
    )

    const environment = await projectService.updateEnvironment(
      input.environment_id,
      input.data
    )

    return new StepResponse(environment, environment.id)
  }
)

const ONE_DAY = 60 * 60 * 24
export const updateProjectEnvironmentId = "update-project-environment-workflow"
export const updateProjectEnvironmentWorkflow = createWorkflow(
  { name: updateProjectEnvironmentId, store: true, retentionTime: ONE_DAY },
  (input: WorkflowData<UpdateEnvironmentInput>) => {
    const stackName = getStackNameFromEnvironmentStep(input)

    updateEnvironmentStep(input)

    maybeDeployAppStackStep({
      environment_id: input.environment_id,
      stack_name: stackName,
      workflow_id: updateProjectEnvironmentId,
    })

    recordInfraInEnvironment({
      environment_id: input.environment_id,
    })
  }
)
