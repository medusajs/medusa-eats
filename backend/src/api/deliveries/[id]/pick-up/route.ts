import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { ModuleRegistrationName } from "@medusajs/modules-sdk";
import { TransactionHandlerType } from "@medusajs/utils";
import { IWorkflowEngineService, StepResponse } from "@medusajs/workflows-sdk";
import DeliveryModuleService from "../../../../modules/delivery/service";
import { DeliveryStatus } from "../../../../types/delivery/common";
import {
  awaitPickUpStepId,
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

  const delivery = await deliveryModuleService.retrieveDelivery(deliveryId);

  if (delivery.delivery_status !== DeliveryStatus.READY_FOR_PICKUP) {
    return res.status(400).json({
      message: "Delivery is not in a state that can be picked up",
    });
  }

  const engineService = req.scope.resolve<IWorkflowEngineService>(
    ModuleRegistrationName.WORKFLOW_ENGINE
  );

  try {
    const pickedUpDelivery = await deliveryModuleService.updateDelivery(
      deliveryId,
      {
        delivery_status: DeliveryStatus.IN_TRANSIT,
      }
    );

    await engineService.setStepSuccess({
      idempotencyKey: {
        action: TransactionHandlerType.INVOKE,
        transactionId: delivery.transaction_id,
        stepId: awaitPickUpStepId,
        workflowId: handleDeliveryWorkflowId,
      },
      stepResponse: new StepResponse(pickedUpDelivery, pickedUpDelivery.id),
      options: {
        container: req.scope,
      },
    });

    return res.status(200).json({ delivery: pickedUpDelivery });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
