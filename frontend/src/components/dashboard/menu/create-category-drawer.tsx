"use client";

import { Button, Drawer, Text } from "@medusajs/ui";
import { Plus } from "@medusajs/icons";
import { RestaurantDTO } from "@backend/src/types/restaurant/common";

export function CreateCategoryDrawer({
  restaurant,
}: {
  restaurant: RestaurantDTO;
}) {
  return (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button
          variant="secondary"
          size="large"
          onClick={() => console.log("Create category")}
        >
          <Plus />
          Create Category
        </Button>
      </Drawer.Trigger>
      <Drawer.Content className="z-50">
        <Drawer.Header>
          <Drawer.Title>Creat Menu Category</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className="p-4">
          <Text>
            This is where you create a new category for your restaurant&apos;s
            menu
          </Text>
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button variant="secondary">Cancel</Button>
          </Drawer.Close>
          <Button>Save</Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}
