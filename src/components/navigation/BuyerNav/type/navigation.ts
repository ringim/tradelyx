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
  AllProducts: undefined;
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
  ChatRooms: undefined;
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
  ChatRooms: undefined;
  Chat: {id: string};
  SellOfferDetails: {sellOffer: string};
  RFQReplyDetailStandard: {rfq: string};
  RFQReplyDetailInternational: {rfq: string};
  RFQReplyDetailDomestic: {rfq: string};
  RFFReplyDetailOcean: {rff: string};
  RFFReplyDetailLand: {rff: string};
  RFFReplyDetailAir: {rff: string};
  CustomSellOfferDetail: undefined;
};

export type OrderStackNavigatorParamList = {
  canGoBack(): unknown;
  navigate: any;
  Order: undefined;
  ViewAgreement: undefined;
  RFFReplyList: {sellerItem: string};
  RFQReplyList: {sellerItem: string};
  OrderDetail: {sellerItem: string};
  ProgressOrderDetail: {orderItem: string};
  SellOfferReplyList: {sellOffer: string};
  ReplyDetailAir: {sellerItem: string};
  ReplyDetailLand: {sellerItem: string};
  ReplyDetailOcean: {sellerItem: string};
  ReplyDetailStandard: {sellerItem: string};
  ReplyDetailDomestic: {sellerItem: string};
  ReplyDetailInternational: {sellerItem: string};
  NotificationSetting: undefined;
  OrderNotifications: {orderItem: String};
  PromotionNotifications: {promoItem: String};
};

// ---------NAVIGATION PROP------------
export type ProductDetailNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'ProductDetail'
>;

export type RFFReplyDetailOceanNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'RFFReplyDetailOcean'
>;

export type OrderNotificationsNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'OrderNotifications'
>;

export type PromotionNotificationsNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'PromotionNotifications'
>;

export type NotificationSettingNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'NotificationSetting'
>;

export type RFFReplyDetailLandNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'RFFReplyDetailLand'
>;

export type RFFReplyDetailAirNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'RFFReplyDetailAir'
>;

export type RFQReplyDetailStandardNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'RFQReplyDetailStandard'
>;

export type RFQReplyDetailDomesticNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'RFQReplyDetailDomestic'
>;

export type RFQReplyDetailInternationalNavigationProp =
  NativeStackNavigationProp<
    ChatStackNavigatorParamList,
    'RFQReplyDetailInternational'
  >;

export type SellOfferDetailsNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'SellOfferDetails'
>;

export type AllProductsNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'AllProducts'
>;

export type OfferDetailNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'OfferDetail'
>;

export type SellOfferReplyListNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'SellOfferReplyList'
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

export type RFFReplyListNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'RFFReplyList'
>;

export type RFQReplyListNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'RFQReplyList'
>;

export type ReplyDetailOceanNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'ReplyDetailOcean'
>;

export type ReplyDetailAirNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'ReplyDetailAir'
>;

export type ReplyDetailLandNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'ReplyDetailLand'
>;

export type ReplyDetailInternationalNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'ReplyDetailInternational'
>;

export type ReplyDetailStandardNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'ReplyDetailStandard'
>;

export type ReplyDetailDomesticNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'ReplyDetailDomestic'
>;

export type ProgressOrderDetailNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'ProgressOrderDetail'
>;

export type ChatNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'Chat'
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

export type ReplyListRFFRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'RFFReplyList'
>;

export type ReplyListRFQRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'RFQReplyList'
>;

export type ReplyDetailOceanRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'ReplyDetailOcean'
>;

export type ReplyDetailLandRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'ReplyDetailLand'
>;

export type ReplyDetailAirRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'ReplyDetailAir'
>;

export type ReplyDetailDomesticRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'ReplyDetailDomestic'
>;

export type ReplyDetailStandardRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'ReplyDetailStandard'
>;

export type ReplyDetailInternationalRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'ReplyDetailInternational'
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

export type ChatRouteProp = RouteProp<ChatStackNavigatorParamList, 'Chat'>;

export type SellOfferDetailsRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'SellOfferDetails'
>;

export type RFQReplyDetailStandardRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'RFQReplyDetailStandard'
>;

export type RFQReplyDetailDomesticRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'RFQReplyDetailDomestic'
>;

export type RFQReplyDetailInternationalRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'RFQReplyDetailInternational'
>;

export type RFFReplyDetailOceanRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'RFFReplyDetailOcean'
>;

export type RFFReplyDetailAirRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'RFFReplyDetailAir'
>;

export type RFFReplyDetailLandRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'RFFReplyDetailLand'
>;

export type SellOfferReplyListRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'SellOfferReplyList'
>;

export type OrderNotificationsRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'OrderNotifications'
>;

export type PromotionNotificationsRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'PromotionNotifications'
>;
