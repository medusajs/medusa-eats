import { ModulesSdkUtils } from "@medusajs/utils"
import { MikroOrmBaseRepository } from "@medusajs/utils"
import * as Models from "./models"
import Service from "./service"

const moduleName = "restaurant"
const pathToMigrations = __dirname + "/migrations"

const containerLoader = ModulesSdkUtils.moduleContainerLoaderFactory({
  moduleModels: Models,
  moduleRepositories: { BaseRepository: MikroOrmBaseRepository },
  moduleServices: [Service],
})

const connectionLoader = ModulesSdkUtils.mikroOrmConnectionLoaderFactory({
  moduleName,
  moduleModels: Object.values(Models),
  migrationsPath: pathToMigrations,
})

const migrationScriptOptions = {
  moduleName,
  models: Models,
  pathToMigrations,
}

export const runMigrations = ModulesSdkUtils.buildMigrationScript(
  migrationScriptOptions
)

export default {
  service: Service,
  loaders: [containerLoader, connectionLoader],
  runMigrations,
}
