import { createStep, StepResponse } from "@medusajs/workflows-sdk"
import ProjectModuleService from "../../../modules/project/service"
import GithubModuleService from "../../../modules/github/service"
import { MedusaError } from "@medusajs/utils"

type ValidateOrGetCommitHashInput = {
  environment_id: string
  commit_ref?: string
}

export const validateOrGetLatestCommitHashId =
  "validate-or-get-latest-commit-hash"
export const validateOrGetLatestCommitHash = createStep(
  validateOrGetLatestCommitHashId,
  async (input: ValidateOrGetCommitHashInput, { container }) => {
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
    const ref = input.commit_ref || environment.rules.branch

    try {
      const commitHash = await githubService.getCommitHash(
        project.source_data.owner,
        project.source_data.repo,
        ref
      )

      return new StepResponse(commitHash.sha)
    } catch (error) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Commit hash not found for ref ${ref}`
      )
    }
  }
)
