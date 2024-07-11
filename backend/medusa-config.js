const { defineConfig, loadEnv } = require("@medusajs/utils");

loadEnv(process.env.NODE_ENV || "development", process.cwd());

// CORS when consuming Medusa from admin
// Medusa's docs are added for a better learning experience. Feel free to remove.
const ADMIN_CORS = `${
  process.env.ADMIN_CORS?.length
    ? `${process.env.ADMIN_CORS},`
    : "http://localhost:7000,http://localhost:7001,"
}https://docs.medusajs.com,https://medusa-docs-v2-git-docs-v2-medusajs.vercel.app,https://medusa-resources-git-docs-v2-medusajs.vercel.app`;

// CORS to avoid issues when consuming Medusa from a client
// Medusa's docs are added for a better learning experience. Feel free to remove.
const STORE_CORS = `${
  process.env.STORE_CORS?.length
    ? `${process.env.STORE_CORS},`
    : "http://localhost:8000,"
}https://docs.medusajs.com,https://medusa-docs-v2-git-docs-v2-medusajs.vercel.app,https://medusa-resources-git-docs-v2-medusajs.vercel.app`;

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-eats";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

export default defineConfig({
  admin: {
    backendUrl: "http://localhost:9000",
  },
  projectConfig: {
    databaseUrl: DATABASE_URL,
    http: {
      storeCors: STORE_CORS,
      adminCors: ADMIN_CORS,
      authCors: process.env.AUTH_CORS || ADMIN_CORS,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    redisUrl: REDIS_URL,
  },
  modules: {
    restaurantModuleService: {
      resolve: "./modules/restaurant",
      definition: {
        key: "restaurantModuleService",
        isQueryable: true,
      },
    },
    deliveryModuleService: {
      resolve: "./modules/delivery",
      definition: {
        key: "deliveryModuleService",
        isQueryable: true,
      },
    },
  },
});
