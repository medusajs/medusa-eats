const { Modules } = require("@medusajs/modules-sdk")
const dotenv = require("dotenv")
dotenv.config()

const ADMIN_CORS =
  process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001"

const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000"

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://postgres@localhost/medusa-food"

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379"

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  `@medusajs/admin`,
]

const modules = {
  restaurantModuleService: {
    resolve: "./dist/modules/restaurant",
  },
  deliveryModuleService: {
    resolve: "./dist/modules/delivery",
  },
  [Modules.EVENT_BUS]: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL,
    },
  },
  [Modules.AUTH]: {
    scope: "internal",
    resources: "shared",
    resolve: "@medusajs/auth",
    options: {
      providers: [
        {
          name: "emailpass",
          scopes: {
            admin: {},
            store: {},
            restaurant: {},
            driver: {},
            customer: {},
          },
        },
      ],
    },
  },
  [Modules.USER]: {
    scope: "internal",
    resources: "shared",
    resolve: "@medusajs/user",
    options: {
      jwt_secret: process.env.JWT_SECRET,
    },
  },
  [Modules.CACHE]: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL,
    },
  },
  [Modules.STOCK_LOCATION]: {
    resolve: "@medusajs/stock-location-next",
    options: {},
  },
  [Modules.INVENTORY]: {
    resolve: "@medusajs/inventory-next",
    options: {},
  },
  [Modules.PRODUCT]: true,
  [Modules.PRICING]: true,
  [Modules.PROMOTION]: true,
  [Modules.CUSTOMER]: true,
  [Modules.SALES_CHANNEL]: true,
  [Modules.CART]: true,
  [Modules.WORKFLOW_ENGINE]: {
    resolve: "@medusajs/workflow-engine-redis",
    options: {
      redis: {
        url: REDIS_URL,
      },
    },
  },
  [Modules.REGION]: true,
  [Modules.ORDER]: true,
  [Modules.API_KEY]: true,
  [Modules.STORE]: true,
  [Modules.TAX]: true,
  [Modules.CURRENCY]: true,
  [Modules.PAYMENT]: true,
  [Modules.FULFILLMENT]: {
    /** @type {import('@medusajs/fulfillment').FulfillmentModuleOptions} */
    options: {
      providers: [
        {
          resolve: "@medusajs/fulfillment-manual",
          options: {
            config: {
              "test-provider": {},
            },
          },
        },
      ],
    },
  },
}

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  database_driver_options: DATABASE_URL.includes("localhost")
    ? {}
    : {
        connection: {
          ssl: { rejectUnauthorized: false },
        },
        idle_in_transaction_session_timeout: 20000,
      },
  admin_cors: ADMIN_CORS,
  redis_url: REDIS_URL,
}

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
  featureFlags: {
    medusa_v2: true,
  },
}
