import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum OrderStatus {
  ORDER_ACCEPTED = "ORDER_ACCEPTED",
  ORDER_RECEIVED = "ORDER_RECEIVED",
  REQUEST_REVIEW = "REQUEST_REVIEW",
  DELIVERY_UPDATE = "DELIVERY_UPDATE",
  COMPLETE = "COMPLETE",
  CANCELED = "CANCELED",
  PENDING = "PENDING",
  DISPUTE_RESOLUTION = "DISPUTE_RESOLUTION",
  RFF_REPLY_SENT = "RFF_REPLY_SENT",
  RFQ_REPLY_SENT = "RFQ_REPLY_SENT",
  ORDER_DELIVERED = "ORDER_DELIVERED",
  ORDER_SHIPPED = "ORDER_SHIPPED",
  IN_TRANSIT = "IN_TRANSIT",
  PAYMENT = "PAYMENT",
  ORDER_ARRIVED = "ORDER_ARRIVED"
}

export enum OrderType {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETE = "COMPLETE"
}

export enum Rfftype {
  AIR = "AIR",
  OCEAN = "OCEAN",
  LAND = "LAND"
}

export enum Rfqtype {
  STANDARD = "STANDARD",
  DOMESTIC = "DOMESTIC",
  INTERNATIONAL = "INTERNATIONAL"
}

export enum PriceType {
  FIXED = "FIXED",
  NEGOTIABLE = "NEGOTIABLE"
}

export enum AccountCategoryType {
  BUYER = "BUYER",
  SELLER = "SELLER"
}

export enum IdentificationType {
  DRIVER_LICENSE = "DRIVER_LICENSE",
  NATIONAL_IDENTIFICATION_NUMBER = "NATIONAL_IDENTIFICATION_NUMBER",
  VOTERS_CARD = "VOTERS_CARD",
  INTERNATIONAL_PASSPORT = "INTERNATIONAL_PASSPORT"
}

export enum AccountType {
  INDIVIDUAL = "INDIVIDUAL",
  BUSINESS = "BUSINESS"
}



type EagerOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly orderType?: OrderType | keyof typeof OrderType | null;
  readonly orderStatus?: OrderStatus | keyof typeof OrderStatus | null;
  readonly agreement?: string | null;
  readonly userID: string;
  readonly orderDate?: string | null;
  readonly rfqID: string;
  readonly rffID: string;
  readonly toImage?: string | null;
  readonly toCountry?: string | null;
  readonly fromImage?: string | null;
  readonly fromCountry?: string | null;
  readonly orderMessage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly orderType?: OrderType | keyof typeof OrderType | null;
  readonly orderStatus?: OrderStatus | keyof typeof OrderStatus | null;
  readonly agreement?: string | null;
  readonly userID: string;
  readonly orderDate?: string | null;
  readonly rfqID: string;
  readonly rffID: string;
  readonly toImage?: string | null;
  readonly toCountry?: string | null;
  readonly fromImage?: string | null;
  readonly fromCountry?: string | null;
  readonly orderMessage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order>) => MutableModel<Order> | void): Order;
}

type EagerRFQ = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RFQ, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly rfqType?: Rfqtype | keyof typeof Rfqtype | null;
  readonly title?: string | null;
  readonly requestCategory?: string | null;
  readonly description?: string | null;
  readonly documents?: (string | null)[] | null;
  readonly productName?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly qty?: number | null;
  readonly buyFrequency?: string | null;
  readonly budget?: number | null;
  readonly placeOrigin?: string | null;
  readonly landmark?: string | null;
  readonly unit?: string | null;
  readonly incoterms?: string | null;
  readonly placeDestination?: string | null;
  readonly deliveryPeriod?: string | null;
  readonly expiryDate?: string | null;
  readonly paymentType?: string | null;
  readonly paymentMethod?: string | null;
  readonly warranty?: string | null;
  readonly returnPolicy?: string | null;
  readonly userID: string;
  readonly Orders?: (Order | null)[] | null;
  readonly countryFlag?: string | null;
  readonly countryName?: string | null;
  readonly city?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRFQ = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RFQ, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly rfqType?: Rfqtype | keyof typeof Rfqtype | null;
  readonly title?: string | null;
  readonly requestCategory?: string | null;
  readonly description?: string | null;
  readonly documents?: (string | null)[] | null;
  readonly productName?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly qty?: number | null;
  readonly buyFrequency?: string | null;
  readonly budget?: number | null;
  readonly placeOrigin?: string | null;
  readonly landmark?: string | null;
  readonly unit?: string | null;
  readonly incoterms?: string | null;
  readonly placeDestination?: string | null;
  readonly deliveryPeriod?: string | null;
  readonly expiryDate?: string | null;
  readonly paymentType?: string | null;
  readonly paymentMethod?: string | null;
  readonly warranty?: string | null;
  readonly returnPolicy?: string | null;
  readonly userID: string;
  readonly Orders: AsyncCollection<Order>;
  readonly countryFlag?: string | null;
  readonly countryName?: string | null;
  readonly city?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RFQ = LazyLoading extends LazyLoadingDisabled ? EagerRFQ : LazyRFQ

