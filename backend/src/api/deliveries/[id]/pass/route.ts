import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import DeliveryModuleService from "src/modules/delivery/service"
import zod from "zod"

const schema = zod.object({
  driver_id: zod.string(),
})

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const parsedBody = JSON.parse(req.body)
  const validatedBody = schema.parse(parsedBody)

  if (!validatedBody.driver_id) {
    return res.status(400).json({ message: "Missing driver id" })
  }

  const deliveryId = req.params.id

  if (!deliveryId) {
    return res.status(400).json({ message: "Missing delivery id" })
  }

  const deliveryModuleService = req.scope.resolve<DeliveryModuleService>(
    "deliveryModuleService"
  )

  try {
    await deliveryModuleService.deleteDeliveryDriver({
      delivery_id: deliveryId,
      driver_id: validatedBody.driver_id,
    })

    return res.status(200).json({ message: "Driver declined delivery" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message })
  }
}
