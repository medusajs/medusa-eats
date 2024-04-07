import * as entities from "./models"
import { TSMigrationGenerator } from "@medusajs/utils"

module.exports = {
  entities: Object.values(entities),
  schema: "public",
  clientUrl: "postgres://postgres@localhost/medusa-account",
  type: "postgresql",
  migrations: {
    generator: TSMigrationGenerator,
  },
}
