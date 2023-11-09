import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {Action} from '@react-navigation/routers/lib/typescript/src/CommonActions';

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
  replace(arg0: string, arg1: {type: string}): unknown;
  reset: any;
  goBack: any;
  navigate: any;
  Profile: NavigatorScreenParams<ProfileStackNavigatorParamList>;
  AllCategories: undefined;
  CategoryItemList: {cateItem: string};
  ProductDetail: {productItem: string};
  CompanyDetail: {sellerItem: string};
  BusinessDetail: {businessItem: string};
  OfferDetail: {detail: string};
  Notifications: undefined;
  Search: undefined;
  ChooseService: undefined;
  Home: undefined;
  Order: NavigatorScreenParams<OrderStackNavigatorParamList>;
  StandardQuotation: undefined;
  DomesticRFQ: undefined;
  TypeQuotation: undefined;
  InternationalEngagementTerms: undefined;
  EngagementTerms: undefined;
  PaymentQuotation: undefined;
  SearchAddress: undefined;
  AirPortOriginAddress: undefined;
  AirDestinationAddress: undefined;
  LandPickupAddress: undefined;
  LandPickupAddress2: undefined;
  SearchFilter: undefined;
  SearchFilter2: undefined;
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
  AllProducts: {items: string; loading: boolean};
  Quotation: undefined;
  Freight: undefined;
  SuccessService: {type: string};
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
  EditAccountImage: {imageID: string};
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

export type AllProductsNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'AllProducts'
>;

export type OfferDetailNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'OfferDetail'
>;

export type CompanyDetailNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'CompanyDetail'
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

export type EditAccountImageNavigationProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditAccountImage'
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

export type CompanyDetailRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'CompanyDetail'
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

export type EditAccountImageRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditAccountImage'
>;

export type SuccessServiceRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'SuccessService'
>;

export type AllProductsRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'AllProducts'
>;
