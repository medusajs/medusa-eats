"use client";

import { DriverDTO, RestaurantAdminDTO } from "@frontend/lib/types";
import { logout } from "@frontend/lib/actions";
import { Avatar, Button, Text } from "@medusajs/ui";
import { Link } from "next-view-transitions";

type ProfileBadgeProps = {
  user?: RestaurantAdminDTO | DriverDTO;
};

export function ProfileBadge({ user }: ProfileBadgeProps) {
  const dashboardPath = user
    ? user.hasOwnProperty("restaurant_id")
      ? "/dashboard/restaurant"
      : "/dashboard/driver"
    : "/login";

  return (
    <div className="flex flex-col relative group w-fit">
      <Link href={dashboardPath} className="flex gap-2 items-center">
        <Button
          size="large"
          variant="transparent"
          className="group group-hover:bg-ui-bg-subtle-hover transition-none"
        >
          {user ? (
            <>
              <Text className="text-sm text-ui-bg-base group-hover:text-ui-fg-base hidden md:block">
                {`${user.first_name} ${user.last_name}`}
              </Text>
              <Avatar
                src={`https://robohash.org/${user.id}?size=40x40&set=set1&bgset=bg1`}
                fallback={user.first_name[0] + user.last_name[0]}
                className="bg-ui-bg-base cursor-pointer"
              />
            </>
          ) : (
            <>
              <Text className="text-sm text-ui-bg-base group-hover:text-ui-fg-base">
                Login
              </Text>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ui-bg-interactive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-ui-bg-interactive"></span>
              </span>
            </>
          )}
        </Button>
      </Link>
      {user && (
        <Button
          className="hidden group group-hover:block absolute top-10 bg-ui-bg-subtle-hover group w-full px-2 py-4 md:py-0 md:px-4 justify-start"
          size="large"
          variant="transparent"
          onClick={async () => logout()}
        >
          <Text className="text-sm hover:text-ui-fg-interactive-hover text-ui-fg-base text-left md:py-4">
            Logout
          </Text>
        </Button>
      )}
    </div>
  );
}
