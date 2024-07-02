import { model } from "@medusajs/utils";

export const DeliveryDriver = model.define("DeliveryDriver", {
  id: model.id({
    prefix: "deldrv",
  }),
  delivery_id: model.text(),
  driver_id: model.text(),
});
