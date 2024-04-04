import { MiddlewareRoute } from "@medusajs/medusa"
import { authenticate } from "@medusajs/medusa/dist/utils/authenticate-middleware"
import { NextFunction, Response } from "express"
import AccountModuleService from "../../modules/account/service"
import { AccountScopedMedusaRequest } from "./types"

const isUser = (
  req: AccountScopedMedusaRequest,
  res: Response,
  next: NextFunction
) => {
  const eUserId = req.auth?.app_metadata?.euser_id

  req.euser_id = eUserId

  if (!eUserId) {
    return res.status(403).json({ message: "Unauthorized" })
  }

  return next()
}

const accountHeader = async (
  req: AccountScopedMedusaRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["x-medusa-account"] as string

  if (!header) {
    return res.status(403).json({ message: "Account header missing" })
  }

  const service = req.scope.resolve<AccountModuleService>(
    "accountModuleService"
  )

  const account = await service.retrieveAccount(header).catch(() => null)
  if (!account) {
    return res.status(404).json({ message: "Account not found" })
  }

  req.account_id = account.id
  req.account = account

  const [accountUser] = await service.listAccountUsers({
    account_id: account.id,
    user_id: req.euser_id,
  })

  if (!accountUser) {
    return res.status(403).json({ message: "Unauthorized" })
  }

  return next()
}

export const v1Middlewares: MiddlewareRoute[] = [
  {
    method: ["POST"],
    matcher: "/v1/invite/accept",
    middlewares: [authenticate("euser", ["bearer", "session"]), isUser],
  },
  {
    method: "POST",
    matcher: "/v1/accounts",
    middlewares: [authenticate("euser", ["bearer"]), isUser],
  },
  {
    method: ["GET"],
    matcher: "/v1/accounts",
    middlewares: [authenticate("euser", ["bearer", "session"]), isUser],
  },
  {
    method: "ALL",
    matcher: "/v1/accounts/*",
    middlewares: [authenticate("euser", ["bearer"]), isUser, accountHeader],
  },
  {
    method: "POST",
    matcher: "/v1/cli-token/claim",
    middlewares: [authenticate("euser", ["bearer"]), isUser],
  },
  {
    method: "POST",
    matcher: "/v1/users",
    middlewares: [authenticate("euser", ["bearer", "session"])],
  },
  {
    method: "ALL",
    matcher: "/v1/users/*",
    middlewares: [authenticate("euser", ["bearer", "session"]), isUser],
  },
  {
    method: ["POST", "GET"],
    matcher: "/v1/builds*",
    middlewares: [
      authenticate("euser", ["bearer", "session"]),
      isUser,
      accountHeader,
    ],
  },
  {
    method: ["POST", "GET"],
    matcher: "/v1/projects*",
    middlewares: [
      authenticate("euser", ["bearer", "session"]),
      isUser,
      accountHeader,
    ],
  },
]
