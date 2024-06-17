import { CreateOrderShippingMethodDTO } from "@medusajs/order";
import { IOrderModuleService } from "@medusajs/types";
import { remoteQueryObjectFromString } from "@medusajs/utils";
import { StepResponse, createStep } from "@medusajs/workflows-sdk";
import { IDeliveryModuleService } from "../../types/delivery/common";

export const createOrderStepId = "create-order-step";
export const createOrderStep = createStep(
  createOrderStepId,
  async function (deliveryId: string, { container }) {
    const remoteQuery = container.resolve("remoteQuery");

    const deliveryQuery = remoteQueryObjectFromString({
      entryPoint: "deliveries",
      variables: {
        filters: {
          id: deliveryId,
        },
      },
      fields: ["id", "cart_id", "delivery_status", "driver_id"],
    });

    const delivery = await remoteQuery(deliveryQuery);

    const cartQuery = remoteQueryObjectFromString({
      entryPoint: "carts",
      variables: {
        id: delivery.cart_id,
        relations: ["items"],
      },
      fields: ["id", "metadata"],
    });

    const cart = await remoteQuery(cartQuery);

    const orderModuleService =
      container.resolve<IOrderModuleService>("orderModuleService");

    const order = await orderModuleService.create({
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

    delivery.order_id = order?.id;

    const deliveryModuleService = container.resolve<IDeliveryModuleService>(
      "deliveryModuleService"
    );

    await deliveryModuleService.update([
      {
        id: deliveryId,
        order_id: order?.id,
      },
    ]);

    return new StepResponse(order, order?.id);
  },
  (orderId: string, { container }) => {
    const service =
      container.resolve<IOrderModuleService>("orderModuleService");

    return service.delete(orderId);
  }
);
