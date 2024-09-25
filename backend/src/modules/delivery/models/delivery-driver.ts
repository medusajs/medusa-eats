import { model } from "@medusajs/utils";
import { Delivery } from "./delivery";
import { Driver } from "./driver";

export const DeliveryDriver = model.define("delivery_driver", {
  id: model
    .id({
      prefix: "deldrv",
    })
    .primaryKey(),
  delivery: model.belongsTo(() => Delivery, {
    mappedBy: "deliveryDriver"
  }),
  driver: model.belongsTo(() => Driver, {
    mappedBy: "deliveryDriver"
  })
});
