import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/utils";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  try {
    const driverQuery = {
      entity: "driver",
      fields: ["*"],
      variables: {
        take: null,
        skip: 0,
      },
    };

    const { data: drivers } = await query.graph(driverQuery);

    return res.status(200).json({ drivers });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
