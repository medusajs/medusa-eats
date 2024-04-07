import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { IEventBusModuleService } from "@medusajs/types"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    console.log(JSON.stringify(req.body, null, 2))
  } catch (error) {
    console.error(error)
  }

  const buildId = req.body.detail["build-id"]
  const buildStatus = req.body.detail["build-status"]

  const eventBusModule = req.scope.resolve<IEventBusModuleService>(
    ModuleRegistrationName.EVENT_BUS
  )

  await eventBusModule.emit("code-build.status-changed", {
    status: buildStatus,
    build_arn: buildId,
  })

  res.sendStatus(200)
}
