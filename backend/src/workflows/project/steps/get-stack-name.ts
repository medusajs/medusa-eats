import { createStep, StepResponse } from "@medusajs/workflows-sdk"
import ProjectModuleService from "../../../modules/project/service"
import { buildStackName } from "../../../utils"

type GetStackNameInput = {
  environment_id: string
}

export const getStackNameFromEnvironmentStep = createStep(
  "get-stack-name-from-environment-step",
  async (input: GetStackNameInput, { container }) => {
    const projectService = container.resolve<ProjectModuleService>(
      "projectModuleService"
    )

    const environment = await projectService.retrieveProjectEnvironment(
      input.environment_id,
      { relations: ["project"] }
    )

    return new StepResponse(buildStackName(environment.project!, environment))
  }
)
