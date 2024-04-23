import type { IWorkflowEngineService } from "@medusajs/workflows-sdk"
import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import ProjectModuleService from "../../../../../../../../modules/project/service"
import { deleteEnvironmentVariableWorkflowId } from "../../../../../../../../workflows/project/delete-environment-variable"
import { AccountScopedMedusaRequest } from "../../../../../../types"

export const GET = async (
  req: AccountScopedMedusaRequest,
  res: MedusaResponse
) => {
  const accountId = req.account_id
  const { proj_id, env_id, key } = req.params
  const projectService = req.scope.resolve<ProjectModuleService>(
    "projectModuleService"
  )

  const environment = await projectService.retrieveEnvironmentByAliasOrId(
    proj_id,
    env_id,
    accountId
  )

  const [variable] = await projectService.listEnvironmentVariables({
    environment_id: environment.id,
    key: key.toUpperCase(),
  })

  res.status(200).json({ variable })
}

export const DELETE = async (
  req: AccountScopedMedusaRequest,
  res: MedusaResponse
) => {
  const accountId = req.account_id
  const { proj_id, env_id, key } = req.params
  const projectService = req.scope.resolve<ProjectModuleService>(
    "projectModuleService"
  )

  const environment = await projectService.retrieveEnvironmentByAliasOrId(
    proj_id,
    env_id,
    accountId
  )

  const workflowEngine = req.scope.resolve<IWorkflowEngineService>(
    ModuleRegistrationName.WORKFLOW_ENGINE
  )

  const { acknowledgement } = await workflowEngine.run(
    deleteEnvironmentVariableWorkflowId,
    {
      container: req.scope,
      context: { requestId: req.requestId },
      throwOnError: false,
      input: {
        environment_id: environment.id,
        key,
      },
    }
  )

  res.status(200).json({ transaction: acknowledgement })
}
