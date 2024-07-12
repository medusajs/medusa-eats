import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import {
  MedusaError,
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@medusajs/utils";
import { CreateProductDTO, ProductDTO } from "@medusajs/types";
import zod from "zod";
import { createVariantPriceSet } from "../../../../utils/create-variant-price-set";
import { IProductModuleService } from "@medusajs/types";
import { IRestaurantModuleService } from "../../../../types/restaurant/common";

const schema = zod.object({
  title: zod.string(),
  description: zod.string().optional(),
  category_id: zod.string(),
  price: zod.string(),
  sku: zod.string().optional(),
  thumbnail: zod.string().optional(),
});

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = schema.parse(req.body);

  if (!validatedBody) {
    return res.status(400).json({ message: "Missing restaurant admin data" });
  }

  const { price, category_id, ...rest } = validatedBody;
  const productData = rest as CreateProductDTO & { categories: any[] };

  const restaurantId = req.params.id;

  productData.categories = [{ id: category_id }];

  productData.variants = [
    {
      title: validatedBody.title,
      manage_inventory: false,
    },
  ];

  if (!restaurantId) {
    return res.status(400).json({ message: "Missing restaurant id" });
  }

  const restaurantModuleService = req.scope.resolve<IRestaurantModuleService>(
    "restaurantModuleService"
  );

  const productModuleService = req.scope.resolve<IProductModuleService>(
    "productModuleService"
  );

  // Create the product
  const product: ProductDTO = await productModuleService.createProducts(
    productData as CreateProductDTO
  );

  // Create and link a price set to the product variant
  await createVariantPriceSet({
    container: req.scope,
    variantId: product.variants[0].id,
    prices: [
      {
        amount: price,
        currency_code: "usd",
      },
    ],
  });

  // Add the product to the restaurant
  const restaurantProduct =
    await restaurantModuleService.createRestaurantProducts({
      restaurant_id: restaurantId,
      product_id: product.id,
    });

  // Return the product
  return res.status(200).json({ restaurant_product: restaurantProduct });
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const restaurantId = req.params.id;

  if (!restaurantId) {
    return MedusaError.Types.NOT_FOUND;
  }

  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY);

  const restaurantProductsQuery = remoteQueryObjectFromString({
    entryPoint: "restaurant_product",
    variables: {
      filters: {
        restaurant_id: restaurantId,
      },
    },
    fields: ["restaurant_id", "product_id"],
  });

  const restaurantProducts = await remoteQuery(restaurantProductsQuery);

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
    },
  });

  const products = await remoteQuery(productsQuery);

  return res.status(200).json({ restaurant_products: products });
}

const deleteSchema = zod.object({
  product_id: zod.string(),
});

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const parsedBody = JSON.parse(req.body as string);
  const validatedBody = deleteSchema.parse(parsedBody);

  if (!validatedBody) {
    return res.status(400).json({ message: "Missing restaurant admin data" });
  }

  const restaurantId = req.params.id;

  if (!restaurantId) {
    return res.status(400).json({ message: "Missing restaurant id" });
  }

  const restaurantModuleService = req.scope.resolve<IRestaurantModuleService>(
    "restaurantModuleService"
  );

  const productModuleService = req.scope.resolve<IProductModuleService>(
    "productModuleService"
  );

  await productModuleService.deleteProducts([validatedBody.product_id]);

  await restaurantModuleService.deleteRestaurantProducts({
    restaurant_id: restaurantId,
    product_id: validatedBody.product_id,
  });

  return res.status(200);
}
