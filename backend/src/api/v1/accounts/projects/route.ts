import { MedusaResponse } from "@medusajs/medusa"
import ProjectModuleService from "src/modules/project/service"
import { AccountScopedMedusaRequest } from "../../types"

export const GET = async (
  req: AccountScopedMedusaRequest,
  res: MedusaResponse
) => {
  const { account_id } = req

  const service = req.scope.resolve<ProjectModuleService>(
    "projectModuleService"
  )

  const [projects, count] = await service.listAndCount(
    { account_id },
    { relations: ["environments"] }
  )

  res.status(200).json({ projects, count })
}
