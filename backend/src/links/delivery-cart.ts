import DeliveryModule from "../modules/delivery";
import CartModule from "@medusajs/cart";
import { defineLink } from "@medusajs/utils";

export default defineLink(
  DeliveryModule.linkable.delivery.id,
  CartModule.linkable.cart.id
);
