import {
  AuthenticatedMedusaRequest,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  MedusaError,
  remoteQueryObjectFromString,
} from "@medusajs/utils";
import zod from "zod";
import { createUserWorkflow } from "../../../../../workflows/user/workflows/create-user";
import { RESTAURANT_MODULE } from "../../../../../modules/restaurant";

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
    first_name: string;
    last_name: string;
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

  res.status(201).json({ user: result });
};

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const restaurantId = req.params.id;

  if (!restaurantId) {
    return MedusaError.Types.NOT_FOUND, "Restaurant not found";
  }

  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY);

  const restaurantAdminsQuery = remoteQueryObjectFromString({
    entryPoint: "restaurant_admin",
    fields: ["id", "email", "first_name", "last_name"],
    filters: {
      restaurant_id: restaurantId,
    },
  });

  const restaurantAdmins = await remoteQuery(restaurantAdminsQuery);

  return res.status(200).json({ restaurant_admins: restaurantAdmins });
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const restaurantId = req.params.id;
  const adminId = req.params.adminId;

  if (!restaurantId || !adminId) {
    return MedusaError.Types.INVALID_DATA;
  }

  const restaurantModuleService = req.scope.resolve(RESTAURANT_MODULE);

  await restaurantModuleService.deleteRestaurantAdmins(adminId);

  return res.status(200).json({ message: "Admin deleted" });
}
