// AUTH
import CompleteProfile from '../Auth/BuyerAuth/CompleteProfile';
import UserAddress from '../Auth/BuyerAuth/UserAddress';

// Home
import Home from './Home/Home';
import AllCategories from './Home/AllCategories';
import AllProducts from './Home/AllProducts';
import ProductDetail from './Home/ProductDetail';
import Profile from './Home/Profile/Profile';
import Search from './Home/Search';
import CompanyDetail from './Home/CompanyDetail';
import BusinessDetail from './Home/BusinessDetail';
import CategoryItemList from './Home/CategoryItemList';
import SearchFilter from './Home/SearchFilter';

//NOTIFICATIONS
import Notifications from './Home/Notification/Notifications';
import NotificationSetting from './Home/Notification/NotificationSetting';
import OrderNotifications from './Home/Notification/OrderNotifications';
import PromotionNotifications from './Home/Notification/PromotionNotifications';

// SERVICE
import ChooseService from './Home/SaleService/ChooseService';
import StandardQuotation from './Home/SaleService/RequestQuotation/StandardQuotation';
import DomesticRFQ from './Home/SaleService/RequestQuotation/DomesticRFQ';
import InternationalRFQ from './Home/SaleService/RequestQuotation/InternationalRFQ';
import EngagementTerms from './Home/SaleService/RequestQuotation/EngagementTerms';
import TypeQuotation from './Home/SaleService/RequestQuotation/TypeQuotation';
import PaymentQuotation from './Home/SaleService/RequestQuotation/PaymentQuotation';
import SearchAddress from './Home/SaleService/RequestQuotation/SearchAddress';
import LandFreight from './Home/SaleService/FreightQuotation/LandFreight';
import AirFreight from './Home/SaleService/FreightQuotation/AirFreight';
import OceanFreight from './Home/SaleService/FreightQuotation/OceanFreight';
import AirFreightPackage from './Home/SaleService/FreightQuotation/AirFreightPackage';
import AirPickupProcess from './Home/SaleService/FreightQuotation/AirPickupProcess';
import AirDestinationAddress from './Home/SaleService/RequestQuotation/AirDestinationAddress';
import AirPortOriginAddress from './Home/SaleService/RequestQuotation/AirPortOriginAddress';
import LandFreightPackage from './Home/SaleService/FreightQuotation/LandFreightPackage';
import LandPickupProcess from './Home/SaleService/FreightQuotation/LandPickupProcess';
import OceanContainerDetails from './Home/SaleService/FreightQuotation/OceanContainerDetails';
import OceanPickupProcess from './Home/SaleService/FreightQuotation/OceanPickupProcess';
import EngagementTermsAddress from './Home/SaleService/RequestQuotation/EngagementTermsAddress';
import InternationalTypeQuotation from './Home/SaleService/RequestQuotation/InternationalTypeQuotation';
import InternationalEngagementTerms from './Home/SaleService/RequestQuotation/InternationalEngagementTerms';
import InternationalPortAddress from './Home/SaleService/RequestQuotation/InternationalPortAddress';
import InternationalDestinationAddress from './Home/SaleService/RequestQuotation/InternationalDestinationAddress';
import InternationalPaymentQuotation from './Home/SaleService/RequestQuotation/InternationalPaymentQuotation';
import LandPickupAddress from './Home/SaleService/FreightQuotation/LandPickupAddress';
import LandPickupAddress2 from './Home/SaleService/FreightQuotation/LandPickupAddress2';
import OceanPortOriginAddress from './Home/SaleService/FreightQuotation/OceanPortOriginAddress';
import OceanDestinationAddress from './Home/SaleService/FreightQuotation/OceanDestinationAddress';
import RequestQuotationAddress from './Home/SaleService/RequestQuotation/RequestQuotationAddress';
import SuccessService from './Home/SaleService/SuccessService';
import AllReviews from './Home/AllReviews';

// Explore
import Explore from './Explore/Explore';
import ExploreFilter from './Explore/ExploreFilter';
import OfferDetail from './Explore/OfferDetail';

