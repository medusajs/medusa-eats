import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import DeliveryModuleService from "src/modules/delivery/service"
import { handleDeliveryWorkflow } from "../../workflows/delivery/handle-delivery"
import zod from "zod"
import { DeliveryItemDTO } from "../../types/delivery/common"

const schema = zod.object({
  cart_id: zod.string().startsWith("cart_"),
  restaurant_id: zod.string(),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = schema.parse(req.body)

  if (!validatedBody) {
    return res.status(400).json({ message: "Missing delivery data" })
  }

  if (!validatedBody.cart_id) {
    return res.status(400).json({ message: "Missing cart id" })
  }

  try {
    const restaurantDelivery = await handleDeliveryWorkflow(req.scope).run({
      input: {
        delivery_input: {
          restaurant_id: validatedBody.restaurant_id,
          cart_id: validatedBody.cart_id,
        },
        auth_user_id: req.user?.id,
      },
    })

    return res.status(200).json({ restaurant_delivery: restaurantDelivery })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const deliveryModuleService = req.scope.resolve<DeliveryModuleService>(
    "deliveryModuleService"
  )

  const restaurantId = req.query.restaurant_id as string
  let filter = {}

  if (restaurantId) {
    filter = { restaurant_id: restaurantId }
  }

  try {
    const deliveries = await deliveryModuleService.listDeliveries(filter)

    for (const delivery of deliveries) {
      const items = [] as DeliveryItemDTO[]

      if (delivery.cart_id) {
        const cartService = req.scope.resolve("cartModuleService")
        const cart = await cartService.retrieve(delivery.cart_id, {
          relations: ["items"],
        })
        items.push(...cart.items)
      }

      if (delivery.order_id) {
        const orderService = req.scope.resolve("orderModuleService")
        const order = await orderService.retrieve(delivery.order_id, {
          relations: ["items"],
        })
        items.push(...order.items)
      }

      delivery.items = items
    }

    return res.status(200).json({ deliveries })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
