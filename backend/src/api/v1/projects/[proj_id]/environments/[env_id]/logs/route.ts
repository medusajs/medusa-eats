import { MedusaResponse } from "@medusajs/medusa"
import { buildStackName } from "../../../../../../../utils"
import ProjectModuleService from "../../../../../../../modules/project/service"
import PulumiService from "../../../../../../../modules/pulumi/service"
import { AccountScopedMedusaRequest } from "../../../../../types"

export const GET = async (
  req: AccountScopedMedusaRequest,
  res: MedusaResponse
) => {
  const accountId = req.account_id
  const { proj_id, env_id } = req.params

  const projectService = req.scope.resolve<ProjectModuleService>(
    "projectModuleService"
  )

  const environment = await projectService.retrieveEnvironmentByAliasOrId(
    proj_id,
    env_id,
    accountId,
    { relations: ["project"] }
  )

  const stackName = buildStackName(environment.project!, environment)

  const pulumiService = req.scope.resolve<PulumiService>("pulumiModuleService")

  const logIdentifier =
    await pulumiService.retrieveAppStackLogIdentifier(stackName)

  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  }

  res.writeHead(200, headers)

  let isOpen = true
  let nextToken: string | undefined

  if (!logIdentifier) {
    throw new Error("Log information not found for the build")
  }

  req.on("close", () => {
    isOpen = false
  })

  do {
    // This event can max contain 10000 events
    const events: any[] = []

    let caughtUp = false

    console.log("getting new events")

    do {
      const logs = await pulumiService.filterLogs(logIdentifier, nextToken)

      console.log("nextToken", nextToken)
      console.log("new events", logs.events?.length)

      for (const log of logs.events ?? []) {
        events.push(log)

        // Make sure we only have the last 10000 events
        if (events.length > 100) {
          events.shift()
        }
      }

      if (logs.nextToken) {
        nextToken = logs.nextToken
      } else {
        caughtUp = true
      }
    } while (!caughtUp)

    for (const event of events ?? []) {
      res.write("data: " + JSON.stringify(event) + "\n\n")
    }

    await new Promise((resolve) => setTimeout(resolve, 2000)) // For example, wait for 2 seconds
  } while (isOpen)

  // We broke out of the loop if we got here
  isOpen = false
  res.end()
}
