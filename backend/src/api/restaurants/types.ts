import { AuthenticatedMedusaRequest } from "@medusajs/medusa"

export interface AuthUserScopedMedusaRequest
  extends AuthenticatedMedusaRequest {
  auth_user_id: string
}
