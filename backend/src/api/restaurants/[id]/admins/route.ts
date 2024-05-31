import {
  MedusaRequest,
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa";
import RestaurantModuleService from "../../../../modules/restaurant/service";
import zod from "zod";
import { ModuleRegistrationName } from "@medusajs/modules-sdk";
import { IAuthModuleService } from "@medusajs/types";
import jwt from "jsonwebtoken";
import { createUserWorkflow } from "../../../../workflows/account/create-user";

const schema = zod
  .object({
    email: zod.string().email(),
    first_name: zod.string().optional(),
    last_name: zod.string().optional(),
  })
  .required({ email: true });

export const POST = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const authIdentityId = req.auth_context.auth_identity_id;
  const restaurantId = req.params.id;

  const validatedBody = schema.parse(req.body) as {
    email: string;
    first_name?: string;
    last_name?: string;
  };

  const { result, errors } = await createUserWorkflow(req.scope).run({
    input: {
      user: {
        ...validatedBody,
        actor_type: "restaurant",
        restaurant_id: restaurantId,
      },
      auth_identity_id: authIdentityId,
    },
    throwOnError: false,
  });

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error;
  }

  const authService = req.scope.resolve<IAuthModuleService>(
    ModuleRegistrationName.AUTH
  );

  const authUser = await authService.retrieve(authIdentityId);
  const { jwtSecret } = req.scope.resolve("configModule").projectConfig.http;
  const token = jwt.sign(authUser, jwtSecret);

  res.status(201).json({ user: result, token });
};

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const restaurantId = req.params.id;

  if (!restaurantId) {
    return res.status(400).json({ message: "Missing restaurant id" });
  }

  const restaurantModuleService = req.scope.resolve<RestaurantModuleService>(
    "restaurantModuleService"
  );

  try {
    const restaurantAdmins = await restaurantModuleService.listRestaurantAdmins(
      {
        restaurant_id: restaurantId,
      }
    );

    return res.status(200).json({ restaurant_admins: restaurantAdmins });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const restaurantId = req.params.id;
  const adminId = req.params.adminId;

  if (!restaurantId) {
    return res.status(400).json({ message: "Missing restaurant id" });
  }

  if (!adminId) {
    return res.status(400).json({ message: "Missing admin id" });
  }

  const restaurantModuleService = req.scope.resolve<RestaurantModuleService>(
    "restaurantModuleService"
  );

  try {
    await restaurantModuleService.deleteRestaurantAdmin(adminId);

    return res.status(200).json({ message: "Admin deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
