import { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { IWorkflowEngineService } from "@medusajs/workflows-sdk"
import { deleteProjectWorkflowId } from "../workflows/project/delete-project"

export default async function orderPlacedHandler({
  data,
  container,
}: SubscriberArgs<{ id: string }>) {
  console.log("destroying infra", data.id)

  const workflowEngine = container.resolve<IWorkflowEngineService>(
    ModuleRegistrationName.WORKFLOW_ENGINE
  )

  await workflowEngine.run(deleteProjectWorkflowId, {
    container: container,
    throwOnError: false,
    input: {
      id: data.id,
    },
  })
}

export const config: SubscriberConfig = {
  event: "project.deleted",
}
