import { model } from "@medusajs/utils";

export const RestaurantProduct = model.define("RestaurantProduct", {
  restaurant_id: model.text(),
  product_id: model.text(),
});