// Order
import Order from './Order/Order';
import OrderDetail from './Order/OrderDetail';
import ProgressOrderDetail from './Order/ProgressOrderDetail';
import RFFReplyList from './Order/RFFReplyList';
import ReplyDetailOcean from './Order/ReplyDetailOcean';
import ViewAgreement from './Order/ViewAgreement';
import ReplyDetailInternational from './Order/ReplyDetailInternational';
import ReplyDetailStandard from './Order/ReplyDetailStandard';
import ReplyDetailAir from './Order/ReplyDetailAir';
import ReplyDetailLand from './Order/ReplyDetailLand';
import ReplyDetailDomestic from './Order/ReplyDetailDomestic';
import RFQReplyList from './Order/RFQReplyList';

// PROFILE
import InviteFriends from './Home/Profile/InviteFriends';
import Account from './Home/Profile/Account';
import Wallet from './Home/Profile/Wallet';
import Favorites from './Home/Profile/Favorites';
import Refer from './Home/Profile/Refer';
import AccountAddress from './Home/Profile/AccountAddress';
import Freight from './Home/SaleService/Freight';
import Quotation from './Home/SaleService/Quotation';
import SearchFilter2 from './Home/SearchFilter2';
import EditAccountImage from './Home/Profile/EditAccountImage';

//Chat
import ChatRooms from './Chat/ChatRooms';
import Chat from './Chat/Chat';
import SellOfferDetails from './Chat/SellOfferDetails';
import RFQReplyDetailStandard from './Chat/RFQReplyDetailStandard';
import RFQReplyDetailInternational from './Chat/RFQReplyDetailInternational';
import RFQReplyDetailDomestic from './Chat/RFQReplyDetailDomestic';
import RFFReplyDetailOcean from './Chat/RFFReplyDetailOcean';
import RFFReplyDetailLand from './Chat/RFFReplyDetailLand';
import RFFReplyDetailAir from './Chat/RFFReplyDetailAir';
import CustomSellOfferDetail from './Chat/CustomSellOfferDetail';

export {
  Home,
  NotificationSetting,
  OrderNotifications,
  PromotionNotifications,
  Account,
  CustomSellOfferDetail,
  Quotation,
  RFQReplyList,
  Chat,
  ReplyDetailAir,
  ReplyDetailLand,
  ReplyDetailStandard,
  ReplyDetailDomestic,
  ReplyDetailInternational,
  Freight,
  EngagementTermsAddress,
  ViewAgreement,
  OfferDetail,
  Favorites,
  UserAddress,
  CompleteProfile,
  ReplyDetailOcean,
  Wallet,
  SearchFilter,
  Refer,
  LandPickupAddress,
  RFQReplyDetailStandard,
  RFQReplyDetailDomestic,
  RFQReplyDetailInternational,
  LandPickupAddress2,
  SellOfferDetails,
  RFFReplyDetailOcean,
  RFFReplyDetailLand,
  RFFReplyDetailAir,
  Explore,
  InternationalPortAddress,
  InternationalDestinationAddress,
  InviteFriends,
  OceanDestinationAddress,
  OceanPortOriginAddress,
  InternationalEngagementTerms,
  RFFReplyList,
  AirPortOriginAddress,
  SuccessService,
  ProgressOrderDetail,
  OceanContainerDetails,
  CategoryItemList,
  LandPickupProcess,
  AllProducts,
  OceanPickupProcess,
  RequestQuotationAddress,
  AirDestinationAddress,
  BusinessDetail,
  AccountAddress,
  LandFreightPackage,
  InternationalPaymentQuotation,
  OrderDetail,
  AirFreightPackage,
  PaymentQuotation,
  ExploreFilter,
  EngagementTerms,
  AirPickupProcess,
  SearchAddress,
  Notifications,
  LandFreight,
  AirFreight,
  OceanFreight,
  ChatRooms,
  AllReviews,
  InternationalTypeQuotation,
  TypeQuotation,
  StandardQuotation,
  Order,
  Search,
  CompanyDetail,
  Profile,
  AllCategories,
  ChooseService,
  EditAccountImage,
  ProductDetail,
  DomesticRFQ,
  InternationalRFQ,
  SearchFilter2,
};
