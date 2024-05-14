import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import zod from "zod"
import DeliveryModuleService from "../../modules/delivery/service"
import { DeliveryItemDTO } from "../../types/delivery/common"
import { handleDeliveryWorkflow } from "../../workflows/delivery/handle-delivery"

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
        auth_user_id: req.user?.userId,
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

  const filter = {}

  for (const key in req.query) {
    filter[key] = req.query[key]
  }

  try {
    const deliveries = await deliveryModuleService.listDeliveries(filter, {
      take: 100,
    })

    if (filter.hasOwnProperty("driver_id")) {
      const availableDeliveriesIds =
        await deliveryModuleService.listDeliveryDrivers({
          driver_id: filter["driver_id"],
        })

      const availableDeliveries = await deliveryModuleService.listDeliveries({
        id: availableDeliveriesIds.map((d) => d.delivery_id),
      })

      deliveries.push(...availableDeliveries)
    }

    for (const delivery of deliveries) {
      const items = [] as DeliveryItemDTO[]

      if (delivery.cart_id) {
        const cartService = req.scope.resolve("cartModuleService")
        const cart = await cartService.retrieve(delivery.cart_id, {
          relations: ["items"],
        })
        items.push(...cart.items)
      }

      // if (delivery.order_id) {
      //   const orderService = req.scope.resolve("orderModuleService")
      //   const order = await orderService.retrieve(delivery.order_id, {
      //     relations: ["items"],
      //   })
      //   items.push(...order.items)
      // }

      delivery.items = items
    }

    return res.status(200).json({ deliveries })
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ message: error.message })
  }
}
