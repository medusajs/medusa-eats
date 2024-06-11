import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@medusajs/utils";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY);

  const productIds = req.query.id as string;

  const idsArray = productIds.split(",");

  console.log({ productIds });

  const query = remoteQueryObjectFromString({
    entryPoint: "product",
    fields: ["id", "thumbnail"],
    variables: {
      filters: {
        id: idsArray,
      },
    },
  });

  console.log({ query: JSON.stringify(query, null, 2) });

  const products = await remoteQuery(query);

  return res.status(200).json({ products });
}
