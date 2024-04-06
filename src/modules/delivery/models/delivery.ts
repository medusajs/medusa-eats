import { Cart, Order } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/utils"
import {
  BeforeCreate,
  Entity,
  Enum,
  PrimaryKey,
  Property,
} from "@mikro-orm/core"
import { Restaurant } from "../../../modules/restaurant/models"
import { OneToOne } from "typeorm"
import Driver from "./driver"

@Entity()
export default class Delivery {
  @PrimaryKey({ columnType: "text" })
  id!: string

  @OneToOne(() => Driver)
  driver: Driver

  @OneToOne(() => Restaurant)
  restaurant!: Restaurant

  @OneToOne(() => Cart)
  cart: Cart

  @OneToOne(() => Order)
  order: Order

  @Property({ columnType: "timestamptz" })
  delivered_at?: Date

  @Property({ columnType: "text" })
  delivery_address!: string

  @Enum({
    columnType: "enum",
    items: () => [
      "pending",
      "preparing",
      "ready_for_pickup",
      "in_transit",
      "delivered",
    ],
    default: "pending",
  })
  delivery_status!:
    | "pending"
    | "preparing"
    | "ready_for_pickup"
    | "in_transit"
    | "delivered"

  @Property({ columnType: "timestamptz", type: "date" })
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
