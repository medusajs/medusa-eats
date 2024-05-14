import { setAuthAppMetadataStep } from "@medusajs/core-flows"
import {
  createStep,
  createWorkflow,
  StepResponse,
  transform,
  WorkflowData,
} from "@medusajs/workflows-sdk"
import DeliveryService from "../../modules/delivery/service"

type CreateDriverInput = {
  email: string
  first_name: string
  last_name: string
  phone: string
  avatar_url?: string
}

export const createDriverStep = createStep(
  "create-restaurant-admin-step",
  async (input: CreateDriverInput, { container }) => {
    const service: DeliveryService = container.resolve(
      "restaurantModuleService"
    )

    const user = await service.createDriver(input)

    return new StepResponse(user)
  }
)

type WorkflowInput = {
  user: CreateDriverInput
  auth_user_id: string
}

export const createDriverWorkflow = createWorkflow(
  "create-restaurant-admin-workflow",
  (input: WorkflowData<WorkflowInput>) => {
    const user = createDriverStep(input.user)

    const authUserInput = transform({ input, user }, ({ input, user }) => ({
      authUserId: input.auth_user_id,
      key: "resadm_id",
      value: user.id,
    }))

    setAuthAppMetadataStep(authUserInput)

    return user
  }
)
