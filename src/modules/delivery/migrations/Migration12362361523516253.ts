import { Migration } from "@mikro-orm/migrations"

export class Migration20240404150006 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "delivery" ("id" text not null, "transaction_id" text not null, "driver_id" text null, "restaurant_id" text not null, "cart_id" text not null, "order_id" text not null, "delivered_at" timestamptz null, "delivery_address" text not null, "delivery_status" text not null, "eta" timestamptz null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null, primary key ("id"));'
    )
    this.addSql(
      'alter table "delivery" add constraint "delivery_id_check" check ("id" ~ \'^del\');'
    )
    this.addSql(
      'alter table "delivery" add constraint "delivery_driver_id_foreign" foreign key ("driver_id") references "driver" ("id") on update cascade;'
    )
    this.addSql(
      'alter table "delivery" add constraint "delivery_restaurant_id_foreign" foreign key ("restaurant_id") references "restaurant" ("id") on update cascade;'
    )
    this.addSql(
      'alter table "delivery" add constraint "delivery_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;'
    )
    this.addSql(
      'alter table "delivery" add constraint "delivery_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade;'
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "delivery" cascade;')
  }
}
