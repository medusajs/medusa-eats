import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/medusa"
import RestaurantModuleService from "../../../modules/restaurant/service"
import DriverModuleService from "../../../modules/delivery/service"
import { RestaurantAdminDTO } from "src/types/restaurant/common"
import { DriverDTO } from "src/types/delivery/common"
import { UserDTO } from "@medusajs/types"

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const { restaurant_admin_id, driver_id, customer_id } = req.auth.app_metadata
  let user = {} as RestaurantAdminDTO | DriverDTO | UserDTO

  if (restaurant_admin_id) {
    const service = req.scope.resolve<RestaurantModuleService>(
      "restaurantModuleService"
    )
    user = await service.retrieveRestaurantAdmin(restaurant_admin_id)
    return res.json({ user })
  }

  if (driver_id) {
    const service = req.scope.resolve<DriverModuleService>(
      "driverModuleService"
    )
    user = await service.retrieveDriver(driver_id)
    return res.json({ user })
  }

  if (customer_id) {
    const service = req.scope.resolve<DriverModuleService>(
      "driverModuleService"
    )
    user = await service.retrieveDriver(customer_id)
    return res.json({ user })
  }

  return res.status(404).json({ message: "User not found" })
}
