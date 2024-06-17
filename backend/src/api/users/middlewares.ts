import { MiddlewareRoute } from "@medusajs/medusa";
import { authenticate } from "@medusajs/medusa/dist/utils";

const logger = (req, res, next) => {
  console.log("Request to /users/me");
  console.log(req);
  next();
};

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

export const usersMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/users/me",
    middlewares: [authenticate(["driver", "restaurant"], "bearer"), isAllowed],
  },
  {
    method: ["POST"],
    matcher: "/users",
    middlewares: [
      authenticate(["driver", "restaurant"], "bearer", {
        allowUnregistered: true,
      }),
    ],
  },
];
