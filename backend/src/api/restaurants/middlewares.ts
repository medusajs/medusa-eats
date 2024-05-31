import { MiddlewareRoute } from "@medusajs/medusa";
import { authenticate } from "@medusajs/medusa/dist/utils/";

export const restaurantAdminMiddlewares: MiddlewareRoute[] = [
  {
    method: ["POST"],
    matcher: "/restaurants/:id/products",
    middlewares: [
      authenticate(["restaurant", "admin"], "bearer", {
        allowUnregistered: true,
      }),
    ],
  },
];
