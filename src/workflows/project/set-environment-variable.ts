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
  data: { key: string; value: string }
}

const setEnvironmentVariableStep = createStep(
  "set-environment-variable-step",
  async (input: UpdateEnvironmentInput, { container }) => {
    const projectService = container.resolve<ProjectModuleService>(
      "projectModuleService"
    )

    const environment = await projectService.setEnvironmentVariable(
      input.environment_id,
      input.data
    )

    return new StepResponse(environment, environment.id)
  }
)

const ONE_DAY = 60 * 60 * 24
export const setEnvironmentVariableWorkflowId =
  "set-environment-variable-workflow"
export const setEnvironmentVariableWorkflow = createWorkflow(
  {
    name: setEnvironmentVariableWorkflowId,
    store: true,
    retentionTime: ONE_DAY,
  },
  (input: WorkflowData<UpdateEnvironmentInput>) => {
    const stackName = getStackNameFromEnvironmentStep(input)

    setEnvironmentVariableStep(input)

    maybeDeployAppStackStep({
      environment_id: input.environment_id,
      stack_name: stackName,
      workflow_id: setEnvironmentVariableWorkflowId,
    })

    recordInfraInEnvironment({
      environment_id: input.environment_id,
    })
  }
)
