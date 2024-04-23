import type { IWorkflowEngineService } from "@medusajs/workflows-sdk"
import { MedusaResponse } from "@medusajs/medusa"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import zod from "zod"
import ProjectModuleService from "../../../../../../modules/project/service"
import { updateProjectEnvironmentId } from "../../../../../../workflows/project/update-environment"
import { AccountScopedMedusaRequest } from "../../../../types"

const schema = zod
  .object({
    rules: zod.object({
      branch: zod.string(),
    }),
    variables: zod.array(
      zod.object({
        key: zod.string(),
        value: zod.string(),
      })
    ),
  })
  .required()

export const POST = async (
  req: AccountScopedMedusaRequest,
  res: MedusaResponse
) => {
  const { account_id } = req
  const { proj_id, env_id } = req.params

  const projService = req.scope.resolve<ProjectModuleService>(
    "projectModuleService"
  )

  const environment = await projService.retrieveEnvironmentByAliasOrId(
    proj_id,
    env_id,
    account_id,
    { select: ["id"] }
  )

  const validatedBody = schema.parse(req.body)

  const workflowEngine = req.scope.resolve<IWorkflowEngineService>(
    ModuleRegistrationName.WORKFLOW_ENGINE
  )

  const { acknowledgement } = await workflowEngine.run(
    updateProjectEnvironmentId,
    {
      container: req.scope,
      context: { requestId: req.requestId },
      throwOnError: false,
      input: {
        environment_id: environment.id,
        data: validatedBody,
      },
    }
  )

  res.status(200).json({ transaction: acknowledgement })
}
