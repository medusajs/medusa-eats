import { model } from "@medusajs/utils";
import { DeliveryStatus } from "../types/common";
import { DeliveryDriver } from "./delivery-driver";

export const Delivery = model.define("delivery", {
  id: model
    .id({
      prefix: "del",
    })
    .primaryKey(),
  transaction_id: model.text().nullable(),
  driver_id: model.text().nullable(),
  delivery_status: model.enum(DeliveryStatus).default(DeliveryStatus.PENDING),
  eta: model.dateTime().nullable(),
  delivered_at: model.dateTime().nullable(),
  deliveryDriver: model.hasMany(() => DeliveryDriver, {
    mappedBy: "delivery"
  })
});
