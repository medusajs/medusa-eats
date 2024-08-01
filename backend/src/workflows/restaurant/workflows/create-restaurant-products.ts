import { createProductsWorkflow } from "@medusajs/core-flows";
import { CreateProductDTO } from "@medusajs/types";
import {
  WorkflowData,
  WorkflowResponse,
  createWorkflow,
  transform,
} from "@medusajs/workflows-sdk";
import { createRestaurantProductsStep } from "../steps";

type WorkflowInput = {
  products: CreateProductDTO[];
  restaurant_id: string;
};

export const createRestaurantProductsWorkflow = createWorkflow(
  "create-restaurant-products-workflow",
  function (input: WorkflowData<WorkflowInput>) {
    const products = createProductsWorkflow.runAsStep({
      input: {
        products: input.products,
      },
    });

    const product_ids = transform(products, (products) =>
      products.map((product) => product.id)
    );

    const restaurantProduct = createRestaurantProductsStep({
      product_ids,
      restaurant_id: input.restaurant_id,
    });

    return new WorkflowResponse(restaurantProduct);
  }
);
