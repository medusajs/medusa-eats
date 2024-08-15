import { model } from "@medusajs/utils";
import { DeliveryStatus } from "../../../types/delivery/common";

export const Delivery = model.define("Delivery", {
  id: model
    .id({
      prefix: "del",
    })
    .primaryKey(),
  transaction_id: model.text(),
  driver_id: model.text().nullable(),
  delivery_status: model.enum(DeliveryStatus).default(DeliveryStatus.PENDING),
  eta: model.dateTime().nullable(),
  delivered_at: model.dateTime().nullable(),
});
