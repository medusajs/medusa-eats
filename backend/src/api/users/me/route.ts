import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/medusa";
import RestaurantModuleService from "../../../modules/restaurant/service";
import DeliveryModuleService from "../../../modules/delivery/service";
import { RestaurantAdminDTO } from "../../../types/restaurant/common";
import { DriverDTO } from "../../../types/delivery/common";
import { UserDTO } from "@medusajs/types";

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const { user_id, user_type } = req.user as {
    user_id: string;
    user_type: "restaurant" | "driver";
  };
  let user = {} as RestaurantAdminDTO | DriverDTO | UserDTO;

  if (user_type === "restaurant") {
    const service = req.scope.resolve<RestaurantModuleService>(
      "restaurantModuleService"
    );
    user = await service.retrieveRestaurantAdmin(user_id);
    return res.json({ user });
  }

  if (user_type === "driver") {
    const service = req.scope.resolve<DeliveryModuleService>(
      "deliveryModuleService"
    );
    user = await service.retrieveDriver(user_id);
    return res.json({ user });
  }

  return res.status(404).json({ message: "User not found" });
};
