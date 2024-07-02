import { model } from "@medusajs/utils";

export const Driver = model.define("Driver", {
  id: model.id({
    prefix: "drv",
  }),
  first_name: model.text(),
  last_name: model.text(),
  email: model.text(),
  phone: model.text(),
  avatar_url: model.text().nullable(),
});
