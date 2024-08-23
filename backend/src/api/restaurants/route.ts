import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { MedusaError, remoteQueryObjectFromString } from "@medusajs/utils";
import { createRestaurantWorkflow } from "../../workflows/restaurant/workflows";
import zod from "zod";
import { CreateRestaurantDTO } from "../../modules/restaurant/types/mutations";

const schema = zod.object({
  name: zod.string(),
  handle: zod.string(),
  address: zod.string(),
  phone: zod.string(),
  email: zod.string(),
  image_url: zod.string().optional(),
});

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = schema.parse(req.body) as CreateRestaurantDTO;

  if (!validatedBody) {
    return MedusaError.Types.INVALID_DATA;
  }

  const { result: restaurant } = await createRestaurantWorkflow(req.scope).run({
    input: {
      restaurant: validatedBody,
    },
  });

  return res.status(200).json({ message: "Restaurant created", restaurant });
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  // Note: currency code should be small letter. However, since
  // the seed data is using capital letters I've set it here as well.
  const { currency_code = "EUR", ...queryFilters } = req.query;

  const remoteQuery = req.scope.resolve("remoteQuery");

  const restaurantsQuery = remoteQueryObjectFromString({
    entryPoint: "restaurants",
    fields: [
      "id",
      "handle",
      "name",
      "address",
      "phone",
      "email",
      "image_url",
      "is_open",
      "products.*",
      "products.categories.*",
      "products.variants.*",
      "products.variants.calculated_price.*"
    ],
    variables: {
      filters: queryFilters,
      "products.variants.calculated_price": {
        context: {
          currency_code
        }
      }
    },
  });

  const restaurants = await remoteQuery(restaurantsQuery)

  return res.status(200).json({ restaurants });
}
