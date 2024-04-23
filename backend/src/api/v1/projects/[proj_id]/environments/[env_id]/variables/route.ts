import type { IWorkflowEngineService } from "@medusajs/workflows-sdk"
import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/medusa"
import zod from "zod"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { setEnvironmentVariableWorkflowId } from "../../../../../../../workflows/project/set-environment-variable"
import ProjectModuleService from "../../../../../../../modules/project/service"
import { AccountScopedMedusaRequest } from "../../../../../types"

const schema = zod
  .object({
    key: zod.string(),
    value: zod.string(),
  })
  .required()

export const POST = async (
  req: AccountScopedMedusaRequest,
  res: MedusaResponse
) => {
  const { account_id } = req
  const { proj_id, env_id } = req.params
  const projectService = req.scope.resolve<ProjectModuleService>(
    "projectModuleService"
  )

  const environment = await projectService.retrieveEnvironmentByAliasOrId(
    proj_id,
    env_id,
    account_id
  )

  const validatedBody = schema.parse(req.body)

  const workflowEngine = req.scope.resolve<IWorkflowEngineService>(
    ModuleRegistrationName.WORKFLOW_ENGINE
  )

  const { acknowledgement } = await workflowEngine.run(
    setEnvironmentVariableWorkflowId,
    {
      container: req.scope,
      context: { requestId: req.requestId },
      // throwOnError: false,
      input: {
        environment_id: environment.id,
        data: validatedBody,
      },
    }
  )

  res.status(200).json({ transaction: acknowledgement })
}

export const GET = async (
  req: AccountScopedMedusaRequest,
  res: MedusaResponse
) => {
  const accountId = req.account_id
  const { proj_id, env_id } = req.params
  const projectService = req.scope.resolve<ProjectModuleService>(
    "projectModuleService"
  )

  const environment = await projectService.retrieveEnvironmentByAliasOrId(
    proj_id,
    env_id,
    accountId
  )

  const variables = await projectService.listEnvironmentVariables({
    environment_id: environment.id,
  })

  res.status(200).json({ variables })
}
