import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

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
  BusinessDetail: undefined
  BusinessAddress: undefined;
};

export type BottomTabNavigatorParamList = {
  Home: undefined;
  Order: undefined;
  Explore: undefined;
  Chat: undefined;
  Profile: NavigatorScreenParams<ProfileStackNavigatorParamList>;
};

export type ProfileStackNavigatorParamList = {
  canGoBack: any;
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
  Refer: undefined;
  Contact: undefined;
  InviteFriends: undefined;
  StoreProduct: undefined;
  SellOfferDetail: {sellOffer: string};
  UserAddress: undefined;
  AccountAddress: undefined;
  EditProductItem: {product: string};
  EditProductSpec: {product: string};
  EditProductPrice: {product: string};
  EditProductShipment: {product: string};
  EditProductShipmentAddress: undefined;
  EditSellOfferItem: {sellOffer: string};
  EditSellOfferPricing: {sellOffer: string};
  EditSellOfferShipment: undefined
  EditSellOfferShipmentAddress: undefined;
};

export type HomeStackNavigatorParamList = {
  reset: any;
  goBack: any;
  navigate: any;
  Notifications: undefined;
  Home: undefined;
  AddProducts: undefined;
  SellOffer: undefined;
  PackingShipment: undefined;
  PackageShipmentAddress: undefined;
  MiniumOrderPayment: undefined;
  Filter: undefined;
  StoreItem: {storeItem: string};
};

export type ExploreStackNavigatorParamList = {
  reset: any;
  goBack: any;
  navigate: any;
  Explore: undefined;
  Filter: undefined;
  RFQFilter: undefined;
  RFQList: undefined;
  RFFList: undefined;
  AgentRequest: undefined;
  QuotesRequest: undefined;
  RFQDetail: {sellerItem: string};
  QuotesRequestDetails: {quoteItem: string};
  AgentRequestDetails: {agentItem: string};
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
  OrderDetail: {sellerItem: string};
  ProgressOrderDetail: {orderItem: string};
};

// ---------NAVIGATION PROP------------
export type RFQDetailNavigationProp = NativeStackNavigationProp<
  ExploreStackNavigatorParamList,
  'RFQDetail'
>;

export type QuotesRequestDetailsNavigationProp = NativeStackNavigationProp<
  ExploreStackNavigatorParamList,
  'QuotesRequestDetails'
>;

export type AgentRequestDetailsNavigationProp = NativeStackNavigationProp<
  ExploreStackNavigatorParamList,
  'AgentRequestDetails'
>;

export type ProgressOrderDetailNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'ProgressOrderDetail'
>;

export type OrderDetailNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'OrderDetail'
>;

// ----------ROUTE PROPS -----------
export type RFQDetailRouteProp = RouteProp<
  ExploreStackNavigatorParamList,
  'RFQDetail'
>;

export type QuotesRequestDetailsRouteProp = RouteProp<
  ExploreStackNavigatorParamList,
  'QuotesRequestDetails'
>;

export type AgentRequestDetailsRouteProp = RouteProp<
  ExploreStackNavigatorParamList,
  'AgentRequestDetails'
>;

export type ProgressOrderDetailRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'ProgressOrderDetail'
>;

export type OrderDetailRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'OrderDetail'
>;

export type StoreItemRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'StoreItem'
>;

export type EditProductItemRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditProductItem'
>;

export type EditProductSpecRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditProductSpec'
>;

export type EditProductPriceRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditProductPrice'
>;

export type EditProductShipmentRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditProductShipment'
>;

export type SellOfferDetailRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'SellOfferDetail'
>;

export type EditSellOfferItemRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditSellOfferItem'
>;

export type EditSellOfferPricingRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditSellOfferPricing'
>;
