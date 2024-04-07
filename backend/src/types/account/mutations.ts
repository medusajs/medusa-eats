export interface CreateUserDTO {
  email: string
  first_name?: string
  last_name?: string
}

export interface CreateAccountDTO {
  name: string
  billing_email: string
}

export interface CreateAccountInviteDTO {
  account_id: string
  role?: string | null
  email?: string
}

export interface CreateAccountUserDTO {
  account_id: string
  user_id: string
  role?: string | null
}
