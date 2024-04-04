import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/medusa"
import AccountModuleService from "../../../../modules/account/service"
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
  const userId = req.auth?.app_metadata?.euser_id

  const validatedBody = schema.parse(req.body)

  const service = req.scope.resolve<AccountModuleService>(
    "accountModuleService"
  )

  const accountUser = await service.acceptInvite(validatedBody.token, userId)

  res.status(200).json({ account_id: accountUser.account_id })
}
