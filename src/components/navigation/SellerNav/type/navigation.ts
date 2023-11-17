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
  BusinessDetail: undefined;
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
  reset(arg0: { index: number; routes: { name: string; }[]; }): unknown;
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
  EditAccountImage: {imageID: string};
  EditAccountBGImage: {imageID: string};
  EditProductItem: {product: string};
  EditProductImage: {productImage: string};
  EditProductImages: {productImages: string};
  EditProductSpec: {product: string};
  EditProductDoc: {productDoc: string};
  EditProductDocs2: {productDoc: string};
  EditProductShipment: {product: string};
  EditProductShipmentAddress: undefined;
  EditSellOfferItem: {sellOffer: string};
  EditSellOfferImages: {sellOfferImages: string};
  EditSellOfferPricing: {sellOffer: string};
  EditSellOfferShipment: undefined;
  EditSellOfferShipmentAddress: undefined;
  EditIdentityDoc: {idDoc: string};
  EditCompanyDocs: {idDoc: string};
};

export type HomeStackNavigatorParamList = {
  replace(arg0: string, arg1: {type: string}): unknown;
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
  StoreItem: {storeItem: string};
  SuccessService2: undefined;
  SuccessService3: undefined;
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
  DomesticDomesticRFQDetail: {rfqItem: string};
  StandardDomesticRFQDetail: {rfqItem: string};
  InternationalDomesticRFQDetail: {rfqItem: string};
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
export type DomesticRFQDetailNavigationProp = NativeStackNavigationProp<
  ExploreStackNavigatorParamList,
  'DomesticDomesticRFQDetail'
>;

export type StandardDomesticRFQDetailNavigationProp = NativeStackNavigationProp<
  ExploreStackNavigatorParamList,
  'StandardDomesticRFQDetail'
>;

export type InternationalDomesticRFQDetailNavigationProp =
  NativeStackNavigationProp<
    ExploreStackNavigatorParamList,
    'InternationalDomesticRFQDetail'
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

export type EditIdentityDocNavigationProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditIdentityDoc'
>;

export type EditCompanyDocsNavigationProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditCompanyDocs'
>;

export type EditProductItemNavigationProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditProductItem'
>;

export type EditProductImageNavigationProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditProductImage'
>;

export type EditAccountImageNavigationProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditAccountImage'
>;

export type EditAccountBGImageNavigationProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditAccountBGImage'
>;

export type EditSellOfferImagesNavigationProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditSellOfferImages'
>;

export type EditProductImagesNavigationProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditProductImages'
>;

export type EditProductSpecNavigationProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditProductSpec'
>;

export type EditProductDocNavigationProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditProductDoc'
>;

export type EditProductDocs2NavigationProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditProductDocs2'
>;

export type EditProductShipmentNavigationProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditProductShipment'
>;

// ----------ROUTE PROPS -----------
export type DomesticRFQDetailRouteProp = RouteProp<
  ExploreStackNavigatorParamList,
  'DomesticDomesticRFQDetail'
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

export type EditProductImageRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditProductImage'
>;

export type EditProductImagesRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditProductImages'
>;

export type EditSellOfferImagesRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditSellOfferImages'
>;

export type EditAccountImageRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditAccountImage'
>;

export type EditAccountBGImageRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditAccountBGImage'
>;

export type EditProductSpecRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditProductSpec'
>;

export type EditProductShipmentRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditProductShipment'
>;

export type EditProductDocRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditProductDoc'
>;

export type EditProductDocs2RouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditProductDocs2'
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

export type EditIdentityDocRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditIdentityDoc'
>;

export type EditCompanyDocsRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'EditCompanyDocs'
>;

export type StandardDomesticRFQDetailRouteProp = RouteProp<
  ExploreStackNavigatorParamList,
  'StandardDomesticRFQDetail'
>;

export type InternationalDomesticRFQDetailRouteProp = RouteProp<
  ExploreStackNavigatorParamList,
  'InternationalDomesticRFQDetail'
>;
