import { AuthenticatedMedusaRequest } from "@medusajs/medusa"

export interface ResAdminScopedMedusaRequest
  extends AuthenticatedMedusaRequest {
  restaurant_admin_id: string
}
