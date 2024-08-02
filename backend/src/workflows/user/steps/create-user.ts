import { MedusaError } from "@medusajs/utils";
import { createStep, StepResponse } from "@medusajs/workflows-sdk";
import { DriverDTO } from "../../../types/delivery/common";
import { RestaurantAdminDTO } from "../../../types/restaurant/common";
import {
  CreateDriverInput,
  CreateRestaurantAdminInput,
} from "../workflows/create-user";

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
      const service = container.resolve("restaurantModuleService");

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
      const service = container.resolve("deliveryModuleService");

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
      const service = container.resolve("restaurantModuleService");

      return service.deleteRestaurantAdmin(id);
    }

    if (actor_type === "driver") {
      const service = container.resolve("deliveryModuleService");

      return service.deleteDrivers(id);
    }
  }
);
