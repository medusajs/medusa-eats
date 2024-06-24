import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { IRestaurantModuleService } from "../../../../types/restaurant/common";
import zod from "zod";

const schema = zod.object({
  is_open: zod.boolean(),
});

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params;
  const { is_open } = schema.parse(req.body);

  const restaurantService = req.scope.resolve<IRestaurantModuleService>(
    "restaurantModuleService"
  );

  try {
    const restaurant = await restaurantService.updateRestaurant(id, {
      is_open,
    });
    res.status(200).json({ restaurant });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
