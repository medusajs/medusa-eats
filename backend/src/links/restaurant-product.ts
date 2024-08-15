import RestaurantModule from "../modules/restaurant";
import ProductModule from "@medusajs/product";
import { defineLink } from "@medusajs/utils";

export default defineLink(RestaurantModule.linkable.restaurant.id, {
  linkable: ProductModule.linkable.product.id,
  isList: true,
});
