import { MedusaError } from "@medusajs/utils";
import { createStep, StepResponse } from "@medusajs/workflows-sdk";
import { DriverDTO } from "../../../modules/delivery/types/common";
import { RestaurantAdminDTO } from "../../../modules/restaurant/types/common";
import {
  CreateDriverInput,
  CreateRestaurantAdminInput,
} from "../workflows/create-user";
import { RESTAURANT_MODULE } from "../../../modules/restaurant";
import { DELIVERY_MODULE } from "../../../modules/delivery";

type CreateUserStepInput = (CreateRestaurantAdminInput | CreateDriverInput) & {
  actor_type: "restaurant" | "driver";
};

type CompensationStepInput = {
  id: string;
  actor_type: string;
};

export const createUserStepId = "create-user-step";
export const createUserStep = createStep(
  createUserStepId,
  async (
    input: CreateUserStepInput,
    { container }
  ): Promise<
    StepResponse<RestaurantAdminDTO | DriverDTO, CompensationStepInput>
  > => {
    if (input.actor_type === "restaurant") {
      const service = container.resolve(RESTAURANT_MODULE);

      const restaurantAdmin = await service.createRestaurantAdmins(
        input as CreateRestaurantAdminInput
      );

      const compensationData = {
        id: restaurantAdmin.id,
        actor_type: "restaurant",
      };

      return new StepResponse(restaurantAdmin, compensationData);
    }

    if (input.actor_type === "driver") {
      const service = container.resolve(DELIVERY_MODULE);

      const driver = await service.createDrivers(input as CreateDriverInput);

      const driverWithAvatar = await service.updateDrivers({
        id: driver.id,
        avatar_url: `https://robohash.org/${driver.id}?size=40x40&set=set1&bgset=bg1`,
      });

      const compensationData = {
        id: driverWithAvatar.id,
        actor_type: "driver",
      };

      return new StepResponse(driverWithAvatar, compensationData);
    }

    throw MedusaError.Types.INVALID_DATA;
  },
  function ({ id, actor_type }: CompensationStepInput, { container }) {
    if (actor_type === "restaurant") {
      const service = container.resolve(RESTAURANT_MODULE);

      return service.deleteRestaurantAdmins(id);
    }

    if (actor_type === "driver") {
      const service = container.resolve(DELIVERY_MODULE);

      return service.deleteDrivers(id);
    }
  }
);
