import { Migration } from '@mikro-orm/migrations';

export class Migration20240522090758 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "delivery" ("id" text not null, "transaction_id" text not null, "driver_id" text null, "restaurant_id" text not null, "cart_id" text null, "order_id" text null, "delivered_at" timestamptz null, "delivery_status" text check ("delivery_status" in (\'pending\', \'restaurant_declined\', \'restaurant_accepted\', \'pickup_claimed\', \'restaurant_preparing\', \'ready_for_pickup\', \'in_transit\', \'delivered\')) not null default \'pending\', "eta" timestamptz null, "created_at" timestamptz not null default now(), "updated_at" timestamptz(0) not null, constraint "delivery_pkey" primary key ("id"));');

    this.addSql('create table if not exists "delivery_driver" ("delivery_id" text not null, "driver_id" text not null, constraint "delivery_driver_pkey" primary key ("delivery_id", "driver_id"));');

    this.addSql('create table if not exists "driver" ("id" text not null, "first_name" text not null, "last_name" text not null, "email" text not null, "phone" text not null, "avatar_url" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz(0) not null, constraint "driver_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "delivery" cascade;');

    this.addSql('drop table if exists "delivery_driver" cascade;');

    this.addSql('drop table if exists "driver" cascade;');
  }

}
