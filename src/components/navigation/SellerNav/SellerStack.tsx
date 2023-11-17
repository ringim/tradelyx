import React from 'react';
import {Easing} from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {
  Account,
  InviteFriends,
  Notifications,
  Profile,
  EditProductDoc,
  Refer,
  Wallet,
  SellOffer,
  StoreProduct,
  PackingShipment,
  PackageShipmentAddress,
  MiniumOrderPayment,
  RFQFilter,
  UserAddress,
  QuotesRequestDetails,
  DomesticRFQDetail,
  OrderDetail,
  ProgressOrderDetail,
  AgentRequestDetails,
  AccountAddress,
  StandardDomesticRFQDetail,
  InternationalDomesticRFQDetail,
  AddProducts,
  EditProductImages,
  EditProductShipmentAddress,
  EditProductDocs2,
  EditProductShipment,
  ProductSpecification,
  ProductShipmentAddress,
  EditProductItem,
  ProductShipment,
  EditProductImage,
  EditProductSpec,
  StoreItem,
  SellOfferDetail,
  EditSellOfferItem,
  EditSellOfferImages,
  EditSellOfferPricing,
  SuccessService2,
  SuccessService3,
  EditSellOfferShipment,
  EditCompanyDocs,
  EditSellOfferShipmentAddress,
  EditAccountImage,
  EditAccountBGImage,
  EditIdentityDoc,
} from '../../../screens/Seller';
import CBottomTabs from './SBottomTabs';

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

const SellerStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
      detachInactiveScreens={false}>
      {/* AppStack */}
      <Stack.Screen
        name="Home"
        component={CBottomTabs}
        options={{
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
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
      <Stack.Screen name="Refer" component={Refer} options={() => options} />
      <Stack.Screen
        name="InviteFriends"
        component={InviteFriends}
        options={() => options}
      />
      <Stack.Screen
        name="EditProductShipment"
        component={EditProductShipment}
        options={() => options}
      />
      <Stack.Screen
        name="SellOfferDetail"
        component={SellOfferDetail}
        options={() => options}
      />
      <Stack.Screen
        name="InternationalDomesticRFQDetail"
        component={InternationalDomesticRFQDetail}
        options={() => options}
      />
      <Stack.Screen
        name="StandardDomesticRFQDetail"
        component={StandardDomesticRFQDetail}
        options={() => options}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={() => options}
      />
      <Stack.Screen
        name="ProductShipmentAddress"
        component={ProductShipmentAddress}
        options={() => options}
      />
      <Stack.Screen
        name="EditSellOfferShipment"
        component={EditSellOfferShipment}
        options={() => options}
      />
      <Stack.Screen
        name="EditProductImage"
        component={EditProductImage}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="EditProductImages"
        component={EditProductImages}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="EditCompanyDocs"
        component={EditCompanyDocs}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="EditSellOfferShipmentAddress"
        component={EditSellOfferShipmentAddress}
        options={() => options}
      />
      <Stack.Screen
        name="SellOffer"
        component={SellOffer}
        options={() => options}
      />
      <Stack.Screen
        name="EditProductSpec"
        component={EditProductSpec}
        options={() => options}
      />
      <Stack.Screen
        name="StoreProduct"
        component={StoreProduct}
        options={() => options}
      />
      <Stack.Screen
        name="EditProductShipmentAddress"
        component={EditProductShipmentAddress}
        options={() => options}
      />
      <Stack.Screen
        name="AddProducts"
        component={AddProducts}
        options={() => options}
      />
      <Stack.Screen
        name="PackingShipment"
        component={PackingShipment}
        options={() => options}
      />
      <Stack.Screen
        name="EditAccountImage"
        component={EditAccountImage}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="EditAccountBGImage"
        component={EditAccountBGImage}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="EditIdentityDoc"
        component={EditIdentityDoc}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="EditProductDoc"
        component={EditProductDoc}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="EditProductDocs2"
        component={EditProductDocs2}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="EditSellOfferImages"
        component={EditSellOfferImages}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="PackageShipmentAddress"
        component={PackageShipmentAddress}
        options={() => options}
      />
      <Stack.Screen
        name="MiniumOrderPayment"
        component={MiniumOrderPayment}
        options={() => options}
      />
      <Stack.Screen
        name="QuotesRequestDetails"
        component={QuotesRequestDetails}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="AgentRequestDetails"
        component={AgentRequestDetails}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="StoreItem"
        component={StoreItem}
        options={() => options}
      />
      <Stack.Screen
        name="RFQFilter"
        component={RFQFilter}
        options={() => options}
      />
      <Stack.Screen
        name="ProductSpecification"
        component={ProductSpecification}
        options={() => options}
      />
      <Stack.Screen
        name="EditSellOfferItem"
        component={EditSellOfferItem}
        options={() => options}
      />
      <Stack.Screen
        name="EditSellOfferPricing"
        component={EditSellOfferPricing}
        options={() => options}
      />
      <Stack.Screen
        name="EditProductItem"
        component={EditProductItem}
        options={() => options}
      />
      <Stack.Screen
        name="ProductShipment"
        component={ProductShipment}
        options={() => options}
      />
      <Stack.Screen
        name="SuccessService2"
        component={SuccessService2}
        options={() => options}
      />
      <Stack.Screen
        name="SuccessService3"
        component={SuccessService3}
        options={() => options}
      />
      <Stack.Screen
        name="UserAddress"
        component={UserAddress}
        options={() => options}
      />
      <Stack.Screen
        name="DomesticRFQDetail"
        component={DomesticRFQDetail}
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
    </Stack.Navigator>
  );
};

export default SellerStack;
