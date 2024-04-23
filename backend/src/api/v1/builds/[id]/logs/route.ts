import { MedusaResponse } from "@medusajs/medusa"
import { AccountScopedMedusaRequest } from "../../../types"
import ProjectModuleService from "../../../../../modules/project/service"
import PulumiService from "../../../../../modules/pulumi/service"

export const GET = async (
  req: AccountScopedMedusaRequest,
  res: MedusaResponse
) => {
  const { account_id } = req
  const { id } = req.params

  const projectService = req.scope.resolve<ProjectModuleService>(
    "projectModuleService"
  )
  const pulumiService = req.scope.resolve<PulumiService>("pulumiModuleService")

  const [build] = await projectService.listBuilds(
    {
      id,
      environment: { project: { account_id } },
    },
    {
      select: ["id", "external_build_id"],
      take: 1,
    }
  )

  if (!build || !build.external_build_id) {
    return res.status(404).json({ message: "Build not found" })
  }

  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  }

  res.writeHead(200, headers)

  let isOpen = true
  let nextToken: string | undefined

  const codeBuild = await pulumiService.retrieveBuild(build.external_build_id)

  const logInfo = codeBuild.logs
  if (!logInfo || !logInfo.groupName || !logInfo.streamName) {
    res.write(
      "data: No logs found. If you just started a build, try again shortly.\n\n"
    )
    return res.end()
  }

  if (codeBuild.buildComplete) {
    isOpen = false
  }

  req.on("close", () => {
    isOpen = false
  })

  do {
    console.log("In log loop /logs")
    const logs = await pulumiService.getLogs(
      logInfo.groupName,
      logInfo.streamName,
      nextToken
    )

    for (const event of logs.events ?? []) {
      res.write("data: " + JSON.stringify(event) + "\n\n")
    }

    nextToken = logs.nextForwardToken
    await new Promise((resolve) => setTimeout(resolve, 2000)) // For example, wait for 2 seconds
  } while (isOpen)

  // We broke out of the loop if we got here
  isOpen = false
  res.end()
}
