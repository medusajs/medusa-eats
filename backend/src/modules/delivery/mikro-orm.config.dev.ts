import path from "path";
import { TSMigrationGenerator } from "@medusajs/utils";
import * as entities from "./models";

module.exports = {
  entities: Object.values(entities),
  schema: "public",
  clientUrl: "postgres://postgres@localhost/medusa-food",
  type: "postgresql",
  migrations: {
    path: path.join(__dirname, "migrations"),
    generator: TSMigrationGenerator,
  },
};
