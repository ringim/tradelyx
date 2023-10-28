import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

export type RootNavigatorParamList = {
  navigate: any;
  Auth: undefined;
  Home: undefined;
};

export type SetupNavigatorParamList = {
  reset(arg0: {index: number; routes: {name: string}[]}): unknown;
  navigate: any;
  goBack: any;
  CompleteProfile: undefined;
  UserAddress: undefined;
};

export type HomeStackNavigatorParamList = {
  reset: any;
  goBack: any;
  navigate: any;
  Profile: NavigatorScreenParams<ProfileStackNavigatorParamList>;
  AllCategories: undefined;
  CategoryItemList: {cateItem: string};
  ProductDetail: {productItem: string};
  SellerDetail: {sellerItem: string};
  BusinessDetail: {businessItem: string};
  OfferDetail: {detail: string};
  Notifications: undefined;
  Filter: undefined;
  Search: undefined;
  ChooseService: undefined;
  RequestQuotation: undefined;
  DomesticRFQ: undefined;
  TypeQuotation: undefined;
  InternationalEngagementTerms: undefined;
  EngagementTerms: undefined;
  PaymentQuotation: undefined;
  SearchAddress: undefined;
  SearchAddressFilter: undefined;
  AirPortOriginAddress: undefined;
  AirDestinationAddress: undefined;
  LandPickupAddress: undefined;
  LandPickupAddress2: undefined;
  RequestQuotationAddress: undefined;
  InternationalTypeQuotation: undefined;
  OceanFreight: {freightType: string};
  AirFreight: {freightType: string};
  LandFreight: {freightType: string};
  AirFreightPackage: undefined;
  AirPickupProcess: undefined;
  LandFreightPackage: undefined;
  LandPickupProcess: undefined;
  OceanContainerDetails: undefined;
  OceanPickupProcess: undefined;
  InternationalPaymentQuotation: undefined;
  ExploreFilter: undefined;
  EngagementTermsAddress: undefined;
  AllProducts: undefined;
  Quotation: undefined;
  Freight: undefined;
  AllSellers: undefined;
};

export type ProfileStackNavigatorParamList = {
  canGoBack(): unknown;
  goBack: any;
  navigate: any;
  ReferEarn: undefined;
  Profile: undefined;
  PrivacyPolicy: undefined;
  ContactUs: undefined;
  Disputes: undefined;
  Contracts: undefined;
  Wallet: undefined;
  Account: undefined;
  Favorites: undefined;
  Refer: undefined;
  Contact: undefined;
  InviteFriends: undefined;
  AccountAddress: undefined;
};

export type BottomTabNavigatorParamList = {
  Home: undefined;
  Order: undefined;
  Explore: undefined;
  Chat: undefined;
};

export type ExploreStackNavigatorParamList = {
  reset: any;
  goBack: any;
  navigate: any;
};

export type ChatStackNavigatorParamList = {
  reset: any;
  navigate: any;
  goBack: any;
};

export type OrderStackNavigatorParamList = {
  canGoBack(): unknown;
  navigate: any;
  Order: undefined;
  ViewAgreement: undefined;
  ReplyList: {sellerItem: string};
  OrderDetail: {sellerItem: string};
  ProgressOrderDetail: {orderItem: string};
  ReplyDetail: {sellerItem: string};
};

// ---------NAVIGATION PROP------------
export type ProductDetailNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'ProductDetail'
>;

export type OfferDetailNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'OfferDetail'
>;

export type SellerDetailNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'SellerDetail'
>;

export type BusinessDetailNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'BusinessDetail'
>;

export type OceanFreightNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'OceanFreight'
>;

export type AirFreightNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'AirFreight'
>;

export type LandFreightNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'LandFreight'
>;

export type CategoryItemListNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'CategoryItemList'
>;

export type OrderDetailNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'OrderDetail'
>;

export type ReplyListNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'ReplyList'
>;

export type ReplyDetailNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'ReplyDetail'
>;

export type ProgressOrderDetailNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'ProgressOrderDetail'
>;

// ----------ROUTE PROPS -----------
export type ProductDetailRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'ProductDetail'
>;

export type SellerDetailRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'SellerDetail'
>;

export type BusinessDetailRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'BusinessDetail'
>;

export type OceanFreightRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'OceanFreight'
>;

export type AirFreightRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'AirFreight'
>;

export type LandFreightRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'LandFreight'
>;

export type CategoryItemListRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'CategoryItemList'
>;

export type OrderDetailRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'OrderDetail'
>;

export type ReplyListRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'ReplyList'
>;

export type ReplyDetailRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'ReplyDetail'
>;

export type ProgressOrderDetailRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'ProgressOrderDetail'
>;

export type OfferDetailRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'OfferDetail'
>;
