import { generateEntityId } from "@medusajs/utils";
import { BeforeCreate, Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export default class DeliveryDriver {
  @Property({ columnType: "text" })
  id!: string;

  @PrimaryKey({ columnType: "text" })
  delivery_id!: string;

  @PrimaryKey({ columnType: "text" })
  driver_id!: string;

  @BeforeCreate()
  onCreate() {
    this.id = generateEntityId(this.id, "deldriv");
  }
}
