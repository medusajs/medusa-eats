import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { DriverDTO } from "../../../types/delivery/common";
import { RestaurantAdminDTO } from "../../../types/restaurant/common";

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const { user_id, actor_type } = req.user as {
    user_id: string;
    actor_type: "restaurant" | "driver";
  };
  let user = {} as RestaurantAdminDTO | DriverDTO;

  if (actor_type === "restaurant") {
    const service = req.scope.resolve("restaurantModuleService");
    user = await service.retrieveRestaurantAdmin(user_id);
    return res.json({ user });
  }

  if (actor_type === "driver") {
    const service = req.scope.resolve("deliveryModuleService");
    user = await service.retrieveDriver(user_id);
    return res.json({ user });
  }

  return res.status(404).json({ message: "User not found" });
};
