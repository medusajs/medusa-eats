import { DriverDTO } from "@backend/src/types/delivery/common";
import { RestaurantAdminDTO } from "@backend/src/types/restaurant/common";
import { Text, Avatar, Button } from "@medusajs/ui";
import { Link } from "next-view-transitions";

type ProfileBadgeProps = { user?: RestaurantAdminDTO | DriverDTO };

export function ProfileBadge({ user }: ProfileBadgeProps) {
  const dashboardPath = user
    ? user.hasOwnProperty("restaurant")
      ? "/dashboard/restaurant"
      : "/dashboard/driver"
    : "/dashboard/login";

  return (
    <Link href={dashboardPath} className="flex gap-2 items-center">
      <Button size="large" variant="transparent" className="group">
        <>
          <Text className="text-sm text-ui-bg-base group-hover:text-ui-fg-base">
            {user ? `${user.first_name} ${user.last_name}` : "Login"}
          </Text>
          {user && (
            <Avatar
              src={`https://robohash.org/${user.id}?size=40x40&set=set1&bgset=bg1`}
              fallback={user.first_name[0] + user.last_name[0]}
              className="bg-ui-bg-base cursor-pointer"
            />
          )}
        </>
      </Button>
    </Link>
  );
}
