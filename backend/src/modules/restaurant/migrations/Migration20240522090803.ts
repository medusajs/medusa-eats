import { Migration } from '@mikro-orm/migrations';

export class Migration20240522090803 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "restaurant" ("id" text not null, "handle" text not null, "is_open" boolean not null default false, "name" text not null, "description" text null, "address" text not null, "phone" text not null, "email" text not null, "image_url" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz(0) not null, constraint "restaurant_pkey" primary key ("id"));');

    this.addSql('create table if not exists "restaurant_admin" ("id" text not null, "first_name" text not null, "last_name" text not null, "restaurant_id" text not null, "email" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz(0) not null, constraint "restaurant_admin_pkey" primary key ("id"));');
    this.addSql('alter table if exists "restaurant_admin" add constraint "restaurant_admin_restaurant_id_unique" unique ("restaurant_id");');

    this.addSql('create table if not exists "restaurant_product" ("restaurant_id" text not null, "product_id" text not null, constraint "restaurant_product_pkey" primary key ("restaurant_id", "product_id"));');

    this.addSql('alter table if exists "restaurant_admin" add constraint "restaurant_admin_restaurant_id_foreign" foreign key ("restaurant_id") references "restaurant" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "restaurant_admin" drop constraint if exists "restaurant_admin_restaurant_id_foreign";');

    this.addSql('drop table if exists "restaurant" cascade;');

    this.addSql('drop table if exists "restaurant_admin" cascade;');

    this.addSql('drop table if exists "restaurant_product" cascade;');
  }

}
