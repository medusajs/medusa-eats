import { MedusaResponse } from "@medusajs/medusa";
import {
  ModuleRegistrationName,
  remoteQueryObjectFromString,
} from "@medusajs/utils";
import { handleDeliveryWorkflowId } from "../../../../workflows/delivery/workflows/handle-delivery";
import { AuthUserScopedMedusaRequest } from "../../../types";
import { RemoteQueryFunction } from "@medusajs/modules-sdk";
import {
  IWorkflowEngineService,
  IEventBusModuleService,
} from "@medusajs/types";

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
  const deliveryId = req.params.id;
  const restaurantId = req.query.restaurant_id as string;
  const driverId = req.query.driver_id as string;

  const remoteQuery: RemoteQueryFunction = req.scope.resolve("remoteQuery");

  const deliveryQuery = remoteQueryObjectFromString({
    entryPoint: "deliveries",
    fields: ["*"],
    variables: {
      filters: {
        id: deliveryId,
      },
    },
  });

  const delivery = await remoteQuery(deliveryQuery).then((r) => r[0]);

  if (!delivery) {
    return res.status(404).json({ message: "No deliveries found" });
  }

  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
  };

  res.writeHead(200, headers);

  const workflowEngine: IWorkflowEngineService = req.scope.resolve(
    ModuleRegistrationName.WORKFLOW_ENGINE
  );

  const workflowSubHandler = (data: any) => {
    res.write("data: " + JSON.stringify(data) + "\n\n");
  };

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

  const eventBus: IEventBusModuleService = req.scope.resolve(
    ModuleRegistrationName.EVENT_BUS
  );

  if (restaurantId) {
    eventBus.subscribe("notify.restaurant", async (event) => {
      const { data } = event as RestaurantNotificationData;
      if (data.restaurant_id !== restaurantId) {
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

      const delivery = await remoteQuery(deliveryQuery).then((r) => r[0]);

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

  if (driverId) {
    eventBus.subscribe("notify.drivers", async (event) => {
      const { data } = event as DriverNotificationData;
      if (!data.drivers.includes(driverId)) {
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

      const delivery = await remoteQuery(deliveryQuery).then((r) => r[0]);

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
