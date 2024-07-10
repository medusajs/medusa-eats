import loaders from "@medusajs/medusa/dist/loaders";
import { ModuleRegistrationName } from "@medusajs/utils";
import { IProductModuleService } from "@medusajs/types";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const seedProducts = async function ({ directory }) {
  const app = express();

  const { container } = await loaders({
    directory,
    expressApp: app as any,
  });

  const productModule: IProductModuleService = container.resolve(
    ModuleRegistrationName.PRODUCT
  );

  await productModule.createProducts([
    {
      title: "Test product",
      variants: [
        {
          title: "Test variant",
        },
      ],
    },
  ]);
};

seedProducts({ directory: process.cwd() });
