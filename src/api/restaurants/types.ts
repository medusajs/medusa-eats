import { AuthenticatedMedusaRequest } from "@medusajs/medusa"

export interface ResAdminScopedMedusaRequest
  extends AuthenticatedMedusaRequest {
  resadm_id: string
}
