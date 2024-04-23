import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import DeliveryModuleService from "../../modules/delivery/service"
import zod from "zod"

const schema = zod.object({
  first_name: zod.string(),
  last_name: zod.string(),
  email: zod.string(),
  phone: zod.string(),
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

  try {
    const driver = await deliveryModuleService.createDriver({
      ...validatedBody,
    })

    return res.status(200).json({ driver: driver })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const deliveryModuleService = req.scope.resolve<DeliveryModuleService>(
    "deliveryModuleService"
  )

  try {
    const drivers = await deliveryModuleService.listDrivers()
    return res.status(200).json({ drivers })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
