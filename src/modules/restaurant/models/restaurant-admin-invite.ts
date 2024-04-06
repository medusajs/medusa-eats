import {
  createPsqlIndexStatementHelper,
  DALUtils,
  generateEntityId,
} from "@medusajs/utils"
import {
  BeforeCreate,
  Entity,
  Filter,
  Index,
  ManyToOne,
  OnInit,
  PrimaryKey,
  Property,
} from "@mikro-orm/core"
import RestaurantAdmin from "./restaurant-admin"

const TABLE_NAME = "restaurant_admin_invite"

const deletedAtIndexName = "IDX_account_invite_deleted_at"
const deletedAtIndexStatement = createPsqlIndexStatementHelper({
  name: deletedAtIndexName,
  tableName: `platform"."${TABLE_NAME.split(".")[1]}`,
  columns: "deleted_at",
  where: "deleted_at IS NOT NULL",
}).expression

@Entity({ tableName: TABLE_NAME })
@Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
export default class RestaurantAdminInvite {
  @PrimaryKey({ columnType: "text" })
  id!: string

  @ManyToOne(() => RestaurantAdmin, {
    type: "text",
    fieldName: "account_id",
    mapToPk: true,
    onDelete: "cascade",
  })
  restaurant_admin_id: string

  @ManyToOne({ entity: () => RestaurantAdmin, persist: false })
  restaurant_admin: RestaurantAdmin

  @Property({ columnType: "text", nullable: true })
  role: string | null = null

  @Property({ columnType: "text", nullable: true })
  email: string | null = null

  @Property({ columnType: "timestamptz" })
  expires_at: Date

  @Property({ columnType: "timestamptz", nullable: true })
  accepted_at: Date | null = null

  @Property({ columnType: "jsonb", nullable: true })
  metadata: Record<string, unknown> | null = null

  @Property({
    onCreate: () => new Date(),
    columnType: "timestamptz",
    defaultRaw: "now()",
  })
  created_at: Date

  @Property({
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
    columnType: "timestamptz",
    defaultRaw: "now()",
  })
  updated_at: Date

  @Index({
    name: deletedAtIndexName,
    expression: deletedAtIndexStatement,
  })
  @Property({ columnType: "timestamptz", nullable: true })
  deleted_at: Date | null = null

  @Property({ columnType: "text", nullable: true })
  created_by: string | null = null

  @BeforeCreate()
  onCreate() {
    this.id = generateEntityId(this.id, "accin")
  }

  @OnInit()
  onInit() {
    this.id = generateEntityId(this.id, "accin")
  }
}
