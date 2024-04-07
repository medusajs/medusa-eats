import { generateEntityId } from "@medusajs/utils"
import { BeforeCreate, Entity, PrimaryKey, Property } from "@mikro-orm/core"

@Entity()
export default class Restaurant {
  @PrimaryKey({ columnType: "text" })
  id!: string

  @Property({ columnType: "text" })
  name!: string

  @Property({ columnType: "text" })
  address!: string

  @Property({ columnType: "text" })
  phone!: string

  @Property({ columnType: "text" })
  email!: string

  @Property({ columnType: "text", nullable: true })
  image_url?: string

  @Property({ columnType: "timestamptz", defaultRaw: "now()", type: "date" })
  created_at = new Date()

  @Property({ onUpdate: () => new Date(), type: "date" })
  updated_at = new Date()

  @BeforeCreate()
  onCreate() {
    this.id = generateEntityId(this.id, "res")
  }
}
