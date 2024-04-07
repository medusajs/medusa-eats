import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { CartModuleService } from "@medusajs/cart/dist/services"
import DeliveryModuleService from "src/modules/delivery/service"
import RestaurantModuleService from "src/modules/restaurant/service"
import zod from "zod"

const schema = zod.object({
  cart_id: zod.string().startsWith("cart_"),
  delivery_address: zod.string(),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = schema.parse(req.body)

  if (!validatedBody) {
    return res.status(400).json({ message: "Missing delivery data" })
  }

  const restaurantId = req.params.id

  if (!restaurantId) {
    return res.status(400).json({ message: "Missing restaurant id" })
  }

  const restaurantModuleService = req.scope.resolve<RestaurantModuleService>(
    "restaurantModuleService"
  )

  const restaurant =
    await restaurantModuleService.retrieveRestaurant(restaurantId)

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" })
  }

  const cartModuleService =
    req.scope.resolve<CartModuleService>("cartModuleService")

  const cart = await cartModuleService.retrieve(validatedBody.cart_id)

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" })
  }

  const deliveryModuleService = req.scope.resolve<DeliveryModuleService>(
    "deliveryModuleService"
  )

  try {
    const restaurantDelivery = await deliveryModuleService.createDelivery({
      restaurant_id: restaurantId,
      cart_id: validatedBody.cart_id,
      delivery_address: validatedBody.delivery_address,
    })

    console.log(restaurantDelivery)

    return res.status(200).json({ restaurant_delivery: restaurantDelivery })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const deliveryModuleService = req.scope.resolve<DeliveryModuleService>(
    "deliveryModuleService"
  )

  const restaurantId = req.params.id

  if (!restaurantId) {
    return res.status(400).json({ message: "Missing restaurant id" })
  }

  try {
    const deliveries = await deliveryModuleService.listDeliveries({
      // restaurant_id: restaurantId,
    })

    return res.status(200).json({ deliveries })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
