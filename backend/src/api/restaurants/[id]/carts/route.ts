import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { ModuleRegistrationName } from "@medusajs/modules-sdk";
import { ICartModuleService } from "@medusajs/types";
import { MedusaError } from "@medusajs/utils";
import zod from "zod";

const schema = zod.object({
  cart_id: zod.string().startsWith("cart_"),
});

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = schema.parse(req.body);

  const restaurant_id = req.params.id;

  const { cart_id } = validatedBody;

  const cartModuleService = req.scope.resolve<ICartModuleService>(
    ModuleRegistrationName.CART
  );

  // update the cart with the restaurant id in the metadata
  const cart = await cartModuleService.update(cart_id, {
    metadata: {
      restaurant_id: restaurant_id,
    },
  });

  // Return the cart
  return res.status(200).json({ cart });
}
