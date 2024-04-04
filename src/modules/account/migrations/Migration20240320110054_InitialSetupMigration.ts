import { Migration } from "@mikro-orm/migrations"

export class Migration20240320110054_InitialSetupMigration extends Migration {
  async up(): Promise<void> {
    this.addSql('create schema if not exists "platform";')

    this.addSql(
      'create table if not exists "platform"."account" ("id" text not null, "name" text not null, "billing_email" text not null, "created_at" timestamptz not null default now(), "created_by" text null, "deleted_at" timestamptz null, constraint "account_pkey" primary key ("id"));'
    )
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "IDX_account_deleted_at" ON "platform"."account" (deleted_at) WHERE deleted_at IS NOT NULL;'
    )

    this.addSql(
      'create table if not exists "platform"."account_invite" ("id" text not null, "account_id" text not null, "role" text null, "email" text null, "expires_at" timestamptz not null, "accepted_at" timestamptz null, "metadata" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, "created_by" text null, constraint "account_invite_pkey" primary key ("id"));'
    )
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "IDX_account_invite_deleted_at" ON "platform"."account_invite" (deleted_at) WHERE deleted_at IS NOT NULL;'
    )

    this.addSql(
      'create table if not exists "platform"."external_user" ("id" text not null, "first_name" text null, "last_name" text null, "email" text not null, "last_used_account_id" text null, "created_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "external_user_pkey" primary key ("id"));'
    )
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "IDX_e_user_deleted_at" ON "platform"."external_user" (deleted_at) WHERE deleted_at IS NOT NULL;'
    )

    this.addSql(
      'create table if not exists "platform"."account_user" ("id" text not null, "user_id" text not null, "account_id" text not null, "role" text null, "metadata" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, "created_by" text null, constraint "account_user_pkey" primary key ("id"));'
    )
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "IDX_account_user_deleted_at" ON "platform"."account_user" (deleted_at) WHERE deleted_at IS NOT NULL;'
    )

    this.addSql(
      'alter table if exists "platform"."account_invite" add constraint "account_invite_account_id_foreign" foreign key ("account_id") references "platform"."account" ("id") on update cascade on delete cascade;'
    )

    this.addSql(
      'alter table if exists "platform"."account_user" add constraint "account_user_user_id_foreign" foreign key ("user_id") references "platform"."external_user" ("id") on update cascade on delete cascade;'
    )
    this.addSql(
      'alter table if exists "platform"."account_user" add constraint "account_user_account_id_foreign" foreign key ("account_id") references "platform"."account" ("id") on update cascade on delete cascade;'
    )
  }
}
