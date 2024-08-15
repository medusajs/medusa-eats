import RestaurantModule from "../modules/restaurant";
import DeliveryModule from "../modules/delivery";
import { defineLink } from "@medusajs/utils";

export default defineLink(
  DeliveryModule.linkable.delivery.id,
  RestaurantModule.linkable.restaurant.id
);
