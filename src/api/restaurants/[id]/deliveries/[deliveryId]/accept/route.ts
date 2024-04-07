import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { TransactionHandlerType } from "@medusajs/utils"
import { IWorkflowEngineService } from "@medusajs/workflows-sdk"
import DeliveryModuleService from "src/modules/delivery/service"
import {
  awaitRestaurantResponseStepId,
  createHandleDeliveryWorkflowId,
} from "src/workflows/delivery/handle-delivery"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const deliveryId = req.params.deliveryId

  if (!deliveryId) {
    return res.status(400).json({ message: "Missing delivery id" })
  }

  const deliveryModuleService = req.scope.resolve<DeliveryModuleService>(
    "deliveryModuleService"
  )

  const engineService = req.scope.resolve<IWorkflowEngineService>(
    ModuleRegistrationName.WORKFLOW_ENGINE
  )

  try {
    const delivery = await deliveryModuleService.updateDelivery(deliveryId, {
      delivery_status: "accepted",
    })

    await engineService.setStepSuccess({
      idempotencyKey: {
        action: TransactionHandlerType.INVOKE,
        transactionId: delivery.transaction_id,
        stepId: awaitRestaurantResponseStepId,
        workflowId: createHandleDeliveryWorkflowId,
      },
      stepResponse: {
        delivery,
      },
    })

    return res.status(200).json({ delivery })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
