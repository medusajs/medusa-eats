import { CreateOrderShippingMethodDTO } from "@medusajs/types";
import {
  ModuleRegistrationName,
  Modules,
  ContainerRegistrationKeys,
} from "@medusajs/utils";
import { StepResponse, createStep } from "@medusajs/workflows-sdk";

export const createOrderStepId = "create-order-step";
export const createOrderStep = createStep(
  createOrderStepId,
  async function (deliveryId: string, { container }) {
    const query = container.resolve(ContainerRegistrationKeys.QUERY);

    const deliveryQuery = {
      entity: "delivery",
      filters: {
        id: deliveryId,
      },
      fields: ["id", "cart.id", "delivery_status", "driver_id"],
    };

    const {
      data: [delivery],
    } = await query.graph(deliveryQuery);

    const cartQuery = {
      entity: "cart",
      fields: ["*", "items.*"],
      filters: {
        id: delivery.cart.id,
      },
    };

    const {
      data: [cart],
    } = await query.graph(cartQuery);

    const orderModuleService = container.resolve(ModuleRegistrationName.ORDER);

    const order = await orderModuleService.createOrders({
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
    });

    const remoteLink = container.resolve("remoteLink");

    await remoteLink.create({
      deliveryModuleService: {
        delivery_id: delivery.id,
      },
      [Modules.ORDER]: {
        order_id: order.id,
      },
    });

    return new StepResponse(order, {
      orderId: order.id,
      deliveryId,
    });
  },
  async (
    {
      orderId,
      deliveryId,
    }: {
      orderId: string;
      deliveryId: string;
    },
    { container }
  ) => {
    const remoteLink = container.resolve("remoteLink");

    await remoteLink.dismiss({
      deliveryModuleService: {
        delivery_id: deliveryId,
      },
      [Modules.ORDER]: {
        order_id: orderId,
      },
    });

    const orderService = container.resolve(ModuleRegistrationName.ORDER);

    await orderService.softDeleteOrders([orderId]);
  }
);
