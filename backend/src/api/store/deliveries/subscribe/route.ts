import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import {
  ModuleRegistrationName,
  ContainerRegistrationKeys,
} from "@medusajs/utils";
import { handleDeliveryWorkflowId } from "../../../../workflows/delivery/workflows";
import { DeliveryDTO } from "../../../../modules/delivery/types/common";

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
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const { restaurant_id, driver_id, delivery_id } = req.query as {
    restaurant_id: string;
    driver_id: string;
    delivery_id: string;
  };

  let deliveries: DeliveryDTO[] = [];

  if (restaurant_id) {
    const restaurantQuery = {
      entity: "restaurant",
      fields: ["deliveries.*"],
      filters: {
        id: restaurant_id,
      },
    };

    const {
      data: [restaurant],
    } = await query.graph(restaurantQuery);

    deliveries.push(...restaurant.deliveries);
  } else {
    const filters = {
      ...(driver_id && { driver_id }),
      ...(delivery_id && { id: delivery_id }),
    };

    const take = parseInt(req.query.take as string) || null,
      skip = parseInt(req.query.skip as string) || 0;

    const deliveriesQuery = {
      entity: "delivery",
      fields: ["*"],
      filters,
      pagination: {
        take,
        skip,
      },
    };

    const { data } = await query.graph(deliveriesQuery);

    deliveries.push(...data);
  }

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

      const deliveryQuery = {
        entity: "delivery",
        fields: ["*"],
        filters: {
          id: data.delivery_id,
        },
      };

      const {
        data: [delivery],
      } = await query.graph(deliveryQuery);

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

      const deliveryQuery = {
        entity: "delivery",
        fields: ["*"],
        filters: {
          id: data.delivery_id,
        },
      };

      const {
        data: [delivery],
      } = await query.graph(deliveryQuery);

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
