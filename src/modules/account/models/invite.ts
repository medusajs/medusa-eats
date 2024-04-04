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
import Account from "./account"

const TABLE_NAME = "platform.account_invite"

const deletedAtIndexName = "IDX_account_invite_deleted_at"
const deletedAtIndexStatement = createPsqlIndexStatementHelper({
  name: deletedAtIndexName,
  tableName: `platform"."${TABLE_NAME.split(".")[1]}`,
  columns: "deleted_at",
  where: "deleted_at IS NOT NULL",
}).expression

@Entity({ tableName: TABLE_NAME })
@Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
export default class Invite {
  @PrimaryKey({ columnType: "text" })
  id!: string

  @ManyToOne(() => Account, {
    type: "text",
    fieldName: "account_id",
    mapToPk: true,
    onDelete: "cascade",
  })
  account_id: string

  @ManyToOne({ entity: () => Account, persist: false })
  account: Account

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
