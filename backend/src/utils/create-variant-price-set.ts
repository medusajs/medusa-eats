import { MedusaContainer, Modules } from "@medusajs/modules-sdk"
import {
  CreatePriceSetDTO,
  IPricingModuleService,
  PriceSetDTO,
} from "@medusajs/types"

export const createVariantPriceSet = async ({
  container,
  variantId,
  prices,
  rules,
}: {
  container: MedusaContainer
  variantId: string
  prices: CreatePriceSetDTO["prices"]
  rules: CreatePriceSetDTO["rules"]
}): Promise<PriceSetDTO> => {
  const remoteLink = container.resolve("remoteLink")
  const pricingModuleService: IPricingModuleService = container.resolve(
    "pricingModuleService"
  )

  const priceSet = await pricingModuleService.create({
    rules,
    prices,
  })

  await remoteLink.create({
    [Modules.PRODUCT]: { variant_id: variantId },
    [Modules.PRICING]: { price_set_id: priceSet.id },
  })

  return await pricingModuleService.retrieve(priceSet.id, {
    relations: ["prices"],
  })
}
