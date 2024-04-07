import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { buildProjectEnvironmentId } from "../../../../workflows/project/trigger-build"
import ProjectModuleService from "../../../../modules/project/service"
import { IWorkflowEngineService } from "@medusajs/workflows-sdk"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const installationId = req.body.installation.id

  const logger = req.scope.resolve("logger")

  const projectService = req.scope.resolve<ProjectModuleService>(
    "projectModuleService"
  )

  const workflowEngine = req.scope.resolve<IWorkflowEngineService>(
    ModuleRegistrationName.WORKFLOW_ENGINE
  )

  const projects = await projectService.list(
    { external_source_id: `${installationId}` },
    { relations: ["environments"] }
  )

  logger.info(
    `Found ${projects.length} projects for installation ${installationId}`
  )
  for (const project of projects) {
    for (const environment of project.environments ?? []) {
      // Current push branch
      const commitBranch = req.body.ref.split("/").pop()
      if (environment.rules.branch === commitBranch) {
        logger.info(
          `Found matching environment ${environment.id} for project ${project.id}`
        )
        workflowEngine.run(buildProjectEnvironmentId, {
          container: req.scope,
          context: { requestId: req.requestId },
          throwOnError: false,
          input: {
            commit_ref: req.body.ref,
            environment_id: environment.id,
            created_by: "github-push",
          },
        })
      }
    }
  }

  res.sendStatus(200)
}
