import { model } from "@medusajs/utils";

export const RestaurantAdmin = model.define("RestaurantAdmin", {
  id: model
    .id({
      prefix: "resadm",
    })
    .primaryKey(),
  first_name: model.text(),
  last_name: model.text(),
  restaurant_id: model.text(),
  email: model.text(),
  avatar_url: model.text().nullable(),
});
