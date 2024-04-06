import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import DeliveryModuleService from "src/modules/delivery/service"
import { DeliveryDTO } from "src/types/delivery/common"
import zod from "zod"

const schema = zod.object({
  driver_id: zod.string().optional(),
  order_id: zod.string().optional(),
  delivery_status: zod.enum([
    "pending",
    "preparing",
    "ready_for_pickup",
    "in_transit",
    "delivered",
  ]),
  delivery_address: zod.string().optional(),
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

  const deliveryId = req.params.deliveryId

  if (!deliveryId) {
    return res.status(400).json({ message: "Missing delivery id" })
  }

  const deliveryModuleService = req.scope.resolve<DeliveryModuleService>(
    "deliveryModuleService"
  )

  const updateData: Partial<DeliveryDTO> = {
    ...validatedBody,
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
