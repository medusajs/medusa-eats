import { MedusaResponse } from "@medusajs/medusa";
import { ModuleRegistrationName } from "@medusajs/modules-sdk";
import {
  IEventBusModuleService,
  IWorkflowEngineService,
} from "@medusajs/types";
import { remoteQueryObjectFromString } from "@medusajs/utils";
import { handleDeliveryWorkflowId } from "../../../workflows/delivery/workflows/handle-delivery";
import { AuthUserScopedMedusaRequest } from "../../types";

type RestaurantNotificationData = {
  restaurant_id: string;
  delivery_id: string;
};

type DriverNotificationData = {
  drivers: string[];
  delivery_id: string;
};

export const GET = async (
  req: AuthUserScopedMedusaRequest,
  res: MedusaResponse
) => {
  const remoteQuery = req.scope.resolve("remoteQuery");

  const { restaurant_id, driver_id } = req.query as {
    restaurant_id: string;
    driver_id: string;
  };

  const filters = {
    ...(restaurant_id && { restaurant_id }),
    ...(driver_id && { driver_id }),
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
    "Access-Control-Allow-Origin": "*",
  };

  res.writeHead(200, headers);

  const workflowEngine = req.scope.resolve<IWorkflowEngineService>(
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

  const eventBus = req.scope.resolve<IEventBusModuleService>(
    ModuleRegistrationName.EVENT_BUS
  );

  if (restaurant_id) {
    eventBus.subscribe(
      "notify.restaurant",
      async (data: RestaurantNotificationData) => {
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
      }
    );
  }

  if (driver_id) {
    eventBus.subscribe(
      "notify.drivers",
      async (data: DriverNotificationData) => {
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
      }
    );
  }
};
