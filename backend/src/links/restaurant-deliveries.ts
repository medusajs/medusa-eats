import RestaurantModule from "../modules/restaurant";
import DeliveryModule from "../modules/delivery";
import { defineLink } from "@medusajs/utils";

export default defineLink(RestaurantModule.linkable.restaurant.id, {
  linkable: DeliveryModule.linkable.delivery.id,
  isList: true,
});