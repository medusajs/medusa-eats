export interface UpdateBuildDTO {
  started_at?: Date | string
  failed_at?: Date | string
  succeeded_at?: Date | string
  canceled_at?: Date | string
  metadata?: Record<string, unknown>
}

export interface CreateBuildDTO {
  external_build_id: string | null
  transaction_id: string
  environment_id: string
  commit_hash: string
  metadata: Record<string, unknown> | null
  created_by: string
}

export interface CreateProjectDTO {
  name: string
  alias?: string
  external_source_id: string | null
  source_data: Record<string, unknown>
  account_id: string
  created_by: string | null
}

export interface CreateProjectEnvironmentDTO {
  alias?: string
  type: "prod" | "dev"
  domain?: string
  region: string
  created_by?: string | null
  project_id: string
  rules: Record<string, any>
  variables: Record<string, any>
}

export interface UpdateProjectEnvironmentDTO {
  alias?: string
  rules?: Record<string, any>
  variables?: Record<string, any>
  domain?: string
  first_build_completed_at?: Date | string
  infra_ready_at?: Date | string
  deployed_build_id?: string
}
