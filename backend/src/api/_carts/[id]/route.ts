import { CartModuleService } from "@medusajs/cart/dist/services"
import {
  LineItemService,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa"
import { ProductModuleService } from "@medusajs/product"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({ message: "Missing cart id" })
  }

  const cartService = req.scope.resolve<CartModuleService>("cartModuleService")

  const productService = req.scope.resolve<ProductModuleService>(
    "productModuleService"
  )

  try {
    const cart = await cartService.retrieve(id, {
      relations: ["items"],
    })

    console.log({ items: cart.items })

    return res.status(200).json({ cart })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { product_id, quantity } = JSON.parse(req.body) as {
    product_id: string
    quantity: number
  }

  const cartId = req.params.id

  const cartService = req.scope.resolve<CartModuleService>("cartModuleService")
  const productService = req.scope.resolve<ProductModuleService>(
    "productModuleService"
  )

  const product = await productService.retrieve(product_id)

  try {
    const cart = await cartService.addLineItems(cartId, [
      {
        title: product.title,
        thumbnail: product.thumbnail || undefined,
        product_description: product.description || undefined,
        unit_price: 100,
        product_id,
        quantity,
      },
    ])

    return res.status(200).json({ cart })
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ message: error.message })
  }
}
