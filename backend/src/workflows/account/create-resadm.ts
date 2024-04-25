import {
  createStep,
  createWorkflow,
  StepResponse,
  transform,
  WorkflowData,
} from "@medusajs/workflows-sdk"
import { setAuthAppMetadataStep } from "@medusajs/core-flows"
import RestaurantModuleService from "../../modules/restaurant/service"

type CreateRestaurantAdminInput = {
  restaurant_id: string
  email: string
  first_name?: string
  last_name?: string
}

export const createRestaurantAdminStep = createStep(
  "create-restaurant-admin-step",
  async (input: CreateRestaurantAdminInput, { container }) => {
    const service: RestaurantModuleService = container.resolve(
      "restaurantModuleService"
    )

    const { restaurant_id, ...data } = input

    const user = await service.createRestaurantAdmin(restaurant_id, data)

    return new StepResponse(user)
  }
)

type WorkflowInput = {
  user: CreateRestaurantAdminInput
  auth_user_id: string
}

export const createRestaurantAdminWorkflow = createWorkflow(
  "create-restaurant-admin-workflow",
  (input: WorkflowData<WorkflowInput>) => {
    const user = createRestaurantAdminStep(input.user)

    const authUserInput = transform({ input, user }, ({ input, user }) => ({
      authUserId: input.auth_user_id,
      key: "resadm_id",
      value: user.id,
    }))

    setAuthAppMetadataStep(authUserInput)

    return user
  }
)
