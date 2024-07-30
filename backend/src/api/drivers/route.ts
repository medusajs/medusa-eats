import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import zod from "zod";
import { CreateDriverDTO } from "../../types/delivery/mutations";
import { remoteQueryObjectFromString } from "@medusajs/utils";

const schema = zod
  .object({
    first_name: zod.string(),
    last_name: zod.string(),
    email: zod.string(),
    phone: zod.string(),
    avatar_url: zod.string().optional(),
  })
  .required({
    first_name: true,
    last_name: true,
    email: true,
    phone: true,
  });

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = schema.parse(req.body) as CreateDriverDTO;

  if (!validatedBody) {
    return res.status(400).json({ message: "Missing driver data" });
  }

  const deliveryModuleService = req.scope.resolve("deliveryModuleService");

  try {
    const driver = await deliveryModuleService.createDrivers(validatedBody);

    return res.status(200).json({ driver: driver });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const remoteQuery = req.scope.resolve("remoteQuery");
  try {
    const driverQuery = remoteQueryObjectFromString({
      entryPoint: "drivers",
      fields: ["*"],
      variables: {
        take: null,
        skip: 0,
      },
    });

    const { rows: drivers } = await remoteQuery(driverQuery);

    return res.status(200).json({ drivers });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
