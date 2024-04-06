import { BeforeCreate, Entity, PrimaryKey, Property } from "@mikro-orm/core"
import { generateEntityId } from "@medusajs/utils"

@Entity()
export default class Driver {
  @PrimaryKey({ columnType: "text" })
  id!: string

  @Property({ columnType: "text" })
  first_name!: string

  @Property({ columnType: "text" })
  last_name!: string

  @Property({ columnType: "text" })
  email!: string

  @Property({ columnType: "text" })
  phone!: string

  @Property({ columnType: "text" })
  avatar_url?: string

  @Property({ columnType: "timestamptz", defaultRaw: "now()", type: "date" })
  created_at = new Date()

  @Property({ onUpdate: () => new Date(), type: "date" })
  updated_at = new Date()

  @BeforeCreate()
  onCreate() {
    this.id = generateEntityId(this.id, "drv")
  }
}
