"use client";

import { RestaurantDTO } from "@backend/src/types/restaurant/common";
import { setRestaurantStatus } from "@frontend/lib/actions";
import { Switch } from "@medusajs/ui";
import { useState } from "react";

export default function RestaurantStatus({
  restaurant,
}: {
  restaurant: RestaurantDTO;
}) {
  const [isOpen, setIsOpen] = useState(restaurant.is_open);

  const handleStatusChange = async () => {
    setIsOpen(!isOpen);
    await setRestaurantStatus(restaurant.id, !isOpen);
  };

  return (
    <div className="flex items-center gap-x-2">
      <Switch
        id="manage-inventory"
        onCheckedChange={handleStatusChange}
        checked={isOpen}
      />
    </div>
  );
}
