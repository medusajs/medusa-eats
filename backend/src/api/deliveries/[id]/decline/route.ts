import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { ModuleRegistrationName } from "@medusajs/modules-sdk";
import { TransactionHandlerType } from "@medusajs/utils";
import { IWorkflowEngineService, StepResponse } from "@medusajs/workflows-sdk";
import DeliveryModuleService from "../../../../modules/delivery/service";
import { DeliveryStatus } from "../../../../types/delivery/common";
import {
  notifyRestaurantStepId,
  handleDeliveryWorkflowId,
} from "../../../../workflows/delivery/handle-delivery";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const deliveryId = req.params.id;

  if (!deliveryId) {
    return res.status(400).json({ message: "Missing delivery id" });
  }

  const deliveryModuleService = req.scope.resolve<DeliveryModuleService>(
    "deliveryModuleService"
  );

  const engineService = req.scope.resolve<IWorkflowEngineService>(
    ModuleRegistrationName.WORKFLOW_ENGINE
  );

  try {
    const delivery = await deliveryModuleService.updateDelivery(deliveryId, {
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
