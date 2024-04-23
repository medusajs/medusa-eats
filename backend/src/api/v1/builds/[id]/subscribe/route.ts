import { MedusaResponse } from "@medusajs/medusa"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { IWorkflowEngineService } from "@medusajs/workflows-sdk"
import { buildProjectEnvironmentId } from "../../../../../workflows/project/trigger-build"
import ProjectModuleService from "../../../../../modules/project/service"
import PulumiService from "../../../../../modules/pulumi/service"
import { AccountScopedMedusaRequest } from "../../../types"

export const GET = async (
  req: AccountScopedMedusaRequest,
  res: MedusaResponse
) => {
  const { account_id } = req

  const { id } = req.params

  const projectService = req.scope.resolve<ProjectModuleService>(
    "projectModuleService"
  )

  const [build] = await projectService.listBuilds(
    {
      id,
      environment: { project: { account_id } },
    },
    {
      select: ["id", "external_build_id", "transaction_id"],
      take: 1,
    }
  )

  if (!build || !build.external_build_id || !build.transaction_id) {
    return res.status(404).json({ message: "Build not found" })
  }

  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  }

  res.writeHead(200, headers)

  const workflowEngine = req.scope.resolve<IWorkflowEngineService>(
    ModuleRegistrationName.WORKFLOW_ENGINE
  )

  const [we] = await workflowEngine.listWorkflowExecution({
    workflow_id: buildProjectEnvironmentId,
    transaction_id: build.transaction_id,
  })

  if (!we) {
    res.write("data: Workflow execution not found\n\n")
    return res.end()
  }

  const execution = we.execution as any

  let currentStep = ""
  let isOpen = true

  const invokingStep = Object.entries(execution.steps).find(
    ([_, step]: [string, any]) => step.invoke?.state === "invoking"
  )

  if (invokingStep?.length) {
    currentStep = (invokingStep[1] as any).definition.name
  }

  let workflowIsProcessing = true

  await workflowEngine.subscribe({
    workflowId: buildProjectEnvironmentId,
    transactionId: build.transaction_id,
    subscriber: (data: any) => {
      res.write("data: " + JSON.stringify(data) + "\n\n")
    },
  })

  res.write(
    "data: " +
      JSON.stringify({ step: currentStep, message: "Subscribed to workflow" }) +
      "\n\n"
  )

  req.on("close", () => {
    isOpen = false
  })

  // switch (currentStep) {
  //   case waitForBuildResultId:
  //     await reportLogsProgress({
  //       pulumiService,
  //       externalBuildId: build.external_build_id,
  //       res,
  //       shouldContinue: () => isOpen,
  //     });
  //     break;
  //   default:
  //     break;
  // }

  // We broke out of the loop if we got here
  isOpen = false
  // res.end();
}

async function reportLogsProgress({
  pulumiService,
  externalBuildId,
  res,
  shouldContinue,
}: {
  pulumiService: PulumiService
  externalBuildId: string
  res: MedusaResponse
  shouldContinue: () => boolean
}) {
  let nextToken: string | undefined

  const codeBuild = await pulumiService.retrieveBuild(externalBuildId)

  const logInfo = codeBuild.logs
  if (!logInfo || !logInfo.groupName || !logInfo.streamName) {
    res.write("data: Log information not found for the build\n\n")
    return
  }

  let isComplete = codeBuild.buildComplete

  do {
    console.log("In log loop /subscribe")
    const logs = await pulumiService.getLogs(
      logInfo.groupName,
      logInfo.streamName,
      nextToken
    )

    console.log("Logs", logs)

    for (const event of logs.events ?? []) {
      res.write("data: " + JSON.stringify(event) + "n")
    }

    nextToken = logs.nextForwardToken

    if (isComplete) {
      break
    }

    await new Promise((resolve) => setTimeout(resolve, 2000)) // For example, wait for 2 seconds
  } while (shouldContinue())
}
