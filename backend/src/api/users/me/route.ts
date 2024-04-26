import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/medusa"
import RestaurantModuleService from "../../../modules/restaurant/service"

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const resAdmId = req.auth.app_metadata.restaurant_admin_id

  const service = req.scope.resolve<RestaurantModuleService>(
    "restaurantModuleService"
  )

  const user = await service.retrieveRestaurantAdmin(resAdmId)

  res.json({ user })
}
