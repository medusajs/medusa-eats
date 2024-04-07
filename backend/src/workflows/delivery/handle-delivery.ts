import { CartModuleService } from "@medusajs/cart/dist/services"
import { FulfillmentModuleService } from "@medusajs/fulfillment"
import {
  CreateOrderShippingMethodDTO,
  Order,
  OrderModuleService,
  OrderService,
} from "@medusajs/order"
import {
  StepResponse,
  WorkflowData,
  createStep,
  createWorkflow,
  transform,
} from "@medusajs/workflows-sdk"
import { Delivery } from "src/modules/delivery/models"
import DeliveryModuleService from "src/modules/delivery/service"
import RestaurantModuleService from "src/modules/restaurant/service"
import { DeliveryStatus, DriverDTO } from "../../types/delivery/common"
import { OrderDTO } from "@medusajs/types"

type AsyncResultType = {
  id: string
  message: string
}

type CreateDeliveryStepInput = {
  restaurant_id: string
  cart_id: string
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

    console.log("Delivery created", delivery)

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

export const notifyRestaurantStepId = "notify-restaurant-step"
const notifyRestaurantStep = createStep(
  { name: notifyRestaurantStepId, async: true },
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
    console.log("Notifying restaurant...")
  },
  (input: string, { container }) => {
    // To do: Handle error
    console.log("Error notifying restaurant")
  }
)

export const findDriverStepStepId = "await-driver-response-step"
const findDriverStep = createStep<string, DriverDTO, string>(
  { name: findDriverStepStepId, async: true },
  async (deliveryId: string, { container }) => {
    console.log("Notifying drivers...")
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
      throw new Error("Delivery and/or cart_id not found")
    }

    if (
      delivery.delivery_status !== DeliveryStatus.RESTAURANT_ACCEPTED ||
      !delivery.driver_id
    ) {
      throw new Error("Delivery is not ready for order creation")
    }

    const cartModuleService =
      container.resolve<CartModuleService>("cartModuleService")

    const cart = await cartModuleService.retrieve(delivery.cart_id)

    if (!cart) {
      throw new Error("Cart not found")
    }

    const orderModuleService =
      container.resolve<OrderModuleService>("orderModuleService")

    const order = await orderModuleService.create({
      currency_code: cart.currency_code,
      email: cart.email,
      shipping_address_id: cart.shipping_address?.id,
      billing_address_id: cart.billing_address?.id,
      items: cart.items,
      region_id: cart.region_id,
      customer_id: cart.customer_id,
      sales_channel_id: cart.sales_channel_id,
      shipping_methods:
        cart.shipping_methods as unknown as CreateOrderShippingMethodDTO[],
    })

    delivery.order_id = order.id
    delivery.delivery_status = DeliveryStatus.RESTAURANT_PREPARING

    console.log("Order created", order)

    await deliveryModuleService.updateDelivery(deliveryId, delivery)

    return new StepResponse(order, order.id)
  },
  (input: string, { container }) => {
    console.log("Error creating order", input)
  }
)

export const awaitPreparationStepId = "await-preparation-step"
const awaitPreparationStep = createStep(
  { name: awaitPreparationStepId, async: true },
  async (_, { container }) => {
    console.log("Awaiting preparation...")
  }
)

export interface CreateFulfillmentAddressDTO {
  fulfillment_id: string
  company?: string | null
  first_name?: string | null
  last_name?: string | null
  address_1?: string | null
  address_2?: string | null
  city?: string | null
  country_code?: string | null
  province?: string | null
  postal_code?: string | null
  phone?: string | null
  metadata?: Record<string, unknown> | null
}

const createFulfillmentStep = createStep(
  "create-fulfillment-step",
  async (order: OrderDTO, { container }) => {
    const fulfillmentModuleService =
      container.resolve<FulfillmentModuleService>("fulfillmentModuleService")

    const items = order.items!.map((lineItem) => {
      return {
        title: lineItem.title,
        sku: lineItem.variant_sku || "",
        quantity: Math.round(lineItem.total / lineItem.unit_price),
        barcode: lineItem.variant_barcode || "",
        line_item_id: lineItem.id,
      }
    })

    const fulfillment = await fulfillmentModuleService.createFulfillment({
      provider_id: "manual_test-provider",
      location_id: "1",
      delivery_address: order.shipping_address!,
      items,
      labels: [],
      order,
    })

    console.log("Fulfillment created", fulfillment)

    return new StepResponse(fulfillment, fulfillment.id)
  },
  (input: string, { container }) => {
    console.log("Error creating fulfillment", input)

    const fulfillmentModuleService =
      container.resolve<FulfillmentModuleService>("fulfillmentModuleService")

    return fulfillmentModuleService.delete(input)
  }
)

export const awaitPickUpStepId = "await-pick-up-step"
const awaitPickUpStep = createStep(
  { name: awaitPickUpStepId, async: true },
  async (_, { container }) => {
    console.log("Awaiting pick up...")
  }
)

export const awaitDeliveryStepId = "await-delivery-step"
const awaitDeliveryStep = createStep(
  { name: awaitDeliveryStepId, async: true },
  async (_, { container }) => {
    console.log("Awaiting delivery...")
  }
)

type WorkflowInput = {
  delivery_input: CreateDeliveryStepInput
  auth_user_id?: string
}

const TWO_HOURS = 60 * 60 * 2
export const handleDeliveryWorkflowId = "handle-delivery-workflow"
export const handleDeliveryWorkflow = createWorkflow<WorkflowInput, Delivery>(
  {
    name: "handle-delivery-workflow",
    store: true,
    retentionTime: TWO_HOURS,
  },
  (input: WorkflowData<WorkflowInput>) => {
    const delivery = createDeliveryStep(input.delivery_input)

    const deliveryId = transform(delivery, (d) => d.id)

    notifyRestaurantStep(deliveryId)

    findDriverStep(deliveryId)

    const order = createOrderStep(deliveryId)

    awaitPreparationStep()

    createFulfillmentStep(order)

    awaitPickUpStep()

    awaitDeliveryStep()

    // capturePaymentStep()
  }
)