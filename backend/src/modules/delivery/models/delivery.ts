import { generateEntityId } from "@medusajs/utils"
import {
  AfterCreate,
  AfterUpdate,
  BeforeCreate,
  Entity,
  Enum,
  PrimaryKey,
  Property,
} from "@mikro-orm/core"
import { DeliveryStatus } from "../../../types/delivery/common"

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

  @Enum({
    columnType: "enum",
    items: () => DeliveryStatus,
    default: "pending",
  })
  delivery_status!: DeliveryStatus

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

  @AfterUpdate()
  async onStatusUpdate() {
    if (
      this.delivery_status === DeliveryStatus.DELIVERED &&
      !this.delivered_at
    ) {
      this.delivered_at = new Date()
    }
  }
}
