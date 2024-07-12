import loaders from "@medusajs/medusa/dist/loaders";
import {
  CreateProductDTO,
  IProductModuleService,
  IRegionModuleService,
} from "@medusajs/types";
import { ModuleRegistrationName } from "@medusajs/utils";
import dotenv from "dotenv";
import express from "express";
import { IRestaurantModuleService } from "../../src/types/restaurant/common";
import seedData from "../../data/seed-data.json";
import { createVariantPriceSet } from "../../src/utils";

dotenv.config();
const directory = process.cwd();

const seed = async function () {
  const app = express();

  const { container } = await loaders({
    directory,
    expressApp: app as any,
  });

  const regions = await container
    .resolve<IRegionModuleService>(ModuleRegistrationName.REGION)
    .createRegions(seedData.regions);

  const restaurantModuleService = container.resolve<IRestaurantModuleService>(
    "restaurantModuleService"
  );

  const restaurant = await restaurantModuleService.createRestaurants(
    seedData.restaurant
  );

  const productModule = container.resolve<IProductModuleService>(
    ModuleRegistrationName.PRODUCT
  );

  const categories = await productModule.createProductCategories(
    seedData.categories
  );

  const productData = [] as CreateProductDTO[];

  seedData.products.forEach((product) => {
    const { id } = categories.find((c) => c.handle === product.category);
    delete product.category;
    productData.push({
      ...product,
      variants: [
        {
          title: product.title,
          manage_inventory: false,
        },
      ],
      category_ids: [id],
      status: "published",
    });
  });

  const products = await productModule.createProducts(productData);

  for (const product of products) {
    await createVariantPriceSet({
      container,
      variantId: product.variants[0].id,
      prices: [
        {
          amount: 1000, // Default price amount, replace if needed
          currency_code: "usd",
        },
      ],
    });
  }

  const restaurantProducts = products.map((p) => ({
    restaurant_id: restaurant.id,
    product_id: p.id,
  }));

  await restaurantModuleService.createRestaurantProducts(restaurantProducts);
};

export default seed;
