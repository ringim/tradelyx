import React from 'react';
import {Easing} from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {
  AllCategories,
  ProductDetail,
  Notifications,
  Profile,
  Search,
  CompanyDetail,
  BusinessDetail,
  StandardQuotation,
  DomesticRFQ,
  InternationalRFQ,
  TypeQuotation,
  EngagementTerms,
  PaymentQuotation,
  RFFReplyList,
  RequestQuotationAddress,
  SearchAddress,
  AirFreight,
  InternationalPaymentQuotation,
  OceanFreight,
  LandFreight,
  ReplyDetailOcean,
  ReplyDetailAir,
  ReplyDetailLand,
  ReplyDetailStandard,
  ReplyDetailDomestic,
  ReplyDetailInternational,
  SellOfferDetails,
  AirFreightPackage,
  AirPickupProcess,
  EngagementTermsAddress,
  SuccessService,
  AirPortOriginAddress,
  Pending,
  LandFreightPackage,
  AirDestinationAddress,
  EditAccountImage,
  SearchFilter2,
  LandPickupProcess,
  OfferDetail,
  ViewAgreement,
  Chat,
  NotificationSetting,
  OrderNotifications,
  PromotionNotifications,
  CustomSellOfferDetail,
  LandPickupAddress,
  LandPickupAddress2,
  OceanContainerDetails,
  RFQReplyList,
  OceanPickupProcess,
  ExploreFilter,
  AllReviews,
  OrderDetail,
  ProgressOrderDetail,
  InternationalTypeQuotation,
  InternationalEngagementTerms,
  Account,
  Wallet,
  Favorites,
  InviteFriends,
  AllProducts,
  RFQReplyDetailStandard,
  InternationalPortAddress,
  CategoryItemList,
  AccountAddress,
  InternationalDestinationAddress,
  OceanPortOriginAddress,
  OceanDestinationAddress,
  Quotation,
  Freight,
  SearchFilter,
  RFQReplyDetailDomestic,
  RFQReplyDetailInternational,
  RFFReplyDetailOcean,
  RFFReplyDetailLand,
  RFFReplyDetailAir,
} from '../../../screens/Buyer';
import BBottomTabs from './BBottomTabs';

const Stack = createSharedElementStackNavigator();
const options: any = {
  gestureEnabled: true,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {duration: 300, easing: Easing.inOut(Easing.ease)},
    },
    close: {
      animation: 'timing',
      config: {duration: 300, easing: Easing.inOut(Easing.ease)},
    },
  },
  cardStyleInterpolator: ({current: {progress}}: any) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

const BuyerStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
      detachInactiveScreens={false}>
      <Stack.Screen
        name="Home"
        component={BBottomTabs}
        options={() => options}
      />
      <Stack.Screen
        name="AllCategories"
        component={AllCategories}
        options={() => options}
      />
      <Stack.Screen
        name="CategoryItemList"
        component={CategoryItemList}
        options={() => options}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={() => options}
        initialParams={{id: 0}}
      />
      <Stack.Screen
        name="InternationalPaymentQuotation"
        component={InternationalPaymentQuotation}
        options={() => options}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={() => options}
      />
      <Stack.Screen
        name="ViewAgreement"
        component={ViewAgreement}
        options={() => options}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={() => options}
      />
      <Stack.Screen
        name="AllProducts"
        component={AllProducts}
        options={() => options}
      />
      <Stack.Screen
        name="SearchFilter2"
        component={SearchFilter2}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="EditAccountImage"
        component={EditAccountImage}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="SearchFilter"
        component={SearchFilter}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="ExploreFilter"
        component={ExploreFilter}
        options={() => options}
      />
      <Stack.Screen
        name="OfferDetail"
        component={OfferDetail}
        options={() => options}
      />
      <Stack.Screen name="Search" component={Search} options={() => options} />
      <Stack.Screen
        name="CompanyDetail"
        component={CompanyDetail}
        options={() => options}
        initialParams={{id: 0}}
      />
      <Stack.Screen
        name="Quotation"
        component={Quotation}
        options={() => options}
      />
      <Stack.Screen
        name="Freight"
        component={Freight}
        options={() => options}
      />
      <Stack.Screen
        name="BusinessDetail"
        component={BusinessDetail}
        options={() => options}
      />
      <Stack.Screen
        name="AllReviews"
        component={AllReviews}
        options={() => options}
      />
      <Stack.Screen
        name="LandPickupAddress"
        component={LandPickupAddress}
        options={() => options}
      />
      <Stack.Screen
        name="LandPickupAddress2"
        component={LandPickupAddress2}
        options={() => options}
      />
      <Stack.Screen
        name="StandardQuotation"
        component={StandardQuotation}
        options={() => options}
      />
      <Stack.Screen
        name="InternationalPortAddress"
        component={InternationalPortAddress}
        options={() => options}
      />
      <Stack.Screen
        name="OceanPortOriginAddress"
        component={OceanPortOriginAddress}
        options={() => options}
      />
      <Stack.Screen
        name="OceanDestinationAddress"
        component={OceanDestinationAddress}
        options={() => options}
      />
      <Stack.Screen
        name="InternationalDestinationAddress"
        component={InternationalDestinationAddress}
        options={() => options}
      />
      <Stack.Screen
        name="EngagementTermsAddress"
        component={EngagementTermsAddress}
        options={() => options}
      />
      <Stack.Screen
        name="DomesticRFQ"
        component={DomesticRFQ}
        options={() => options}
      />
      <Stack.Screen
        name="InternationalRFQ"
        component={InternationalRFQ}
        options={() => options}
      />
      <Stack.Screen
        name="InternationalTypeQuotation"
        component={InternationalTypeQuotation}
        options={() => options}
      />
      <Stack.Screen
        name="InternationalEngagementTerms"
        component={InternationalEngagementTerms}
        options={() => options}
      />
      <Stack.Screen
        name="TypeQuotation"
        component={TypeQuotation}
        options={() => options}
      />
      <Stack.Screen
        name="EngagementTerms"
        component={EngagementTerms}
        options={() => options}
      />
      <Stack.Screen
        name="PaymentQuotation"
        component={PaymentQuotation}
        options={() => options}
      />
      <Stack.Screen
        name="SearchAddress"
        component={SearchAddress}
        options={() => options}
      />
      <Stack.Screen
        name="AirPortOriginAddress"
        component={AirPortOriginAddress}
        options={() => options}
      />
      <Stack.Screen
        name="AirDestinationAddress"
        component={AirDestinationAddress}
        options={() => options}
      />
      <Stack.Screen
        name="OceanFreight"
        component={OceanFreight}
        options={() => options}
      />
      <Stack.Screen
        name="LandFreight"
        component={LandFreight}
        options={() => options}
      />
      <Stack.Screen
        name="AirFreight"
        component={AirFreight}
        options={() => options}
      />
      <Stack.Screen
        name="AirFreightPackage"
        component={AirFreightPackage}
        options={() => options}
      />
      <Stack.Screen
        name="AirPickupProcess"
        component={AirPickupProcess}
        options={() => options}
      />
      <Stack.Screen
        name="LandFreightPackage"
        component={LandFreightPackage}
        options={() => options}
      />
      <Stack.Screen
        name="LandPickupProcess"
        component={LandPickupProcess}
        options={() => options}
      />
      <Stack.Screen
        name="OceanContainerDetails"
        component={OceanContainerDetails}
        options={() => options}
      />
      <Stack.Screen
        name="RFQReplyList"
        component={RFQReplyList}
        options={() => options}
      />
      <Stack.Screen
        name="OceanPickupProcess"
        component={OceanPickupProcess}
        options={() => options}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={() => options}
      />
      <Stack.Screen
        name="ProgressOrderDetail"
        component={ProgressOrderDetail}
        options={() => options}
      />
      <Stack.Screen
        name="RFFReplyList"
        component={RFFReplyList}
        options={() => options}
      />
      <Stack.Screen
        name="SellOfferDetails"
        component={SellOfferDetails}
        options={() => options}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={() => options}
      />
      <Stack.Screen name="Chat" component={Chat} options={() => options} />
      <Stack.Screen
        name="AccountAddress"
        component={AccountAddress}
        options={() => options}
      />
      <Stack.Screen name="Wallet" component={Wallet} options={() => options} />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={() => options}
      />
      <Stack.Screen
        name="RequestQuotationAddress"
        component={RequestQuotationAddress}
        options={() => options}
      />
      <Stack.Screen
        name="SuccessService"
        component={SuccessService}
        options={() => options}
      />
      <Stack.Screen
        name="InviteFriends"
        component={InviteFriends}
        options={() => options}
      />
      <Stack.Screen
        name="RFQReplyDetailStandard"
        component={RFQReplyDetailStandard}
        options={() => options}
      />
      <Stack.Screen
        name="RFQReplyDetailDomestic"
        component={RFQReplyDetailDomestic}
        options={() => options}
      />
      <Stack.Screen
        name="RFQReplyDetailInternational"
        component={RFQReplyDetailInternational}
        options={() => options}
      />
      <Stack.Screen
        name="RFFReplyDetailOcean"
        component={RFFReplyDetailOcean}
        options={() => options}
      />
      <Stack.Screen
        name="RFFReplyDetailLand"
        component={RFFReplyDetailLand}
        options={() => options}
      />
      <Stack.Screen
        name="RFFReplyDetailAir"
        component={RFFReplyDetailAir}
        options={() => options}
      />

      <Stack.Screen
        name="ReplyDetailAir"
        component={ReplyDetailAir}
        options={() => options}
      />
      <Stack.Screen
        name="ReplyDetailLand"
        component={ReplyDetailLand}
        options={() => options}
      />
      <Stack.Screen
        name="ReplyDetailOcean"
        component={ReplyDetailOcean}
        options={() => options}
      />
      <Stack.Screen
        name="ReplyDetailDomestic"
        component={ReplyDetailDomestic}
        options={() => options}
      />
      <Stack.Screen
        name="ReplyDetailStandard"
        component={ReplyDetailStandard}
        options={() => options}
      />
      <Stack.Screen
        name="Orders"
        component={BBottomTabs}
        options={() => options}
      />
      <Stack.Screen
        name="ReplyDetailInternational"
        component={ReplyDetailInternational}
        options={() => options}
      />
      <Stack.Screen
        name="CustomSellOfferDetail"
        component={CustomSellOfferDetail}
        options={() => options}
      />
      <Stack.Screen
        name="OrderNotifications"
        component={OrderNotifications}
        options={() => options}
      />
      <Stack.Screen
        name="PromotionNotifications"
        component={PromotionNotifications}
        options={() => options}
      />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
        options={() => options}
      />
      <Stack.Screen
        name="Pending"
        component={Pending}
        options={() => options}
      />
    </Stack.Navigator>
  );
};

export default BuyerStack;
