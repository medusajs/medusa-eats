import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { TransactionHandlerType } from "@medusajs/utils"
import { IWorkflowEngineService } from "@medusajs/workflows-sdk"
import DeliveryModuleService from "src/modules/delivery/service"
import { DeliveryStatus } from "../../../../types/delivery/common"
import {
  findDriverStepStepId,
  handleDeliveryWorkflowId,
} from "../../../../workflows/delivery/handle-delivery"
import zod from "zod"

const schema = zod.object({
  driver_id: zod.string(),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = schema.parse(req.body)
  const deliveryId = req.params.id

  if (!deliveryId) {
    return res.status(400).json({ message: "Missing delivery id" })
  }

  if (!validatedBody.driver_id) {
    return res.status(400).json({ message: "Missing driver id" })
  }

  const deliveryModuleService = req.scope.resolve<DeliveryModuleService>(
    "deliveryModuleService"
  )

  const driver = await deliveryModuleService.retrieveDriver(
    validatedBody.driver_id
  )

  if (!driver) {
    return res.status(400).json({ message: "Driver not found" })
  }

  const delivery = await deliveryModuleService.retrieveDelivery(deliveryId)

  if (delivery.delivery_status !== DeliveryStatus.RESTAURANT_ACCEPTED) {
    return res.status(400).json({
      message: "Delivery is not in a state that can be claimed",
    })
  }

  const engineService = req.scope.resolve<IWorkflowEngineService>(
    ModuleRegistrationName.WORKFLOW_ENGINE
  )

  try {
    const claimedDelivery = await deliveryModuleService.updateDelivery(
      deliveryId,
      {
        driver_id: driver.id,
        delivery_status: DeliveryStatus.PICKUP_CLAIMED,
      }
    )

    console.log(
      `Driver ${driver.first_name} ${driver.last_name} claimed delivery no`,
      deliveryId
    )

    await engineService.setStepSuccess({
      idempotencyKey: {
        action: TransactionHandlerType.INVOKE,
        transactionId: delivery.transaction_id,
        stepId: findDriverStepStepId,
        workflowId: handleDeliveryWorkflowId,
      },
      stepResponse: {
        driver,
      },
    })

    return res.status(200).json({ delivery: claimedDelivery, driver })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
