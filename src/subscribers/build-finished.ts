import { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { TransactionHandlerType } from "@medusajs/utils"
import { IWorkflowEngineService } from "@medusajs/workflows-sdk"
import ProjectModuleService from "../modules/project/service"
import {
  buildProjectEnvironmentId,
  waitForBuildStartId,
} from "../workflows/project/trigger-build"

export default async function buildStatusChanged({
  data,
  container,
}: SubscriberArgs<{ build_arn: string; status: string }>) {
  const projectService = container.resolve<ProjectModuleService>(
    "projectModuleService"
  )

  const [build] = await projectService.listBuilds({
    external_build_id: data.build_arn,
  })

  if (!build) {
    console.log("An error occured while processing build status change", {
      build: data.build_arn,
    })
    return
  }

  const engineService = container.resolve<IWorkflowEngineService>(
    ModuleRegistrationName.WORKFLOW_ENGINE
  )

  if (data.status === "IN_PROGRESS") {
    await projectService.updateBuild(build.id, {
      started_at: new Date(),
    })

    engineService.setStepSuccess({
      idempotencyKey: {
        action: TransactionHandlerType.INVOKE,
        transactionId: build.transaction_id,
        stepId: waitForBuildStartId,
        workflowId: buildProjectEnvironmentId,
      },
      stepResponse: {},
    })

    return
  }

  if (build.started_at === null) {
    await projectService.updateBuild(build.id, {
      started_at: new Date(),
    })

    await engineService.setStepSuccess({
      idempotencyKey: {
        action: TransactionHandlerType.INVOKE,
        transactionId: build.transaction_id,
        stepId: waitForBuildStartId,
        workflowId: buildProjectEnvironmentId,
      },
      stepResponse: {},
    })
  }

  engineService.setStepSuccess({
    idempotencyKey: {
      action: TransactionHandlerType.INVOKE,
      transactionId: build.transaction_id,
      stepId: "async-build-result-step",
      workflowId: buildProjectEnvironmentId,
    },
    stepResponse: {
      id: build.id,
      success: true,
    },
  })
}

export const config: SubscriberConfig = {
  event: "code-build.status-changed",
}
