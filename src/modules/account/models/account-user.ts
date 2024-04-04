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
import User from "./user"
import Account from "./account"

const TABLE_NAME = "platform.account_user"

const deletedAtIndexName = "IDX_account_user_deleted_at"
const deletedAtIndexStatement = createPsqlIndexStatementHelper({
  name: deletedAtIndexName,
  tableName: `platform"."${TABLE_NAME.split(".")[1]}`,
  columns: "deleted_at",
  where: "deleted_at IS NOT NULL",
}).expression

@Entity({ tableName: TABLE_NAME })
@Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
export default class AccountUser {
  @PrimaryKey({ columnType: "text" })
  id!: string

  @ManyToOne(() => User, {
    mapToPk: true,
    type: "text",
    fieldName: "user_id",
    onDelete: "cascade",
  })
  user_id: string

  @ManyToOne(() => Account, {
    mapToPk: true,
    type: "text",
    fieldName: "account_id",
    onDelete: "cascade",
  })
  account_id: string

  @ManyToOne({ entity: () => User, persist: false })
  user: User

  @ManyToOne({ entity: () => Account, persist: false })
  account: Account

  @Property({ columnType: "text", nullable: true })
  role: string | null = null

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
    this.id = generateEntityId(this.id, "accu")
  }

  @OnInit()
  onInit() {
    this.id = generateEntityId(this.id, "accu")
  }
}
