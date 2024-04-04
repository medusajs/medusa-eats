import {
  createStep,
  createWorkflow,
  StepResponse,
  transform,
  WorkflowData,
} from "@medusajs/workflows-sdk"
import { setAuthAppMetadataStep } from "@medusajs/core-flows"
import AccountModuleService from "../../modules/account/service"

type CreateUserInput = {
  email: string
  first_name?: string
  last_name?: string
}

export const createUserStep = createStep(
  "create-euser-step",
  async (input: CreateUserInput, { container }) => {
    const service: AccountModuleService = container.resolve(
      "accountModuleService"
    )

    const user = await service.createUser(input)

    return new StepResponse(user)
  }
)

type WorkflowInput = {
  user: CreateUserInput
  auth_user_id: string
}

export const createEuserWorkflow = createWorkflow(
  "create-euser-workflow",
  (input: WorkflowData<WorkflowInput>) => {
    const user = createUserStep(input.user)

    const authUserInput = transform({ input, user }, ({ input, user }) => ({
      authUserId: input.auth_user_id,
      key: "euser_id",
      value: user.id,
    }))

    setAuthAppMetadataStep(authUserInput)

    return user
  }
)
