import { createStep, StepResponse } from "@medusajs/workflows-sdk"
import ProjectModuleService from "../../../modules/project/service"
import GithubModuleService from "../../../modules/github/service"

type CollectCredentialsInput = {
  environment_id: string
  created_by: string
}

export const collectProjectCredentialsId = "collect-project-credentials-step"
export const collectProjectCredentials = createStep(
  collectProjectCredentialsId,
  async (input: CollectCredentialsInput, { container }) => {
    const projectService = container.resolve<ProjectModuleService>(
      "projectModuleService"
    )

    const environment = await projectService.retrieveProjectEnvironment(
      input.environment_id,
      { relations: ["project"] }
    )

    const githubService = container.resolve<GithubModuleService>(
      "githubModuleService"
    )

    const project = environment.project!
    const githubToken = await githubService.getAccessToken(
      project.source_data.owner,
      project.source_data.repo
    )

    return new StepResponse({
      github_credentials: {
        token: githubToken.token,
        repository: `${project.source_data.owner}/${project.source_data.repo}`,
      },
      environment_variables: environment.variables,
      type: environment.type,
    })
  }
)
