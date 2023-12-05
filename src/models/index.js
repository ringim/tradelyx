// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "ORDER_ACCEPTED": "ORDER_ACCEPTED",
  "ORDER_RECEIVED": "ORDER_RECEIVED",
  "REQUEST_REVIEW": "REQUEST_REVIEW",
  "DELIVERY_UPDATE": "DELIVERY_UPDATE",
  "COMPLETE": "COMPLETE",
  "CANCELED": "CANCELED",
  "PENDING": "PENDING",
  "DISPUTE_RESOLUTION": "DISPUTE_RESOLUTION",
  "RFF_REPLY_SENT": "RFF_REPLY_SENT",
  "RFQ_REPLY_SENT": "RFQ_REPLY_SENT",
  "ORDER_DELIVERED": "ORDER_DELIVERED",
  "ORDER_SHIPPED": "ORDER_SHIPPED",
  "IN_TRANSIT": "IN_TRANSIT",
  "PAYMENT": "PAYMENT",
  "ORDER_ARRIVED": "ORDER_ARRIVED"
};

const OrderType = {
  "PENDING": "PENDING",
  "IN_PROGRESS": "IN_PROGRESS",
  "COMPLETE": "COMPLETE"
};

const Rfftype = {
  "AIR": "AIR",
  "OCEAN": "OCEAN",
  "LAND": "LAND"
};

const Rfqtype = {
  "STANDARD": "STANDARD",
  "DOMESTIC": "DOMESTIC",
  "INTERNATIONAL": "INTERNATIONAL"
};

const PriceType = {
  "FIXED": "FIXED",
  "NEGOTIABLE": "NEGOTIABLE"
};

const AccountCategoryType = {
  "BUYER": "BUYER",
  "SELLER": "SELLER"
};

const IdentificationType = {
  "DRIVER_LICENSE": "DRIVER_LICENSE",
  "NATIONAL_IDENTIFICATION_NUMBER": "NATIONAL_IDENTIFICATION_NUMBER",
  "VOTERS_CARD": "VOTERS_CARD",
  "INTERNATIONAL_PASSPORT": "INTERNATIONAL_PASSPORT"
};

const AccountType = {
  "INDIVIDUAL": "INDIVIDUAL",
  "BUSINESS": "BUSINESS"
};

const { Order, RFQ, RFF, Categories, Review, Product, User } = initSchema(schema);

export {
  Order,
  RFQ,
  RFF,
  Categories,
  Review,
  Product,
  User,
  OrderStatus,
  OrderType,
  Rfftype,
  Rfqtype,
  PriceType,
  AccountCategoryType,
  IdentificationType,
  AccountType
};