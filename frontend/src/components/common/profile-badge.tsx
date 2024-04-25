import { Text, Avatar } from "@medusajs/ui";

export async function ProfileBadge() {
  const user = (
    <div className="flex gap-2 items-center">
      <Text className="text-sm">Victor</Text>

      <Avatar
        src="https://robohash.org/medusa-eats"
        fallback="V"
        className="bg-ui-bg-base cursor-pointer"
      />
    </div>
  );
}
