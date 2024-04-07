import { Entity, PrimaryKey } from "@mikro-orm/core"

@Entity()
export default class RestaurantProduct {
  @PrimaryKey({ columnType: "text" })
  restaurant_id!: string

  @PrimaryKey({ columnType: "text" })
  product_id!: string
}
