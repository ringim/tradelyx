import React from 'react';
import {Easing} from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import IBottomTabs from './BBottomTabs';
import {
  AllCategories,
  ProductDetail,
  Notifications,
  Profile,
  Filter,
  Search,
  SellerDetail,
  BusinessDetail,
  ChooseService,
  RequestQuotation,
  DomesticRFQ,
  InternationalRFQ,
  TypeQuotation,
  EngagementTerms,
  PaymentQuotation,
  ReplyList,
  SearchAddress,
  AirFreight,
  InternationalPaymentQuotation,
  OceanFreight,
  LandFreight,
  ReplyDetail,
  FreightPackage,
  AirPickupProcess,
  EngagementTermsAddress,
  AirPortOriginAddress,
  LandFreightPackage,
  AirDestinationAddress,
  LandPickupProcess,
  OfferDetail,
  ViewAgreement,
  LandPickupAddress,
  LandPickupAddress2,
  OceanContainerDetails,
  OceanPickupProcess,
  ExploreFilter,
  OrderDetail,
  ProgressOrderDetail,
  InternationalTypeQuotation,
  InternationalEngagementTerms,
  Account,
  Wallet,
  Favorites,
  SearchAddressFilter,
  Contact,
  Refer,
  InviteFriends,
  AllProducts,
  InternationalPortAddress,
  CategoryItemList,
  AccountAddress,
  InternationalDestinationAddress,
  OceanPortOriginAddress,
  OceanDestinationAddress,
} from '../../../screens/Buyer';

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
        component={IBottomTabs}
        options={{
          gestureEnabled: true,
        }}
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
      <Stack.Screen name="Filter" component={Filter} options={() => options} />
      <Stack.Screen
        name="AllProducts"
        component={AllProducts}
        options={() => options}
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
        name="SellerDetail"
        component={SellerDetail}
        options={() => options}
      />
      <Stack.Screen
        name="SearchAddressFilter"
        component={SearchAddressFilter}
        options={() => options}
      />
      <Stack.Screen
        name="BusinessDetail"
        component={BusinessDetail}
        options={() => options}
      />
      <Stack.Screen
        name="ChooseService"
        component={ChooseService}
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
        name="RequestQuotation"
        component={RequestQuotation}
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
        name="FreightPackage"
        component={FreightPackage}
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
        name="ReplyList"
        component={ReplyList}
        options={() => options}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={() => options}
      />
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
      <Stack.Screen name="Refer" component={Refer} options={() => options} />
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={() => options}
      />
      <Stack.Screen
        name="InviteFriends"
        component={InviteFriends}
        options={() => options}
      />
      <Stack.Screen
        name="ReplyDetail"
        component={ReplyDetail}
        options={() => options}
      />
    </Stack.Navigator>
  );
};

export default BuyerStack;
