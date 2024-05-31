import {
  EllipsisHorizontal,
  PencilSquare,
  Trash,
  XCircleSolid,
} from "@medusajs/icons";
import { DropdownMenu, IconButton } from "@medusajs/ui";
import { DriverDTO } from "src/types/delivery/common";

const DriverActionsMenu = ({ driver }: { driver: DriverDTO }) => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <IconButton variant="transparent">
          <EllipsisHorizontal />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item className="gap-x-2">
          <PencilSquare className="text-ui-fg-subtle" />
          Edit
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item className="gap-x-2 text-ui-tag-red-text">
          <XCircleSolid className="text-ui-tag-red-icon" />
          Fire {driver.first_name}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

export default DriverActionsMenu;
