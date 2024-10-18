import "@medusajs/framework/types"
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date | string; output: Date | string; }
  JSON: { input: Record<string, unknown>; output: Record<string, unknown>; }
};

export type StockLocationAddress = {
  __typename?: 'StockLocationAddress';
  id?: Maybe<Scalars['ID']['output']>;
  address_1: Scalars['String']['output'];
  address_2?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  country_code: Scalars['String']['output'];
  city?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  postal_code?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export type StockLocation = {
  __typename?: 'StockLocation';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  address_id: Scalars['ID']['output'];
  address?: Maybe<StockLocationAddress>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  fulfillment_provider_link?: Maybe<Array<Maybe<LinkLocationFulfillmentProvider>>>;
  fulfillment_providers?: Maybe<Array<Maybe<FulfillmentProvider>>>;
  fulfillment_set_link?: Maybe<Array<Maybe<LinkLocationFulfillmentSet>>>;
  fulfillment_sets?: Maybe<Array<Maybe<FulfillmentSet>>>;
  sales_channels_link?: Maybe<Array<Maybe<LinkSalesChannelStockLocation>>>;
  sales_channels?: Maybe<Array<Maybe<SalesChannel>>>;
};

export type InventoryItem = {
  __typename?: 'InventoryItem';
  id: Scalars['ID']['output'];
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  origin_country?: Maybe<Scalars['String']['output']>;
  hs_code?: Maybe<Scalars['String']['output']>;
  mid_code?: Maybe<Scalars['String']['output']>;
  material?: Maybe<Scalars['String']['output']>;
  weight?: Maybe<Scalars['Int']['output']>;
  length?: Maybe<Scalars['Int']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
  requires_shipping: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  inventory_levels?: Maybe<Array<Maybe<InventoryLevel>>>;
  variant_link?: Maybe<Array<Maybe<LinkProductVariantInventoryItem>>>;
  variants?: Maybe<Array<Maybe<ProductVariant>>>;
};

export type InventoryLevel = {
  __typename?: 'InventoryLevel';
  id: Scalars['ID']['output'];
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  inventory_item_id: Scalars['String']['output'];
  inventory_item: InventoryItem;
  location_id: Scalars['String']['output'];
  stocked_quantity: Scalars['Int']['output'];
  reserved_quantity: Scalars['Int']['output'];
  incoming_quantity: Scalars['Int']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
};

export type ReservationItem = {
  __typename?: 'ReservationItem';
  id: Scalars['ID']['output'];
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  line_item_id?: Maybe<Scalars['String']['output']>;
  inventory_item_id: Scalars['String']['output'];
  inventory_item: InventoryItem;
  location_id: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  external_id?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  created_by?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
};

export enum ProductStatus {
  Draft = 'draft',
  Proposed = 'proposed',
  Published = 'published',
  Rejected = 'rejected'
}

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  handle: Scalars['String']['output'];
  subtitle?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  is_giftcard: Scalars['Boolean']['output'];
  status: ProductStatus;
  thumbnail?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  length?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  origin_country?: Maybe<Scalars['String']['output']>;
  hs_code?: Maybe<Scalars['String']['output']>;
  mid_code?: Maybe<Scalars['String']['output']>;
  material?: Maybe<Scalars['String']['output']>;
  collection?: Maybe<ProductCollection>;
  collection_id?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<Maybe<ProductCategory>>>;
  type?: Maybe<ProductType>;
  type_id?: Maybe<Scalars['String']['output']>;
  tags: Array<ProductTag>;
  variants: Array<ProductVariant>;
  options: Array<ProductOption>;
  images: Array<ProductImage>;
  discountable?: Maybe<Scalars['Boolean']['output']>;
  external_id?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  sales_channels_link?: Maybe<Array<Maybe<LinkProductSalesChannel>>>;
  sales_channels?: Maybe<Array<Maybe<SalesChannel>>>;
  restaurant_link?: Maybe<LinkRestaurantModuleRestaurantProductProduct>;
  restaurant?: Maybe<Restaurant>;
};

