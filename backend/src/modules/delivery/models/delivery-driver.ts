import { DALUtils, generateEntityId } from "@medusajs/utils";
import {
  BeforeCreate,
  Entity,
  Filter,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";

@Entity()
@Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
export default class DeliveryDriver {
  @PrimaryKey({ columnType: "text" })
  id!: string;

  @Property({ columnType: "text" })
  delivery_id!: string;

  @Property({ columnType: "text" })
  driver_id!: string;

  @Property({ columnType: "timestamptz", defaultRaw: "now()", type: "date" })
  created_at = new Date();

  @Property({
    columnType: "timestamptz",
    onUpdate: () => new Date(),
    type: "date",
  })
  updated_at = new Date();

  @Property({ columnType: "timestamptz", nullable: true, type: "date" })
  deleted_at?: Date;

  @BeforeCreate()
  onCreate() {
    this.id = generateEntityId(this.id, "deldrv");
  }
}
