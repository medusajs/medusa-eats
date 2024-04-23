import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import DeliveryModuleService from "../../../modules/delivery/service"
import zod from "zod"

const schema = zod.object({
  first_name: zod.string().optional(),
  last_name: zod.string().optional(),
  email: zod.string().optional(),
  phone: zod.string().optional(),
  avatar_url: zod.string().optional(),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = schema.parse(req.body)

  if (!validatedBody) {
    return res.status(400).json({ message: "Missing driver data" })
  }

  const deliveryModuleService = req.scope.resolve<DeliveryModuleService>(
    "deliveryModuleService"
  )

  const driverId = req.params.id

  if (!driverId) {
    return res.status(400).json({ message: "Missing driver id" })
  }

  try {
    const driver = await deliveryModuleService.updateDriver(driverId, {
      ...validatedBody,
    })

    return res.status(200).json({ driver })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const driverId = req.params.id

  if (!driverId) {
    return res.status(400).json({ message: "Missing driver id" })
  }

  const deliveryModuleService = req.scope.resolve<DeliveryModuleService>(
    "deliveryModuleService"
  )

  try {
    const driver = await deliveryModuleService.retrieveDriver(driverId)

    return res.status(200).json({ driver })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const driverId = req.params.id

  if (!driverId) {
    return res.status(400).json({ message: "Missing driver id" })
  }

  const deliveryModuleService = req.scope.resolve<DeliveryModuleService>(
    "deliveryModuleService"
  )

  try {
    await deliveryModuleService.deleteDriver(driverId)

    return res.status(200).json({ message: "Driver deleted" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
