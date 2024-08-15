import { MedusaResponse } from "@medusajs/medusa";
import {
  ModuleRegistrationName,
  remoteQueryObjectFromString,
} from "@medusajs/utils";
import { handleDeliveryWorkflowId } from "../../../workflows/delivery/workflows/handle-delivery";
import { AuthUserScopedMedusaRequest } from "../../types";
import { RemoteQueryFunction } from "@medusajs/modules-sdk";

type RestaurantNotificationData = {
  data: {
    restaurant_id: string;
    delivery_id: string;
  };
};

type DriverNotificationData = {
  data: {
    drivers: string[];
    delivery_id: string;
  };
};

export const GET = async (
  req: AuthUserScopedMedusaRequest,
  res: MedusaResponse
) => {
  const remoteQuery: RemoteQueryFunction = req.scope.resolve("remoteQuery");

  const { restaurant_id, driver_id, delivery_id } = req.query as {
    restaurant_id: string;
    driver_id: string;
    delivery_id: string;
  };

  const filters = {
    ...(restaurant_id && { restaurant_id }),
    ...(driver_id && { driver_id }),
    ...(delivery_id && { id: delivery_id }),
  };

  const take = parseInt(req.query.take as string) || null,
    skip = parseInt(req.query.skip as string) || 0;

  const deliveriesQuery = remoteQueryObjectFromString({
    entryPoint: "deliveries",
    fields: ["*"],
    variables: {
      filters,
      take,
      skip,
    },
  });

  const { rows: deliveries } = await remoteQuery(deliveriesQuery);

  if (!deliveries) {
    return res.status(404).json({ message: "No deliveries found" });
  }

  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  res.writeHead(200, headers);

  const workflowEngine = req.scope.resolve(
    ModuleRegistrationName.WORKFLOW_ENGINE
  );

  const workflowSubHandler = (data: any) => {
    res.write("data: " + JSON.stringify(data) + "\n\n");
  };

  for (const delivery of deliveries) {
    await workflowEngine.subscribe({
      workflowId: handleDeliveryWorkflowId,
      transactionId: delivery.transaction_id,
      subscriber: workflowSubHandler,
    });

    res.write(
      "data: " +
        JSON.stringify({
          message: "Subscribed to workflow",
          transactionId: delivery.transaction_id,
        }) +
        "\n\n"
    );
  }

  const eventBus = req.scope.resolve(ModuleRegistrationName.EVENT_BUS);

  if (restaurant_id) {
    eventBus.subscribe("notify.restaurant", async (event) => {
      const { data } = event as RestaurantNotificationData;

      if (data.restaurant_id !== restaurant_id) {
        return;
      }

      const deliveryQuery = remoteQueryObjectFromString({
        entryPoint: "deliveries",
        fields: ["*"],
        variables: {
          filters: {
            id: data.delivery_id,
          },
        },
      });

      const delivery = await remoteQuery(deliveryQuery).then((res) => res[0]);

      await workflowEngine.subscribe({
        workflowId: handleDeliveryWorkflowId,
        transactionId: delivery.transaction_id,
        subscriber: workflowSubHandler,
      });

      res.write(
        "data: " +
          JSON.stringify({
            message: "Subscribed to workflow",
            transactionId: delivery.transaction_id,
            new: true,
          }) +
          "\n\n"
      );
    });
  }

  if (driver_id) {
    eventBus.subscribe("notify.drivers", async (event) => {
      const { data } = event as DriverNotificationData;
      if (!data.drivers.includes(driver_id)) {
        return;
      }

      const deliveryQuery = remoteQueryObjectFromString({
        entryPoint: "deliveries",
        fields: ["*"],
        variables: {
          filters: {
            id: data.delivery_id,
          },
        },
      });

      const delivery = await remoteQuery(deliveryQuery).then((res) => res[0]);

      await workflowEngine.subscribe({
        workflowId: handleDeliveryWorkflowId,
        transactionId: delivery.transaction_id,
        subscriber: workflowSubHandler,
      });

      res.write(
        "data: " +
          JSON.stringify({
            message: "Subscribed to workflow",
            transactionId: delivery.transaction_id,
            new: true,
          }) +
          "\n\n"
      );
    });
  }
};
