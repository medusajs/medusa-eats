import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { remoteQueryObjectFromString } from "@medusajs/utils";
import zod from "zod";
import { IRestaurantModuleService } from "../../types/restaurant/common";
import { getPricesByPriceSetId } from "../../utils/get-prices-by-price-set-id";

const schema = zod.object({
  name: zod.string(),
  address: zod.string(),
  phone: zod.string(),
  email: zod.string(),
  image_url: zod.string(),
});

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = schema.parse(req.body) as {
    name: string;
    address: string;
    phone: string;
    email: string;
    image_url: string;
  };

  if (!validatedBody) {
    return res.status(400).json({ message: "Missing restaurant data" });
  }

  const restaurantModuleService = req.scope.resolve<IRestaurantModuleService>(
    "restaurantModuleService"
  );

  try {
    const restaurant = await restaurantModuleService.createRestaurants(
      validatedBody
    );

    return res.status(200).json({ restaurant });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const queryFilters = req.query;

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
    ],
    variables: {
      filters: queryFilters,
    },
  });

  const restaurants = await remoteQuery(restaurantsQuery);

  for (const restaurant of restaurants) {
    const restaurantProductsQuery = remoteQueryObjectFromString({
      entryPoint: "restaurantProducts",
      variables: {
        filters: {
          restaurant_id: restaurant.id,
        },
      },
      fields: ["restaurant_id", "product_id"],
    });

    const restaurantProducts = await remoteQuery(restaurantProductsQuery);

    restaurant.products = [];

    if (restaurantProducts.length) {
      const productsQuery = remoteQueryObjectFromString({
        entryPoint: "products",
        fields: [
          "id",
          "title",
          "description",
          "thumbnail",
          "categories",
          "categories.id",
          "categories.name",
          "variants",
          "variants.id",
          "variants.price_set",
          "variants.price_set.id",
        ],
        variables: {
          filters: {
            id: restaurantProducts.map((p) => p.product_id),
          },
          relations: ["categories"],
        },
      });

      const products = await remoteQuery(productsQuery);

      const productsWithPrices = await getPricesByPriceSetId({
        products,
        currency_code: "usd",
        pricingService: req.scope.resolve("pricingModuleService"),
      });

      restaurant.products = productsWithPrices;
    }
  }

  return res.status(200).json({ restaurants });
}
