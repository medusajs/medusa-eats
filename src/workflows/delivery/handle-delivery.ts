import { CartModuleService } from "@medusajs/cart/dist/services"
import { OrderService } from "@medusajs/order"
import {
  createStep,
  createWorkflow,
  IWorkflowEngineService,
  StepResponse,
  WorkflowData,
} from "@medusajs/workflows-sdk"
import DeliveryModuleService from "src/modules/delivery/service"
import RestaurantModuleService from "src/modules/restaurant/service"

type AsyncResultType = {
  id: string
  message: string
}

type CreateDeliveryStepInput = {
  restaurant_id: string
  cart_id: string
  delivery_address: string
}

const createDeliveryStep = createStep(
  "create-delivery-step",
  async (input: CreateDeliveryStepInput, { container, context }) => {
    const service = container.resolve<DeliveryModuleService>(
      "deliveryModuleService"
    )

    const data = {
      ...input,
      transaction_id: context.transactionId,
    }

    const delivery = await service.createDelivery(data)

    return new StepResponse(delivery, delivery.id)
  },
  (input: string, { container }) => {
    console.log("Error creating delivery", input)

    const service = container.resolve<DeliveryModuleService>(
      "deliveryModuleService"
    )

    return service.delete(input)
  }
)

const notifyRestaurantStep = createStep(
  { name: "notify-restaurant-step", async: true },
  async (deliveryId: string, { container }) => {
    const deliveryService = container.resolve<DeliveryModuleService>(
      "deliveryModuleService"
    )

    const delivery = await deliveryService.retrieve(deliveryId)

    const { restaurant_id } = delivery

    const restaurantService = container.resolve<RestaurantModuleService>(
      "restaurantModuleService"
    )

    const restaurant = await restaurantService.retrieveRestaurant(restaurant_id)

    if (!restaurant) {
      throw new Error("Restaurant not found")
    }

    // To do: Notify restaurant
    console.log("Notifying restaurant, waiting for response...")
    return new StepResponse(delivery, delivery.id)
  },
  (input: string, { container }) => {
    // To do: Handle error
    console.log("Error notifying restaurant")
  }
)

export const awaitRestaurantResponseStepId = "await-restaurant-response-step"
const awaitRestaurantResponseStep = createStep(
  { name: awaitRestaurantResponseStepId, async: true },
  async (_, { container }) => {
    return new StepResponse({} as AsyncResultType)
  }
)

export const awaitDriverResponseStepId = "await-driver-response-step"
const awaitDriverResponseStep = createStep(
  { name: awaitDriverResponseStepId, async: true },
  async (_, { container }) => {
    return new StepResponse({} as AsyncResultType)
  }
)

const createOrderStep = createStep(
  "create-order-step",
  async (deliveryId: string, { container }) => {
    const deliveryModuleService = container.resolve<DeliveryModuleService>(
      "deliveryModuleService"
    )

    const delivery = await deliveryModuleService.retrieve(deliveryId)

    if (!delivery || !delivery.cart_id) {
      throw new Error("delivery.cart_id not found")
    }

    const cartModuleService =
      container.resolve<CartModuleService>("cartModuleService")

    const cart = await cartModuleService.retrieve(delivery.cart_id)

    if (!cart) {
      throw new Error("Cart not found")
    }

    const orderModuleService =
      container.resolve<OrderService>("orderModuleService")

    const order = await orderModuleService.create(cart)

    delivery.order_id = order.id

    return new StepResponse(delivery, delivery.id)
  },
  (input: string, { container }) => {
    console.log("Error creating order", input)
  }
)

export const awaitPreparationStepId = "await-preparation-step"
const awaitPreparationStep = createStep(
  { name: awaitPreparationStepId, async: true },
  async (_, { container }) => {
    return new StepResponse({} as AsyncResultType)
  }
)

type WorkflowInput = {
  delivery_input: CreateDeliveryStepInput
  auth_user_id: string
}

const FIFTEEN_MINUTES = 60 * 15
export const createHandleDeliveryWorkflowId = "handle-delivery-workflow"
export const createHandleDeliveryWorkflow = (
  engine: IWorkflowEngineService
) => {
  const workflow = createWorkflow(
    {
      name: "handle-delivery-workflow",
      store: true,
      retentionTime: FIFTEEN_MINUTES,
    },
    (input: WorkflowData<WorkflowInput>) => {
      const delivery = createDeliveryStep(input.delivery_input)

      notifyRestaurantStep(delivery.id)

      awaitRestaurantResponseStep()

      awaitDriverResponseStep()

      createOrderStep(delivery.id)

      awaitPreparationStep()

      // createFulfillmentStep(delivery.id)

      // awaitPickUpStep()

      // awaitFulfillmentStep()

      // capturePaymentStep()

      // completeDeliveryStep()
    }
  )
}
