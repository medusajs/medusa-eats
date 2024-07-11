import { defineMikroOrmCliConfig } from "@medusajs/utils";
import path from "path";
import * as entities from "./models";

export default defineMikroOrmCliConfig("hello", {
  entities: Object.values(entities) as any[],
  migrations: {
    path: path.join(__dirname, "migrations"),
  },
});
