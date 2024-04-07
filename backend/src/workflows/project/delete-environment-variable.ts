import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowData,
} from "@medusajs/workflows-sdk"
import ProjectModuleService from "../../modules/project/service"
import { getStackNameFromEnvironmentStep } from "./steps/get-stack-name"
import { maybeDeployAppStackStep } from "./steps/maybe-deploy-app-stack"
import { recordInfraInEnvironment } from "./steps/record-infra-in-environment"

type UpdateEnvironmentInput = {
  environment_id: string
  key: string
}

const deleteEnvironmentVariableStep = createStep(
  "delete-environment-variable-step",
  async (input: UpdateEnvironmentInput, { container }) => {
    const projectService = container.resolve<ProjectModuleService>(
      "projectModuleService"
    )

    await projectService.deleteEnvironmentVariable(
      input.environment_id,
      input.key
    )

    return new StepResponse(void 0)
  }
)

const ONE_DAY = 60 * 60 * 24
export const deleteEnvironmentVariableWorkflowId =
  "delete-environment-variable-step"
export const deleteEnvironmentVariableWorkflow = createWorkflow(
  {
    name: deleteEnvironmentVariableWorkflowId,
    store: true,
    retentionTime: ONE_DAY,
  },
  (input: WorkflowData<UpdateEnvironmentInput>) => {
    const stackName = getStackNameFromEnvironmentStep(input)

    deleteEnvironmentVariableStep(input)

    maybeDeployAppStackStep({
      environment_id: input.environment_id,
      stack_name: stackName,
      workflow_id: deleteEnvironmentVariableWorkflowId,
    })

    recordInfraInEnvironment({
      environment_id: input.environment_id,
    })
  }
)
