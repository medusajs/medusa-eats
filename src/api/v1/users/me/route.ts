import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/medusa"
import AccountModuleService from "../../../../modules/account/service"

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const euserId = req.auth.app_metadata.euser_id

  const service = req.scope.resolve<AccountModuleService>(
    "accountModuleService"
  )

  const user = await service.retrieveUser(euserId)

  res.json({ user })
}
