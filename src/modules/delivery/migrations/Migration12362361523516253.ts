import { Migration } from "@mikro-orm/migrations"

export class Migration20240404150005 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "delivery" ("id" text not null, "delivered_at" timestamptz not null, "delivery_address" text not null, "delivery_status" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null, primary key ("id"));'
    )
    this.addSql(
      'alter table "delivery" add constraint "delivery_id_check" check ("id" ~ \'^del\');'
    )
    this.addSql(
      'create table "driver" ("id" text not null, "first_name" text not null, "last_name" text not null, "email" text not null, "phone" text not null, "avatar_url" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null, primary key ("id"));'
    )
    this.addSql(
      'alter table "driver" add constraint "driver_id_check" check ("id" ~ \'^drv\');'
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "driver" cascade;')
    this.addSql('drop table if exists "delivery" cascade;')
  }
}
