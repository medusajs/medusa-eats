import { Migration } from "@mikro-orm/migrations"

export class Migration20240404150004 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "restaurant_admin" ("id" text not null, "first_name" text not null, "last_name" text not null, "email" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null, primary key ("id"));'
    )
    this.addSql(
      'create table "restaurant" ("id" text not null, "name" text not null, "address" text not null, "phone" text not null, "email" text not null, "image_url" text null, "admin_id" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null, primary key ("id"));'
    )
    this.addSql(
      'create table "restaurant_product" ("restaurant_id" text not null, "product_id" text not null, primary key ("restaurant_id", "product_id"));'
    )
    this.addSql(
      'alter table "restaurant_admin" add constraint "restaurant_admin_id_check" check ("id" ~ \'^resadm\');'
    )
    this.addSql(
      'alter table "restaurant" add constraint "restaurant_id_check" check ("id" ~ \'^res\');'
    )
    this.addSql(
      'alter table "restaurant" add constraint "restaurant_admin_id_foreign" foreign key ("admin_id") references "restaurant_admin" ("id") on update cascade;'
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "restaurant_product" cascade;')
    this.addSql('drop table if exists "restaurant" cascade;')
    this.addSql('drop table if exists "restaurant_admin" cascade;')
  }
}
