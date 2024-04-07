import { MedusaResponse } from "@medusajs/medusa"
import ProjectModuleService from "../../../modules/project/service"
import { AccountScopedMedusaRequest } from "../types"

export const GET = async (
  req: AccountScopedMedusaRequest,
  res: MedusaResponse
) => {
  const { account_id } = req

  const service = req.scope.resolve<ProjectModuleService>(
    "projectModuleService"
  )

  const [builds, count] = await service.listAndCountBuilds({
    environment: { project: { account_id } },
  })

  res.status(200).json({ builds, count })
}
