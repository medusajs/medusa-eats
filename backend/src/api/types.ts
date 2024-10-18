import { AuthenticatedMedusaRequest } from "@medusajs/framework";

export interface AuthUserScopedMedusaRequest
  extends AuthenticatedMedusaRequest {
  auth_user_id: string;
}
