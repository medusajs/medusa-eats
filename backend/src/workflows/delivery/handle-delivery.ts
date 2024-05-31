import { CartModuleService } from "@medusajs/cart/dist/services";
import { FulfillmentModuleService } from "@medusajs/fulfillment";
import {
  ModuleRegistrationName,
  Modules,
  RemoteLink,
} from "@medusajs/modules-sdk";
import {
  CreateOrderShippingMethodDTO,
  OrderModuleService,
} from "@medusajs/order";
import { IEventBusModuleService, OrderDTO } from "@medusajs/types";
import {
  StepResponse,
  WorkflowData,
  createStep,
  createWorkflow,
  transform,
} from "@medusajs/workflows-sdk";
import { Delivery } from "../../modules/delivery/models";
import DeliveryModuleService from "../../modules/delivery/service";
import RestaurantModuleService from "../../modules/restaurant/service";
import { DeliveryStatus, DriverDTO } from "../../types/delivery/common";

type CreateDeliveryStepInput = {
  cart_id: string;
};

const createDeliveryStep = createStep(
  "create-delivery-step",
  async function (input: CreateDeliveryStepInput, { container, context }) {
    const cartService =
      container.resolve<CartModuleService>("cartModuleService");

    const cart = await cartService.retrieve(input.cart_id);

    if (!cart) {
      throw new Error("Cart not found");
    }

    const restaurant_id = cart.metadata?.restaurant_id as string;

    if (!restaurant_id) {
      throw new Error("Restaurant id not found");
    }

    const service = container.resolve<DeliveryModuleService>(
      "deliveryModuleService"
    );

    const data = {
      cart_id: cart.id,
      restaurant_id,
      transaction_id: context.transactionId,
    };

    const delivery = await service.createDelivery(data);

    console.log("Delivery created", delivery);

    return new StepResponse(delivery, delivery.id);
  },
  (input: string, { container }) => {
    console.log("Error creating delivery", input);

    const service = container.resolve<DeliveryModuleService>(
      "deliveryModuleService"
    );

    return service.delete(input);
  }
);

export const notifyRestaurantStepId = "notify-restaurant-step";
const notifyRestaurantStep = createStep(
  { name: notifyRestaurantStepId, async: true },
  async function (deliveryId: string, { container, context }) {
    console.log("Notifying restaurant step...");
    const deliveryService = container.resolve<DeliveryModuleService>(
      "deliveryModuleService"
    );

    const delivery = await deliveryService.retrieve(deliveryId);

    const { restaurant_id } = delivery;

    const restaurantService = container.resolve<RestaurantModuleService>(
      "restaurantModuleService"
    );

    const restaurant = await restaurantService.retrieveRestaurant(
      restaurant_id
    );

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    console.log("Notifying restaurant...");

    const eventBus = container.resolve<IEventBusModuleService>(
      ModuleRegistrationName.EVENT_BUS
    );

    await eventBus.emit("notify.restaurant", {
      restaurant_id,
      delivery_id: delivery.id,
    });
  },
  (input: string, { container }) => {
    // To do: Handle error
    console.log("Error notifying restaurant");
  }
);

export const findDriverStepStepId = "await-driver-response-step";
const findDriverStep = createStep<string, DriverDTO, string>(
  { name: findDriverStepStepId, async: true },
  async function (deliveryId: string, { container }) {
    try {
      console.log("Finding driver step...");

      const deliveryService = container.resolve<DeliveryModuleService>(
        "deliveryModuleService"
      );

      console.log("Resolving event bus...");

      const eventBus = container.resolve<IEventBusModuleService>(
        ModuleRegistrationName.EVENT_BUS
      );

      console.log("Listing drivers...");

      const driversToNotify = await deliveryService
        .listDrivers({}, { take: 5 })
        .catch((e) => {
          console.log("Error listing drivers", e);
          return [];
        });

      console.log("Notifying drivers...", driversToNotify);

      const promises = driversToNotify.map((d) =>
        deliveryService.createDeliveryDriver(deliveryId, d.id)
      );

      await Promise.all(promises);

      await eventBus.emit("notify.drivers", {
        drivers: driversToNotify.map((d) => d.id),
        delivery_id: deliveryId,
      });
    } catch (e) {
      console.log("Catch: Error finding driver", e);
    }
  },
  (input: string, { container }) => {
    // To do: Handle error
    console.log("Error notifying drivers");
  }
);

