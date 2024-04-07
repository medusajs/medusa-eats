import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { ICacheService } from "@medusajs/types"
import zod from "zod"

const schema = zod
  .object({
    token: zod.string(),
  })
  .required()

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const cacheService = req.scope.resolve<ICacheService>("cacheService")
  const validatedBody = schema.parse(req.body)
  const cacheKey = `cli-token:${validatedBody.token}`

  const authToken = await cacheService.get(cacheKey)

  if (!authToken) {
    return res.sendStatus(404)
  }

  await cacheService.invalidate(cacheKey)

  res.status(200).json({ token: authToken })
}
