import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { MedusaError, remoteQueryObjectFromString } from "@medusajs/utils";
import zod from "zod";
import DeliveryModuleService from "../../../../modules/delivery/service";
import { DELIVERY_MODULE } from "../../../../modules/delivery";

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

  const deliveryModuleService: DeliveryModuleService =
    req.scope.resolve(DELIVERY_MODULE);

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

  const driver = await remoteQuery(driverQuery);

  return res.status(200).json({ driver: driver[0] });
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const driverId = req.params.id;

  if (!driverId) {
    return MedusaError.Types.INVALID_DATA;
  }

  const deliveryModuleService: DeliveryModuleService =
    req.scope.resolve(DELIVERY_MODULE);

  await deliveryModuleService.deleteDrivers(driverId);

  return res.status(200).json({ message: "Driver deleted" });
}
