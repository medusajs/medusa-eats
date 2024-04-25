import { MiddlewaresConfig } from "@medusajs/medusa"
import { restaurantAdminMiddlewares } from "./restaurants/middlewares"

export const config: MiddlewaresConfig = {
  routes: [...restaurantAdminMiddlewares],
}