const createOrderStep = createStep(
  "create-order-step",
  async function (deliveryId: string, { container }) {
    try {
      const deliveryModuleService = container.resolve<DeliveryModuleService>(
        "deliveryModuleService"
      );

      const delivery = await deliveryModuleService.retrieve(deliveryId);

      if (!delivery || !delivery.cart_id) {
        throw new Error("Delivery and/or cart_id not found");
      }

      if (
        delivery.delivery_status !== DeliveryStatus.PICKUP_CLAIMED ||
        !delivery.driver_id
      ) {
        throw new Error("Delivery is not ready for order creation");
      }

      const cartModuleService =
        container.resolve<CartModuleService>("cartModuleService");

      const cart = await cartModuleService.retrieve(delivery.cart_id, {
        relations: ["items"],
      });

      console.log("Cart retrieved", cart);

      if (!cart) {
        throw new Error("Cart not found");
      }

      const orderModuleService =
        container.resolve<OrderModuleService>("orderModuleService");

      const order = await orderModuleService
        .create({
          currency_code: cart.currency_code,
          email: cart.email,
          shipping_address: cart.shipping_address,
          billing_address: cart.billing_address,
          items: cart.items,
          region_id: cart.region_id,
          customer_id: cart.customer_id,
          sales_channel_id: cart.sales_channel_id,
          shipping_methods:
            cart.shipping_methods as unknown as CreateOrderShippingMethodDTO[],
        })
        .catch((e) => {
          console.log("Error creating order", e);
          return null;
        });

      const remoteLink = container.resolve<RemoteLink>("remoteLink");

      await remoteLink.create({
        [Modules.ORDER]: { order_id: order?.id },
        ["delivery"]: { delivery_id: deliveryId },
      });

      delivery.order_id = order?.id;

      console.log("Order created", order);

      await deliveryModuleService.updateDelivery(deliveryId, {
        order_id: order?.id,
      });

      return new StepResponse(order, order?.id);
    } catch (e) {
      console.log("Error creating order", e);
    }
  },
  (input: string, { container }) => {
    console.log("Error creating order", input);
  }
);

export const awaitStartPreparationStepId = "await-start-preparation-step";
const awaitStartPreparationStep = createStep(
  { name: awaitStartPreparationStepId, async: true },
  async function () {
    console.log("Awaiting start of preparation...");
  }
);

export const awaitPreparationStepId = "await-preparation-step";
const awaitPreparationStep = createStep(
  { name: awaitPreparationStepId, async: true },
  async function () {
    console.log("Awaiting preparation...");
  }
);

const createFulfillmentStep = createStep(
  "create-fulfillment-step",
  async function (order: OrderDTO, { container }) {
    try {
      console.log("Creating fulfillment...", { order });
      const fulfillmentModuleService =
        container.resolve<FulfillmentModuleService>("fulfillmentModuleService");

      const items = order.items?.map((lineItem) => {
        return {
          title: lineItem.title,
          sku: lineItem.variant_sku || "",
          quantity: lineItem.quantity,
          barcode: lineItem.variant_barcode || "",
          line_item_id: lineItem.id,
        };
      });

      const fulfillment = await fulfillmentModuleService.createFulfillment({
        provider_id: "manual_test-provider",
        location_id: "1",
        delivery_address: order.shipping_address!,
        items: items || [],
        labels: [],
        order,
      });

      console.log("Fulfillment created", fulfillment);

      return new StepResponse(fulfillment, fulfillment.id);
    } catch (e) {
      console.log("Error creating fulfillment", e);
    }
  },
  function (input: string, { container }) {
    console.log("Error creating fulfillment", input);

    const fulfillmentModuleService =
      container.resolve<FulfillmentModuleService>("fulfillmentModuleService");

    return fulfillmentModuleService.delete(input);
  }
);

export const awaitPickUpStepId = "await-pick-up-step";
const awaitPickUpStep = createStep(
  { name: awaitPickUpStepId, async: true },
  async function () {
    console.log("Awaiting pick up...");
  }
);

export const awaitDeliveryStepId = "await-delivery-step";
const awaitDeliveryStep = createStep(
  { name: awaitDeliveryStepId, async: true },
  async function () {
    console.log("Awaiting delivery...");
  }
);

type WorkflowInput = {
  delivery_input: CreateDeliveryStepInput;
};

const TWO_HOURS = 60 * 60 * 2;
export const handleDeliveryWorkflowId = "handle-delivery-workflow";
export const handleDeliveryWorkflow = createWorkflow<WorkflowInput, Delivery>(
  {
    name: handleDeliveryWorkflowId,
    store: true,
    retentionTime: TWO_HOURS,
  },
  function (input: WorkflowData<WorkflowInput>) {
    const delivery = createDeliveryStep(input.delivery_input);

    const deliveryId = transform(delivery, (d) => d.id);

    notifyRestaurantStep(deliveryId);

    findDriverStep(deliveryId);

    // updateEta

    const order = createOrderStep(deliveryId);

    awaitStartPreparationStep();

    awaitPreparationStep();

    createFulfillmentStep(order);

    awaitPickUpStep();

    awaitDeliveryStep();

    // capturePaymentStep()
  }
);
