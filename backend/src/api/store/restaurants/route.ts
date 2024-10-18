import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { ContainerRegistrationKeys, MedusaError } from "@medusajs/utils";
import zod from "zod";
import { CreateRestaurantDTO } from "../../../modules/restaurant/types/mutations";
import { createRestaurantWorkflow } from "../../../workflows/restaurant/workflows";
import { QueryContext } from "@medusajs/framework/utils";

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

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const restaurantsQuery = {
    entity: "restaurant",
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
      "products.variants.calculated_price.*",
    ],
    filters: queryFilters,
    context: {
      products: {
        variants: {
          calculated_price: QueryContext({
            currency_code,
          }),
        },
      },
    },
  };

  const { data: restaurants } = await query.graph(restaurantsQuery);

  return res.status(200).json({ restaurants });
}
