import type { IWorkflowEngineService } from "@medusajs/workflows-sdk"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { MedusaResponse } from "@medusajs/medusa"
import { buildProjectEnvironmentId } from "../../../../../../../workflows/project/trigger-build"
import ProjectModuleService from "../../../../../../../modules/project/service"
import { AccountScopedMedusaRequest } from "src/api/v1/types"

export const POST = async (
  req: AccountScopedMedusaRequest,
  res: MedusaResponse
) => {
  const { account_id: accountId, euser_id: userId } = req

  const { proj_id, env_id } = req.params
  const service = req.scope.resolve<ProjectModuleService>(
    "projectModuleService"
  )

  const environment = await service.retrieveEnvironmentByAliasOrId(
    proj_id,
    env_id,
    accountId,
    { select: ["id"] }
  )

  const workflowEngine = req.scope.resolve<IWorkflowEngineService>(
    ModuleRegistrationName.WORKFLOW_ENGINE
  )

  const result = await workflowEngine.run(buildProjectEnvironmentId, {
    container: req.scope,
    context: { requestId: req.requestId },
    input: {
      environment_id: environment.id,
      created_by: userId,
    },
  })

  res.status(200).json({ build: result.result })
}

export const GET = async (
  req: AccountScopedMedusaRequest,
  res: MedusaResponse
) => {
  const { account_id: accountId } = req
  const service = req.scope.resolve<ProjectModuleService>(
    "projectModuleService"
  )

  const { proj_id, env_id } = req.params
  const environment = await service.retrieveEnvironmentByAliasOrId(
    proj_id,
    env_id,
    accountId,
    { select: ["id"] }
  )

  const [builds, count] = await service.listAndCountBuilds({
    environment_id: environment.id,
  })

  res.status(200).json({ builds, count })
}
