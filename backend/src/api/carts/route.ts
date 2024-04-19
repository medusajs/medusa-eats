import { CartModuleService } from "@medusajs/cart/dist/services"
import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { CartTypes } from "@medusajs/types"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const parsedBody = req.body as CartTypes.CreateCartDTO

  console.log({ parsedBody })

  if (!parsedBody) {
    return res.status(400).json({ message: "Missing cart data" })
  }

  const cartService = req.scope.resolve<CartModuleService>("cartModuleService")

  try {
    console.log("Creating cart in POST /carts route...")
    const carts = await cartService.create([
      {
        ...parsedBody,
        currency_code: "USD",
      },
    ])

    console.log({ carts })

    return res.status(200).json({ carts })
  } catch (error) {
    console.log("Error from POST /carts route", error)
    return res.status(500).json({ message: error.message })
  }
}
