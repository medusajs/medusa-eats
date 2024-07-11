import { Migration } from '@mikro-orm/migrations';

export class Migration20240711123651 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "delivery" ("id" text not null, "transaction_id" text not null, "driver_id" text null, "restaurant_id" text not null, "cart_id" text not null, "order_id" text null, "delivery_status" text check ("delivery_status" in (\'pending\', \'restaurant_declined\', \'restaurant_accepted\', \'pickup_claimed\', \'restaurant_preparing\', \'ready_for_pickup\', \'in_transit\', \'delivered\')) not null default \'pending\', "eta" timestamptz null, "delivered_at" timestamptz null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "delivery_pkey" primary key ("id"));');

    this.addSql('create table if not exists "delivery_driver" ("id" text not null, "delivery_id" text not null, "driver_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "delivery_driver_pkey" primary key ("id"));');

    this.addSql('create table if not exists "driver" ("id" text not null, "first_name" text not null, "last_name" text not null, "email" text not null, "phone" text not null, "avatar_url" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "driver_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "delivery" cascade;');

    this.addSql('drop table if exists "delivery_driver" cascade;');

    this.addSql('drop table if exists "driver" cascade;');
  }

}
