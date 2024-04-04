import zod from "zod"
import { MedusaResponse } from "@medusajs/medusa"
import { createProjectWorkflowId } from "../../../workflows/project/create-project"
import ProjectModuleService from "../../../modules/project/service"
import { AccountScopedMedusaRequest } from "../types"
import { IWorkflowEngineService } from "@medusajs/workflows-sdk"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"

const DEFAULT_REGION = "eu-central-1"

const schema = zod
  .object({
    name: zod.string(),
    github_data: zod.object({
      owner: zod.string(),
      repo: zod.string(),
    }),
    region: zod.string().optional(),
  })
  .required({ name: true, github_data: true, account_id: true })

export const POST = async (
  req: AccountScopedMedusaRequest,
  res: MedusaResponse
) => {
  const { euser_id: userId, account_id } = req

  const validatedBody = schema.parse(req.body)

  const wfe = req.scope.resolve<IWorkflowEngineService>(
    ModuleRegistrationName.WORKFLOW_ENGINE
  )

  const { acknowledgement, errors, result } = await wfe.run(
    createProjectWorkflowId,
    {
      container: req.scope,
      context: { requestId: req.requestId },
      input: {
        project: {
          name: validatedBody.name,
          source_data: validatedBody.github_data,
          created_by: userId,
          account_id,
        },
        auth_user_id: userId,
        region: validatedBody.region ?? DEFAULT_REGION,
      },
      throwOnError: false,
    }
  )

  if (Array.isArray(errors) && errors[0]) {
    throw (errors[0] as any).error
  }

  const service = req.scope.resolve<ProjectModuleService>(
    "projectModuleService"
  )

  const project = await service.retrieve(result.id, {
    relations: ["environments"],
  })

  res.status(200).json({
    project,
    transaction_id: (acknowledgement as any).transactionId,
  })
}

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
