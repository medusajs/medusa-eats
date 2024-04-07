import { AuthenticatedMedusaRequest } from "@medusajs/medusa"
import { AccountDTO } from "../../types/account/common"

export interface AccountScopedMedusaRequest extends AuthenticatedMedusaRequest {
  euser_id: string
  account: AccountDTO
  account_id: string
}
