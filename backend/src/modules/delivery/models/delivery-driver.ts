import { Entity, PrimaryKey } from "@mikro-orm/core"

@Entity()
export default class DeliveryDriver {
  @PrimaryKey({ columnType: "text" })
  delivery_id!: string

  @PrimaryKey({ columnType: "text" })
  driver_id!: string
}
