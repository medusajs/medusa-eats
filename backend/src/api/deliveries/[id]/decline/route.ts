import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { ModuleRegistrationName } from "@medusajs/modules-sdk";
import { IWorkflowEngineService } from "@medusajs/types";
import { TransactionHandlerType } from "@medusajs/utils";
import { StepResponse } from "@medusajs/workflows-sdk";
import {
  DeliveryStatus,
  IDeliveryModuleService,
} from "../../../../types/delivery/common";
import { handleDeliveryWorkflowId } from "../../../../workflows/workflows/handle-delivery";
import { notifyRestaurantStepId } from "../../../../workflows/steps/notify-restaurant";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const deliveryId = req.params.id;

  if (!deliveryId) {
    return res.status(400).json({ message: "Missing delivery id" });
  }

  const deliveryModuleService = req.scope.resolve<IDeliveryModuleService>(
    "deliveryModuleService"
  );

  const engineService = req.scope.resolve<IWorkflowEngineService>(
    ModuleRegistrationName.WORKFLOW_ENGINE
  );

  try {
    const delivery = await deliveryModuleService.update(deliveryId, {
      delivery_status: DeliveryStatus.RESTAURANT_DECLINED,
    });

    await engineService.setStepFailure({
      idempotencyKey: {
        action: TransactionHandlerType.COMPENSATE,
        transactionId: delivery.id,
        stepId: notifyRestaurantStepId,
        workflowId: handleDeliveryWorkflowId,
      },
      stepResponse: new StepResponse(delivery, delivery.id),
    });

    return res.status(200).json({ delivery });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
