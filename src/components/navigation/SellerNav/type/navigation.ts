import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootNavigatorParamList = {
  navigate: any;
  Auth: undefined;
  Home: undefined;
};

export type SetupNavigatorParamList = {
  replace(arg0: string): unknown;
  reset(arg0: {index: number; routes: {name: string}[]}): unknown;
  navigate: any;
  goBack: any;
  CompleteProfile: undefined;
  BusinessDetail: undefined;
  BusinessAddress: undefined;
  AccountNotVerified: undefined;
};

export type BottomTabNavigatorParamList = {
  Home: undefined;
  Order: undefined;
  Explore: undefined;
  ChatRooms: undefined;
  Profile: NavigatorScreenParams<ProfileStackNavigatorParamList>;
};

export type ProfileStackNavigatorParamList = {
  reset(arg0: {index: number; routes: {name: string}[]}): unknown;
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
  Contact: undefined;
  InviteFriends: undefined;
  MyStore: undefined;
  SellOfferDetail: {sellOffer: string};
  ProductItem: {storeItem: string};
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
  MySellOffers: undefined;
  MyProducts: undefined;
  EditSellOfferShipment: undefined;
  EditSellOfferShipmentAddress: undefined;
  EditIdentityDoc: {idDoc: string};
  EditCompanyDocs: {idDoc: string};
};

export type HomeStackNavigatorParamList = {
  popToTop(arg0: number): unknown;
  pop(arg0: number): unknown;
  replace(arg0: string, arg1: {type: string}): unknown;
  reset: any;
  goBack: any;
  navigate: any;
  Notifications: undefined;
  Home: undefined;
  AddProducts: undefined;
  SellOffer: undefined;
  RFFList: undefined;
  RFQList: undefined;
  PackingShipment: undefined;
  PackageShipmentAddress: undefined;
  MiniumOrderPayment: undefined;
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
  RFFFilter: undefined;
  DomesticDomesticRFQDetail: {rfqItem: string};
  StandardRFQDetail: {rfqItem: string};
  InternationalRFQDetail: {rfqItem: string};
  QuotesRequestDetails: {quoteItem: string};
  AgentRequestDetails: {agentItem: string};
};

export type ChatStackNavigatorParamList = {
  pop: any;
  reset: any;
  navigate: any;
  replace: any;
  goBack: any;
  ChatRooms: undefined;
  Chat: {id: string};
  ReplySellofferDetails: {sellOffer: string};
  ReplySellOfferPayment: {sellOffer: string};
  ReplyPackageShipmentAddress: any;
  SuccessService4: undefined;
  SuccessService5: undefined;
  SuccessService6: undefined;
  SuccessService7: undefined;
  SellOfferDetails: {sellOffer: string};
  ReplyRFQStandard: {rfq: string};
  ReplyRFQStandardPayment: {rfq: string};
  ReplyRFQDomestic: {rfq: string};
  ReplyRFQDomesticPayment: {rfq: string};
  ReplyRFQInternational: {rfq: string};
  ReplyRFQInternationalPayment: {rfq: string};
  ReplyRFFOcean: {rff: string};
  ReplyRFFOceanPayment: {rff: string};
  ReplyRFFLand: {rff: string};
  ReplyRFFLandPayment: {rff: string};
  ReplyRFFAir: {rff: string};
  ReplyRFFAirPayment: {rff: string};
  RFQReplyDetailStandard: {rfq: string};
  RFFReplyDetailOcean: {rff: string};
  RFFReplyDetailLand: {rff: string};
  RFFReplyDetailAir: {rff: string};
  CustomSellOffer: undefined;
  CustomPackingShipment: undefined;
  CustomPackageShipmentAddress: undefined;
  CustomMiniumOrderPayment: undefined;
  CustomSellOfferDetail: undefined;
};

export type OrderStackNavigatorParamList = {
  canGoBack(): unknown;
  navigate: any;
  Order: undefined;
  OrderDetail: {sellerItem: string};
  ReplyDetailSellOffer: {sellOffer: string};
  ProgressOrderDetail: {orderItem: string};
  NotificationSetting: undefined;
  OrderNotifications: {orderItem: String};
  PromotionNotifications: {promoItem: String};
};

// ---------NAVIGATION PROP------------

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

export type RFQReplyDetailsNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'RFQReplyDetailStandard'
>;