export declare const RFQ: (new (init: ModelInit<RFQ>) => RFQ) & {
  copyOf(source: RFQ, mutator: (draft: MutableModel<RFQ>) => MutableModel<RFQ> | void): RFQ;
}

type EagerRFF = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RFF, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly rffType?: Rfftype | keyof typeof Rfftype | null;
  readonly title?: string | null;
  readonly deliveryPeriod?: string | null;
  readonly requestCategory?: string | null;
  readonly productName?: string | null;
  readonly handling?: string | null;
  readonly loadDate?: string | null;
  readonly weight?: string | null;
  readonly qty?: number | null;
  readonly packageType?: string | null;
  readonly length?: number | null;
  readonly width?: number | null;
  readonly height?: number | null;
  readonly placeOrigin?: string | null;
  readonly placeDestination?: string | null;
  readonly relatedServices?: (string | null)[] | null;
  readonly invoiceAmount?: number | null;
  readonly notes?: string | null;
  readonly loadType?: string | null;
  readonly container?: string | null;
  readonly containerSize?: string | null;
  readonly containerType?: string | null;
  readonly containerCount?: number | null;
  readonly userID: string;
  readonly Orders?: (Order | null)[] | null;
  readonly countryFlag?: string | null;
  readonly countryName?: string | null;
  readonly city?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRFF = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RFF, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly rffType?: Rfftype | keyof typeof Rfftype | null;
  readonly title?: string | null;
  readonly deliveryPeriod?: string | null;
  readonly requestCategory?: string | null;
  readonly productName?: string | null;
  readonly handling?: string | null;
  readonly loadDate?: string | null;
  readonly weight?: string | null;
  readonly qty?: number | null;
  readonly packageType?: string | null;
  readonly length?: number | null;
  readonly width?: number | null;
  readonly height?: number | null;
  readonly placeOrigin?: string | null;
  readonly placeDestination?: string | null;
  readonly relatedServices?: (string | null)[] | null;
  readonly invoiceAmount?: number | null;
  readonly notes?: string | null;
  readonly loadType?: string | null;
  readonly container?: string | null;
  readonly containerSize?: string | null;
  readonly containerType?: string | null;
  readonly containerCount?: number | null;
  readonly userID: string;
  readonly Orders: AsyncCollection<Order>;
  readonly countryFlag?: string | null;
  readonly countryName?: string | null;
  readonly city?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RFF = LazyLoading extends LazyLoadingDisabled ? EagerRFF : LazyRFF

export declare const RFF: (new (init: ModelInit<RFF>) => RFF) & {
  copyOf(source: RFF, mutator: (draft: MutableModel<RFF>) => MutableModel<RFF> | void): RFF;
}

