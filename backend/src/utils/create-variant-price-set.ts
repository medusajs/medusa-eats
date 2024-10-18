import { MedusaContainer } from "@medusajs/framework";
import {
  CreatePriceSetDTO,
  IPricingModuleService,
  PriceSetDTO,
} from "@medusajs/types";
import { Modules, remoteQueryObjectFromString } from "@medusajs/utils";

export const createVariantPriceSet = async ({
  container,
  variantId,
  prices,
}: {
  container: MedusaContainer;
  variantId: string;
  prices: CreatePriceSetDTO["prices"];
}): Promise<PriceSetDTO> => {
  const remoteLink = container.resolve("remoteLink");
  const remoteQuery = container.resolve("remoteQuery");
  const pricingModuleService: IPricingModuleService = container.resolve(
    "pricingModuleService"
  );

  const priceSet = await pricingModuleService.createPriceSets({
    prices,
  });

  await remoteLink.create({
    [Modules.PRODUCT]: { variant_id: variantId },
    [Modules.PRICING]: { price_set_id: priceSet.id },
  });

  const pricingQuery = remoteQueryObjectFromString({
    entryPoint: "price",
    fields: ["*"],
    variables: {
      filters: {
        id: priceSet.id,
      },
    },
  });

  return await remoteQuery(pricingQuery);
};
