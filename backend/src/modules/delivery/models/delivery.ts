import { model } from "@medusajs/utils";
import { DeliveryStatus } from "../../../types/delivery/common";

export const Delivery = model.define("Delivery", {
  id: model.id({
    prefix: "del",
  }),
  transaction_id: model.text(),
  driver_id: model.text(),
  restaurant_id: model.text(),
  cart_id: model.text(),
  order_id: model.text(),
  delivery_status: model.enum(DeliveryStatus),
  eta: model.dateTime().nullable(),
  delivered_at: model.dateTime().nullable(),
});
