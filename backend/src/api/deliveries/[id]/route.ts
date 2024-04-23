import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import DeliveryModuleService from "../../../modules/delivery/service"
import { DeliveryStatus, DeliveryItemDTO } from "../../../types/delivery/common"
import { UpdateDeliveryDTO } from "../../../types/delivery/mutations"
import zod from "zod"

const schema = zod.object({
  driver_id: zod.string().optional(),
  notified_driver_ids: zod.array(zod.string()).optional(),
  order_id: zod.string().optional(),
  delivery_status: zod.nativeEnum(DeliveryStatus).optional(),
  eta: zod.date().optional(),
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

  const deliveryId = req.params.id

  if (!deliveryId) {
    return res.status(400).json({ message: "Missing delivery id" })
  }

  const deliveryModuleService = req.scope.resolve<DeliveryModuleService>(
    "deliveryModuleService"
  )

  const updateData: UpdateDeliveryDTO = {
    ...validatedBody,
  }

  if (validatedBody.order_id) {
    // If an order is assigned to the delivery, remove the cart_id as it is no longer relevant.
    updateData.cart_id = null
  }

  if (validatedBody.delivery_status === "delivered") {
    updateData.delivered_at = new Date()
  }

  try {
    const delivery = await deliveryModuleService.updateDelivery(
      deliveryId,
      updateData
    )

    return res.status(200).json({ delivery })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const deliveryId = req.params.id

  if (!deliveryId) {
    return res.status(400).json({ message: "Missing delivery id" })
  }

  const deliveryModuleService = req.scope.resolve<DeliveryModuleService>(
    "deliveryModuleService"
  )

  const delivery = await deliveryModuleService.retrieveDelivery(deliveryId)

  if (!delivery) {
    return res.status(404).json({ message: "Delivery not found" })
  }

  try {
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

    return res.status(200).json({ delivery })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
