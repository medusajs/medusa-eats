import { createStep } from "@medusajs/workflows-sdk"
import ProjectModuleService from "../../../modules/project/service"
import PulumiModuleService from "../../../modules/pulumi/service"
import { buildStackName } from "../../../utils"

type GetStackNameInput = {
  environment_id: string
  build_id?: string
}

const MEDUSA_CLOUD_DOMAIN =
  process.env.MEDUSA_CLOUD_DOMAIN || "dev.medusajs.app"

export const recordInfraInEnvironment = createStep(
  { name: "record-infra-in-environment", maxRetries: 2 },
  async (input: GetStackNameInput, { container }) => {
    const pulumiService = container.resolve<PulumiModuleService>(
      "pulumiModuleService"
    )
    const projectService = container.resolve<ProjectModuleService>(
      "projectModuleService"
    )

    const env = await projectService.retrieveProjectEnvironment(
      input.environment_id,
      { relations: ["project"] }
    )

    const projectName = buildStackName(env.project!, env)

    const appStackOutputs =
      await pulumiService.retrieveAppStackOutputs(projectName)

    await projectService.updateEnvironment(env.id, {
      domain: `${appStackOutputs.subdomain.value}.${MEDUSA_CLOUD_DOMAIN}`,
      deployed_build_id: input.build_id,
    })
  }
)
