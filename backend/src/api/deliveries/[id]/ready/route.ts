import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { TransactionHandlerType } from "@medusajs/utils"
import { IWorkflowEngineService } from "@medusajs/workflows-sdk"
import DeliveryModuleService from "src/modules/delivery/service"
import {
  awaitPreparationStepId,
  handleDeliveryWorkflowId,
} from "../../../../workflows/delivery/handle-delivery"
import { DeliveryStatus } from "../../../../types/delivery/common"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const deliveryId = req.params.id

  const deliveryModuleService = req.scope.resolve<DeliveryModuleService>(
    "deliveryModuleService"
  )

  const engineService = req.scope.resolve<IWorkflowEngineService>(
    ModuleRegistrationName.WORKFLOW_ENGINE
  )

  try {
    const updatedDelivery = await deliveryModuleService.updateDelivery(
      req.params.id,
      {
        delivery_status: DeliveryStatus.READY_FOR_PICKUP,
      }
    )

    console.log("Delivery is ready for pickup", deliveryId)

    await engineService.setStepSuccess({
      idempotencyKey: {
        action: TransactionHandlerType.INVOKE,
        transactionId: updatedDelivery.transaction_id,
        stepId: awaitPreparationStepId,
        workflowId: handleDeliveryWorkflowId,
      },
      stepResponse: {
        delivery: updatedDelivery,
      },
    })

    return res.status(200).json({ delivery: updatedDelivery })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
