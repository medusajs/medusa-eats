import path from "path"
import * as entities from "./models"
import { TSMigrationGenerator } from "@medusajs/utils"

module.exports = {
  entities: Object.values(entities),
  schema: "public",
  clientUrl: "postgres://postgres@localhost/medusa-food",
  type: "postgresql",
  migrations: {
    path: path.join(__dirname, "migrations"),
    generator: TSMigrationGenerator,
  },
}
