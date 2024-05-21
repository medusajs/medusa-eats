"use client";

import { StatusBadge } from "@medusajs/ui";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

export default function RealtimeClient({
  restaurantId,
  driverId,
  deliveryId,
  revalidate,
}: {
  restaurantId?: string;
  driverId?: string;
  deliveryId?: string;
  revalidate: (tag: string) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  let serverUrl = "http://localhost:9000/deliveries/subscribe";

  if (restaurantId) {
    serverUrl += `?restaurant_id=${restaurantId}`;
  }

  if (driverId) {
    serverUrl += `?driver_id=${driverId}`;
  }

  if (deliveryId) {
    serverUrl += `?delivery_id=${deliveryId}`;
  }

  useEffect(() => {
    const source = new EventSource(serverUrl);
    const audio = new Audio("/notification.mp3");

    source.onmessage = (message: Record<string, any>) => {
      const data = JSON.parse(message.data);

      console.log("Realtime event", data);

      revalidate("deliveries");
      data.new && audio.play();

      startTransition(() => {
        router.refresh();
      });
    };

    return () => {
      source.close();
    };
  }, []);

  if (isPending) {
    return (
      <StatusBadge color="orange" className="flex pl-1 pr-2 py-1 gap-1 w-fit">
        {deliveryId ? "Syncing your order status" : "Syncing deliveries"}
        <span className="animate-ping inline-flex h-1 w-1 rounded-full bg-orange-400 opacity-75 ml-2"></span>
      </StatusBadge>
    );
  }

  return (
    <div>
      <StatusBadge color="green" className="flex pl-1 pr-2 py-1 gap-1 w-fit">
        {deliveryId ? "Order status updated" : "All deliveries up to date"}
      </StatusBadge>
    </div>
  );
}
