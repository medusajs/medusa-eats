export interface BuildDTO {
  id: string
  commit_hash: string
  external_build_id: string | null
  transaction_id: string
  environment_id: string
  project?: ProjectEnvironmentDTO
  started_at: Date | null
  canceled_at: Date | null
  succeeded_at: Date | null
  failed_at: Date | null
  metadata: Record<string, unknown> | null
  created_at: Date
  created_by: string
  deleted_at: Date | null
}

export interface ProjectDTO {
  id: string
  name: string
  alias: string
  source_data: Record<string, any>
  external_source_id: string | null
  account_id: string
  environments?: ProjectEnvironmentDTO[]
  created_at: Date
  updated_at: Date
  created_by: string | null
  deleted_at: Date | null
}

export interface ProjectEnvironmentDTO {
  id: string
  alias: string
  type: "prod" | "dev"
  region: string
  domain?: string | null
  account_id: string
  project_id: string
  project?: ProjectDTO
  deployed_build_id: string | null
  deployed_build?: BuildDTO
  rules: Record<string, any>
  variables?: EnvironmentVariableDTO[]
  first_build_completed_at: Date | null
  infra_ready_at: Date | null
  created_at: Date
  created_by: string | null
  deleted_at: Date | null
}

export interface EnvironmentVariableDTO {
  id: string
  key: string
  value: string
  environment_id: string
  environment?: ProjectEnvironmentDTO
  created_at: Date
  created_by: string | null
  deleted_at: Date | null
}
