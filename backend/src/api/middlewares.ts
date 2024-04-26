import { MiddlewaresConfig } from "@medusajs/medusa"
import { restaurantAdminMiddlewares } from "./restaurants/middlewares"
import { usersMiddlewares } from "./users/middlewares"

export const config: MiddlewaresConfig = {
  routes: [...restaurantAdminMiddlewares, ...usersMiddlewares],
}
