import { generateEntityId } from "@medusajs/utils"
import {
  BeforeCreate,
  Entity,
  Enum,
  PrimaryKey,
  Property,
} from "@mikro-orm/core"

@Entity()
export default class Delivery {
  @PrimaryKey({ columnType: "text" })
  id!: string

  @Property({ columnType: "text" })
  transaction_id!: string

  @Property({ columnType: "text", nullable: true })
  driver_id: string

  @Property({ columnType: "text" })
  restaurant_id!: string

  @Property({ columnType: "text", nullable: true })
  cart_id: string

  @Property({ columnType: "text", nullable: true })
  order_id: string

  @Property({ columnType: "timestamptz", nullable: true })
  delivered_at: Date

  @Property({ columnType: "text" })
  delivery_address!: string

  @Enum({
    columnType: "enum",
    items: () => [
      "pending",
      "declined",
      "accepted",
      "ready_for_pickup",
      "in_transit",
      "delivered",
    ],
    default: "pending",
  })
  delivery_status!:
    | "pending"
    | "declined"
    | "accepted"
    | "ready_for_pickup"
    | "in_transit"
    | "delivered"

  @Property({ columnType: "timestamptz", type: "date", nullable: true })
  eta: Date

  @Property({ columnType: "timestamptz", defaultRaw: "now()", type: "date" })
  created_at = new Date()

  @Property({ onUpdate: () => new Date(), type: "date" })
  updated_at = new Date()

  @BeforeCreate()
  onCreate() {
    this.id = generateEntityId(this.id, "del")
  }
}