export type ProductVariant = {
  __typename?: 'ProductVariant';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  sku?: Maybe<Scalars['String']['output']>;
  barcode?: Maybe<Scalars['String']['output']>;
  ean?: Maybe<Scalars['String']['output']>;
  upc?: Maybe<Scalars['String']['output']>;
  allow_backorder: Scalars['Boolean']['output'];
  manage_inventory: Scalars['Boolean']['output'];
  requires_shipping: Scalars['Boolean']['output'];
  hs_code?: Maybe<Scalars['String']['output']>;
  origin_country?: Maybe<Scalars['String']['output']>;
  mid_code?: Maybe<Scalars['String']['output']>;
  material?: Maybe<Scalars['String']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  length?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
  options: Array<ProductOptionValue>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  product?: Maybe<Product>;
  product_id?: Maybe<Scalars['String']['output']>;
  variant_rank?: Maybe<Scalars['Int']['output']>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  inventory_items?: Maybe<Array<Maybe<LinkProductVariantInventoryItem>>>;
  inventory?: Maybe<Array<Maybe<InventoryItem>>>;
  price_set_link?: Maybe<LinkProductVariantPriceSet>;
  price_set?: Maybe<PriceSet>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  description: Scalars['String']['output'];
  handle: Scalars['String']['output'];
  is_active: Scalars['Boolean']['output'];
  is_internal: Scalars['Boolean']['output'];
  rank: Scalars['Int']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  parent_category?: Maybe<ProductCategory>;
  parent_category_id?: Maybe<Scalars['String']['output']>;
  category_children: Array<ProductCategory>;
  products: Array<Product>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export type ProductTag = {
  __typename?: 'ProductTag';
  id: Scalars['ID']['output'];
  value: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  products?: Maybe<Array<Maybe<Product>>>;
};

export type ProductCollection = {
  __typename?: 'ProductCollection';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  handle: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  products?: Maybe<Array<Maybe<Product>>>;
};

export type ProductType = {
  __typename?: 'ProductType';
  id: Scalars['ID']['output'];
  value: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export type ProductOption = {
  __typename?: 'ProductOption';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  product?: Maybe<Product>;
  product_id?: Maybe<Scalars['String']['output']>;
  values: Array<ProductOptionValue>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export type ProductImage = {
  __typename?: 'ProductImage';
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export type ProductOptionValue = {
  __typename?: 'ProductOptionValue';
  id: Scalars['ID']['output'];
  value: Scalars['String']['output'];
  option?: Maybe<ProductOption>;
  option_id?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export type PriceSet = {
  __typename?: 'PriceSet';
  id: Scalars['ID']['output'];
  prices?: Maybe<Array<Maybe<Price>>>;
  calculated_price?: Maybe<CalculatedPriceSet>;
  variant_link?: Maybe<LinkProductVariantPriceSet>;
  variant?: Maybe<ProductVariant>;
  shipping_option_link?: Maybe<LinkShippingOptionPriceSet>;
  shipping_option?: Maybe<ShippingOption>;
};

export type Price = {
  __typename?: 'Price';
  id: Scalars['ID']['output'];
  currency_code?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['Float']['output']>;
  min_quantity?: Maybe<Scalars['Float']['output']>;
  max_quantity?: Maybe<Scalars['Float']['output']>;
  rules_count?: Maybe<Scalars['Int']['output']>;
  price_rules?: Maybe<Array<Maybe<PriceRule>>>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export type PriceRule = {
  __typename?: 'PriceRule';
  id: Scalars['ID']['output'];
  price_set_id: Scalars['String']['output'];
  price_set?: Maybe<PriceSet>;
  attribute: Scalars['String']['output'];
  value: Scalars['String']['output'];
  priority: Scalars['Int']['output'];
  price_id: Scalars['String']['output'];
  price_list_id: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export type CalculatedPriceSet = {
  __typename?: 'CalculatedPriceSet';
  id: Scalars['ID']['output'];
  is_calculated_price_price_list?: Maybe<Scalars['Boolean']['output']>;
  is_calculated_price_tax_inclusive?: Maybe<Scalars['Boolean']['output']>;
  calculated_amount?: Maybe<Scalars['Float']['output']>;
  raw_calculated_amount?: Maybe<Scalars['JSON']['output']>;
  is_original_price_price_list?: Maybe<Scalars['Boolean']['output']>;
  is_original_price_tax_inclusive?: Maybe<Scalars['Boolean']['output']>;
  original_amount?: Maybe<Scalars['Float']['output']>;
  raw_original_amount?: Maybe<Scalars['JSON']['output']>;
  currency_code?: Maybe<Scalars['String']['output']>;
  calculated_price?: Maybe<PriceDetails>;
  original_price?: Maybe<PriceDetails>;
};

export type PriceDetails = {
  __typename?: 'PriceDetails';
  id?: Maybe<Scalars['ID']['output']>;
  price_list_id?: Maybe<Scalars['String']['output']>;
  price_list_type?: Maybe<Scalars['String']['output']>;
  min_quantity?: Maybe<Scalars['Float']['output']>;
  max_quantity?: Maybe<Scalars['Float']['output']>;
};

export enum PromotionTypeValues {
  Standard = 'standard',
  Buyget = 'buyget'
}

export enum PromotionRuleOperatorValues {
  Gt = 'gt',
  Lt = 'lt',
  Eq = 'eq',
  Ne = 'ne',
  In = 'in',
  Lte = 'lte',
  Gte = 'gte'
}

export enum CampaignBudgetTypeValues {
  Spend = 'spend',
  Usage = 'usage'
}

export enum ApplicationMethodTypeValues {
  Fixed = 'fixed',
  Percentage = 'percentage'
}

export enum ApplicationMethodTargetTypeValues {
  Order = 'order',
  ShippingMethods = 'shipping_methods',
  Items = 'items'
}

export enum ApplicationMethodAllocationValues {
  Each = 'each',
  Across = 'across'
}

export type Promotion = {
  __typename?: 'Promotion';
  id: Scalars['ID']['output'];
  code?: Maybe<Scalars['String']['output']>;
  type?: Maybe<PromotionTypeValues>;
  is_automatic?: Maybe<Scalars['Boolean']['output']>;
  application_method?: Maybe<ApplicationMethod>;
  rules?: Maybe<Array<Maybe<PromotionRule>>>;
  campaign_id?: Maybe<Scalars['String']['output']>;
  campaign?: Maybe<Campaign>;
  order_link?: Maybe<LinkOrderPromotion>;
};

export type PromotionRule = {
  __typename?: 'PromotionRule';
  id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  attribute?: Maybe<Scalars['String']['output']>;
  operator?: Maybe<PromotionRuleOperatorValues>;
  values: Array<PromotionRuleValue>;
};

export type PromotionRuleValue = {
  __typename?: 'PromotionRuleValue';
  id: Scalars['ID']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

export type Campaign = {
  __typename?: 'Campaign';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  campaign_identifier?: Maybe<Scalars['String']['output']>;
  starts_at?: Maybe<Scalars['DateTime']['output']>;
  ends_at?: Maybe<Scalars['DateTime']['output']>;
  budget?: Maybe<CampaignBudget>;
  promotions?: Maybe<Array<Maybe<Promotion>>>;
};

export type CampaignBudget = {
  __typename?: 'CampaignBudget';
  id: Scalars['ID']['output'];
  type?: Maybe<CampaignBudgetTypeValues>;
  limit?: Maybe<Scalars['Int']['output']>;
  used?: Maybe<Scalars['Int']['output']>;
  currency_code?: Maybe<Scalars['String']['output']>;
};

export type ApplicationMethod = {
  __typename?: 'ApplicationMethod';
  id: Scalars['ID']['output'];
  type?: Maybe<ApplicationMethodTypeValues>;
  target_type?: Maybe<ApplicationMethodTargetTypeValues>;
  allocation?: Maybe<ApplicationMethodAllocationValues>;
  value?: Maybe<Scalars['Float']['output']>;
  currency_code?: Maybe<Scalars['String']['output']>;
  max_quantity?: Maybe<Scalars['Int']['output']>;
  buy_rules_min_quantity?: Maybe<Scalars['Int']['output']>;
  apply_to_quantity?: Maybe<Scalars['Int']['output']>;
  promotion?: Maybe<Promotion>;
  target_rules?: Maybe<Array<Maybe<PromotionRule>>>;
  buy_rules?: Maybe<Array<Maybe<PromotionRule>>>;
};

export type SalesChannel = {
  __typename?: 'SalesChannel';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  is_disabled: Scalars['Boolean']['output'];
  created_at: Scalars['DateTime']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  products_link?: Maybe<Array<Maybe<LinkProductSalesChannel>>>;
  api_keys_link?: Maybe<Array<Maybe<LinkPublishableApiKeySalesChannel>>>;
  locations_link?: Maybe<Array<Maybe<LinkSalesChannelStockLocation>>>;
  stock_locations?: Maybe<Array<Maybe<StockLocation>>>;
};

export type Region = {
  __typename?: 'Region';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  currency_code: Scalars['String']['output'];
  automatic_taxes: Scalars['Boolean']['output'];
  countries: Array<Maybe<Country>>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  payment_provider_link?: Maybe<Array<Maybe<LinkRegionPaymentProvider>>>;
  payment_providers?: Maybe<Array<Maybe<PaymentProvider>>>;
};

export type Country = {
  __typename?: 'Country';
  iso_2: Scalars['ID']['output'];
  iso_3: Scalars['String']['output'];
  num_code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  display_name: Scalars['String']['output'];
  region?: Maybe<Array<Maybe<Region>>>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export type Currency = {
  __typename?: 'Currency';
  code: Scalars['ID']['output'];
  symbol: Scalars['String']['output'];
  symbol_native: Scalars['String']['output'];
  name: Scalars['String']['output'];
  decimal_digits: Scalars['Int']['output'];
  rounding: Scalars['String']['output'];
  raw_rounding: Scalars['JSON']['output'];
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export enum PaymentCollectionStatus {
  NotPaid = 'not_paid',
  Awaiting = 'awaiting',
  Authorized = 'authorized',
  PartiallyAuthorized = 'partially_authorized',
  Canceled = 'canceled'
}

export enum PaymentSessionStatus {
  Authorized = 'authorized',
  Captured = 'captured',
  Pending = 'pending',
  RequiresMore = 'requires_more',
  Error = 'error',
  Canceled = 'canceled'
}

export type PaymentCollection = {
  __typename?: 'PaymentCollection';
  id: Scalars['ID']['output'];
  currency_code: Scalars['String']['output'];
  region_id: Scalars['String']['output'];
  amount: Scalars['Float']['output'];
  authorized_amount?: Maybe<Scalars['Float']['output']>;
  refunded_amount?: Maybe<Scalars['Float']['output']>;
  captured_amount?: Maybe<Scalars['Float']['output']>;
  completed_at?: Maybe<Scalars['DateTime']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  status: PaymentCollectionStatus;
  cart_link?: Maybe<LinkCartPaymentCollection>;
  order_link?: Maybe<LinkOrderPaymentCollection>;
  order?: Maybe<Order>;
};

export type Payment = {
  __typename?: 'Payment';
  id: Scalars['ID']['output'];
  amount: Scalars['Float']['output'];
  raw_amount?: Maybe<Scalars['Float']['output']>;
  authorized_amount?: Maybe<Scalars['Float']['output']>;
  raw_authorized_amount?: Maybe<Scalars['Float']['output']>;
  currency_code: Scalars['String']['output'];
  provider_id: Scalars['String']['output'];
  cart_id?: Maybe<Scalars['String']['output']>;
  order_id?: Maybe<Scalars['String']['output']>;
  order_edit_id?: Maybe<Scalars['String']['output']>;
  customer_id?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Scalars['JSON']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  captured_at?: Maybe<Scalars['DateTime']['output']>;
  canceled_at?: Maybe<Scalars['DateTime']['output']>;
  captured_amount?: Maybe<Scalars['Float']['output']>;
  raw_captured_amount?: Maybe<Scalars['Float']['output']>;
  refunded_amount?: Maybe<Scalars['Float']['output']>;
  raw_refunded_amount?: Maybe<Scalars['Float']['output']>;
  payment_collection_id: Scalars['String']['output'];
};

export type Capture = {
  __typename?: 'Capture';
  id: Scalars['ID']['output'];
  amount: Scalars['Float']['output'];
  created_at: Scalars['DateTime']['output'];
  created_by?: Maybe<Scalars['String']['output']>;
  payment: Payment;
};

export type Refund = {
  __typename?: 'Refund';
  id: Scalars['ID']['output'];
  amount: Scalars['Float']['output'];
  refund_reason_id?: Maybe<Scalars['String']['output']>;
  refund_reason?: Maybe<RefundReason>;
  note?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  created_by?: Maybe<Scalars['String']['output']>;
  payment: Payment;
};

export type PaymentSession = {
  __typename?: 'PaymentSession';
  id: Scalars['ID']['output'];
  amount: Scalars['Float']['output'];
  currency_code: Scalars['String']['output'];
  provider_id: Scalars['String']['output'];
  data: Scalars['JSON']['output'];
  context?: Maybe<Scalars['JSON']['output']>;
  status: PaymentSessionStatus;
  authorized_at?: Maybe<Scalars['DateTime']['output']>;
  payment_collection_id: Scalars['String']['output'];
  payment_collection?: Maybe<PaymentCollection>;
  payment?: Maybe<Payment>;
};

export type PaymentProvider = {
  __typename?: 'PaymentProvider';
  id: Scalars['ID']['output'];
  is_enabled: Scalars['String']['output'];
  region_link?: Maybe<Array<Maybe<LinkRegionPaymentProvider>>>;
  regions?: Maybe<Array<Maybe<Region>>>;
};

export type RefundReason = {
  __typename?: 'RefundReason';
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export enum ChangeActionType {
  CancelReturnItem = 'CANCEL_RETURN_ITEM',
  FulfillItem = 'FULFILL_ITEM',
  CancelItemFulfillment = 'CANCEL_ITEM_FULFILLMENT',
  ItemAdd = 'ITEM_ADD',
  ItemRemove = 'ITEM_REMOVE',
  ItemUpdate = 'ITEM_UPDATE',
  ReceiveDamagedReturnItem = 'RECEIVE_DAMAGED_RETURN_ITEM',
  ReceiveReturnItem = 'RECEIVE_RETURN_ITEM',
  ReturnItem = 'RETURN_ITEM',
  ShippingAdd = 'SHIPPING_ADD',
  ShippingRemove = 'SHIPPING_REMOVE',
  ShipItem = 'SHIP_ITEM',
  WriteOffItem = 'WRITE_OFF_ITEM',
  ReinstateItem = 'REINSTATE_ITEM'
}

export type OrderSummary = {
  __typename?: 'OrderSummary';
  total?: Maybe<Scalars['Float']['output']>;
  subtotal?: Maybe<Scalars['Float']['output']>;
  total_tax?: Maybe<Scalars['Float']['output']>;
  ordered_total?: Maybe<Scalars['Float']['output']>;
  fulfilled_total?: Maybe<Scalars['Float']['output']>;
  returned_total?: Maybe<Scalars['Float']['output']>;
  return_request_total?: Maybe<Scalars['Float']['output']>;
  write_off_total?: Maybe<Scalars['Float']['output']>;
  projected_total?: Maybe<Scalars['Float']['output']>;
  net_total?: Maybe<Scalars['Float']['output']>;
  net_subtotal?: Maybe<Scalars['Float']['output']>;
  net_total_tax?: Maybe<Scalars['Float']['output']>;
  balance?: Maybe<Scalars['Float']['output']>;
  paid_total?: Maybe<Scalars['Float']['output']>;
  refunded_total?: Maybe<Scalars['Float']['output']>;
  pending_difference?: Maybe<Scalars['Float']['output']>;
  raw_pending_difference?: Maybe<Scalars['JSON']['output']>;
};

export type OrderShippingMethodAdjustment = {
  __typename?: 'OrderShippingMethodAdjustment';
  id: Scalars['ID']['output'];
  code?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['Float']['output']>;
  order_id: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  promotion_id?: Maybe<Scalars['String']['output']>;
  provider_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  shipping_method?: Maybe<OrderShippingMethod>;
  shipping_method_id: Scalars['String']['output'];
};

export type OrderLineItemAdjustment = {
  __typename?: 'OrderLineItemAdjustment';
  id: Scalars['ID']['output'];
  code?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['Float']['output']>;
  order_id: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  promotion_id?: Maybe<Scalars['String']['output']>;
  provider_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  item?: Maybe<OrderLineItem>;
  item_id: Scalars['String']['output'];
};

export type OrderShippingMethodTaxLine = {
  __typename?: 'OrderShippingMethodTaxLine';
  id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  tax_rate_id?: Maybe<Scalars['String']['output']>;
  code: Scalars['String']['output'];
  rate?: Maybe<Scalars['Float']['output']>;
  provider_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  shipping_method?: Maybe<OrderShippingMethod>;
  shipping_method_id: Scalars['String']['output'];
  total?: Maybe<Scalars['Float']['output']>;
  subtotal?: Maybe<Scalars['Float']['output']>;
  raw_total?: Maybe<Scalars['JSON']['output']>;
  raw_subtotal?: Maybe<Scalars['JSON']['output']>;
};

export type OrderLineItemTaxLine = {
  __typename?: 'OrderLineItemTaxLine';
  id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  tax_rate_id?: Maybe<Scalars['String']['output']>;
  code: Scalars['String']['output'];
  rate?: Maybe<Scalars['Float']['output']>;
  provider_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  item?: Maybe<OrderLineItem>;
  item_id: Scalars['String']['output'];
  total?: Maybe<Scalars['Float']['output']>;
  subtotal?: Maybe<Scalars['Float']['output']>;
  raw_total?: Maybe<Scalars['JSON']['output']>;
  raw_subtotal?: Maybe<Scalars['JSON']['output']>;
};

export type OrderAddress = {
  __typename?: 'OrderAddress';
  id: Scalars['ID']['output'];
  customer_id?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  address_1?: Maybe<Scalars['String']['output']>;
  address_2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country_code?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  postal_code?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type OrderShippingMethod = {
  __typename?: 'OrderShippingMethod';
  id: Scalars['ID']['output'];
  order_id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['Float']['output']>;
  raw_amount?: Maybe<Scalars['JSON']['output']>;
  is_tax_inclusive?: Maybe<Scalars['Boolean']['output']>;
  shipping_option_id?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Scalars['JSON']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  tax_lines?: Maybe<Array<Maybe<OrderShippingMethodTaxLine>>>;
  adjustments?: Maybe<Array<Maybe<OrderShippingMethodAdjustment>>>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  original_total?: Maybe<Scalars['Float']['output']>;
  original_subtotal?: Maybe<Scalars['Float']['output']>;
  original_tax_total?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  subtotal?: Maybe<Scalars['Float']['output']>;
  tax_total?: Maybe<Scalars['Float']['output']>;
  discount_total?: Maybe<Scalars['Float']['output']>;
  discount_tax_total?: Maybe<Scalars['Float']['output']>;
  raw_original_total?: Maybe<Scalars['JSON']['output']>;
  raw_original_subtotal?: Maybe<Scalars['JSON']['output']>;
  raw_original_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_total?: Maybe<Scalars['JSON']['output']>;
  raw_subtotal?: Maybe<Scalars['JSON']['output']>;
  raw_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_discount_total?: Maybe<Scalars['JSON']['output']>;
  raw_discount_tax_total?: Maybe<Scalars['JSON']['output']>;
};

export type OrderLineItem = {
  __typename?: 'OrderLineItem';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  subtitle?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  variant_id?: Maybe<Scalars['String']['output']>;
  product_id?: Maybe<Scalars['String']['output']>;
  product_title?: Maybe<Scalars['String']['output']>;
  product_description?: Maybe<Scalars['String']['output']>;
  product_subtitle?: Maybe<Scalars['String']['output']>;
  product_type?: Maybe<Scalars['String']['output']>;
  product_collection?: Maybe<Scalars['String']['output']>;
  product_handle?: Maybe<Scalars['String']['output']>;
  variant_sku?: Maybe<Scalars['String']['output']>;
  variant_barcode?: Maybe<Scalars['String']['output']>;
  variant_title?: Maybe<Scalars['String']['output']>;
  variant_option_values?: Maybe<Scalars['JSON']['output']>;
  requires_shipping: Scalars['Boolean']['output'];
  is_discountable: Scalars['Boolean']['output'];
  is_tax_inclusive: Scalars['Boolean']['output'];
  compare_at_unit_price?: Maybe<Scalars['Float']['output']>;
  raw_compare_at_unit_price?: Maybe<Scalars['JSON']['output']>;
  unit_price: Scalars['Float']['output'];
  raw_unit_price?: Maybe<Scalars['JSON']['output']>;
  quantity: Scalars['Int']['output'];
  raw_quantity?: Maybe<Scalars['JSON']['output']>;
  tax_lines?: Maybe<Array<Maybe<OrderLineItemTaxLine>>>;
  adjustments?: Maybe<Array<Maybe<OrderLineItemAdjustment>>>;
  detail: OrderItem;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  original_total?: Maybe<Scalars['Float']['output']>;
  original_subtotal?: Maybe<Scalars['Float']['output']>;
  original_tax_total?: Maybe<Scalars['Float']['output']>;
  item_total?: Maybe<Scalars['Float']['output']>;
  item_subtotal?: Maybe<Scalars['Float']['output']>;
  item_tax_total?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  subtotal?: Maybe<Scalars['Float']['output']>;
  tax_total?: Maybe<Scalars['Float']['output']>;
  discount_total?: Maybe<Scalars['Float']['output']>;
  discount_tax_total?: Maybe<Scalars['Float']['output']>;
  refundable_total?: Maybe<Scalars['Float']['output']>;
  refundable_total_per_unit?: Maybe<Scalars['Float']['output']>;
  raw_original_total?: Maybe<Scalars['JSON']['output']>;
  raw_original_subtotal?: Maybe<Scalars['JSON']['output']>;
  raw_original_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_item_total?: Maybe<Scalars['JSON']['output']>;
  raw_item_subtotal?: Maybe<Scalars['JSON']['output']>;
  raw_item_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_total?: Maybe<Scalars['JSON']['output']>;
  raw_subtotal?: Maybe<Scalars['JSON']['output']>;
  raw_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_discount_total?: Maybe<Scalars['JSON']['output']>;
  raw_discount_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_refundable_total?: Maybe<Scalars['JSON']['output']>;
  raw_refundable_total_per_unit?: Maybe<Scalars['JSON']['output']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['ID']['output'];
  item_id: Scalars['String']['output'];
  item: OrderLineItem;
  quantity: Scalars['Int']['output'];
  raw_quantity?: Maybe<Scalars['JSON']['output']>;
  fulfilled_quantity: Scalars['Int']['output'];
  raw_fulfilled_quantity?: Maybe<Scalars['JSON']['output']>;
  shipped_quantity: Scalars['Int']['output'];
  raw_shipped_quantity?: Maybe<Scalars['JSON']['output']>;
  return_requested_quantity: Scalars['Int']['output'];
  raw_return_requested_quantity?: Maybe<Scalars['JSON']['output']>;
  return_received_quantity: Scalars['Int']['output'];
  raw_return_received_quantity?: Maybe<Scalars['JSON']['output']>;
  return_dismissed_quantity: Scalars['Int']['output'];
  raw_return_dismissed_quantity?: Maybe<Scalars['JSON']['output']>;
  written_off_quantity: Scalars['Int']['output'];
  raw_written_off_quantity?: Maybe<Scalars['JSON']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export enum OrderStatus {
  Pending = 'pending',
  Completed = 'completed',
  Draft = 'draft',
  Archived = 'archived',
  Canceled = 'canceled',
  RequiresAction = 'requires_action'
}

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID']['output'];
  version: Scalars['Int']['output'];
  order_change?: Maybe<OrderChange>;
  status: OrderStatus;
  region_id?: Maybe<Scalars['String']['output']>;
  customer_id?: Maybe<Scalars['String']['output']>;
  sales_channel_id?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  currency_code: Scalars['String']['output'];
  shipping_address?: Maybe<OrderAddress>;
  billing_address?: Maybe<OrderAddress>;
  items?: Maybe<Array<Maybe<OrderLineItem>>>;
  shipping_methods?: Maybe<Array<Maybe<OrderShippingMethod>>>;
  transactions?: Maybe<Array<Maybe<OrderTransaction>>>;
  summary?: Maybe<OrderSummary>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  canceled_at?: Maybe<Scalars['DateTime']['output']>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  original_item_total: Scalars['Float']['output'];
  original_item_subtotal: Scalars['Float']['output'];
  original_item_tax_total: Scalars['Float']['output'];
  item_total: Scalars['Float']['output'];
  item_subtotal: Scalars['Float']['output'];
  item_tax_total: Scalars['Float']['output'];
  original_total: Scalars['Float']['output'];
  original_subtotal: Scalars['Float']['output'];
  original_tax_total: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  subtotal: Scalars['Float']['output'];
  tax_total: Scalars['Float']['output'];
  discount_total: Scalars['Float']['output'];
  discount_tax_total: Scalars['Float']['output'];
  gift_card_total: Scalars['Float']['output'];
  gift_card_tax_total: Scalars['Float']['output'];
  shipping_total: Scalars['Float']['output'];
  shipping_subtotal: Scalars['Float']['output'];
  shipping_tax_total: Scalars['Float']['output'];
  original_shipping_total: Scalars['Float']['output'];
  original_shipping_subtotal: Scalars['Float']['output'];
  original_shipping_tax_total: Scalars['Float']['output'];
  raw_original_item_total?: Maybe<Scalars['JSON']['output']>;
  raw_original_item_subtotal?: Maybe<Scalars['JSON']['output']>;
  raw_original_item_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_item_total?: Maybe<Scalars['JSON']['output']>;
  raw_item_subtotal?: Maybe<Scalars['JSON']['output']>;
  raw_item_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_original_total?: Maybe<Scalars['JSON']['output']>;
  raw_original_subtotal?: Maybe<Scalars['JSON']['output']>;
  raw_original_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_total?: Maybe<Scalars['JSON']['output']>;
  raw_subtotal?: Maybe<Scalars['JSON']['output']>;
  raw_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_discount_total?: Maybe<Scalars['JSON']['output']>;
  raw_discount_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_gift_card_total?: Maybe<Scalars['JSON']['output']>;
  raw_gift_card_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_shipping_total?: Maybe<Scalars['JSON']['output']>;
  raw_shipping_subtotal?: Maybe<Scalars['JSON']['output']>;
  raw_shipping_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_original_shipping_total?: Maybe<Scalars['JSON']['output']>;
  raw_original_shipping_subtotal?: Maybe<Scalars['JSON']['output']>;
  raw_original_shipping_tax_total?: Maybe<Scalars['JSON']['output']>;
  cart_link?: Maybe<LinkOrderCart>;
  fulfillment_link?: Maybe<Array<Maybe<LinkOrderFulfillment>>>;
  fulfillments?: Maybe<Array<Maybe<Fulfillment>>>;
  payment_collections_link?: Maybe<LinkOrderPaymentCollection>;
  payment_collections?: Maybe<Array<Maybe<PaymentCollection>>>;
  promotion_link?: Maybe<LinkOrderPromotion>;
  promotion?: Maybe<Promotion>;
  delivery_link?: Maybe<LinkDeliveryModuleDeliveryOrderOrder>;
  delivery?: Maybe<Delivery>;
};

export enum ReturnStatus {
  Requested = 'requested',
  Received = 'received',
  PartiallyReceived = 'partially_received',
  Canceled = 'canceled'
}

export type Return = {
  __typename?: 'Return';
  id: Scalars['ID']['output'];
  status: ReturnStatus;
  refund_amount?: Maybe<Scalars['Float']['output']>;
  order_id: Scalars['String']['output'];
  items: Array<Maybe<OrderReturnItem>>;
  return_fulfillment_link?: Maybe<Array<Maybe<LinkReturnFulfillment>>>;
  return_fulfillments?: Maybe<Array<Maybe<Fulfillment>>>;
};

export type OrderReturnItem = {
  __typename?: 'OrderReturnItem';
  id: Scalars['ID']['output'];
  return_id: Scalars['String']['output'];
  order_id: Scalars['String']['output'];
  item_id: Scalars['String']['output'];
  reason_id?: Maybe<Scalars['String']['output']>;
  quantity: Scalars['Int']['output'];
  raw_quantity?: Maybe<Scalars['JSON']['output']>;
  received_quantity?: Maybe<Scalars['Int']['output']>;
  raw_received_quantity?: Maybe<Scalars['JSON']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type OrderClaimItem = {
  __typename?: 'OrderClaimItem';
  id: Scalars['ID']['output'];
  claim_id: Scalars['String']['output'];
  order_id: Scalars['String']['output'];
  item_id: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  images?: Maybe<Array<Maybe<OrderClaimItemImage>>>;
  raw_quantity?: Maybe<Scalars['JSON']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type OrderClaimItemImage = {
  __typename?: 'OrderClaimItemImage';
  id: Scalars['ID']['output'];
  claim_item_id: Scalars['String']['output'];
  item: OrderClaimItem;
  url?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type OrderExchangeItem = {
  __typename?: 'OrderExchangeItem';
  id: Scalars['ID']['output'];
  exchange_id: Scalars['String']['output'];
  order_id: Scalars['String']['output'];
  item_id: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  raw_quantity?: Maybe<Scalars['JSON']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type OrderClaim = {
  __typename?: 'OrderClaim';
  order_id: Scalars['String']['output'];
  claim_items: Array<Maybe<OrderClaimItem>>;
  additional_items: Array<Maybe<OrderClaimItem>>;
  return?: Maybe<Return>;
  return_id?: Maybe<Scalars['String']['output']>;
  no_notification?: Maybe<Scalars['Boolean']['output']>;
  refund_amount?: Maybe<Scalars['Float']['output']>;
  created_by?: Maybe<Scalars['String']['output']>;
};

export type OrderExchange = {
  __typename?: 'OrderExchange';
  order_id: Scalars['String']['output'];
  return_items: Array<Maybe<OrderReturnItem>>;
  additional_items: Array<Maybe<OrderExchangeItem>>;
  no_notification?: Maybe<Scalars['Boolean']['output']>;
  difference_due?: Maybe<Scalars['Float']['output']>;
  return?: Maybe<Return>;
  return_id?: Maybe<Scalars['String']['output']>;
  created_by?: Maybe<Scalars['String']['output']>;
};

export enum PaymentStatus {
  NotPaid = 'not_paid',
  Awaiting = 'awaiting',
  Authorized = 'authorized',
  PartiallyAuthorized = 'partially_authorized',
  Captured = 'captured',
  PartiallyCaptured = 'partially_captured',
  PartiallyRefunded = 'partially_refunded',
  Refunded = 'refunded',
  Canceled = 'canceled',
  RequiresAction = 'requires_action'
}

export enum FulfillmentStatus {
  NotFulfilled = 'not_fulfilled',
  PartiallyFulfilled = 'partially_fulfilled',
  Fulfilled = 'fulfilled',
  PartiallyShipped = 'partially_shipped',
  Shipped = 'shipped',
  PartiallyDelivered = 'partially_delivered',
  Delivered = 'delivered',
  Canceled = 'canceled'
}

export type OrderDetail = {
  __typename?: 'OrderDetail';
  id: Scalars['ID']['output'];
  version: Scalars['Int']['output'];
  order_change?: Maybe<OrderChange>;
  status: OrderStatus;
  region_id?: Maybe<Scalars['String']['output']>;
  customer_id?: Maybe<Scalars['String']['output']>;
  sales_channel_id?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  currency_code: Scalars['String']['output'];
  shipping_address?: Maybe<OrderAddress>;
  billing_address?: Maybe<OrderAddress>;
  items?: Maybe<Array<Maybe<OrderLineItem>>>;
  shipping_methods?: Maybe<Array<Maybe<OrderShippingMethod>>>;
  transactions?: Maybe<Array<Maybe<OrderTransaction>>>;
  summary?: Maybe<OrderSummary>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  canceled_at?: Maybe<Scalars['DateTime']['output']>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  original_item_total: Scalars['Float']['output'];
  original_item_subtotal: Scalars['Float']['output'];
  original_item_tax_total: Scalars['Float']['output'];
  item_total: Scalars['Float']['output'];
  item_subtotal: Scalars['Float']['output'];
  item_tax_total: Scalars['Float']['output'];
  original_total: Scalars['Float']['output'];
  original_subtotal: Scalars['Float']['output'];
  original_tax_total: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  subtotal: Scalars['Float']['output'];
  tax_total: Scalars['Float']['output'];
  discount_total: Scalars['Float']['output'];
  discount_tax_total: Scalars['Float']['output'];
  gift_card_total: Scalars['Float']['output'];
  gift_card_tax_total: Scalars['Float']['output'];
  shipping_total: Scalars['Float']['output'];
  shipping_subtotal: Scalars['Float']['output'];
  shipping_tax_total: Scalars['Float']['output'];
  original_shipping_total: Scalars['Float']['output'];
  original_shipping_subtotal: Scalars['Float']['output'];
  original_shipping_tax_total: Scalars['Float']['output'];
  raw_original_item_total?: Maybe<Scalars['JSON']['output']>;
  raw_original_item_subtotal?: Maybe<Scalars['JSON']['output']>;
  raw_original_item_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_item_total?: Maybe<Scalars['JSON']['output']>;
  raw_item_subtotal?: Maybe<Scalars['JSON']['output']>;
  raw_item_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_original_total?: Maybe<Scalars['JSON']['output']>;
  raw_original_subtotal?: Maybe<Scalars['JSON']['output']>;
  raw_original_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_total?: Maybe<Scalars['JSON']['output']>;
  raw_subtotal?: Maybe<Scalars['JSON']['output']>;
  raw_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_discount_total?: Maybe<Scalars['JSON']['output']>;
  raw_discount_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_gift_card_total?: Maybe<Scalars['JSON']['output']>;
  raw_gift_card_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_shipping_total?: Maybe<Scalars['JSON']['output']>;
  raw_shipping_subtotal?: Maybe<Scalars['JSON']['output']>;
  raw_shipping_tax_total?: Maybe<Scalars['JSON']['output']>;
  raw_original_shipping_total?: Maybe<Scalars['JSON']['output']>;
  raw_original_shipping_subtotal?: Maybe<Scalars['JSON']['output']>;
  raw_original_shipping_tax_total?: Maybe<Scalars['JSON']['output']>;
  payment_collections?: Maybe<Array<Maybe<PaymentCollection>>>;
  payment_status: PaymentStatus;
  fulfillments?: Maybe<Array<Maybe<Fulfillment>>>;
  fulfillment_status: FulfillmentStatus;
};

export type OrderChange = {
  __typename?: 'OrderChange';
  id: Scalars['ID']['output'];
  version: Scalars['Int']['output'];
  change_type?: Maybe<Scalars['String']['output']>;
  order_id: Scalars['String']['output'];
  return_id?: Maybe<Scalars['String']['output']>;
  exchange_id?: Maybe<Scalars['String']['output']>;
  claim_id?: Maybe<Scalars['String']['output']>;
  order: Order;
  return_order?: Maybe<Return>;
  exchange?: Maybe<OrderExchange>;
  claim?: Maybe<OrderClaim>;
  actions: Array<Maybe<OrderChangeAction>>;
  status: Scalars['String']['output'];
  requested_by?: Maybe<Scalars['String']['output']>;
  requested_at?: Maybe<Scalars['DateTime']['output']>;
  confirmed_by?: Maybe<Scalars['String']['output']>;
  confirmed_at?: Maybe<Scalars['DateTime']['output']>;
  declined_by?: Maybe<Scalars['String']['output']>;
  declined_reason?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  declined_at?: Maybe<Scalars['DateTime']['output']>;
  canceled_by?: Maybe<Scalars['String']['output']>;
  canceled_at?: Maybe<Scalars['DateTime']['output']>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type OrderChangeAction = {
  __typename?: 'OrderChangeAction';
  id: Scalars['ID']['output'];
  order_change_id?: Maybe<Scalars['String']['output']>;
  order_change?: Maybe<OrderChange>;
  order_id?: Maybe<Scalars['String']['output']>;
  return_id?: Maybe<Scalars['String']['output']>;
  claim_id?: Maybe<Scalars['String']['output']>;
  exchange_id?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Order>;
  reference: Scalars['String']['output'];
  reference_id: Scalars['String']['output'];
  action: ChangeActionType;
  details?: Maybe<Scalars['JSON']['output']>;
  internal_note?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type OrderTransaction = {
  __typename?: 'OrderTransaction';
  id: Scalars['ID']['output'];
  order_id: Scalars['String']['output'];
  order: Order;
  amount: Scalars['Float']['output'];
  raw_amount?: Maybe<Scalars['JSON']['output']>;
  currency_code: Scalars['String']['output'];
  reference: Scalars['String']['output'];
  reference_id: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export enum GeoZoneType {
  Country = 'country',
  Province = 'province',
  City = 'city',
  Zip = 'zip'
}

export enum ShippingOptionPriceType {
  Calculated = 'calculated',
  Flat = 'flat'
}

export type FulfillmentItem = {
  __typename?: 'FulfillmentItem';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  sku: Scalars['String']['output'];
  barcode: Scalars['String']['output'];
  line_item_id?: Maybe<Scalars['String']['output']>;
  inventory_item_id?: Maybe<Scalars['String']['output']>;
  fulfillment_id: Scalars['String']['output'];
  fulfillment: Fulfillment;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export type FulfillmentLabel = {
  __typename?: 'FulfillmentLabel';
  id: Scalars['ID']['output'];
  tracking_number: Scalars['String']['output'];
  tracking_url: Scalars['String']['output'];
  label_url: Scalars['String']['output'];
  fulfillment_id: Scalars['String']['output'];
  fulfillment: Fulfillment;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export type FulfillmentProvider = {
  __typename?: 'FulfillmentProvider';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  shipping_options: Array<ShippingOption>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  locations_link?: Maybe<Array<Maybe<LinkLocationFulfillmentProvider>>>;
  locations?: Maybe<Array<Maybe<StockLocation>>>;
};

export type FulfillmentSet = {
  __typename?: 'FulfillmentSet';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  service_zones: Array<ServiceZone>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  locations_link?: Maybe<LinkLocationFulfillmentSet>;
  location?: Maybe<StockLocation>;
};

export type Fulfillment = {
  __typename?: 'Fulfillment';
  id: Scalars['ID']['output'];
  location_id: Scalars['String']['output'];
  packed_at?: Maybe<Scalars['DateTime']['output']>;
  shipped_at?: Maybe<Scalars['DateTime']['output']>;
  delivered_at?: Maybe<Scalars['DateTime']['output']>;
  canceled_at?: Maybe<Scalars['DateTime']['output']>;
  marked_shipped_by?: Maybe<Scalars['String']['output']>;
  created_by?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Scalars['JSON']['output']>;
  provider_id: Scalars['String']['output'];
  shipping_option_id?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  shipping_option?: Maybe<ShippingOption>;
  provider: FulfillmentProvider;
  items: Array<FulfillmentItem>;
  labels: Array<FulfillmentLabel>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  order_link?: Maybe<LinkOrderFulfillment>;
  order?: Maybe<Order>;
  return_link?: Maybe<LinkReturnFulfillment>;
};

export type GeoZone = {
  __typename?: 'GeoZone';
  id: Scalars['ID']['output'];
  type: GeoZoneType;
  country_code: Scalars['String']['output'];
  province_code?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  postal_expression?: Maybe<Scalars['JSON']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export type ServiceZone = {
  __typename?: 'ServiceZone';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  fulfillment_set: FulfillmentSet;
  fulfillment_set_id: Scalars['String']['output'];
  geo_zones: Array<GeoZone>;
  shipping_options: Array<ShippingOption>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export type ShippingOptionRule = {
  __typename?: 'ShippingOptionRule';
  id: Scalars['ID']['output'];
  attribute: Scalars['String']['output'];
  operator: Scalars['String']['output'];
  value?: Maybe<Scalars['JSON']['output']>;
  shipping_option_id: Scalars['String']['output'];
  shipping_option: ShippingOption;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export type ShippingOptionType = {
  __typename?: 'ShippingOptionType';
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  description: Scalars['String']['output'];
  code: Scalars['String']['output'];
  shipping_option_id: Scalars['String']['output'];
  shipping_option: ShippingOption;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export type ShippingOption = {
  __typename?: 'ShippingOption';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price_type: ShippingOptionPriceType;
  service_zone_id: Scalars['String']['output'];
  shipping_profile_id: Scalars['String']['output'];
  provider_id: Scalars['String']['output'];
  shipping_option_type_id?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Scalars['JSON']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  service_zone: ServiceZone;
  shipping_profile: ShippingProfile;
  fulfillment_provider: FulfillmentProvider;
  type: ShippingOptionType;
  rules: Array<ShippingOptionRule>;
  fulfillments: Array<Fulfillment>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  price_set_link?: Maybe<LinkShippingOptionPriceSet>;
};

export type ShippingProfile = {
  __typename?: 'ShippingProfile';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  shipping_options: Array<ShippingOption>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export enum NotificationStatusEnum {
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Failure = 'FAILURE'
}

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['ID']['output'];
  to: Scalars['String']['output'];
  channel: Scalars['String']['output'];
  template: Scalars['String']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  trigger_type?: Maybe<Scalars['String']['output']>;
  resource_id?: Maybe<Scalars['String']['output']>;
  resource_type?: Maybe<Scalars['String']['output']>;
  receiver_id?: Maybe<Scalars['String']['output']>;
  original_notification_id?: Maybe<Scalars['String']['output']>;
  idempotency_key?: Maybe<Scalars['String']['output']>;
  external_id?: Maybe<Scalars['String']['output']>;
  status: NotificationStatusEnum;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export type Restaurant = {
  __typename?: 'Restaurant';
  id: Scalars['ID']['output'];
  handle: Scalars['String']['output'];
  is_open: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
  email: Scalars['String']['output'];
  address: Scalars['String']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  admins: Array<Maybe<RestaurantAdmin>>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  delivery_link?: Maybe<Array<Maybe<LinkRestaurantModuleRestaurantDeliveryModuleDelivery>>>;
  deliveries?: Maybe<Array<Maybe<Delivery>>>;
  product_link?: Maybe<Array<Maybe<LinkRestaurantModuleRestaurantProductProduct>>>;
  products?: Maybe<Array<Maybe<Product>>>;
};

export type RestaurantAdmin = {
  __typename?: 'RestaurantAdmin';
  id: Scalars['ID']['output'];
  first_name: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  email: Scalars['String']['output'];
  avatar_url?: Maybe<Scalars['String']['output']>;
  restaurant: Array<Maybe<Restaurant>>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export enum DeliveryDeliveryStatusEnum {
  Pending = 'PENDING',
  RestaurantDeclined = 'RESTAURANT_DECLINED',
  RestaurantAccepted = 'RESTAURANT_ACCEPTED',
  PickupClaimed = 'PICKUP_CLAIMED',
  RestaurantPreparing = 'RESTAURANT_PREPARING',
  ReadyForPickup = 'READY_FOR_PICKUP',
  InTransit = 'IN_TRANSIT',
  Delivered = 'DELIVERED'
}

export type Delivery = {
  __typename?: 'Delivery';
  id: Scalars['ID']['output'];
  transaction_id?: Maybe<Scalars['String']['output']>;
  driver_id?: Maybe<Scalars['String']['output']>;
  delivery_status: DeliveryDeliveryStatusEnum;
  eta?: Maybe<Scalars['DateTime']['output']>;
  delivered_at?: Maybe<Scalars['DateTime']['output']>;
  deliveryDriver: Array<Maybe<DeliveryDriver>>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  cart_link?: Maybe<LinkDeliveryModuleDeliveryCartCart>;
  order_link?: Maybe<LinkDeliveryModuleDeliveryOrderOrder>;
  order?: Maybe<Order>;
  restaurant_link?: Maybe<LinkRestaurantModuleRestaurantDeliveryModuleDelivery>;
  restaurant?: Maybe<Restaurant>;
};

export type Driver = {
  __typename?: 'Driver';
  id: Scalars['ID']['output'];
  first_name: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  email: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  avatar_url?: Maybe<Scalars['String']['output']>;
  deliveryDriver: Array<Maybe<DeliveryDriver>>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export type DeliveryDriver = {
  __typename?: 'DeliveryDriver';
  id: Scalars['ID']['output'];
  delivery: Array<Maybe<Delivery>>;
  driver: Array<Maybe<Driver>>;
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
};

export type LinkCartPaymentCollection = {
  __typename?: 'LinkCartPaymentCollection';
  cart_id: Scalars['String']['output'];
  payment_collection_id: Scalars['String']['output'];
  payment_collection?: Maybe<Payment>;
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

export type LinkCartPromotion = {
  __typename?: 'LinkCartPromotion';
  cart_id: Scalars['String']['output'];
  promotion_id: Scalars['String']['output'];
  promotions?: Maybe<Promotion>;
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

export type LinkLocationFulfillmentProvider = {
  __typename?: 'LinkLocationFulfillmentProvider';
  stock_location_id: Scalars['String']['output'];
  fulfillment_provider_id: Scalars['String']['output'];
  location?: Maybe<StockLocation>;
  fulfillment_provider?: Maybe<Fulfillment>;
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

export type LinkLocationFulfillmentSet = {
  __typename?: 'LinkLocationFulfillmentSet';
  stock_location_id: Scalars['String']['output'];
  fulfillment_set_id: Scalars['String']['output'];
  location?: Maybe<StockLocation>;
  fulfillment_set?: Maybe<Fulfillment>;
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

export type LinkOrderCart = {
  __typename?: 'LinkOrderCart';
  order_id: Scalars['String']['output'];
  cart_id: Scalars['String']['output'];
  order?: Maybe<Order>;
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

export type LinkOrderFulfillment = {
  __typename?: 'LinkOrderFulfillment';
  order_id: Scalars['String']['output'];
  fulfillment_id: Scalars['String']['output'];
  order?: Maybe<Order>;
  fulfillments?: Maybe<Fulfillment>;
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

export type LinkOrderPaymentCollection = {
  __typename?: 'LinkOrderPaymentCollection';
  order_id: Scalars['String']['output'];
  payment_collection_id: Scalars['String']['output'];
  order?: Maybe<Order>;
  payment_collection?: Maybe<Payment>;
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

export type LinkOrderPromotion = {
  __typename?: 'LinkOrderPromotion';
  order_id: Scalars['String']['output'];
  promotion_id: Scalars['String']['output'];
  order?: Maybe<Order>;
  promotion?: Maybe<Promotion>;
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

export type LinkReturnFulfillment = {
  __typename?: 'LinkReturnFulfillment';
  return_id: Scalars['String']['output'];
  fulfillment_id: Scalars['String']['output'];
  return?: Maybe<Order>;
  fulfillments?: Maybe<Fulfillment>;
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

export type LinkProductSalesChannel = {
  __typename?: 'LinkProductSalesChannel';
  product_id: Scalars['String']['output'];
  sales_channel_id: Scalars['String']['output'];
  product?: Maybe<Product>;
  sales_channel?: Maybe<SalesChannel>;
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

export type LinkProductVariantInventoryItem = {
  __typename?: 'LinkProductVariantInventoryItem';
  variant_id: Scalars['String']['output'];
  inventory_item_id: Scalars['String']['output'];
  required_quantity: Scalars['Int']['output'];
  variant?: Maybe<Product>;
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

export type LinkProductVariantPriceSet = {
  __typename?: 'LinkProductVariantPriceSet';
  variant_id: Scalars['String']['output'];
  price_set_id: Scalars['String']['output'];
  variant?: Maybe<Product>;
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

export type LinkPublishableApiKeySalesChannel = {
  __typename?: 'LinkPublishableApiKeySalesChannel';
  publishable_key_id: Scalars['String']['output'];
  sales_channel_id: Scalars['String']['output'];
  sales_channel?: Maybe<SalesChannel>;
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

export type LinkRegionPaymentProvider = {
  __typename?: 'LinkRegionPaymentProvider';
  region_id: Scalars['String']['output'];
  payment_provider_id: Scalars['String']['output'];
  region?: Maybe<Region>;
  payment_provider?: Maybe<Payment>;
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

export type LinkSalesChannelStockLocation = {
  __typename?: 'LinkSalesChannelStockLocation';
  sales_channel_id: Scalars['String']['output'];
  stock_location_id: Scalars['String']['output'];
  sales_channel?: Maybe<SalesChannel>;
  location?: Maybe<StockLocation>;
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

export type LinkShippingOptionPriceSet = {
  __typename?: 'LinkShippingOptionPriceSet';
  shipping_option_id: Scalars['String']['output'];
  price_set_id: Scalars['String']['output'];
  shipping_option?: Maybe<Fulfillment>;
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

export type LinkDeliveryModuleDeliveryCartCart = {
  __typename?: 'LinkDeliveryModuleDeliveryCartCart';
  delivery_id: Scalars['String']['output'];
  cart_id: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

export type LinkDeliveryModuleDeliveryOrderOrder = {
  __typename?: 'LinkDeliveryModuleDeliveryOrderOrder';
  delivery_id: Scalars['String']['output'];
  order_id: Scalars['String']['output'];
  order?: Maybe<Order>;
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

export type LinkRestaurantModuleRestaurantDeliveryModuleDelivery = {
  __typename?: 'LinkRestaurantModuleRestaurantDeliveryModuleDelivery';
  restaurant_id: Scalars['String']['output'];
  delivery_id: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

export type LinkRestaurantModuleRestaurantProductProduct = {
  __typename?: 'LinkRestaurantModuleRestaurantProductProduct';
  restaurant_id: Scalars['String']['output'];
  product_id: Scalars['String']['output'];
  product?: Maybe<Product>;
  createdAt: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
};

declare module '@medusajs/framework/types' {
  interface RemoteQueryEntryPoints {
    workflow_execution: any
    workflow_executions: any
    stock_location_address: StockLocationAddress
    stock_location_addresses: StockLocationAddress
    stock_location: StockLocation
    stock_locations: StockLocation
    inventory_items: InventoryItem
    inventory_item: InventoryItem
    inventory: InventoryItem
    reservation: ReservationItem
    reservations: ReservationItem
    reservation_item: ReservationItem
    reservation_items: ReservationItem
    inventory_level: InventoryLevel
    inventory_levels: InventoryLevel
    product_variant: ProductVariant
    product_variants: ProductVariant
    variant: ProductVariant
    variants: ProductVariant
    product: Product
    products: Product
    product_option: ProductOption
    product_options: ProductOption
    product_type: ProductType
    product_types: ProductType
    product_image: ProductImage
    product_images: ProductImage
    product_tag: ProductTag
    product_tags: ProductTag
    product_collection: ProductCollection
    product_collections: ProductCollection
    product_category: ProductCategory
    product_categories: ProductCategory
    price_set: PriceSet
    price_sets: PriceSet
    price_list: any
    price_lists: any
    price: Price
    prices: Price
    price_preference: any
    price_preferences: any
    promotion: Promotion
    promotions: Promotion
    campaign: Campaign
    campaigns: Campaign
    promotion_rule: PromotionRule
    promotion_rules: PromotionRule
    customer_address: any
    customer_addresses: any
    customer_group_customer: any
    customer_group_customers: any
    customer_group: any
    customer_groups: any
    customer: any
    customers: any
    sales_channel: SalesChannel
    sales_channels: SalesChannel
    cart: any
    carts: any
    address: any
    addresses: any
    line_item: any
    line_items: any
    line_item_adjustment: any
    line_item_adjustments: any
    line_item_tax_line: any
    line_item_tax_lines: any
    shipping_method: any
    shipping_methods: any
    shipping_method_adjustment: any
    shipping_method_adjustments: any
    shipping_method_tax_line: any
    shipping_method_tax_lines: any
    region: Region
    regions: Region
    country: Country
    countries: Country
    api_key: any
    api_keys: any
    store: any
    stores: any
    store_currency: any
    store_currencies: any
    tax_rate: any
    tax_rates: any
    tax_region: any
    tax_regions: any
    tax_rate_rule: any
    tax_rate_rules: any
    tax_provider: any
    tax_providers: any
    currency: Currency
    currencies: Currency
    payment: Payment
    payments: Payment
    payment_collection: PaymentCollection
    payment_collections: PaymentCollection
    payment_provider: PaymentProvider
    payment_providers: PaymentProvider
    payment_session: PaymentSession
    payment_sessions: PaymentSession
    refund_reason: RefundReason
    refund_reasons: RefundReason
    order: Order
    orders: Order
    order_address: OrderAddress
    order_addresses: OrderAddress
    order_change: OrderChange
    order_changes: OrderChange
    order_claim: OrderClaim
    order_claims: OrderClaim
    order_exchange: OrderExchange
    order_exchanges: OrderExchange
    order_line_item: OrderLineItem
    order_line_items: OrderLineItem
    order_shipping_method: OrderShippingMethod
    order_shipping_methods: OrderShippingMethod
    order_transaction: OrderTransaction
    order_transactions: OrderTransaction
    return: Return
    returns: Return
    return_reason: any
    return_reasons: any
    auth_identity: any
    auth_identities: any
    provider_identity: any
    provider_identities: any
    user: any
    users: any
    invite: any
    invites: any
    file: any
    files: any
    fulfillment_address: any
    fulfillment_addresses: any
    fulfillment_item: FulfillmentItem
    fulfillment_items: FulfillmentItem
    fulfillment_label: FulfillmentLabel
    fulfillment_labels: FulfillmentLabel
    fulfillment_provider: FulfillmentProvider
    fulfillment_providers: FulfillmentProvider
    fulfillment_set: FulfillmentSet
    fulfillment_sets: FulfillmentSet
    fulfillment: Fulfillment
    fulfillments: Fulfillment
    geo_zone: GeoZone
    geo_zones: GeoZone
    service_zone: ServiceZone
    service_zones: ServiceZone
    shipping_option_rule: ShippingOptionRule
    shipping_option_rules: ShippingOptionRule
    shipping_option_type: ShippingOptionType
    shipping_option_types: ShippingOptionType
    shipping_option: ShippingOption
    shipping_options: ShippingOption
    shipping_profile: ShippingProfile
    shipping_profiles: ShippingProfile
    notification: Notification
    notifications: Notification
    restaurant: Restaurant
    restaurants: Restaurant
    restaurant_admin: RestaurantAdmin
    restaurant_admins: RestaurantAdmin
    delivery: Delivery
    deliveries: Delivery
    driver: Driver
    drivers: Driver
    delivery_driver: DeliveryDriver
    delivery_drivers: DeliveryDriver
    cart_payment_collection: LinkCartPaymentCollection
    cart_payment_collections: LinkCartPaymentCollection
    cart_promotion: LinkCartPromotion
    cart_promotions: LinkCartPromotion
    location_fulfillment_provider: LinkLocationFulfillmentProvider
    location_fulfillment_providers: LinkLocationFulfillmentProvider
    location_fulfillment_set: LinkLocationFulfillmentSet
    location_fulfillment_sets: LinkLocationFulfillmentSet
    order_cart: LinkOrderCart
    order_carts: LinkOrderCart
    order_fulfillment: LinkOrderFulfillment
    order_fulfillments: LinkOrderFulfillment
    order_payment_collection: LinkOrderPaymentCollection
    order_payment_collections: LinkOrderPaymentCollection
    order_promotion: LinkOrderPromotion
    order_promotions: LinkOrderPromotion
    return_fulfillment: LinkReturnFulfillment
    return_fulfillments: LinkReturnFulfillment
    product_sales_channel: LinkProductSalesChannel
    product_sales_channels: LinkProductSalesChannel
    product_variant_inventory_item: LinkProductVariantInventoryItem
    product_variant_inventory_items: LinkProductVariantInventoryItem
    product_variant_price_set: LinkProductVariantPriceSet
    product_variant_price_sets: LinkProductVariantPriceSet
    publishable_api_key_sales_channel: LinkPublishableApiKeySalesChannel
    publishable_api_key_sales_channels: LinkPublishableApiKeySalesChannel
    region_payment_provider: LinkRegionPaymentProvider
    region_payment_providers: LinkRegionPaymentProvider
    sales_channel_location: LinkSalesChannelStockLocation
    sales_channel_locations: LinkSalesChannelStockLocation
    shipping_option_price_set: LinkShippingOptionPriceSet
    shipping_option_price_sets: LinkShippingOptionPriceSet
    delivery_cart: LinkDeliveryModuleDeliveryCartCart
    delivery_order: LinkDeliveryModuleDeliveryOrderOrder
    restaurant_delivery: LinkRestaurantModuleRestaurantDeliveryModuleDelivery
    restaurant_product: LinkRestaurantModuleRestaurantProductProduct
  }
}