type EagerCategories = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Categories, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly image?: string | null;
  readonly Products?: (Product | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategories = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Categories, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly image?: string | null;
  readonly Products: AsyncCollection<Product>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Categories = LazyLoading extends LazyLoadingDisabled ? EagerCategories : LazyCategories

export declare const Categories: (new (init: ModelInit<Categories>) => Categories) & {
  copyOf(source: Categories, mutator: (draft: MutableModel<Categories>) => MutableModel<Categories> | void): Categories;
}

type EagerReview = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Review, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly rating?: number | null;
  readonly comment?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReview = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Review, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly rating?: number | null;
  readonly comment?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Review = LazyLoading extends LazyLoadingDisabled ? EagerReview : LazyReview

export declare const Review: (new (init: ModelInit<Review>) => Review) & {
  copyOf(source: Review, mutator: (draft: MutableModel<Review>) => MutableModel<Review> | void): Review;
}

type EagerProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly images?: (string | null)[] | null;
  readonly description?: string | null;
  readonly rating?: number | null;
  readonly tags?: (string | null)[] | null;
  readonly productCertification?: (string | null)[] | null;
  readonly supplyCapacity?: string | null;
  readonly minOrderQty?: string | null;
  readonly unit?: string | null;
  readonly packageType?: string | null;
  readonly quantity?: number | null;
  readonly fobPrice?: number | null;
  readonly basePrice?: PriceType | keyof typeof PriceType | null;
  readonly deliveryTime?: number | null;
  readonly paymentType?: string | null;
  readonly expiry?: string | null;
  readonly packageDescription?: string | null;
  readonly documents?: (string | null)[] | null;
  readonly categoriesID: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly images?: (string | null)[] | null;
  readonly description?: string | null;
  readonly rating?: number | null;
  readonly tags?: (string | null)[] | null;
  readonly productCertification?: (string | null)[] | null;
  readonly supplyCapacity?: string | null;
  readonly minOrderQty?: string | null;
  readonly unit?: string | null;
  readonly packageType?: string | null;
  readonly quantity?: number | null;
  readonly fobPrice?: number | null;
  readonly basePrice?: PriceType | keyof typeof PriceType | null;
  readonly deliveryTime?: number | null;
  readonly paymentType?: string | null;
  readonly expiry?: string | null;
  readonly packageDescription?: string | null;
  readonly documents?: (string | null)[] | null;
  readonly categoriesID: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone_number?: string | null;
  readonly rating?: number | null;
  readonly accountType?: AccountType | keyof typeof AccountType | null;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly address?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly zipCode?: string | null;
  readonly lga?: string | null;
  readonly totalOrders?: number | null;
  readonly level?: string | null;
  readonly identification?: IdentificationType | keyof typeof IdentificationType | null;
  readonly identificationNumber?: string | null;
  readonly keyProduct?: string | null;
  readonly country?: string | null;
  readonly inviteCode?: string | null;
  readonly accountCategory?: AccountCategoryType | keyof typeof AccountCategoryType | null;
  readonly title?: string | null;
  readonly logo?: string | null;
  readonly backgroundImage?: string | null;
  readonly images?: (string | null)[] | null;
  readonly businessType?: string | null;
  readonly certifications?: (string | null)[] | null;
  readonly mainMarkets?: (string | null)[] | null;
  readonly estRevenue?: number | null;
  readonly totalStaff?: number | null;
  readonly responseTime?: number | null;
  readonly languages?: (string | null)[] | null;
  readonly legalRep?: string | null;
  readonly overview?: string | null;
  readonly memberType?: string | null;
  readonly Orders?: (Order | null)[] | null;
  readonly Products?: (Product | null)[] | null;
  readonly Reviews?: (Review | null)[] | null;
  readonly RFQS?: (RFQ | null)[] | null;
  readonly RFFS?: (RFF | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone_number?: string | null;
  readonly rating?: number | null;
  readonly accountType?: AccountType | keyof typeof AccountType | null;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly address?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly zipCode?: string | null;
  readonly lga?: string | null;
  readonly totalOrders?: number | null;
  readonly level?: string | null;
  readonly identification?: IdentificationType | keyof typeof IdentificationType | null;
  readonly identificationNumber?: string | null;
  readonly keyProduct?: string | null;
  readonly country?: string | null;
  readonly inviteCode?: string | null;
  readonly accountCategory?: AccountCategoryType | keyof typeof AccountCategoryType | null;
  readonly title?: string | null;
  readonly logo?: string | null;
  readonly backgroundImage?: string | null;
  readonly images?: (string | null)[] | null;
  readonly businessType?: string | null;
  readonly certifications?: (string | null)[] | null;
  readonly mainMarkets?: (string | null)[] | null;
  readonly estRevenue?: number | null;
  readonly totalStaff?: number | null;
  readonly responseTime?: number | null;
  readonly languages?: (string | null)[] | null;
  readonly legalRep?: string | null;
  readonly overview?: string | null;
  readonly memberType?: string | null;
  readonly Orders: AsyncCollection<Order>;
  readonly Products: AsyncCollection<Product>;
  readonly Reviews: AsyncCollection<Review>;
  readonly RFQS: AsyncCollection<RFQ>;
  readonly RFFS: AsyncCollection<RFF>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}