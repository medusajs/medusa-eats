import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { MedusaError, remoteQueryObjectFromString } from "@medusajs/utils";
import zod from "zod";

const schema = zod.object({
  first_name: zod.string().optional(),
  last_name: zod.string().optional(),
  email: zod.string().optional(),
  phone: zod.string().optional(),
  avatar_url: zod.string().optional(),
});

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = schema.parse(req.body);

  if (!validatedBody) {
    return MedusaError.Types.INVALID_DATA;
  }

  const deliveryModuleService = req.scope.resolve("deliveryModuleService");

  const driverId = req.params.id;

  const data = {
    id: driverId,
    ...validatedBody,
  };

  if (!driverId) {
    return MedusaError.Types.NOT_FOUND;
  }

  const driver = await deliveryModuleService.updateDrivers(data);

  return res.status(200).json({ driver });
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const driverId = req.params.id;

  if (!driverId) {
    return MedusaError.Types.INVALID_DATA;
  }

  const remoteQuery = req.scope.resolve("remoteQuery");

  const driverQuery = remoteQueryObjectFromString({
    entryPoint: "drivers",
    variables: {
      id: driverId,
    },
    fields: ["id", "first_name", "last_name", "email", "phone", "avatar_url"],
  });

  const driver = await remoteQuery(driverQuery).then((d) => d[0]);

  return res.status(200).json({ driver });
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const driverId = req.params.id;

  if (!driverId) {
    return MedusaError.Types.INVALID_DATA;
  }

  const deliveryModuleService = req.scope.resolve("deliveryModuleService");

  await deliveryModuleService.deleteDrivers(driverId);

  return res.status(200).json({ message: "Driver deleted" });
}
