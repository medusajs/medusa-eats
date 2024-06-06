import { generateEntityId } from "@medusajs/utils";
import {
  BeforeCreate,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import Restaurant from "./restaurant";

@Entity()
export default class RestaurantAdmin {
  @PrimaryKey({ columnType: "text" })
  id!: string;

  @Property({ columnType: "text" })
  first_name!: string;

  @Property({ columnType: "text" })
  last_name!: string;

  @ManyToOne(() => Restaurant)
  restaurant!: Restaurant;

  @Property({ columnType: "text" })
  email!: string;

  @Property({ columnType: "timestamptz", defaultRaw: "now()", type: "date" })
  created_at = new Date();

  @Property({ onUpdate: () => new Date(), type: "date" })
  updated_at = new Date();

  @BeforeCreate()
  onCreate() {
    this.id = generateEntityId(this.id, "resadm");
  }
}
