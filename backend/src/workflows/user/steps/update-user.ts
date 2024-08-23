import { MedusaError } from "@medusajs/utils";
import { createStep, StepResponse } from "@medusajs/workflows-sdk";
import { DriverDTO } from "../../../modules/delivery/types/common";
import { RestaurantAdminDTO } from "../../../modules/restaurant/types/common";
import {
  UpdateRestaurantsDTO,
  UpdateRestaurantAdminsDTO,
} from "../../../modules/restaurant/types/mutations";
import { RESTAURANT_MODULE } from "../../../modules/restaurant";
import { DELIVERY_MODULE } from "../../../modules/delivery";

type UpdateUserStepInput = (
  | UpdateRestaurantsDTO
  | UpdateRestaurantAdminsDTO
) & {
  actor_type: "restaurant" | "driver";
};

export const updateUserStepId = "update-user-step";
export const updateUserStep = createStep(
  updateUserStepId,
  async (
    input: UpdateUserStepInput,
    { container }
  ): Promise<
    StepResponse<RestaurantAdminDTO | DriverDTO, UpdateUserStepInput>
  > => {
    const { actor_type, ...data } = input;

    if (actor_type === "restaurant") {
      const service = container.resolve(RESTAURANT_MODULE);

      const compensationData = {
        ...(await service.retrieveRestaurantAdmin(data.id)),
        actor_type: "restaurant" as "restaurant",
      };

      const restaurantAdmin = await service.updateRestaurantAdmins(data);

      return new StepResponse(restaurantAdmin, compensationData);
    }

    if (actor_type === "driver") {
      const service = container.resolve(DELIVERY_MODULE);

      const compensationData = {
        ...(await service.retrieveDriver(data.id)),
        actor_type: "driver" as "driver",
      };

      const driver = await service.updateDrivers(data);

      return new StepResponse(driver, compensationData);
    }

    throw MedusaError.Types.INVALID_DATA;
  },
  function ({ actor_type, ...data }: UpdateUserStepInput, { container }) {
    if (actor_type === "restaurant") {
      const service = container.resolve(RESTAURANT_MODULE);

      return service.updateRestaurantAdmins(data);
    }

    if (actor_type === "driver") {
      const service = container.resolve(DELIVERY_MODULE);

      return service.updateDrivers(data);
    }
  }
);
