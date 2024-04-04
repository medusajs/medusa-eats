import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { ICacheService } from "@medusajs/types"
import zod from "zod"

const schema = zod
  .object({
    token: zod.string(),
  })
  .required()

export const POST = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  // Get jwt bearer token from header
  const token = req?.headers?.authorization?.split(" ")[1]

  if (!token) {
    return res.sendStatus(401)
  }

  const cacheService = req.scope.resolve<ICacheService>("cacheService")
  const validatedBody = schema.parse(req.body)
  const cacheKey = `cli-token:${validatedBody.token}`

  await cacheService.set(cacheKey, token, 60 * 60)

  res.sendStatus(200)
}
