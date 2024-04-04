import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { IEventBusModuleService } from "@medusajs/types"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    console.log("ECS Notification Received")
    console.log(JSON.stringify(req.body, null, 2))
  } catch (error) {
    console.error(error)
  }

  // const eventBusModule = req.scope.resolve<IEventBusModuleService>(
  //   ModuleRegistrationName.EVENT_BUS,
  // );

  // await eventBusModule.emit("ecs.notification-received", { });

  res.sendStatus(200)
}
