import { randomUUID } from "crypto"
import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const tokenId = randomUUID()
  res.status(200).json({ token: tokenId })
}
