import { MedusaResponse } from "@medusajs/medusa"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { IWorkflowEngineService } from "@medusajs/workflows-sdk"
import { AccountScopedMedusaRequest } from "src/api/v1/types"
import DeliveryModuleService from "src/modules/delivery/service"
import { handleDeliveryWorkflowId } from "../../../workflows/delivery/handle-delivery"
import { IEventBusModuleService } from "@medusajs/types"
import { DeliveryStatus } from "src/types/delivery/common"

type RestaurantNotificationData = {
  restaurant_id: string
  delivery_id: string
}

type DriverNotificationData = {
  drivers: string[]
  delivery_id: string
}

export const GET = async (
  req: AccountScopedMedusaRequest,
  res: MedusaResponse
) => {
  const restaurantId = req.query.restaurant_id as string
  const driverId = req.query.driver_id as string

  const deliveryService = req.scope.resolve<DeliveryModuleService>(
    "deliveryModuleService"
  )

  const filters = {}

  if (restaurantId) {
    filters["restaurant_id"] = restaurantId
  }

  if (driverId) {
    filters["driver_id"] = driverId
  }

  const deliveries = await deliveryService.listDeliveries(filters, {
    take: 100,
  })

  if (!deliveries) {
    return res.status(404).json({ message: "No deliveries found" })
  }

  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
  }

  res.writeHead(200, headers)

  const workflowEngine = req.scope.resolve<IWorkflowEngineService>(
    ModuleRegistrationName.WORKFLOW_ENGINE
  )

  const workflowSubHandler = (data: any) => {
    res.write("data: " + JSON.stringify(data) + "\n\n")
  }

  for (const delivery of deliveries) {
    await workflowEngine.subscribe({
      workflowId: handleDeliveryWorkflowId,
      transactionId: delivery.transaction_id,
      subscriber: workflowSubHandler,
    })

    res.write(
      "data: " +
        JSON.stringify({
          message: "Subscribed to workflow",
          transactionId: delivery.transaction_id,
        }) +
        "\n\n"
    )
  }

  const eventBus = req.scope.resolve<IEventBusModuleService>(
    ModuleRegistrationName.EVENT_BUS
  )

  if (restaurantId) {
    eventBus.subscribe(
      "notify.restaurant",
      async (data: RestaurantNotificationData) => {
        if (data.restaurant_id !== restaurantId) {
          return
        }

        const delivery = await deliveryService.retrieveDelivery(
          data.delivery_id
        )

        await workflowEngine.subscribe({
          workflowId: handleDeliveryWorkflowId,
          transactionId: delivery.transaction_id,
          subscriber: workflowSubHandler,
        })

        res.write(
          "data: " +
            JSON.stringify({
              message: "Subscribed to workflow",
              transactionId: delivery.transaction_id,
              new: true,
            }) +
            "\n\n"
        )
      }
    )
  }

  if (driverId) {
    eventBus.subscribe(
      "notify.drivers",
      async (data: DriverNotificationData) => {
        if (!data.drivers.includes(driverId)) {
          console.log("Driver not included")
          return
        }

        const delivery = await deliveryService.retrieveDelivery(
          data.delivery_id
        )

        await workflowEngine.subscribe({
          workflowId: handleDeliveryWorkflowId,
          transactionId: delivery.transaction_id,
          subscriber: workflowSubHandler,
        })

        res.write(
          "data: " +
            JSON.stringify({
              message: "Subscribed to workflow",
              transactionId: delivery.transaction_id,
              new: true,
            }) +
            "\n\n"
        )
      }
    )
  }
}
