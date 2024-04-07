import { createStep, StepResponse } from "@medusajs/workflows-sdk"
import PulumiService from "../../../modules/pulumi/service"

type BuildCredentials = {
  stack_name: string
  github_credentials: Record<string, any>
  commit_hash: string
}

export const triggerPulumiBuildId = "build-project-environment-step"
export const triggerPulumiBuildStep = createStep(
  triggerPulumiBuildId,
  async (input: BuildCredentials, { container, context }) => {
    const pulumiService = container.resolve<PulumiService>(
      "pulumiModuleService"
    )

    const buildResult = await pulumiService.triggerCodeBuild(
      input.stack_name,
      input.github_credentials.repository,
      input.github_credentials.token,
      input.commit_hash,
      context.transactionId
    )

    return new StepResponse(buildResult.build)
  }
)
