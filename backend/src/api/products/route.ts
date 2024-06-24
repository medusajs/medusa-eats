import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@medusajs/utils";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY);

  const productIds = req.query.id as string;

  const idsArray = productIds.split(",");

  const query = remoteQueryObjectFromString({
    entryPoint: "products",
    fields: ["id", "thumbnail"],
    variables: {
      filters: {
        id: idsArray,
      },
    },
  });

  const products = await remoteQuery(query);

  return res.status(200).json({ products });
}
