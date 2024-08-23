import { Migration } from '@mikro-orm/migrations';

export class Migration20240822135920 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "restaurant" ("id" text not null, "handle" text not null, "is_open" boolean not null default false, "name" text not null, "description" text null, "phone" text not null, "email" text not null, "address" text not null, "image_url" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "restaurant_pkey" primary key ("id"));');

    this.addSql('create table if not exists "restaurant_admin" ("id" text not null, "first_name" text not null, "last_name" text not null, "restaurant_id" text not null, "email" text not null, "avatar_url" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "restaurant_admin_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "restaurant" cascade;');

    this.addSql('drop table if exists "restaurant_admin" cascade;');
  }

}
