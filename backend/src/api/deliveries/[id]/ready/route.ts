import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { ModuleRegistrationName } from "@medusajs/modules-sdk";
import { IWorkflowEngineService } from "@medusajs/types";
import { TransactionHandlerType } from "@medusajs/utils";
import { StepResponse } from "@medusajs/workflows-sdk";
import {
  DeliveryStatus,
  IDeliveryModuleService,
} from "../../../../types/delivery/common";
import {
  awaitPreparationStepId,
  handleDeliveryWorkflowId,
} from "../../../../workflows/delivery/handle-delivery";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const deliveryId = req.params.id;

  const deliveryModuleService = req.scope.resolve<IDeliveryModuleService>(
    "deliveryModuleService"
  );

  const engineService = req.scope.resolve<IWorkflowEngineService>(
    ModuleRegistrationName.WORKFLOW_ENGINE
  );

  try {
    const updatedDelivery = await deliveryModuleService.updateDelivery(
      req.params.id,
      {
        delivery_status: DeliveryStatus.READY_FOR_PICKUP,
      }
    );

    console.log("Delivery is ready for pickup", deliveryId);

    await engineService.setStepSuccess({
      idempotencyKey: {
        action: TransactionHandlerType.INVOKE,
        transactionId: updatedDelivery.transaction_id,
        stepId: awaitPreparationStepId,
        workflowId: handleDeliveryWorkflowId,
      },
      stepResponse: new StepResponse(updatedDelivery, updatedDelivery.id),
      options: {
        container: req.scope,
      },
    });

    return res.status(200).json({ delivery: updatedDelivery });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