export type ReplyDetailSellOfferNavigationProp = NativeStackNavigationProp<
  OrderStackNavigatorParamList,
  'ReplyDetailSellOffer'
>;

export type DomesticRFQDetailNavigationProp = NativeStackNavigationProp<
  ExploreStackNavigatorParamList,
  'DomesticDomesticRFQDetail'
>;

export type SellOfferDetailsNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'SellOfferDetails'
>;

export type ReplySellofferDetailsNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'ReplySellofferDetails'
>;

export type ReplySellOfferPaymentNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'ReplySellOfferPayment'
>;

export type ReplyRFFOceanNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'ReplyRFFOcean'
>;

export type RFFReplyDetailOceanNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'RFFReplyDetailOcean'
>;

export type RFFReplyDetailLandNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'RFFReplyDetailLand'
>;

export type RFFReplyDetailAirNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'RFFReplyDetailAir'
>;

export type ReplyRFFOceanPaymentNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'ReplyRFFOceanPayment'
>;

export type ReplyRFFAirNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'ReplyRFFAir'
>;

export type ReplyRFFAirPaymentNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'ReplyRFFAirPayment'
>;

export type ReplyRFFLandNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'ReplyRFFLand'
>;

export type ReplyRFFLandPaymentNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'ReplyRFFLandPayment'
>;

export type ReplyRFQStandardNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'ReplyRFQStandard'
>;

export type ReplyRFQStandardPaymentNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'ReplyRFQStandardPayment'
>;

export type ReplyRFQDomesticNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'ReplyRFQDomestic'
>;

export type ReplyRFQDomesticPaymentNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'ReplyRFQDomesticPayment'
>;

export type ReplyRFQInternationalNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'ReplyRFQInternational'
>;

export type ReplyRFQInternationalPaymentNavigationProp =
  NativeStackNavigationProp<
    ChatStackNavigatorParamList,
    'ReplyRFQInternationalPayment'
  >;

export type StandardDomesticRFQDetailNavigationProp = NativeStackNavigationProp<
  ExploreStackNavigatorParamList,
  'StandardRFQDetail'
>;

export type InternationalDomesticRFQDetailNavigationProp =
  NativeStackNavigationProp<
    ExploreStackNavigatorParamList,
    'InternationalRFQDetail'
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

export type ChatNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'Chat'
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
  ProfileStackNavigatorParamList,
  'ProductItem'
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
  'StandardRFQDetail'
>;

export type InternationalDomesticRFQDetailRouteProp = RouteProp<
  ExploreStackNavigatorParamList,
  'InternationalRFQDetail'
>;

export type ReplySellofferDetailsRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'ReplySellofferDetails'
>;

export type ReplySellOfferPaymentRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'ReplySellOfferPayment'
>;

export type ReplyRFQStandardRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'ReplyRFQStandard'
>;

export type ReplyRFQStandardPaymentRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'ReplyRFQStandardPayment'
>;

export type ReplyRFQDomesticRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'ReplyRFQDomestic'
>;

export type ReplyRFQDomesticPaymentRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'ReplyRFQDomesticPayment'
>;

export type ReplyRFQInternationalRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'ReplyRFQInternational'
>;

export type ReplyRFQInternationalPaymentRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'ReplyRFQInternationalPayment'
>;

export type ChatRouteProp = RouteProp<ChatStackNavigatorParamList, 'Chat'>;

export type ReplyRFFOceanRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'ReplyRFFOcean'
>;

export type ReplyRFFOceanPaymentRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'ReplyRFFOceanPayment'
>;

export type ReplyRFFLandRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'ReplyRFFLand'
>;

export type ReplyRFFLandPaymentRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'ReplyRFFLandPayment'
>;

export type ReplyRFFAirRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'ReplyRFFAir'
>;

export type ReplyRFFAirPaymentRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'ReplyRFFAirPayment'
>;

export type RFQReplyDetailsRouteProp = RouteProp<
  ChatStackNavigatorParamList,
  'RFQReplyDetailStandard'
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

export type ReplyDetailSellOfferRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'ReplyDetailSellOffer'
>;

export type OrderNotificationsRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'OrderNotifications'
>;

export type PromotionNotificationsRouteProp = RouteProp<
  OrderStackNavigatorParamList,
  'PromotionNotifications'
>;
