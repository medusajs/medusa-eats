import { authenticate } from "@medusajs/medusa/dist/utils/authenticate-middleware"
import { AuthUserScopedMedusaRequest } from "./types"
import { NextFunction, Response } from "express"
import { MiddlewareRoute } from "@medusajs/medusa"

const isAdmin = (
  req: AuthUserScopedMedusaRequest,
  res: Response,
  next: NextFunction
) => {
  const resAdmId = req.auth?.app_metadata?.restaurant_admin_id

  if (!resAdmId) {
    return res.status(403).json({ message: "Unauthorized" })
  }

  req.auth_user_id = resAdmId

  console.log("isAdmin middleware", resAdmId)

  return next()
}

const logger = (
  req: AuthUserScopedMedusaRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("restaurant admin middleware", req)

  return next()
}

export const restaurantAdminMiddlewares: MiddlewareRoute[] = [
  {
    method: ["POST"],
    matcher: "/restaurants/:id/products",
    middlewares: [authenticate("restaurant", "bearer")],
  },
]
