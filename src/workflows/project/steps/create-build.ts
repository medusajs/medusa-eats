import { createStep, StepResponse } from "@medusajs/workflows-sdk"
import ProjectModuleService from "../../../modules/project/service"

type CreateBuildInput = {
  created_by: string
  environment_id: string
  build_arn: string
  commit_hash: string
  metadata?: Record<string, unknown>
}

export const createBuildStepId = "create-build-step"
export const createBuild = createStep(
  createBuildStepId,
  async (input: CreateBuildInput, { container, context }) => {
    const projectService = container.resolve<ProjectModuleService>(
      "projectModuleService"
    )

    const build = await projectService.createBuild({
      environment_id: input.environment_id,
      external_build_id: input.build_arn,
      transaction_id: context.transactionId ?? "",
      commit_hash: input.commit_hash,
      created_by: input.created_by,
      metadata: input.metadata ?? {},
    })

    console.log(build)

    return new StepResponse(build)
  }
)
