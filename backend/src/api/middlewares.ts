import { defineMiddlewares } from "@medusajs/medusa";
import { authenticate } from "@medusajs/medusa/dist/utils";

const isAllowed = (req, res, next) => {
  const { restaurant_id, driver_id } = req.auth_context.app_metadata;

  if (restaurant_id || driver_id) {
    const user = {
      actor_type: restaurant_id ? "restaurant" : "driver",
      user_id: restaurant_id || driver_id,
    };

    req.user = user;

    next();
  } else {
    res.status(403).json({
      message:
        "Forbidden. Reason: No restaurant_id or driver_id in app_metadata",
    });
  }
};

export default defineMiddlewares({
  routes: [
    {
      method: ["GET"],
      matcher: "/store/users/me",
      middlewares: [
        authenticate(["driver", "restaurant"], "bearer"),
        isAllowed,
      ],
    },
    {
      method: ["POST"],
      matcher: "/store/users",
      middlewares: [
        authenticate(["driver", "restaurant"], "bearer", {
          allowUnregistered: true,
        }),
      ],
    },
    {
      method: ["POST", "DELETE"],
      matcher: "/store/restaurants/:id/**",
      middlewares: [authenticate(["restaurant", "admin"], "bearer")],
    },
    {
      matcher: "/store/restaurants/:id/admin/**",
      middlewares: [authenticate(["restaurant", "admin"], "bearer")],
    },
  ],
});
