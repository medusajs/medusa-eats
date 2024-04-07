import { MedusaResponse } from "@medusajs/medusa"
import AccountModuleService from "../../../../modules/account/service"
import zod from "zod"
import { AccountScopedMedusaRequest } from "../../types"

const schema = zod.object({
  email: zod.string().optional(),
  role: zod.string().optional(),
})

export const POST = async (
  req: AccountScopedMedusaRequest,
  res: MedusaResponse
) => {
  const { account_id } = req
  const validatedBody = schema.parse(req.body)

  const service = req.scope.resolve<AccountModuleService>(
    "accountModuleService"
  )

  const invite = await service.createInvite({
    account_id,
    email: validatedBody.email,
    role: validatedBody.role,
  })

  res.status(200).json({ token: invite.token })
}
