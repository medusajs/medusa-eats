import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { TransactionHandlerType } from "@medusajs/utils"
import { IWorkflowEngineService } from "@medusajs/workflows-sdk"
import DeliveryModuleService from "../../../../modules/delivery/service"
import { DeliveryStatus } from "../../../../types/delivery/common"
import {
  notifyRestaurantStepId,
  handleDeliveryWorkflowId,
} from "../../../../workflows/delivery/handle-delivery"
import zod from "zod"

const schema = zod.object({
  eta: zod.date().optional(),
})

const DEFAULT_PROCESSING_TIME = 30 * 60 * 1000 // 30 minutes

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = schema.parse(req.body)

  const eta =
    validatedBody.eta ||
    new Date(new Date().getTime() + DEFAULT_PROCESSING_TIME)

  const deliveryId = req.params.id

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
      delivery_status: DeliveryStatus.RESTAURANT_ACCEPTED,
      eta,
    })

    console.log("Restaurant accepted delivery no", deliveryId)

    await engineService.setStepSuccess({
      idempotencyKey: {
        action: TransactionHandlerType.INVOKE,
        transactionId: delivery.transaction_id,
        stepId: notifyRestaurantStepId,
        workflowId: handleDeliveryWorkflowId,
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
