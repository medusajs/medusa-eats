import {
  createStep,
  createWorkflow,
  StepResponse,
  transform,
  WorkflowData,
} from "@medusajs/workflows-sdk"
import { setAuthAppMetadataStep } from "@medusajs/core-flows"
import RestaurantModuleService from "../../modules/restaurant/service"
import DeliveryService from "../../modules/delivery/service"
import { RestaurantAdminDTO } from "../../types/restaurant/common"
import { DriverDTO } from "../../types/delivery/common"

type CreateRestaurantAdminInput = {
  restaurant_id: string
  email: string
  first_name?: string
  last_name?: string
}

type CreateDriverInput = {
  email: string
  first_name: string
  last_name: string
  phone: string
  avatar_url?: string
}

export const createUserStep = createStep(
  "create-user-step",
  async (
    input: (CreateRestaurantAdminInput | CreateDriverInput) & {
      scope: "restaurant" | "driver" | "customer"
    },
    { container }
  ): Promise<StepResponse<RestaurantAdminDTO | DriverDTO | null>> => {
    console.log("Creating user", { input })
    if (input.scope === "restaurant") {
      console.log("Creating restaurant admin")
      const service: RestaurantModuleService = container.resolve(
        "restaurantModuleService"
      )

      const { restaurant_id, ...data } = input as CreateRestaurantAdminInput

      try {
        const user = await service.createRestaurantAdmin(restaurant_id, data)

        return new StepResponse(user)
      } catch (e) {
        console.error(e)
      }
    }

    if (input.scope === "driver") {
      console.log("Creating driver")
      const service: DeliveryService = container.resolve(
        "deliveryModuleService"
      )

      try {
        const driverData = {
          ...input,
          avatar_url: `https://robohash.org/${input.email}?size=40x40&set=set1&bgset=bg1`,
        }
        const user = await service.createDriver(driverData as CreateDriverInput)

        return new StepResponse(user)
      } catch (e) {
        console.error(e)
      }
    }

    return new StepResponse(null)
  }
)

type WorkflowInput = {
  user: (CreateRestaurantAdminInput | CreateDriverInput) & {
    scope: "restaurant" | "driver" | "customer"
  }
  auth_user_id: string
}

export const createUserWorkflow = createWorkflow(
  "create-user-workflow",
  (input: WorkflowData<WorkflowInput>) => {
    const user = createUserStep(input.user)

    if (!user) {
      return null
    }

    const authUserInput = transform({ input, user }, ({ input, user }) => ({
      authUserId: input.auth_user_id,
      key:
        input.user.scope === "restaurant"
          ? "restaurant_admin_id"
          : input.user.scope === "driver"
            ? "driver_id"
            : "customer_id",
      value: user!.id,
    }))

    setAuthAppMetadataStep(authUserInput)

    return user
  }
)
