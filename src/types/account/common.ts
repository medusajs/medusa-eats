export interface AccountDTO {
  id: string
  name: string
  billing_email: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}

export interface AccountUserDTO {
  id: string
  user_id: string
  account_id: string
  role: string | null
  metadata: Record<string, unknown> | null
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
  created_by: string | null
}

export interface InviteDTO {
  id: string
  account_id: string
  role: string | null
  token: string
  email: string | null
  expires_at: Date
  accepted_at: Date | null
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}

export interface UserDTO {
  id: string
  first_name: string
  last_name: string
  email: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}
