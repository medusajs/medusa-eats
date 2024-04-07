import {
  createPsqlIndexStatementHelper,
  DALUtils,
  generateEntityId,
} from "@medusajs/utils"

import {
  BeforeCreate,
  Collection,
  Entity,
  Filter,
  Index,
  ManyToMany,
  OnInit,
  PrimaryKey,
  Property,
} from "@mikro-orm/core"
import AccountUser from "./account-user"
import User from "./user"

const TABLE_NAME = "platform.account"

const deletedAtIndexName = "IDX_account_deleted_at"
const deletedAtIndexStatement = createPsqlIndexStatementHelper({
  name: deletedAtIndexName,
  tableName: `platform"."${TABLE_NAME.split(".")[1]}`,
  columns: "deleted_at",
  where: "deleted_at IS NOT NULL",
}).expression

@Entity({ tableName: TABLE_NAME })
@Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
export default class Account {
  @PrimaryKey({ columnType: "text" })
  id: string

  @Property({ columnType: "text" })
  name: string

  @Property({ columnType: "text" })
  billing_email: string

  @ManyToMany({
    mappedBy: "accounts",
    entity: () => User,
    pivotEntity: () => AccountUser,
  })
  users = new Collection<User>(this)

  @Property({
    onCreate: () => new Date(),
    columnType: "timestamptz",
    defaultRaw: "now()",
  })
  created_at: Date

  @Property({ columnType: "text", nullable: true })
  created_by: string | null = null

  @Index({
    name: deletedAtIndexName,
    expression: deletedAtIndexStatement,
  })
  @Property({ columnType: "timestamptz", nullable: true })
  deleted_at: Date | null = null

  @BeforeCreate()
  onCreate() {
    this.id = generateEntityId(this.id, "acc")
  }

  @OnInit()
  onInit() {
    this.id = generateEntityId(this.id, "acc")
  }
}
