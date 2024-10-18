import { loadEnv, defineConfig, Modules } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

module.exports = defineConfig({
  admin: {
    backendUrl: "https://medusa-eats.medusajs.app",
  },
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS,
      adminCors: process.env.ADMIN_CORS,
      authCors: process.env.AUTH_CORS,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: {
    restaurantModuleService: {
      resolve: "./modules/restaurant",
    },
    deliveryModuleService: {
      resolve: "./modules/delivery",
    },
    [Modules.FULFILLMENT]: {
      options: {
        providers: [
          {
            resolve: "@medusajs/fulfillment-manual",
            id: "manual-provider",
          },
        ],
      },
    },
  },
});
