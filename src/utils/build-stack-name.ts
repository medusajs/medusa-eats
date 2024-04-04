import { ProjectDTO, ProjectEnvironmentDTO } from "../types/project/common"

export function buildStackName(
  project: ProjectDTO,
  environment: ProjectEnvironmentDTO
) {
  const extract = (str: string) => str.slice(-6).toLowerCase()
  return `s${extract(project.account_id)}${extract(environment.id)}`
}
