import { Migration } from '@mikro-orm/migrations';

export class Migration20240408100557 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table if exists "cart_line_item" drop constraint if exists "cart_line_item_cart_id_foreign";');

    this.addSql('alter table if exists "cart_shipping_method" drop constraint if exists "cart_shipping_method_cart_id_foreign";');

    this.addSql('alter table if exists "cart" drop constraint if exists "cart_billing_address_id_foreign";');

    this.addSql('alter table if exists "cart" drop constraint if exists "cart_shipping_address_id_foreign";');

    this.addSql('alter table if exists "cart_line_item_adjustment" drop constraint if exists "cart_line_item_adjustment_item_id_foreign";');

    this.addSql('alter table if exists "cart_line_item_tax_line" drop constraint if exists "cart_line_item_tax_line_item_id_foreign";');

    this.addSql('alter table if exists "cart_shipping_method_adjustment" drop constraint if exists "cart_shipping_method_adjustment_shipping_method_id_foreign";');

    this.addSql('alter table if exists "cart_shipping_method_tax_line" drop constraint if exists "cart_shipping_method_tax_line_shipping_method_id_foreign";');

    this.addSql('alter table if exists "customer_address" drop constraint if exists "customer_address_customer_id_foreign";');

    this.addSql('alter table if exists "customer_group_customer" drop constraint if exists "customer_group_customer_customer_id_foreign";');

    this.addSql('alter table if exists "customer_group_customer" drop constraint if exists "customer_group_customer_customer_group_id_foreign";');

    this.addSql('alter table if exists "fulfillment_item" drop constraint if exists "fulfillment_item_fulfillment_id_foreign";');

    this.addSql('alter table if exists "fulfillment_label" drop constraint if exists "fulfillment_label_fulfillment_id_foreign";');

    this.addSql('alter table if exists "fulfillment" drop constraint if exists "fulfillment_delivery_address_id_foreign";');

    this.addSql('alter table if exists "fulfillment" drop constraint if exists "fulfillment_provider_id_foreign";');

    this.addSql('alter table if exists "shipping_option" drop constraint if exists "shipping_option_provider_id_foreign";');

    this.addSql('alter table if exists "service_zone" drop constraint if exists "service_zone_fulfillment_set_id_foreign";');

    this.addSql('alter table if exists "product_images" drop constraint if exists "product_images_image_id_foreign";');

    this.addSql('alter table if exists "inventory_level" drop constraint if exists "inventory_level_inventory_item_id_foreign";');

    this.addSql('alter table if exists "reservation_item" drop constraint if exists "reservation_item_inventory_item_id_foreign";');

    this.addSql('alter table if exists "order_change" drop constraint if exists "order_change_order_id_foreign";');

    this.addSql('alter table if exists "order_item" drop constraint if exists "order_item_order_id_foreign";');

    this.addSql('alter table if exists "order_shipping_method" drop constraint if exists "order_shipping_method_order_id_foreign";');

    this.addSql('alter table if exists "order_transaction" drop constraint if exists "order_transaction_order_id_foreign";');

    this.addSql('alter table if exists "order" drop constraint if exists "order_billing_address_id_foreign";');

    this.addSql('alter table if exists "order" drop constraint if exists "order_shipping_address_id_foreign";');

    this.addSql('alter table if exists "order_change_action" drop constraint if exists "order_change_action_order_change_id_foreign";');

    this.addSql('alter table if exists "order_line_item" drop constraint if exists "order_line_item_totals_id_foreign";');

    this.addSql('alter table if exists "order_item" drop constraint if exists "order_item_item_id_foreign";');

    this.addSql('alter table if exists "order_line_item_adjustment" drop constraint if exists "order_line_item_adjustment_item_id_foreign";');

    this.addSql('alter table if exists "order_line_item_tax_line" drop constraint if exists "order_line_item_tax_line_item_id_foreign";');

    this.addSql('alter table if exists "order_shipping_method_adjustment" drop constraint if exists "order_shipping_method_adjustment_shipping_method_id_foreign";');

    this.addSql('alter table if exists "order_shipping_method_tax_line" drop constraint if exists "order_shipping_method_tax_line_shipping_method_id_foreign";');

    this.addSql('alter table if exists "capture" drop constraint if exists "capture_payment_id_foreign";');

    this.addSql('alter table if exists "refund" drop constraint if exists "refund_payment_id_foreign";');

    this.addSql('alter table if exists "payment" drop constraint if exists "payment_payment_collection_id_foreign";');

    this.addSql('alter table if exists "payment_collection_payment_providers" drop constraint if exists "payment_collection_payment_providers_payment_coll_aa276_foreign";');

    this.addSql('alter table if exists "payment_session" drop constraint if exists "payment_session_payment_collection_id_foreign";');

    this.addSql('alter table if exists "payment_collection_payment_providers" drop constraint if exists "payment_collection_payment_providers_payment_provider_id_foreig";');

    this.addSql('alter table if exists "price_rule" drop constraint if exists "price_rule_price_id_foreign";');

    this.addSql('alter table if exists "price" drop constraint if exists "price_price_list_id_foreign";');

    this.addSql('alter table if exists "price_list_rule" drop constraint if exists "price_list_rule_price_list_id_foreign";');

    this.addSql('alter table if exists "price_list_rule_value" drop constraint if exists "price_list_rule_value_price_list_rule_id_foreign";');

    this.addSql('alter table if exists "price" drop constraint if exists "price_price_set_id_foreign";');

    this.addSql('alter table if exists "price_rule" drop constraint if exists "price_rule_price_set_id_foreign";');

    this.addSql('alter table if exists "price_set_rule_type" drop constraint if exists "price_set_rule_type_price_set_id_foreign";');

    this.addSql('alter table if exists "product_category_product" drop constraint if exists "product_category_product_product_id_foreign";');

    this.addSql('alter table if exists "product_images" drop constraint if exists "product_images_product_id_foreign";');

    this.addSql('alter table if exists "product_option" drop constraint if exists "product_option_product_id_foreign";');

    this.addSql('alter table if exists "product_tags" drop constraint if exists "product_tags_product_id_foreign";');

    this.addSql('alter table if exists "product_variant" drop constraint if exists "product_variant_product_id_foreign";');

    this.addSql('alter table if exists "product_category" drop constraint if exists "product_category_parent_category_id_foreign";');

    this.addSql('alter table if exists "product_category_product" drop constraint if exists "product_category_product_product_category_id_foreign";');

    this.addSql('alter table if exists "product" drop constraint if exists "product_collection_id_foreign";');

    this.addSql('alter table if exists "product_option_value" drop constraint if exists "product_option_value_option_id_foreign";');

    this.addSql('alter table if exists "product_variant_option" drop constraint if exists "product_variant_option_option_value_id_foreign";');

    this.addSql('alter table if exists "product_tags" drop constraint if exists "product_tags_product_tag_id_foreign";');

    this.addSql('alter table if exists "product" drop constraint if exists "product_type_id_foreign";');

    this.addSql('alter table if exists "product_variant_option" drop constraint if exists "product_variant_option_variant_id_foreign";');

    this.addSql('alter table if exists "promotion_application_method" drop constraint if exists "promotion_application_method_promotion_id_foreign";');

    this.addSql('alter table if exists "promotion_promotion_rule" drop constraint if exists "promotion_promotion_rule_promotion_id_foreign";');

    this.addSql('alter table if exists "application_method_buy_rules" drop constraint if exists "application_method_buy_rules_application_method_id_foreign";');

    this.addSql('alter table if exists "application_method_target_rules" drop constraint if exists "application_method_target_rules_application_method_id_foreign";');

    this.addSql('alter table if exists "promotion" drop constraint if exists "promotion_campaign_id_foreign";');

    this.addSql('alter table if exists "promotion_campaign_budget" drop constraint if exists "promotion_campaign_budget_campaign_id_foreign";');

    this.addSql('alter table if exists "application_method_buy_rules" drop constraint if exists "application_method_buy_rules_promotion_rule_id_foreign";');

    this.addSql('alter table if exists "application_method_target_rules" drop constraint if exists "application_method_target_rules_promotion_rule_id_foreign";');

    this.addSql('alter table if exists "promotion_promotion_rule" drop constraint if exists "promotion_promotion_rule_promotion_rule_id_foreign";');

    this.addSql('alter table if exists "promotion_rule_value" drop constraint if exists "promotion_rule_value_promotion_rule_id_foreign";');

    this.addSql('alter table if exists "region_country" drop constraint if exists "region_country_region_id_foreign";');

    this.addSql('alter table if exists "delivery" drop constraint if exists "delivery_restaurant_id_foreign";');

    this.addSql('alter table if exists "restaurant_admin" drop constraint if exists "foreign_key_restaurant_id";');

    this.addSql('alter table if exists "price_list_rule" drop constraint if exists "price_list_rule_rule_type_id_foreign";');

    this.addSql('alter table if exists "price_rule" drop constraint if exists "price_rule_rule_type_id_foreign";');

    this.addSql('alter table if exists "price_set_rule_type" drop constraint if exists "price_set_rule_type_rule_type_id_foreign";');

    this.addSql('alter table if exists "geo_zone" drop constraint if exists "geo_zone_service_zone_id_foreign";');

    this.addSql('alter table if exists "shipping_option" drop constraint if exists "shipping_option_service_zone_id_foreign";');

    this.addSql('alter table if exists "fulfillment" drop constraint if exists "fulfillment_shipping_option_id_foreign";');

    this.addSql('alter table if exists "shipping_option_rule" drop constraint if exists "shipping_option_rule_shipping_option_id_foreign";');

    this.addSql('alter table if exists "shipping_option" drop constraint if exists "shipping_option_shipping_option_type_id_foreign";');

    this.addSql('alter table if exists "shipping_option" drop constraint if exists "shipping_option_shipping_profile_id_foreign";');

    this.addSql('alter table if exists "stock_location" drop constraint if exists "stock_location_address_id_foreign";');

    this.addSql('alter table if exists "tax_region" drop constraint if exists "FK_tax_region_provider_id";');

    this.addSql('alter table if exists "tax_rate_rule" drop constraint if exists "FK_tax_rate_rule_tax_rate_id";');

    this.addSql('alter table if exists "tax_rate" drop constraint if exists "FK_tax_rate_tax_region_id";');

    this.addSql('alter table if exists "tax_region" drop constraint if exists "FK_tax_region_parent_id";');

    this.addSql('drop table if exists "api_key" cascade;');

    this.addSql('drop table if exists "application_method_buy_rules" cascade;');

    this.addSql('drop table if exists "application_method_target_rules" cascade;');

    this.addSql('drop table if exists "auth_user" cascade;');

    this.addSql('drop table if exists "capture" cascade;');

    this.addSql('drop table if exists "cart" cascade;');

    this.addSql('drop table if exists "cart_address" cascade;');

    this.addSql('drop table if exists "cart_line_item" cascade;');

    this.addSql('drop table if exists "cart_line_item_adjustment" cascade;');

    this.addSql('drop table if exists "cart_line_item_tax_line" cascade;');

    this.addSql('drop table if exists "cart_payment_collection" cascade;');

    this.addSql('drop table if exists "cart_promotion" cascade;');

    this.addSql('drop table if exists "cart_shipping_method" cascade;');

    this.addSql('drop table if exists "cart_shipping_method_adjustment" cascade;');

    this.addSql('drop table if exists "cart_shipping_method_tax_line" cascade;');

    this.addSql('drop table if exists "currency" cascade;');

    this.addSql('drop table if exists "customer" cascade;');

    this.addSql('drop table if exists "customer_address" cascade;');

    this.addSql('drop table if exists "customer_group" cascade;');

    this.addSql('drop table if exists "customer_group_customer" cascade;');

    this.addSql('drop table if exists "fulfillment" cascade;');

    this.addSql('drop table if exists "fulfillment_address" cascade;');

    this.addSql('drop table if exists "fulfillment_item" cascade;');

    this.addSql('drop table if exists "fulfillment_label" cascade;');

    this.addSql('drop table if exists "fulfillment_provider" cascade;');

    this.addSql('drop table if exists "fulfillment_set" cascade;');

    this.addSql('drop table if exists "fulfillment_set_location" cascade;');

    this.addSql('drop table if exists "geo_zone" cascade;');

    this.addSql('drop table if exists "image" cascade;');

    this.addSql('drop table if exists "inventory_item" cascade;');

    this.addSql('drop table if exists "inventory_level" cascade;');

    this.addSql('drop table if exists "invite" cascade;');

    this.addSql('drop table if exists "order" cascade;');

    this.addSql('drop table if exists "order_address" cascade;');

    this.addSql('drop table if exists "order_change" cascade;');

    this.addSql('drop table if exists "order_change_action" cascade;');

    this.addSql('drop table if exists "order_item" cascade;');

    this.addSql('drop table if exists "order_line_item" cascade;');

    this.addSql('drop table if exists "order_line_item_adjustment" cascade;');

    this.addSql('drop table if exists "order_line_item_tax_line" cascade;');

    this.addSql('drop table if exists "order_shipping_method" cascade;');

    this.addSql('drop table if exists "order_shipping_method_adjustment" cascade;');

    this.addSql('drop table if exists "order_shipping_method_tax_line" cascade;');

    this.addSql('drop table if exists "order_summary" cascade;');

    this.addSql('drop table if exists "order_transaction" cascade;');

    this.addSql('drop table if exists "payment" cascade;');

    this.addSql('drop table if exists "payment_collection" cascade;');

    this.addSql('drop table if exists "payment_collection_payment_providers" cascade;');

    this.addSql('drop table if exists "payment_method_token" cascade;');

    this.addSql('drop table if exists "payment_provider" cascade;');

    this.addSql('drop table if exists "payment_session" cascade;');

    this.addSql('drop table if exists "price" cascade;');

    this.addSql('drop table if exists "price_list" cascade;');

    this.addSql('drop table if exists "price_list_rule" cascade;');

    this.addSql('drop table if exists "price_list_rule_value" cascade;');

    this.addSql('drop table if exists "price_rule" cascade;');

    this.addSql('drop table if exists "price_set" cascade;');

    this.addSql('drop table if exists "price_set_rule_type" cascade;');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "product_category" cascade;');

    this.addSql('drop table if exists "product_category_product" cascade;');

    this.addSql('drop table if exists "product_collection" cascade;');

    this.addSql('drop table if exists "product_images" cascade;');

    this.addSql('drop table if exists "product_option" cascade;');

    this.addSql('drop table if exists "product_option_value" cascade;');

    this.addSql('drop table if exists "product_sales_channel" cascade;');

    this.addSql('drop table if exists "product_tag" cascade;');

    this.addSql('drop table if exists "product_tags" cascade;');

    this.addSql('drop table if exists "product_type" cascade;');

    this.addSql('drop table if exists "product_variant" cascade;');

    this.addSql('drop table if exists "product_variant_inventory_item" cascade;');

    this.addSql('drop table if exists "product_variant_option" cascade;');

    this.addSql('drop table if exists "product_variant_price_set" cascade;');

    this.addSql('drop table if exists "promotion" cascade;');

    this.addSql('drop table if exists "promotion_application_method" cascade;');

    this.addSql('drop table if exists "promotion_campaign" cascade;');

    this.addSql('drop table if exists "promotion_campaign_budget" cascade;');

    this.addSql('drop table if exists "promotion_promotion_rule" cascade;');

    this.addSql('drop table if exists "promotion_rule" cascade;');

    this.addSql('drop table if exists "promotion_rule_value" cascade;');

    this.addSql('drop table if exists "publishable_api_key_sales_channel" cascade;');

    this.addSql('drop table if exists "refund" cascade;');

    this.addSql('drop table if exists "region" cascade;');

    this.addSql('drop table if exists "region_country" cascade;');

    this.addSql('drop table if exists "region_payment_provider" cascade;');

    this.addSql('drop table if exists "reservation_item" cascade;');

    this.addSql('drop table if exists "restaurant" cascade;');

    this.addSql('drop table if exists "restaurant_admin" cascade;');

    this.addSql('drop table if exists "restaurant_product" cascade;');

    this.addSql('drop table if exists "rule_type" cascade;');

    this.addSql('drop table if exists "sales_channel" cascade;');

    this.addSql('drop table if exists "sales_channel_stock_location" cascade;');

    this.addSql('drop table if exists "service_zone" cascade;');

    this.addSql('drop table if exists "shipping_option" cascade;');

    this.addSql('drop table if exists "shipping_option_price_set" cascade;');

    this.addSql('drop table if exists "shipping_option_rule" cascade;');

    this.addSql('drop table if exists "shipping_option_type" cascade;');

    this.addSql('drop table if exists "shipping_profile" cascade;');

    this.addSql('drop table if exists "stock_location" cascade;');

    this.addSql('drop table if exists "stock_location_address" cascade;');

    this.addSql('drop table if exists "store" cascade;');

    this.addSql('drop table if exists "tax_provider" cascade;');

    this.addSql('drop table if exists "tax_rate" cascade;');

    this.addSql('drop table if exists "tax_rate_rule" cascade;');

    this.addSql('drop table if exists "tax_region" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "workflow_execution" cascade;');

    this.addSql('alter table if exists "delivery" drop constraint if exists "delivery_driver_id_foreign";');

    this.addSql('alter table if exists "delivery" alter column if exists "restaurant_id" type text using ("restaurant_id"::text);');
    this.addSql('alter table if exists "delivery" alter column if exists "restaurant_id" set not null;');
    this.addSql('alter table if exists "delivery" alter column if exists "delivery_status" type text using ("delivery_status"::text);');
    this.addSql('alter table if exists "delivery" add constraint "delivery_delivery_status_check" check ("delivery_status" in (\'pending\', \'restaurant_declined\', \'restaurant_accepted\', \'pickup_claimed\', \'restaurant_preparing\', \'ready_for_pickup\', \'in_transit\', \'delivered\'));');
    this.addSql('alter table if exists "delivery" alter column if exists "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table if exists "delivery" alter column if exists "transaction_id" type text using ("transaction_id"::text);');
    this.addSql('alter table if exists "delivery" alter column if exists "transaction_id" set not null;');
    this.addSql('alter table if exists "delivery" drop constraint if exists delivery_id_check;');

    this.addSql('alter table if exists "driver" alter column if exists "avatar_url" type text using ("avatar_url"::text);');
    this.addSql('alter table if exists "driver" alter column if exists "avatar_url" set not null;');
    this.addSql('alter table if exists "driver" alter column if exists "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table if exists "driver" drop constraint if exists driver_id_check;');
  }

  async down(): Promise<void> {
    this.addSql('create table if not exists "api_key" ("id" text not null default null, "token" text not null default null, "salt" text not null default null, "redacted" text not null default null, "title" text not null default null, "type" text not null default null, "last_used_at" timestamptz(6) null default null, "created_by" text not null default null, "created_at" timestamptz(6) not null default now(), "revoked_by" text null default null, "revoked_at" timestamptz(6) null default null, constraint "api_key_pkey" primary key ("id"));');
    this.addSql('alter table if exists "api_key" add constraint "IDX_api_key_token_unique" unique ("token");');
    this.addSql('create index if not exists "IDX_api_key_type" on "api_key" ("type");');

    this.addSql('create table if not exists "application_method_buy_rules" ("application_method_id" text not null default null, "promotion_rule_id" text not null default null, constraint "application_method_buy_rules_pkey" primary key ("application_method_id", "promotion_rule_id"));');

    this.addSql('create table if not exists "application_method_target_rules" ("application_method_id" text not null default null, "promotion_rule_id" text not null default null, constraint "application_method_target_rules_pkey" primary key ("application_method_id", "promotion_rule_id"));');

    this.addSql('create table if not exists "auth_user" ("id" text not null default null, "entity_id" text not null default null, "provider" text not null default null, "scope" text not null default null, "user_metadata" jsonb null default null, "app_metadata" jsonb not null default null, "provider_metadata" jsonb null default null, constraint "auth_user_pkey" primary key ("id"));');
    this.addSql('alter table if exists "auth_user" add constraint "IDX_auth_user_provider_scope_entity_id" unique ("provider", "scope", "entity_id");');

    this.addSql('create table if not exists "capture" ("id" text not null default null, "amount" numeric not null default null, "raw_amount" jsonb not null default null, "payment_id" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, "created_by" text null default null, "metadata" jsonb null default null, constraint "capture_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_capture_payment_id" on "capture" ("payment_id");');

    this.addSql('create table if not exists "cart" ("id" text not null default null, "region_id" text null default null, "customer_id" text null default null, "sales_channel_id" text null default null, "email" text null default null, "currency_code" text not null default null, "shipping_address_id" text null default null, "billing_address_id" text null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "cart_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_cart_billing_address_id" on "cart" ("billing_address_id");');
    this.addSql('create index if not exists "IDX_cart_currency_code" on "cart" ("currency_code");');
    this.addSql('create index if not exists "IDX_cart_customer_id" on "cart" ("customer_id");');
    this.addSql('create index if not exists "IDX_cart_deleted_at" on "cart" ("deleted_at");');
    this.addSql('create index if not exists "IDX_cart_region_id" on "cart" ("region_id");');
    this.addSql('create index if not exists "IDX_cart_sales_channel_id" on "cart" ("sales_channel_id");');
    this.addSql('create index if not exists "IDX_cart_shipping_address_id" on "cart" ("shipping_address_id");');

    this.addSql('create table if not exists "cart_address" ("id" text not null default null, "customer_id" text null default null, "company" text null default null, "first_name" text null default null, "last_name" text null default null, "address_1" text null default null, "address_2" text null default null, "city" text null default null, "country_code" text null default null, "province" text null default null, "postal_code" text null default null, "phone" text null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "cart_address_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_cart_address_deleted_at" on "cart_address" ("deleted_at");');

    this.addSql('create table if not exists "cart_line_item" ("id" text not null default null, "cart_id" text not null default null, "title" text not null default null, "subtitle" text null default null, "thumbnail" text null default null, "quantity" int4 not null default null, "variant_id" text null default null, "product_id" text null default null, "product_title" text null default null, "product_description" text null default null, "product_subtitle" text null default null, "product_type" text null default null, "product_collection" text null default null, "product_handle" text null default null, "variant_sku" text null default null, "variant_barcode" text null default null, "variant_title" text null default null, "variant_option_values" jsonb null default null, "requires_shipping" bool not null default true, "is_discountable" bool not null default true, "is_tax_inclusive" bool not null default false, "compare_at_unit_price" numeric null default null, "raw_compare_at_unit_price" jsonb null default null, "unit_price" numeric not null default null, "raw_unit_price" jsonb not null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "cart_line_item_pkey" primary key ("id"), constraint cart_line_item_unit_price_check check (unit_price >= 0));');
    this.addSql('create index if not exists "IDX_cart_line_item_deleted_at" on "cart_line_item" ("deleted_at");');
    this.addSql('create index if not exists "IDX_line_item_cart_id" on "cart_line_item" ("cart_id");');
    this.addSql('create index if not exists "IDX_line_item_product_id" on "cart_line_item" ("product_id");');
    this.addSql('create index if not exists "IDX_line_item_variant_id" on "cart_line_item" ("variant_id");');

    this.addSql('create table if not exists "cart_line_item_adjustment" ("id" text not null default null, "description" text null default null, "promotion_id" text null default null, "code" text null default null, "amount" numeric not null default null, "raw_amount" jsonb not null default null, "provider_id" text null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, "item_id" text null default null, constraint "cart_line_item_adjustment_pkey" primary key ("id"), constraint cart_line_item_adjustment_check check (amount >= 0));');
    this.addSql('create index if not exists "IDX_adjustment_item_id" on "cart_line_item_adjustment" ("item_id");');
    this.addSql('create index if not exists "IDX_cart_line_item_adjustment_deleted_at" on "cart_line_item_adjustment" ("deleted_at");');
    this.addSql('create index if not exists "IDX_line_item_adjustment_promotion_id" on "cart_line_item_adjustment" ("promotion_id");');

    this.addSql('create table if not exists "cart_line_item_tax_line" ("id" text not null default null, "description" text null default null, "tax_rate_id" text null default null, "code" text not null default null, "rate" numeric not null default null, "provider_id" text null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, "item_id" text null default null, constraint "cart_line_item_tax_line_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_cart_line_item_tax_line_deleted_at" on "cart_line_item_tax_line" ("deleted_at");');
    this.addSql('create index if not exists "IDX_line_item_tax_line_tax_rate_id" on "cart_line_item_tax_line" ("tax_rate_id");');
    this.addSql('create index if not exists "IDX_tax_line_item_id" on "cart_line_item_tax_line" ("item_id");');

    this.addSql('create table if not exists "cart_payment_collection" ("cart_id" varchar(255) not null default null, "payment_collection_id" varchar(255) not null default null, "id" varchar(255) not null default null, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "deleted_at" timestamptz(0) null default null, constraint "cart_payment_collection_pkey" primary key ("cart_id", "payment_collection_id"));');
    this.addSql('create index if not exists "IDX_cart_id_-4a39f6c9" on "cart_payment_collection" ("cart_id");');
    this.addSql('create index if not exists "IDX_deleted_at_-4a39f6c9" on "cart_payment_collection" ("deleted_at");');
    this.addSql('create index if not exists "IDX_id_-4a39f6c9" on "cart_payment_collection" ("id");');
    this.addSql('create index if not exists "IDX_payment_collection_id_-4a39f6c9" on "cart_payment_collection" ("payment_collection_id");');

    this.addSql('create table if not exists "cart_promotion" ("cart_id" varchar(255) not null default null, "promotion_id" varchar(255) not null default null, "id" varchar(255) not null default null, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "deleted_at" timestamptz(0) null default null, constraint "cart_promotion_pkey" primary key ("cart_id", "promotion_id"));');
    this.addSql('create index if not exists "IDX_cart_id_-a9d4a70b" on "cart_promotion" ("cart_id");');
    this.addSql('create index if not exists "IDX_deleted_at_-a9d4a70b" on "cart_promotion" ("deleted_at");');
    this.addSql('create index if not exists "IDX_id_-a9d4a70b" on "cart_promotion" ("id");');
    this.addSql('create index if not exists "IDX_promotion_id_-a9d4a70b" on "cart_promotion" ("promotion_id");');

    this.addSql('create table if not exists "cart_shipping_method" ("id" text not null default null, "cart_id" text not null default null, "name" text not null default null, "description" jsonb null default null, "amount" numeric not null default null, "raw_amount" jsonb not null default null, "is_tax_inclusive" bool not null default false, "shipping_option_id" text null default null, "data" jsonb null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "cart_shipping_method_pkey" primary key ("id"), constraint cart_shipping_method_check check (amount >= 0));');
    this.addSql('create index if not exists "IDX_cart_shipping_method_deleted_at" on "cart_shipping_method" ("deleted_at");');
    this.addSql('create index if not exists "IDX_shipping_method_cart_id" on "cart_shipping_method" ("cart_id");');
    this.addSql('create index if not exists "IDX_shipping_method_option_id" on "cart_shipping_method" ("shipping_option_id");');

    this.addSql('create table if not exists "cart_shipping_method_adjustment" ("id" text not null default null, "description" text null default null, "promotion_id" text null default null, "code" text null default null, "amount" numeric not null default null, "raw_amount" jsonb not null default null, "provider_id" text null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, "shipping_method_id" text null default null, constraint "cart_shipping_method_adjustment_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_adjustment_shipping_method_id" on "cart_shipping_method_adjustment" ("shipping_method_id");');
    this.addSql('create index if not exists "IDX_cart_shipping_method_adjustment_deleted_at" on "cart_shipping_method_adjustment" ("deleted_at");');
    this.addSql('create index if not exists "IDX_shipping_method_adjustment_promotion_id" on "cart_shipping_method_adjustment" ("promotion_id");');

    this.addSql('create table if not exists "cart_shipping_method_tax_line" ("id" text not null default null, "description" text null default null, "tax_rate_id" text null default null, "code" text not null default null, "rate" numeric not null default null, "provider_id" text null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, "shipping_method_id" text null default null, constraint "cart_shipping_method_tax_line_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_cart_shipping_method_tax_line_deleted_at" on "cart_shipping_method_tax_line" ("deleted_at");');
    this.addSql('create index if not exists "IDX_shipping_method_tax_line_tax_rate_id" on "cart_shipping_method_tax_line" ("tax_rate_id");');
    this.addSql('create index if not exists "IDX_tax_line_shipping_method_id" on "cart_shipping_method_tax_line" ("shipping_method_id");');

    this.addSql('create table if not exists "currency" ("code" text not null default null, "symbol" text not null default null, "symbol_native" text not null default null, "name" text not null default null, constraint "currency_pkey" primary key ("code"));');

    this.addSql('create table if not exists "customer" ("id" text not null default null, "company_name" text null default null, "first_name" text null default null, "last_name" text null default null, "email" text null default null, "phone" text null default null, "has_account" bool not null default false, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, "created_by" text null default null, constraint "customer_pkey" primary key ("id"));');

    this.addSql('create table if not exists "customer_address" ("id" text not null default null, "customer_id" text not null default null, "address_name" text null default null, "is_default_shipping" bool not null default false, "is_default_billing" bool not null default false, "company" text null default null, "first_name" text null default null, "last_name" text null default null, "address_1" text null default null, "address_2" text null default null, "city" text null default null, "country_code" text null default null, "province" text null default null, "postal_code" text null default null, "phone" text null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), constraint "customer_address_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_customer_address_customer_id" on "customer_address" ("customer_id");');
    this.addSql('alter table if exists "customer_address" add constraint "IDX_customer_address_unique_customer_billing" unique ("customer_id");');
    this.addSql('alter table if exists "customer_address" add constraint "IDX_customer_address_unique_customer_shipping" unique ("customer_id");');

    this.addSql('create table if not exists "customer_group" ("id" text not null default null, "name" text null default null, "metadata" jsonb null default null, "created_by" text null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "customer_group_pkey" primary key ("id"));');
    this.addSql('alter table if exists "customer_group" add constraint "IDX_customer_group_name" unique ("name");');

    this.addSql('create table if not exists "customer_group_customer" ("id" text not null default null, "customer_id" text not null default null, "customer_group_id" text not null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "created_by" text null default null, constraint "customer_group_customer_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_customer_group_customer_customer_id" on "customer_group_customer" ("customer_id");');
    this.addSql('create index if not exists "IDX_customer_group_customer_group_id" on "customer_group_customer" ("customer_group_id");');

    this.addSql('create table if not exists "fulfillment" ("id" text not null default null, "location_id" text not null default null, "packed_at" timestamptz(6) null default null, "shipped_at" timestamptz(6) null default null, "delivered_at" timestamptz(6) null default null, "canceled_at" timestamptz(6) null default null, "data" jsonb null default null, "provider_id" text null default null, "shipping_option_id" text null default null, "metadata" jsonb null default null, "delivery_address_id" text null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "fulfillment_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_fulfillment_deleted_at" on "fulfillment" ("deleted_at");');
    this.addSql('create index if not exists "IDX_fulfillment_location_id" on "fulfillment" ("location_id");');
    this.addSql('create index if not exists "IDX_fulfillment_provider_id" on "fulfillment" ("provider_id");');
    this.addSql('create index if not exists "IDX_fulfillment_shipping_option_id" on "fulfillment" ("shipping_option_id");');
    this.addSql('alter table if exists "fulfillment" add constraint "fulfillment_delivery_address_id_unique" unique ("delivery_address_id");');

    this.addSql('create table if not exists "fulfillment_address" ("id" text not null default null, "company" text null default null, "first_name" text null default null, "last_name" text null default null, "address_1" text null default null, "address_2" text null default null, "city" text null default null, "country_code" text null default null, "province" text null default null, "postal_code" text null default null, "phone" text null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "fulfillment_address_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_fulfillment_address_deleted_at" on "fulfillment_address" ("deleted_at");');

    this.addSql('create table if not exists "fulfillment_item" ("id" text not null default null, "title" text not null default null, "sku" text not null default null, "barcode" text not null default null, "quantity" numeric not null default null, "raw_quantity" jsonb not null default null, "line_item_id" text null default null, "inventory_item_id" text null default null, "fulfillment_id" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "fulfillment_item_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_fulfillment_item_deleted_at" on "fulfillment_item" ("deleted_at");');
    this.addSql('create index if not exists "IDX_fulfillment_item_fulfillment_id" on "fulfillment_item" ("fulfillment_id");');
    this.addSql('create index if not exists "IDX_fulfillment_item_inventory_item_id" on "fulfillment_item" ("inventory_item_id");');
    this.addSql('create index if not exists "IDX_fulfillment_item_line_item_id" on "fulfillment_item" ("line_item_id");');

    this.addSql('create table if not exists "fulfillment_label" ("id" text not null default null, "tracking_number" text not null default null, "tracking_url" text not null default null, "label_url" text not null default null, "fulfillment_id" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "fulfillment_label_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_fulfillment_label_deleted_at" on "fulfillment_label" ("deleted_at");');
    this.addSql('create index if not exists "IDX_fulfillment_label_fulfillment_id" on "fulfillment_label" ("fulfillment_id");');

    this.addSql('create table if not exists "fulfillment_provider" ("id" text not null default null, "is_enabled" bool not null default true, constraint "fulfillment_provider_pkey" primary key ("id"));');

    this.addSql('create table if not exists "fulfillment_set" ("id" text not null default null, "name" text not null default null, "type" text not null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "fulfillment_set_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_fulfillment_set_deleted_at" on "fulfillment_set" ("deleted_at");');
    this.addSql('alter table if exists "fulfillment_set" add constraint "IDX_fulfillment_set_name_unique" unique ("name");');

    this.addSql('create table if not exists "fulfillment_set_location" ("fulfillment_set_id" varchar(255) not null default null, "stock_location_id" varchar(255) not null default null, "id" varchar(255) not null default null, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "deleted_at" timestamptz(0) null default null, constraint "fulfillment_set_location_pkey" primary key ("fulfillment_set_id", "stock_location_id"));');
    this.addSql('create index if not exists "IDX_deleted_at_-2cbccd616" on "fulfillment_set_location" ("deleted_at");');
    this.addSql('create index if not exists "IDX_fulfillment_set_id_-2cbccd616" on "fulfillment_set_location" ("fulfillment_set_id");');
    this.addSql('create index if not exists "IDX_id_-2cbccd616" on "fulfillment_set_location" ("id");');
    this.addSql('create index if not exists "IDX_stock_location_id_-2cbccd616" on "fulfillment_set_location" ("stock_location_id");');

    this.addSql('create table if not exists "geo_zone" ("id" text not null default null, "type" text check ("type" in (\'country\', \'province\', \'city\', \'zip\')) not null default \'country\', "country_code" text not null default null, "province_code" text null default null, "city" text null default null, "service_zone_id" text not null default null, "postal_expression" jsonb null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "geo_zone_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_geo_zone_city" on "geo_zone" ("city");');
    this.addSql('create index if not exists "IDX_geo_zone_country_code" on "geo_zone" ("country_code");');
    this.addSql('create index if not exists "IDX_geo_zone_deleted_at" on "geo_zone" ("deleted_at");');
    this.addSql('create index if not exists "IDX_geo_zone_province_code" on "geo_zone" ("province_code");');
    this.addSql('create index if not exists "IDX_geo_zone_service_zone_id" on "geo_zone" ("service_zone_id");');

    this.addSql('create table if not exists "image" ("id" text not null default null, "url" text not null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "image_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_product_image_deleted_at" on "image" ("deleted_at");');
    this.addSql('create index if not exists "IDX_product_image_url" on "image" ("url");');

    this.addSql('create table if not exists "inventory_item" ("id" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, "sku" text null default null, "origin_country" text null default null, "hs_code" text null default null, "mid_code" text null default null, "material" text null default null, "weight" int4 null default null, "length" int4 null default null, "height" int4 null default null, "width" int4 null default null, "requires_shipping" bool not null default true, "description" text null default null, "title" text null default null, "thumbnail" text null default null, "metadata" jsonb null default null, constraint "inventory_item_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_inventory_item_deleted_at" on "inventory_item" ("deleted_at");');
    this.addSql('alter table if exists "inventory_item" add constraint "IDX_inventory_item_sku_unique" unique ("sku");');

    this.addSql('create table if not exists "inventory_level" ("id" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, "inventory_item_id" text not null default null, "location_id" text not null default null, "stocked_quantity" int4 not null default 0, "reserved_quantity" int4 not null default 0, "incoming_quantity" int4 not null default 0, "metadata" jsonb null default null, constraint "inventory_level_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_inventory_level_deleted_at" on "inventory_level" ("deleted_at");');
    this.addSql('create index if not exists "IDX_inventory_level_inventory_item_id" on "inventory_level" ("inventory_item_id");');
    this.addSql('create index if not exists "IDX_inventory_level_location_id" on "inventory_level" ("location_id");');

    this.addSql('create table if not exists "invite" ("id" text not null default null, "email" text not null default null, "accepted" bool not null default false, "token" text not null default null, "expires_at" timestamptz(6) not null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "invite_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_invite_deleted_at" on "invite" ("deleted_at");');
    this.addSql('alter table if exists "invite" add constraint "IDX_invite_email" unique ("email");');
    this.addSql('create index if not exists "IDX_invite_token" on "invite" ("token");');

    this.addSql('create table if not exists "order" ("id" text not null default null, "region_id" text null default null, "customer_id" text null default null, "version" int4 not null default 1, "sales_channel_id" text null default null, "status" text check ("status" in (\'pending\', \'completed\', \'draft\', \'archived\', \'canceled\', \'requires_action\')) not null default \'pending\', "email" text null default null, "currency_code" text not null default null, "shipping_address_id" text null default null, "billing_address_id" text null default null, "no_notification" bool null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, "canceled_at" timestamptz(6) null default null, constraint "order_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_order_billing_address_id" on "order" ("billing_address_id");');
    this.addSql('create index if not exists "IDX_order_currency_code" on "order" ("currency_code");');
    this.addSql('create index if not exists "IDX_order_customer_id" on "order" ("customer_id");');
    this.addSql('create index if not exists "IDX_order_deleted_at" on "order" ("deleted_at");');
    this.addSql('create index if not exists "IDX_order_region_id" on "order" ("region_id");');
    this.addSql('create index if not exists "IDX_order_shipping_address_id" on "order" ("shipping_address_id");');

    this.addSql('create table if not exists "order_address" ("id" text not null default null, "customer_id" text null default null, "company" text null default null, "first_name" text null default null, "last_name" text null default null, "address_1" text null default null, "address_2" text null default null, "city" text null default null, "country_code" text null default null, "province" text null default null, "postal_code" text null default null, "phone" text null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), constraint "order_address_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_order_address_customer_id" on "order_address" ("customer_id");');

    this.addSql('create table if not exists "order_change" ("id" text not null default null, "order_id" text not null default null, "version" int4 not null default null, "description" text null default null, "status" text check ("status" in (\'confirmed\', \'declined\', \'requested\', \'pending\', \'canceled\')) not null default \'pending\', "internal_note" text null default null, "created_by" text not null default null, "requested_by" text null default null, "requested_at" timestamptz(6) null default null, "confirmed_by" text null default null, "confirmed_at" timestamptz(6) null default null, "declined_by" text null default null, "declined_reason" text null default null, "metadata" jsonb null default null, "declined_at" timestamptz(6) null default null, "canceled_by" text null default null, "canceled_at" timestamptz(6) null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), constraint "order_change_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_order_change_order_id" on "order_change" ("order_id");');
    this.addSql('create index if not exists "IDX_order_change_order_id_version" on "order_change" ("order_id", "version");');
    this.addSql('create index if not exists "IDX_order_change_status" on "order_change" ("status");');

    this.addSql('create table if not exists "order_change_action" ("id" text not null default null, "order_id" text null default null, "version" int4 null default null, "ordering" bigserial, "order_change_id" text null default null, "reference" text null default null, "reference_id" text null default null, "action" text not null default null, "details" jsonb null default null, "amount" numeric null default null, "raw_amount" jsonb null default null, "internal_note" text null default null, "applied" bool not null default false, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), constraint "order_change_action_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_order_change_action_order_change_id" on "order_change_action" ("order_change_id");');
    this.addSql('create index if not exists "IDX_order_change_action_order_id" on "order_change_action" ("order_id");');
    this.addSql('create index if not exists "IDX_order_change_action_ordering" on "order_change_action" ("ordering");');

    this.addSql('create table if not exists "order_item" ("id" text not null default null, "order_id" text not null default null, "version" int4 not null default null, "item_id" text not null default null, "quantity" numeric not null default null, "raw_quantity" jsonb not null default null, "fulfilled_quantity" numeric not null default null, "raw_fulfilled_quantity" jsonb not null default null, "shipped_quantity" numeric not null default null, "raw_shipped_quantity" jsonb not null default null, "return_requested_quantity" numeric not null default null, "raw_return_requested_quantity" jsonb not null default null, "return_received_quantity" numeric not null default null, "raw_return_received_quantity" jsonb not null default null, "return_dismissed_quantity" numeric not null default null, "raw_return_dismissed_quantity" jsonb not null default null, "written_off_quantity" numeric not null default null, "raw_written_off_quantity" jsonb not null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), constraint "order_item_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_order_item_item_id" on "order_item" ("item_id");');
    this.addSql('create index if not exists "IDX_order_item_order_id" on "order_item" ("order_id");');
    this.addSql('create index if not exists "IDX_order_item_order_id_version" on "order_item" ("order_id", "version");');

    this.addSql('create table if not exists "order_line_item" ("id" text not null default null, "totals_id" text null default null, "title" text not null default null, "subtitle" text null default null, "thumbnail" text null default null, "variant_id" text null default null, "product_id" text null default null, "product_title" text null default null, "product_description" text null default null, "product_subtitle" text null default null, "product_type" text null default null, "product_collection" text null default null, "product_handle" text null default null, "variant_sku" text null default null, "variant_barcode" text null default null, "variant_title" text null default null, "variant_option_values" jsonb null default null, "requires_shipping" bool not null default true, "is_discountable" bool not null default true, "is_tax_inclusive" bool not null default false, "compare_at_unit_price" numeric null default null, "raw_compare_at_unit_price" jsonb null default null, "unit_price" numeric not null default null, "raw_unit_price" jsonb not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), constraint "order_line_item_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_order_line_item_product_id" on "order_line_item" ("product_id");');
    this.addSql('create index if not exists "IDX_order_line_item_variant_id" on "order_line_item" ("variant_id");');

    this.addSql('create table if not exists "order_line_item_adjustment" ("id" text not null default null, "description" text null default null, "promotion_id" text null default null, "code" text null default null, "amount" numeric not null default null, "raw_amount" jsonb not null default null, "provider_id" text null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "item_id" text not null default null, constraint "order_line_item_adjustment_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_order_line_item_adjustment_item_id" on "order_line_item_adjustment" ("item_id");');

    this.addSql('create table if not exists "order_line_item_tax_line" ("id" text not null default null, "description" text null default null, "tax_rate_id" text null default null, "code" text not null default null, "rate" numeric not null default null, "raw_rate" jsonb not null default null, "provider_id" text null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "item_id" text not null default null, constraint "order_line_item_tax_line_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_order_line_item_tax_line_item_id" on "order_line_item_tax_line" ("item_id");');

    this.addSql('create table if not exists "order_shipping_method" ("id" text not null default null, "order_id" text not null default null, "version" int4 not null default 1, "name" text not null default null, "description" jsonb null default null, "amount" numeric not null default null, "raw_amount" jsonb not null default null, "is_tax_inclusive" bool not null default false, "shipping_option_id" text null default null, "data" jsonb null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), constraint "order_shipping_method_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_order_shipping_method_order_id" on "order_shipping_method" ("order_id");');
    this.addSql('create index if not exists "IDX_order_shipping_method_order_id_version" on "order_shipping_method" ("order_id", "version");');
    this.addSql('create index if not exists "IDX_order_shipping_method_shipping_option_id" on "order_shipping_method" ("shipping_option_id");');

    this.addSql('create table if not exists "order_shipping_method_adjustment" ("id" text not null default null, "description" text null default null, "promotion_id" text null default null, "code" text null default null, "amount" numeric not null default null, "raw_amount" jsonb not null default null, "provider_id" text null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "shipping_method_id" text not null default null, constraint "order_shipping_method_adjustment_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_order_shipping_method_adjustment_shipping_method_id" on "order_shipping_method_adjustment" ("shipping_method_id");');

    this.addSql('create table if not exists "order_shipping_method_tax_line" ("id" text not null default null, "description" text null default null, "tax_rate_id" text null default null, "code" text not null default null, "rate" numeric not null default null, "raw_rate" jsonb not null default null, "provider_id" text null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "shipping_method_id" text not null default null, constraint "order_shipping_method_tax_line_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_order_shipping_method_tax_line_shipping_method_id" on "order_shipping_method_tax_line" ("shipping_method_id");');

    this.addSql('create table if not exists "order_summary" ("id" text not null default null, "order_id" text not null default null, "version" int4 not null default 1, "totals" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), constraint "order_summary_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_order_summary_order_id_version" on "order_summary" ("order_id", "version");');

    this.addSql('create table if not exists "order_transaction" ("id" text not null default null, "order_id" text not null default null, "amount" numeric not null default null, "raw_amount" jsonb not null default null, "currency_code" text not null default null, "reference" text null default null, "reference_id" text null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), constraint "order_transaction_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_order_transaction_currency_code" on "order_transaction" ("currency_code");');
    this.addSql('create index if not exists "IDX_order_transaction_order_id" on "order_transaction" ("order_id");');
    this.addSql('create index if not exists "IDX_order_transaction_reference_id" on "order_transaction" ("reference_id");');

    this.addSql('create table if not exists "payment" ("id" text not null default null, "amount" numeric not null default null, "raw_amount" jsonb not null default null, "currency_code" text not null default null, "provider_id" text not null default null, "cart_id" text null default null, "order_id" text null default null, "customer_id" text null default null, "data" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, "captured_at" timestamptz(6) null default null, "canceled_at" timestamptz(6) null default null, "payment_collection_id" text not null default null, "payment_session_id" text not null default null, "metadata" jsonb null default null, constraint "payment_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_capture_deleted_at" on "payment" ("deleted_at");');
    this.addSql('create index if not exists "IDX_payment_deleted_at" on "payment" ("deleted_at");');
    this.addSql('create index if not exists "IDX_payment_payment_collection_id" on "payment" ("payment_collection_id");');
    this.addSql('create index if not exists "IDX_payment_provider_id" on "payment" ("provider_id");');
    this.addSql('create index if not exists "IDX_refund_deleted_at" on "payment" ("deleted_at");');

    this.addSql('create table if not exists "payment_collection" ("id" text not null default null, "currency_code" text not null default null, "amount" numeric not null default null, "raw_amount" jsonb not null default null, "region_id" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, "completed_at" timestamptz(6) null default null, "status" text check ("status" in (\'not_paid\', \'awaiting\', \'authorized\', \'partially_authorized\', \'canceled\')) not null default \'not_paid\', "metadata" jsonb null default null, constraint "payment_collection_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_payment_collection_deleted_at" on "payment_collection" ("deleted_at");');
    this.addSql('create index if not exists "IDX_payment_collection_region_id" on "payment_collection" ("region_id");');

    this.addSql('create table if not exists "payment_collection_payment_providers" ("payment_collection_id" text not null default null, "payment_provider_id" text not null default null, constraint "payment_collection_payment_providers_pkey" primary key ("payment_collection_id", "payment_provider_id"));');

    this.addSql('create table if not exists "payment_method_token" ("id" text not null default null, "provider_id" text not null default null, "data" jsonb null default null, "name" text not null default null, "type_detail" text null default null, "description_detail" text null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "payment_method_token_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_payment_method_token_deleted_at" on "payment_method_token" ("deleted_at");');

    this.addSql('create table if not exists "payment_provider" ("id" text not null default null, "is_enabled" bool not null default true, constraint "payment_provider_pkey" primary key ("id"));');

    this.addSql('create table if not exists "payment_session" ("id" text not null default null, "currency_code" text not null default null, "amount" numeric not null default null, "raw_amount" jsonb not null default null, "provider_id" text not null default null, "data" jsonb not null default null, "context" jsonb null default null, "status" text check ("status" in (\'authorized\', \'pending\', \'requires_more\', \'error\', \'canceled\')) not null default \'pending\', "authorized_at" timestamptz(6) null default null, "payment_collection_id" text not null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "payment_session_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_payment_session_payment_collection_id" on "payment_session" ("payment_collection_id");');

    this.addSql('create table if not exists "price" ("id" text not null default null, "title" text null default null, "price_set_id" text not null default null, "currency_code" text not null default null, "rules_count" int4 not null default 0, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, "price_list_id" text null default null, "amount" numeric not null default null, "min_quantity" numeric null default null, "max_quantity" numeric null default null, constraint "price_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_price_currency_code" on "price" ("currency_code");');
    this.addSql('create index if not exists "IDX_price_deleted_at" on "price" ("deleted_at");');
    this.addSql('create index if not exists "IDX_price_price_list_id" on "price" ("price_list_id");');
    this.addSql('create index if not exists "IDX_price_price_set_id" on "price" ("price_set_id");');

    this.addSql('create table if not exists "price_list" ("id" text not null default null, "status" text check ("status" in (\'active\', \'draft\')) not null default \'draft\', "starts_at" timestamptz(6) null default null, "ends_at" timestamptz(6) null default null, "rules_count" int4 not null default 0, "title" text not null default null, "description" text not null default null, "type" text check ("type" in (\'sale\', \'override\')) not null default \'sale\', "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "price_list_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_price_list_deleted_at" on "price_list" ("deleted_at");');

    this.addSql('create table if not exists "price_list_rule" ("id" text not null default null, "rule_type_id" text not null default null, "price_list_id" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "price_list_rule_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_price_list_rule_deleted_at" on "price_list_rule" ("deleted_at");');
    this.addSql('create index if not exists "IDX_price_list_rule_price_list_id" on "price_list_rule" ("price_list_id");');
    this.addSql('alter table if exists "price_list_rule" add constraint "IDX_price_list_rule_rule_type_id_unique" unique ("rule_type_id");');

    this.addSql('create table if not exists "price_list_rule_value" ("id" text not null default null, "value" text not null default null, "price_list_rule_id" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "price_list_rule_value_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_price_list_rule_value_deleted_at" on "price_list_rule_value" ("deleted_at");');
    this.addSql('create index if not exists "IDX_price_list_rule_value_price_list_rule_id" on "price_list_rule_value" ("price_list_rule_id");');

    this.addSql('create table if not exists "price_rule" ("id" text not null default null, "price_set_id" text not null default null, "rule_type_id" text not null default null, "value" text not null default null, "priority" int4 not null default 0, "price_id" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "price_rule_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_price_rule_deleted_at" on "price_rule" ("deleted_at");');
    this.addSql('alter table if exists "price_rule" add constraint "IDX_price_rule_price_id_rule_type_id_unique" unique ("price_id", "rule_type_id");');
    this.addSql('create index if not exists "IDX_price_rule_price_set_id" on "price_rule" ("price_set_id");');
    this.addSql('create index if not exists "IDX_price_rule_rule_type_id" on "price_rule" ("rule_type_id");');

    this.addSql('create table if not exists "price_set" ("id" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "price_set_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_price_set_deleted_at" on "price_set" ("deleted_at");');

    this.addSql('create table if not exists "price_set_rule_type" ("id" text not null default null, "price_set_id" text not null default null, "rule_type_id" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "price_set_rule_type_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_price_set_rule_type_deleted_at" on "price_set_rule_type" ("deleted_at");');
    this.addSql('create index if not exists "IDX_price_set_rule_type_price_set_id" on "price_set_rule_type" ("price_set_id");');
    this.addSql('create index if not exists "IDX_price_set_rule_type_rule_type_id" on "price_set_rule_type" ("rule_type_id");');

    this.addSql('create table if not exists "product" ("id" text not null default null, "title" text not null default null, "handle" text not null default null, "subtitle" text null default null, "description" text null default null, "is_giftcard" bool not null default false, "status" text check ("status" in (\'draft\', \'proposed\', \'published\', \'rejected\')) not null default null, "thumbnail" text null default null, "weight" text null default null, "length" text null default null, "height" text null default null, "width" text null default null, "origin_country" text null default null, "hs_code" text null default null, "mid_code" text null default null, "material" text null default null, "collection_id" text null default null, "type_id" text null default null, "discountable" bool not null default true, "external_id" text null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, "metadata" jsonb null default null, constraint "product_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_product_collection_id" on "product" ("collection_id");');
    this.addSql('create index if not exists "IDX_product_deleted_at" on "product" ("deleted_at");');
    this.addSql('alter table if exists "product" add constraint "IDX_product_handle_unique" unique ("handle");');
    this.addSql('create index if not exists "IDX_product_type_id" on "product" ("type_id");');

    this.addSql('create table if not exists "product_category" ("id" text not null default null, "name" text not null default null, "description" text not null default \'\', "handle" text not null default null, "mpath" text not null default null, "is_active" bool not null default false, "is_internal" bool not null default false, "rank" numeric not null default 0, "parent_category_id" text null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "product_category_pkey" primary key ("id"));');
    this.addSql('alter table if exists "product_category" add constraint "IDX_category_handle_unique" unique ("handle");');
    this.addSql('create index if not exists "IDX_product_category_path" on "product_category" ("mpath");');

    this.addSql('create table if not exists "product_category_product" ("product_id" text not null default null, "product_category_id" text not null default null, constraint "product_category_product_pkey" primary key ("product_id", "product_category_id"));');

    this.addSql('create table if not exists "product_collection" ("id" text not null default null, "title" text not null default null, "handle" text not null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "product_collection_pkey" primary key ("id"));');
    this.addSql('alter table if exists "product_collection" add constraint "IDX_collection_handle_unique" unique ("handle");');
    this.addSql('create index if not exists "IDX_product_category_deleted_at" on "product_collection" ("deleted_at");');
    this.addSql('create index if not exists "IDX_product_collection_deleted_at" on "product_collection" ("deleted_at");');

    this.addSql('create table if not exists "product_images" ("product_id" text not null default null, "image_id" text not null default null, constraint "product_images_pkey" primary key ("product_id", "image_id"));');

    this.addSql('create table if not exists "product_option" ("id" text not null default null, "title" text not null default null, "product_id" text null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "product_option_pkey" primary key ("id"));');
    this.addSql('alter table if exists "product_option" add constraint "IDX_option_product_id_title_unique" unique ("product_id", "title");');
    this.addSql('create index if not exists "IDX_product_option_deleted_at" on "product_option" ("deleted_at");');

    this.addSql('create table if not exists "product_option_value" ("id" text not null default null, "value" text not null default null, "option_id" text null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "product_option_value_pkey" primary key ("id"));');
    this.addSql('alter table if exists "product_option_value" add constraint "IDX_option_value_option_id_unique" unique ("option_id", "value");');
    this.addSql('create index if not exists "IDX_product_option_value_deleted_at" on "product_option_value" ("deleted_at");');

    this.addSql('create table if not exists "product_sales_channel" ("product_id" varchar(255) not null default null, "sales_channel_id" varchar(255) not null default null, "id" varchar(255) not null default null, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "deleted_at" timestamptz(0) null default null, constraint "product_sales_channel_pkey" primary key ("product_id", "sales_channel_id"));');
    this.addSql('create index if not exists "IDX_deleted_at_20b454295" on "product_sales_channel" ("deleted_at");');
    this.addSql('create index if not exists "IDX_id_20b454295" on "product_sales_channel" ("id");');
    this.addSql('create index if not exists "IDX_product_id_20b454295" on "product_sales_channel" ("product_id");');
    this.addSql('create index if not exists "IDX_sales_channel_id_20b454295" on "product_sales_channel" ("sales_channel_id");');

    this.addSql('create table if not exists "product_tag" ("id" text not null default null, "value" text not null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "product_tag_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_product_tag_deleted_at" on "product_tag" ("deleted_at");');

    this.addSql('create table if not exists "product_tags" ("product_id" text not null default null, "product_tag_id" text not null default null, constraint "product_tags_pkey" primary key ("product_id", "product_tag_id"));');

    this.addSql('create table if not exists "product_type" ("id" text not null default null, "value" text not null default null, "metadata" json null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "product_type_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_product_type_deleted_at" on "product_type" ("deleted_at");');
    this.addSql('alter table if exists "product_type" add constraint "IDX_type_value_unique" unique ("value");');

    this.addSql('create table if not exists "product_variant" ("id" text not null default null, "title" text not null default null, "sku" text null default null, "barcode" text null default null, "ean" text null default null, "upc" text null default null, "inventory_quantity" numeric not null default 100, "allow_backorder" bool not null default false, "manage_inventory" bool not null default true, "hs_code" text null default null, "origin_country" text null default null, "mid_code" text null default null, "material" text null default null, "weight" numeric null default null, "length" numeric null default null, "height" numeric null default null, "width" numeric null default null, "metadata" jsonb null default null, "variant_rank" numeric null default 0, "product_id" text null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "product_variant_pkey" primary key ("id"));');
    this.addSql('alter table if exists "product_variant" add constraint "IDX_product_variant_barcode_unique" unique ("barcode");');
    this.addSql('create index if not exists "IDX_product_variant_deleted_at" on "product_variant" ("deleted_at");');
    this.addSql('alter table if exists "product_variant" add constraint "IDX_product_variant_ean_unique" unique ("ean");');
    this.addSql('create index if not exists "IDX_product_variant_product_id" on "product_variant" ("product_id");');
    this.addSql('alter table if exists "product_variant" add constraint "IDX_product_variant_sku_unique" unique ("sku");');
    this.addSql('alter table if exists "product_variant" add constraint "IDX_product_variant_upc_unique" unique ("upc");');

    this.addSql('create table if not exists "product_variant_inventory_item" ("variant_id" varchar(255) not null default null, "inventory_item_id" varchar(255) not null default null, "id" varchar(255) not null default null, "required_quantity" int4 not null default 1, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "deleted_at" timestamptz(0) null default null, constraint "product_variant_inventory_item_pkey" primary key ("variant_id", "inventory_item_id"));');
    this.addSql('create index if not exists "IDX_deleted_at_17b4c4e35" on "product_variant_inventory_item" ("deleted_at");');
    this.addSql('create index if not exists "IDX_id_17b4c4e35" on "product_variant_inventory_item" ("id");');
    this.addSql('create index if not exists "IDX_inventory_item_id_17b4c4e35" on "product_variant_inventory_item" ("inventory_item_id");');
    this.addSql('create index if not exists "IDX_variant_id_17b4c4e35" on "product_variant_inventory_item" ("variant_id");');

    this.addSql('create table if not exists "product_variant_option" ("id" text not null default null, "option_value_id" text null default null, "variant_id" text null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "product_variant_option_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_product_variant_option_deleted_at" on "product_variant_option" ("deleted_at");');
    this.addSql('alter table if exists "product_variant_option" add constraint "IDX_variant_option_option_value_unique" unique ("variant_id", "option_value_id");');

    this.addSql('create table if not exists "product_variant_price_set" ("variant_id" varchar(255) not null default null, "price_set_id" varchar(255) not null default null, "id" varchar(255) not null default null, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "deleted_at" timestamptz(0) null default null, constraint "product_variant_price_set_pkey" primary key ("variant_id", "price_set_id"));');
    this.addSql('create index if not exists "IDX_deleted_at_52b23597" on "product_variant_price_set" ("deleted_at");');
    this.addSql('create index if not exists "IDX_id_52b23597" on "product_variant_price_set" ("id");');
    this.addSql('create index if not exists "IDX_price_set_id_52b23597" on "product_variant_price_set" ("price_set_id");');
    this.addSql('create index if not exists "IDX_variant_id_52b23597" on "product_variant_price_set" ("variant_id");');

    this.addSql('create table if not exists "promotion" ("id" text not null default null, "code" text not null default null, "campaign_id" text null default null, "is_automatic" bool not null default false, "type" text check ("type" in (\'standard\', \'buyget\')) not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "promotion_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_promotion_code" on "promotion" ("code");');
    this.addSql('alter table if exists "promotion" add constraint "IDX_promotion_code_unique" unique ("code");');
    this.addSql('create index if not exists "IDX_promotion_type" on "promotion" ("type");');

    this.addSql('create table if not exists "promotion_application_method" ("id" text not null default null, "value" numeric null default null, "raw_value" jsonb null default null, "max_quantity" numeric null default null, "apply_to_quantity" numeric null default null, "buy_rules_min_quantity" numeric null default null, "type" text check ("type" in (\'fixed\', \'percentage\')) not null default null, "target_type" text check ("target_type" in (\'order\', \'shipping_methods\', \'items\')) not null default null, "allocation" text check ("allocation" in (\'each\', \'across\')) null default null, "promotion_id" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "promotion_application_method_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_application_method_allocation" on "promotion_application_method" ("allocation");');
    this.addSql('create index if not exists "IDX_application_method_target_type" on "promotion_application_method" ("target_type");');
    this.addSql('create index if not exists "IDX_application_method_type" on "promotion_application_method" ("type");');
    this.addSql('alter table if exists "promotion_application_method" add constraint "promotion_application_method_promotion_id_unique" unique ("promotion_id");');

    this.addSql('create table if not exists "promotion_campaign" ("id" text not null default null, "name" text not null default null, "description" text null default null, "currency" text null default null, "campaign_identifier" text not null default null, "starts_at" timestamptz(6) null default null, "ends_at" timestamptz(6) null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "promotion_campaign_pkey" primary key ("id"));');
    this.addSql('alter table if exists "promotion_campaign" add constraint "IDX_campaign_identifier_unique" unique ("campaign_identifier");');

    this.addSql('create table if not exists "promotion_campaign_budget" ("id" text not null default null, "type" text check ("type" in (\'spend\', \'usage\')) not null default null, "campaign_id" text not null default null, "limit" numeric null default null, "raw_limit" jsonb null default null, "used" numeric null default null, "raw_used" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "promotion_campaign_budget_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_campaign_budget_type" on "promotion_campaign_budget" ("type");');
    this.addSql('alter table if exists "promotion_campaign_budget" add constraint "promotion_campaign_budget_campaign_id_unique" unique ("campaign_id");');

    this.addSql('create table if not exists "promotion_promotion_rule" ("promotion_id" text not null default null, "promotion_rule_id" text not null default null, constraint "promotion_promotion_rule_pkey" primary key ("promotion_id", "promotion_rule_id"));');

    this.addSql('create table if not exists "promotion_rule" ("id" text not null default null, "description" text null default null, "attribute" text not null default null, "operator" text check ("operator" in (\'gte\', \'lte\', \'gt\', \'lt\', \'eq\', \'ne\', \'in\')) not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "promotion_rule_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_promotion_rule_attribute" on "promotion_rule" ("attribute");');
    this.addSql('create index if not exists "IDX_promotion_rule_operator" on "promotion_rule" ("operator");');

    this.addSql('create table if not exists "promotion_rule_value" ("id" text not null default null, "promotion_rule_id" text not null default null, "value" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "promotion_rule_value_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_promotion_rule_promotion_rule_value_id" on "promotion_rule_value" ("promotion_rule_id");');

    this.addSql('create table if not exists "publishable_api_key_sales_channel" ("publishable_key_id" varchar(255) not null default null, "sales_channel_id" varchar(255) not null default null, "id" varchar(255) not null default null, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "deleted_at" timestamptz(0) null default null, constraint "publishable_api_key_sales_channel_pkey" primary key ("publishable_key_id", "sales_channel_id"));');
    this.addSql('create index if not exists "IDX_deleted_at_-1d67bae40" on "publishable_api_key_sales_channel" ("deleted_at");');
    this.addSql('create index if not exists "IDX_id_-1d67bae40" on "publishable_api_key_sales_channel" ("id");');
    this.addSql('create index if not exists "IDX_publishable_key_id_-1d67bae40" on "publishable_api_key_sales_channel" ("publishable_key_id");');
    this.addSql('create index if not exists "IDX_sales_channel_id_-1d67bae40" on "publishable_api_key_sales_channel" ("sales_channel_id");');

    this.addSql('create table if not exists "refund" ("id" text not null default null, "amount" numeric not null default null, "raw_amount" jsonb not null default null, "payment_id" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, "created_by" text null default null, "metadata" jsonb null default null, constraint "refund_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_refund_payment_id" on "refund" ("payment_id");');

    this.addSql('create table if not exists "region" ("id" text not null default null, "name" text not null default null, "currency_code" text not null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, "automatic_taxes" bool not null default true, constraint "region_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_region_deleted_at" on "region" ("deleted_at");');

    this.addSql('create table if not exists "region_country" ("iso_2" text not null default null, "iso_3" text not null default null, "num_code" int4 not null default null, "name" text not null default null, "display_name" text not null default null, "region_id" text null default null, constraint "region_country_pkey" primary key ("iso_2"));');
    this.addSql('alter table if exists "region_country" add constraint "IDX_region_country_region_id_iso_2_unique" unique ("region_id", "iso_2");');

    this.addSql('create table if not exists "region_payment_provider" ("region_id" varchar(255) not null default null, "payment_provider_id" varchar(255) not null default null, "id" varchar(255) not null default null, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "deleted_at" timestamptz(0) null default null, constraint "region_payment_provider_pkey" primary key ("region_id", "payment_provider_id"));');
    this.addSql('create index if not exists "IDX_deleted_at_1c934dab0" on "region_payment_provider" ("deleted_at");');
    this.addSql('create index if not exists "IDX_id_1c934dab0" on "region_payment_provider" ("id");');
    this.addSql('create index if not exists "IDX_payment_provider_id_1c934dab0" on "region_payment_provider" ("payment_provider_id");');
    this.addSql('create index if not exists "IDX_region_id_1c934dab0" on "region_payment_provider" ("region_id");');

    this.addSql('create table if not exists "reservation_item" ("id" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, "line_item_id" text null default null, "location_id" text not null default null, "quantity" int4 not null default null, "external_id" text null default null, "description" text null default null, "created_by" text null default null, "metadata" jsonb null default null, "inventory_item_id" text not null default null, constraint "reservation_item_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_reservation_item_deleted_at" on "reservation_item" ("deleted_at");');
    this.addSql('create index if not exists "IDX_reservation_item_inventory_item_id" on "reservation_item" ("inventory_item_id");');
    this.addSql('create index if not exists "IDX_reservation_item_line_item_id" on "reservation_item" ("line_item_id");');
    this.addSql('create index if not exists "IDX_reservation_item_location_id" on "reservation_item" ("location_id");');

    this.addSql('create table if not exists "restaurant" ("id" text not null default null, "name" text not null default null, "address" text not null default null, "phone" text not null default null, "email" text not null default null, "image" bytea null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default null, constraint "restaurant_pkey" primary key ("id"), constraint restaurant_id_check check (id ~ \'^res\'::text));');

    this.addSql('create table if not exists "restaurant_admin" ("id" text not null default null, "first_name" text not null default null, "last_name" text not null default null, "email" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default null, "restaurant_id" text null default null, constraint "restaurant_admin_pkey" primary key ("id"), constraint restaurant_admin_id_check check (id ~ \'^resadm\'::text));');

    this.addSql('create table if not exists "restaurant_product" ("restaurant_id" text not null default null, "product_id" text not null default null, constraint "restaurant_product_pkey" primary key ("restaurant_id", "product_id"));');

    this.addSql('create table if not exists "rule_type" ("id" text not null default null, "name" text not null default null, "rule_attribute" text not null default null, "default_priority" int4 not null default 0, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "rule_type_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_rule_type_deleted_at" on "rule_type" ("deleted_at");');
    this.addSql('create index if not exists "IDX_rule_type_rule_attribute" on "rule_type" ("rule_attribute");');

    this.addSql('create table if not exists "sales_channel" ("id" text not null default null, "name" text not null default null, "description" text null default null, "is_disabled" bool not null default false, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "sales_channel_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_sales_channel_deleted_at" on "sales_channel" ("deleted_at");');

    this.addSql('create table if not exists "sales_channel_stock_location" ("sales_channel_id" varchar(255) not null default null, "stock_location_id" varchar(255) not null default null, "id" varchar(255) not null default null, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "deleted_at" timestamptz(0) null default null, constraint "sales_channel_stock_location_pkey" primary key ("sales_channel_id", "stock_location_id"));');
    this.addSql('create index if not exists "IDX_deleted_at_26d06f470" on "sales_channel_stock_location" ("deleted_at");');
    this.addSql('create index if not exists "IDX_id_26d06f470" on "sales_channel_stock_location" ("id");');
    this.addSql('create index if not exists "IDX_sales_channel_id_26d06f470" on "sales_channel_stock_location" ("sales_channel_id");');
    this.addSql('create index if not exists "IDX_stock_location_id_26d06f470" on "sales_channel_stock_location" ("stock_location_id");');

    this.addSql('create table if not exists "service_zone" ("id" text not null default null, "name" text not null default null, "metadata" jsonb null default null, "fulfillment_set_id" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "service_zone_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_service_zone_deleted_at" on "service_zone" ("deleted_at");');
    this.addSql('create index if not exists "IDX_service_zone_fulfillment_set_id" on "service_zone" ("fulfillment_set_id");');
    this.addSql('alter table if exists "service_zone" add constraint "IDX_service_zone_name_unique" unique ("name");');

    this.addSql('create table if not exists "shipping_option" ("id" text not null default null, "name" text not null default null, "price_type" text check ("price_type" in (\'calculated\', \'flat\')) not null default \'flat\', "service_zone_id" text not null default null, "shipping_profile_id" text null default null, "provider_id" text null default null, "data" jsonb null default null, "metadata" jsonb null default null, "shipping_option_type_id" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "shipping_option_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_shipping_option_deleted_at" on "shipping_option" ("deleted_at");');
    this.addSql('create index if not exists "IDX_shipping_option_provider_id" on "shipping_option" ("provider_id");');
    this.addSql('create index if not exists "IDX_shipping_option_service_zone_id" on "shipping_option" ("service_zone_id");');
    this.addSql('create index if not exists "IDX_shipping_option_shipping_option_type_id" on "shipping_option" ("shipping_option_type_id");');
    this.addSql('create index if not exists "IDX_shipping_option_shipping_profile_id" on "shipping_option" ("shipping_profile_id");');
    this.addSql('alter table if exists "shipping_option" add constraint "shipping_option_shipping_option_type_id_unique" unique ("shipping_option_type_id");');

    this.addSql('create table if not exists "shipping_option_price_set" ("shipping_option_id" varchar(255) not null default null, "price_set_id" varchar(255) not null default null, "id" varchar(255) not null default null, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "deleted_at" timestamptz(0) null default null, constraint "shipping_option_price_set_pkey" primary key ("shipping_option_id", "price_set_id"));');
    this.addSql('create index if not exists "IDX_deleted_at_ba32fa9c" on "shipping_option_price_set" ("deleted_at");');
    this.addSql('create index if not exists "IDX_id_ba32fa9c" on "shipping_option_price_set" ("id");');
    this.addSql('create index if not exists "IDX_price_set_id_ba32fa9c" on "shipping_option_price_set" ("price_set_id");');
    this.addSql('create index if not exists "IDX_shipping_option_id_ba32fa9c" on "shipping_option_price_set" ("shipping_option_id");');

    this.addSql('create table if not exists "shipping_option_rule" ("id" text not null default null, "attribute" text not null default null, "operator" text check ("operator" in (\'in\', \'eq\', \'ne\', \'gt\', \'gte\', \'lt\', \'lte\', \'nin\')) not null default null, "value" jsonb null default null, "shipping_option_id" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "shipping_option_rule_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_shipping_option_rule_deleted_at" on "shipping_option_rule" ("deleted_at");');
    this.addSql('create index if not exists "IDX_shipping_option_rule_shipping_option_id" on "shipping_option_rule" ("shipping_option_id");');

    this.addSql('create table if not exists "shipping_option_type" ("id" text not null default null, "label" text not null default null, "description" text null default null, "code" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "shipping_option_type_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_shipping_option_type_deleted_at" on "shipping_option_type" ("deleted_at");');

    this.addSql('create table if not exists "shipping_profile" ("id" text not null default null, "name" text not null default null, "type" text not null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "shipping_profile_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_shipping_profile_deleted_at" on "shipping_profile" ("deleted_at");');
    this.addSql('alter table if exists "shipping_profile" add constraint "IDX_shipping_profile_name_unique" unique ("name");');

    this.addSql('create table if not exists "stock_location" ("id" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, "name" text not null default null, "address_id" text null default null, "metadata" jsonb null default null, constraint "stock_location_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_stock_location_deleted_at" on "stock_location" ("deleted_at");');

    this.addSql('create table if not exists "stock_location_address" ("id" text not null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, "address_1" text not null default null, "address_2" text null default null, "company" text null default null, "city" text null default null, "country_code" text not null default null, "phone" text null default null, "province" text null default null, "postal_code" text null default null, "metadata" jsonb null default null, constraint "stock_location_address_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_stock_location_address_deleted_at" on "stock_location_address" ("deleted_at");');

    this.addSql('create table if not exists "store" ("id" text not null default null, "name" text not null default \'Medusa Store\', "supported_currency_codes" text[] not null default \'{}\', "default_currency_code" text null default null, "default_sales_channel_id" text null default null, "default_region_id" text null default null, "default_location_id" text null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "store_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_store_deleted_at" on "store" ("deleted_at");');

    this.addSql('create table if not exists "tax_provider" ("id" text not null default null, "is_enabled" bool not null default true, constraint "tax_provider_pkey" primary key ("id"));');

    this.addSql('create table if not exists "tax_rate" ("id" text not null default null, "rate" float4 null default null, "code" text null default null, "name" text not null default null, "is_default" bool not null default false, "is_combinable" bool not null default false, "tax_region_id" text not null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "created_by" text null default null, "deleted_at" timestamptz(6) null default null, constraint "tax_rate_pkey" primary key ("id"));');
    this.addSql('alter table if exists "tax_rate" add constraint "IDX_single_default_region" unique ("tax_region_id");');
    this.addSql('create index if not exists "IDX_tax_rate_deleted_at" on "tax_rate" ("deleted_at");');
    this.addSql('create index if not exists "IDX_tax_rate_tax_region_id" on "tax_rate" ("tax_region_id");');

    this.addSql('create table if not exists "tax_rate_rule" ("id" text not null default null, "tax_rate_id" text not null default null, "reference_id" text not null default null, "reference" text not null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "created_by" text null default null, "deleted_at" timestamptz(6) null default null, constraint "tax_rate_rule_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_tax_rate_rule_deleted_at" on "tax_rate_rule" ("deleted_at");');
    this.addSql('create index if not exists "IDX_tax_rate_rule_reference_id" on "tax_rate_rule" ("reference_id");');
    this.addSql('create index if not exists "IDX_tax_rate_rule_tax_rate_id" on "tax_rate_rule" ("tax_rate_id");');
    this.addSql('alter table if exists "tax_rate_rule" add constraint "IDX_tax_rate_rule_unique_rate_reference" unique ("tax_rate_id", "reference_id");');

    this.addSql('create table if not exists "tax_region" ("id" text not null default null, "provider_id" text null default null, "country_code" text not null default null, "province_code" text null default null, "parent_id" text null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "created_by" text null default null, "deleted_at" timestamptz(6) null default null, constraint "tax_region_pkey" primary key ("id"), constraint CK_tax_region_country_top_level check ((parent_id IS NULL) OR (province_code IS NOT NULL)), constraint CK_tax_region_country_top_level check ((parent_id IS NULL) OR (province_code IS NOT NULL)), constraint CK_tax_region_provider_top_level check ((parent_id IS NULL) OR (provider_id IS NULL)), constraint CK_tax_region_provider_top_level check ((parent_id IS NULL) OR (provider_id IS NULL)));');
    this.addSql('create index if not exists "IDX_tax_region_deleted_at" on "tax_region" ("deleted_at");');
    this.addSql('create index if not exists "IDX_tax_region_parent_id" on "tax_region" ("parent_id");');
    this.addSql('alter table if exists "tax_region" add constraint "IDX_tax_region_unique_country_province" unique ("country_code", "province_code");');

    this.addSql('create table if not exists "user" ("id" text not null default null, "first_name" text null default null, "last_name" text null default null, "email" text not null default null, "avatar_url" text null default null, "metadata" jsonb null default null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "deleted_at" timestamptz(6) null default null, constraint "user_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_user_deleted_at" on "user" ("deleted_at");');
    this.addSql('create index if not exists "IDX_user_email" on "user" ("email");');

    this.addSql('create table if not exists "workflow_execution" ("id" varchar not null default null, "workflow_id" varchar not null default null, "transaction_id" varchar not null default null, "execution" jsonb null default null, "context" jsonb null default null, "state" varchar not null default null, "created_at" timestamp(6) not null default now(), "updated_at" timestamp(6) not null default now(), "deleted_at" timestamp(6) null default null, constraint "PK_workflow_execution_workflow_id_transaction_id" primary key ("workflow_id", "transaction_id"));');
    this.addSql('alter table if exists "workflow_execution" add constraint "IDX_workflow_execution_id" unique ("id");');
    this.addSql('create index if not exists "IDX_workflow_execution_state" on "workflow_execution" ("state");');
    this.addSql('create index if not exists "IDX_workflow_execution_transaction_id" on "workflow_execution" ("transaction_id");');
    this.addSql('create index if not exists "IDX_workflow_execution_workflow_id" on "workflow_execution" ("workflow_id");');

    this.addSql('alter table if exists "application_method_buy_rules" add constraint "application_method_buy_rules_application_method_id_foreign" foreign key ("application_method_id") references "promotion_application_method" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "application_method_buy_rules" add constraint "application_method_buy_rules_promotion_rule_id_foreign" foreign key ("promotion_rule_id") references "promotion_rule" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "application_method_target_rules" add constraint "application_method_target_rules_application_method_id_foreign" foreign key ("application_method_id") references "promotion_application_method" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "application_method_target_rules" add constraint "application_method_target_rules_promotion_rule_id_foreign" foreign key ("promotion_rule_id") references "promotion_rule" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "capture" add constraint "capture_payment_id_foreign" foreign key ("payment_id") references "payment" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "cart" add constraint "cart_billing_address_id_foreign" foreign key ("billing_address_id") references "cart_address" ("id") on update cascade on delete set null;');
    this.addSql('alter table if exists "cart" add constraint "cart_shipping_address_id_foreign" foreign key ("shipping_address_id") references "cart_address" ("id") on update cascade on delete set null;');

    this.addSql('alter table if exists "cart_line_item" add constraint "cart_line_item_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "cart_line_item_adjustment" add constraint "cart_line_item_adjustment_item_id_foreign" foreign key ("item_id") references "cart_line_item" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "cart_line_item_tax_line" add constraint "cart_line_item_tax_line_item_id_foreign" foreign key ("item_id") references "cart_line_item" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "cart_shipping_method" add constraint "cart_shipping_method_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "cart_shipping_method_adjustment" add constraint "cart_shipping_method_adjustment_shipping_method_id_foreign" foreign key ("shipping_method_id") references "cart_shipping_method" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "cart_shipping_method_tax_line" add constraint "cart_shipping_method_tax_line_shipping_method_id_foreign" foreign key ("shipping_method_id") references "cart_shipping_method" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "customer_address" add constraint "customer_address_customer_id_foreign" foreign key ("customer_id") references "customer" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "customer_group_customer" add constraint "customer_group_customer_customer_group_id_foreign" foreign key ("customer_group_id") references "customer_group" ("id") on update no action on delete cascade;');
    this.addSql('alter table if exists "customer_group_customer" add constraint "customer_group_customer_customer_id_foreign" foreign key ("customer_id") references "customer" ("id") on update no action on delete cascade;');

    this.addSql('alter table if exists "fulfillment" add constraint "fulfillment_delivery_address_id_foreign" foreign key ("delivery_address_id") references "fulfillment_address" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "fulfillment" add constraint "fulfillment_provider_id_foreign" foreign key ("provider_id") references "fulfillment_provider" ("id") on update cascade on delete set null;');
    this.addSql('alter table if exists "fulfillment" add constraint "fulfillment_shipping_option_id_foreign" foreign key ("shipping_option_id") references "shipping_option" ("id") on update cascade on delete set null;');

    this.addSql('alter table if exists "fulfillment_item" add constraint "fulfillment_item_fulfillment_id_foreign" foreign key ("fulfillment_id") references "fulfillment" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "fulfillment_label" add constraint "fulfillment_label_fulfillment_id_foreign" foreign key ("fulfillment_id") references "fulfillment" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "geo_zone" add constraint "geo_zone_service_zone_id_foreign" foreign key ("service_zone_id") references "service_zone" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "inventory_level" add constraint "inventory_level_inventory_item_id_foreign" foreign key ("inventory_item_id") references "inventory_item" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "order" add constraint "order_billing_address_id_foreign" foreign key ("billing_address_id") references "order_address" ("id") on update cascade on delete set null;');
    this.addSql('alter table if exists "order" add constraint "order_shipping_address_id_foreign" foreign key ("shipping_address_id") references "order_address" ("id") on update cascade on delete set null;');

    this.addSql('alter table if exists "order_change" add constraint "order_change_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "order_change_action" add constraint "order_change_action_order_change_id_foreign" foreign key ("order_change_id") references "order_change" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "order_item" add constraint "order_item_item_id_foreign" foreign key ("item_id") references "order_line_item" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "order_item" add constraint "order_item_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "order_line_item" add constraint "order_line_item_totals_id_foreign" foreign key ("totals_id") references "order_item" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "order_line_item_adjustment" add constraint "order_line_item_adjustment_item_id_foreign" foreign key ("item_id") references "order_line_item" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "order_line_item_tax_line" add constraint "order_line_item_tax_line_item_id_foreign" foreign key ("item_id") references "order_line_item" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "order_shipping_method" add constraint "order_shipping_method_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "order_shipping_method_adjustment" add constraint "order_shipping_method_adjustment_shipping_method_id_foreign" foreign key ("shipping_method_id") references "order_shipping_method" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "order_shipping_method_tax_line" add constraint "order_shipping_method_tax_line_shipping_method_id_foreign" foreign key ("shipping_method_id") references "order_shipping_method" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "order_transaction" add constraint "order_transaction_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "payment" add constraint "payment_payment_collection_id_foreign" foreign key ("payment_collection_id") references "payment_collection" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "payment_collection_payment_providers" add constraint "payment_collection_payment_providers_payment_coll_aa276_foreign" foreign key ("payment_collection_id") references "payment_collection" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "payment_collection_payment_providers" add constraint "payment_collection_payment_providers_payment_provider_id_foreig" foreign key ("payment_provider_id") references "payment_provider" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "payment_session" add constraint "payment_session_payment_collection_id_foreign" foreign key ("payment_collection_id") references "payment_collection" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "price" add constraint "price_price_list_id_foreign" foreign key ("price_list_id") references "price_list" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "price" add constraint "price_price_set_id_foreign" foreign key ("price_set_id") references "price_set" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "price_list_rule" add constraint "price_list_rule_price_list_id_foreign" foreign key ("price_list_id") references "price_list" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "price_list_rule" add constraint "price_list_rule_rule_type_id_foreign" foreign key ("rule_type_id") references "rule_type" ("id") on update cascade on delete no action;');

    this.addSql('alter table if exists "price_list_rule_value" add constraint "price_list_rule_value_price_list_rule_id_foreign" foreign key ("price_list_rule_id") references "price_list_rule" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "price_rule" add constraint "price_rule_price_id_foreign" foreign key ("price_id") references "price" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "price_rule" add constraint "price_rule_price_set_id_foreign" foreign key ("price_set_id") references "price_set" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "price_rule" add constraint "price_rule_rule_type_id_foreign" foreign key ("rule_type_id") references "rule_type" ("id") on update cascade on delete no action;');

    this.addSql('alter table if exists "price_set_rule_type" add constraint "price_set_rule_type_price_set_id_foreign" foreign key ("price_set_id") references "price_set" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "price_set_rule_type" add constraint "price_set_rule_type_rule_type_id_foreign" foreign key ("rule_type_id") references "rule_type" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "product" add constraint "product_collection_id_foreign" foreign key ("collection_id") references "product_collection" ("id") on update cascade on delete set null;');
    this.addSql('alter table if exists "product" add constraint "product_type_id_foreign" foreign key ("type_id") references "product_type" ("id") on update cascade on delete set null;');

    this.addSql('alter table if exists "product_category" add constraint "product_category_parent_category_id_foreign" foreign key ("parent_category_id") references "product_category" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "product_category_product" add constraint "product_category_product_product_category_id_foreign" foreign key ("product_category_id") references "product_category" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "product_category_product" add constraint "product_category_product_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "product_images" add constraint "product_images_image_id_foreign" foreign key ("image_id") references "image" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "product_images" add constraint "product_images_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "product_option" add constraint "product_option_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "product_option_value" add constraint "product_option_value_option_id_foreign" foreign key ("option_id") references "product_option" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "product_tags" add constraint "product_tags_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "product_tags" add constraint "product_tags_product_tag_id_foreign" foreign key ("product_tag_id") references "product_tag" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "product_variant" add constraint "product_variant_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "product_variant_option" add constraint "product_variant_option_option_value_id_foreign" foreign key ("option_value_id") references "product_option_value" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "product_variant_option" add constraint "product_variant_option_variant_id_foreign" foreign key ("variant_id") references "product_variant" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "promotion" add constraint "promotion_campaign_id_foreign" foreign key ("campaign_id") references "promotion_campaign" ("id") on update no action on delete set null;');

    this.addSql('alter table if exists "promotion_application_method" add constraint "promotion_application_method_promotion_id_foreign" foreign key ("promotion_id") references "promotion" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "promotion_campaign_budget" add constraint "promotion_campaign_budget_campaign_id_foreign" foreign key ("campaign_id") references "promotion_campaign" ("id") on update cascade on delete no action;');

    this.addSql('alter table if exists "promotion_promotion_rule" add constraint "promotion_promotion_rule_promotion_id_foreign" foreign key ("promotion_id") references "promotion" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "promotion_promotion_rule" add constraint "promotion_promotion_rule_promotion_rule_id_foreign" foreign key ("promotion_rule_id") references "promotion_rule" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "promotion_rule_value" add constraint "promotion_rule_value_promotion_rule_id_foreign" foreign key ("promotion_rule_id") references "promotion_rule" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "refund" add constraint "refund_payment_id_foreign" foreign key ("payment_id") references "payment" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "region_country" add constraint "region_country_region_id_foreign" foreign key ("region_id") references "region" ("id") on update cascade on delete set null;');

    this.addSql('alter table if exists "reservation_item" add constraint "reservation_item_inventory_item_id_foreign" foreign key ("inventory_item_id") references "inventory_item" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "restaurant_admin" add constraint "foreign_key_restaurant_id" foreign key ("restaurant_id") references "restaurant" ("id") on update no action on delete no action;');

    this.addSql('alter table if exists "service_zone" add constraint "service_zone_fulfillment_set_id_foreign" foreign key ("fulfillment_set_id") references "fulfillment_set" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "shipping_option" add constraint "shipping_option_provider_id_foreign" foreign key ("provider_id") references "fulfillment_provider" ("id") on update cascade on delete set null;');
    this.addSql('alter table if exists "shipping_option" add constraint "shipping_option_service_zone_id_foreign" foreign key ("service_zone_id") references "service_zone" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "shipping_option" add constraint "shipping_option_shipping_option_type_id_foreign" foreign key ("shipping_option_type_id") references "shipping_option_type" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "shipping_option" add constraint "shipping_option_shipping_profile_id_foreign" foreign key ("shipping_profile_id") references "shipping_profile" ("id") on update cascade on delete set null;');

    this.addSql('alter table if exists "shipping_option_rule" add constraint "shipping_option_rule_shipping_option_id_foreign" foreign key ("shipping_option_id") references "shipping_option" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "stock_location" add constraint "stock_location_address_id_foreign" foreign key ("address_id") references "stock_location_address" ("id") on update cascade on delete set null;');

    this.addSql('alter table if exists "tax_rate" add constraint "FK_tax_rate_tax_region_id" foreign key ("tax_region_id") references "tax_region" ("id") on update no action on delete cascade;');

    this.addSql('alter table if exists "tax_rate_rule" add constraint "FK_tax_rate_rule_tax_rate_id" foreign key ("tax_rate_id") references "tax_rate" ("id") on update no action on delete cascade;');

    this.addSql('alter table if exists "tax_region" add constraint "FK_tax_region_parent_id" foreign key ("parent_id") references "tax_region" ("id") on update no action on delete cascade;');
    this.addSql('alter table if exists "tax_region" add constraint "FK_tax_region_provider_id" foreign key ("provider_id") references "tax_provider" ("id") on update no action on delete set null;');

    this.addSql('alter table if exists "delivery" drop constraint if exists "delivery_delivery_status_check";');

    this.addSql('alter table if exists "delivery" alter column if exists "transaction_id" type text using ("transaction_id"::text);');
    this.addSql('alter table if exists "delivery" alter column if exists "transaction_id" drop not null;');
    this.addSql('alter table if exists "delivery" alter column if exists "restaurant_id" type text using ("restaurant_id"::text);');
    this.addSql('alter table if exists "delivery" alter column if exists "restaurant_id" drop not null;');
    this.addSql('alter table if exists "delivery" alter column if exists "delivery_status" type text using ("delivery_status"::text);');
    this.addSql('alter table if exists "delivery" alter column if exists "updated_at" type timestamptz(6) using ("updated_at"::timestamptz(6));');
    this.addSql('alter table if exists "delivery" add constraint "delivery_driver_id_foreign" foreign key ("driver_id") references "driver" ("id") on update cascade on delete no action;');
    this.addSql('alter table if exists "delivery" add constraint "delivery_restaurant_id_foreign" foreign key ("restaurant_id") references "restaurant" ("id") on update cascade on delete no action;');
    this.addSql('alter table if exists "delivery" add constraint delivery_id_check check(id ~ \'^del\'::text);');

    this.addSql('alter table if exists "driver" alter column if exists "avatar_url" type text using ("avatar_url"::text);');
    this.addSql('alter table if exists "driver" alter column if exists "avatar_url" drop not null;');
    this.addSql('alter table if exists "driver" alter column if exists "updated_at" type timestamptz(6) using ("updated_at"::timestamptz(6));');
    this.addSql('alter table if exists "driver" add constraint driver_id_check check(id ~ \'^drv\'::text);');
  }

}
