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
import Account from "./account"
import AccountUser from "./account-user"

const TABLE_NAME = "platform.external_user"

const deletedAtIndexName = "IDX_e_user_deleted_at"
const deletedAtIndexStatement = createPsqlIndexStatementHelper({
  name: deletedAtIndexName,
  tableName: `platform"."${TABLE_NAME.split(".")[1]}`,
  columns: "deleted_at",
  where: "deleted_at IS NOT NULL",
}).expression

@Entity({ tableName: TABLE_NAME })
@Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
export default class User {
  @PrimaryKey({ columnType: "text" })
  id: string

  @Property({ columnType: "text", nullable: true })
  first_name: string | null = null

  @Property({ columnType: "text", nullable: true })
  last_name: string | null = null

  @Property({ columnType: "text" })
  email: string

  @ManyToMany({
    entity: () => Account,
    pivotEntity: () => AccountUser,
  })
  accounts = new Collection<Account>(this)

  @Property({ columnType: "text", nullable: true })
  last_used_account_id: string | null = null

  @Property({
    onCreate: () => new Date(),
    columnType: "timestamptz",
    defaultRaw: "now()",
  })
  created_at: Date

  @Index({
    name: deletedAtIndexName,
    expression: deletedAtIndexStatement,
  })
  @Property({ columnType: "timestamptz", nullable: true })
  deleted_at: Date | null = null

  @BeforeCreate()
  onCreate() {
    this.id = generateEntityId(this.id, "eusr")
  }

  @OnInit()
  onInit() {
    this.id = generateEntityId(this.id, "eusr")
  }
}
