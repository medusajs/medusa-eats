import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import ProjectModuleService from "../../../../modules/project/service"
import { IEventBusService } from "@medusajs/types"
import { AccountScopedMedusaRequest } from "../../types"

export const GET = async (
  req: AccountScopedMedusaRequest,
  res: MedusaResponse
) => {
  const { account_id } = req
  const { proj_id } = req.params

  const service = req.scope.resolve<ProjectModuleService>(
    "projectModuleService"
  )

  const project = await service.retrieveProjectByAliasOrId(
    proj_id,
    account_id,
    { relations: ["environments"] }
  )

  res.status(200).json({ project })
}

export const DELETE = async (
  req: AccountScopedMedusaRequest,
  res: MedusaResponse
) => {
  const { account_id } = req
  const { proj_id } = req.params

  const projectService = req.scope.resolve<ProjectModuleService>(
    "projectModuleService"
  )

  try {
    const project = await projectService.retrieveProjectByAliasOrId(
      proj_id,
      account_id
    )

    const eventBusModule = req.scope.resolve<IEventBusService>(
      ModuleRegistrationName.EVENT_BUS
    )

    await projectService.softDelete(project.id)

    await eventBusModule.emit("project.deleted", { id: project.id })
  } catch (err) {
    // this is idempotent
  }

  res.status(200).json({ success: true })
}
