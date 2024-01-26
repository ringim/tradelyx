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
  SuccessService4,
  PackageShipmentAddress,
  Chat,
  MiniumOrderPayment,
  ReplyPackageShipmentAddress,
  RFQFilter,
  ReplySellofferDetails,
  ReplySellOfferPayment,
  UserAddress,
  QuotesRequestDetails,
  RFQReplyDetailDomestic,
  RFQReplyDetailInternational,
  DomesticRFQDetail,
  ReplyRFFOceanPayment,
  ReplyRFQStandard,
  OrderDetail,
  ProgressOrderDetail,
  AgentRequestDetails,
  AccountAddress,
  StandardRFQDetail,
  InternationalRFQDetail,
  AddProducts,
  EditProductImages,
  EditProductShipmentAddress,
  SellOfferDetails,
  EditProductDocs2,
  RFFFilter,
  EditProductShipment,
  ProductSpecification,
  ReplyDetailSellOffer,
  ProductShipmentAddress,
  MyProducts,
  MySellOffers,
  EditProductItem,
  ProductShipment,
  EditProductImage,
  EditProductSpec,
  ProductItem,
  RFFList,
  RFQList,
  SellOfferDetail,
  SellOfferReplyList,
  EditSellOfferItem,
  EditSellOfferImages,
  SuccessService7,
  EditSellOfferPricing,
  SuccessService2,
  SuccessService3,
  EditSellOfferShipment,
  EditCompanyDocs,
  EditSellOfferShipmentAddress,
  EditAccountImage,
  EditAccountBGImage,
  NotificationSetting,
  OrderNotifications,
  PromotionNotifications,
  EditIdentityDoc,
  ReplyRFQDomestic,
  ReplyRFQDomesticPayment,
  RFQReplyDetailStandard,
  ReplyRFQInternational,
  ReplyRFQInternationalPayment,
  SuccessService5,
  SuccessService6,
  CustomSellOfferDetail,
  ReplyRFFOcean,
  ReplyRFFAir,
  ReplyRFFAirPayment,
  ReplyRFFLand,
  ReplyRFFLandPayment,
  ReplyRFQStandardPayment,
  RFFReplyDetailOcean,
  RFFReplyDetailLand,
  RFFReplyDetailAir,
  CustomPackingShipment,
  CustomMiniumOrderPayment,
  CustomPackageShipmentAddress,
  CustomSellOffer,
} from '../../../screens/Seller';
import SBottomTabs from './SBottomTabs';

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
        component={SBottomTabs}
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
        name="InternationalRFQDetail"
        component={InternationalRFQDetail}
        options={() => options}
      />
      <Stack.Screen
        name="StandardRFQDetail"
        component={StandardRFQDetail}
        options={() => options}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={() => options}
      />
      <Stack.Screen
        name="ReplySellofferDetails"
        component={ReplySellofferDetails}
        options={() => options}
      />
      <Stack.Screen
        name="ReplySellOfferPayment"
        component={ReplySellOfferPayment}
        options={() => options}
      />
      <Stack.Screen
        name="ProductShipmentAddress"
        component={ProductShipmentAddress}
        options={() => options}
      />
      <Stack.Screen name="SuccessService4" component={SuccessService4} />
      <Stack.Screen name="SuccessService5" component={SuccessService5} />
      <Stack.Screen name="SuccessService6" component={SuccessService6} />
      <Stack.Screen name="SuccessService7" component={SuccessService7} />
      <Stack.Screen
        name="ReplyPackageShipmentAddress"
        component={ReplyPackageShipmentAddress}
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
        name="ProductItem"
        component={ProductItem}
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
      <Stack.Screen name="Chat" component={Chat} options={() => options} />
      <Stack.Screen
        name="SellOfferDetails"
        component={SellOfferDetails}
        options={() => options}
      />
      <Stack.Screen
        name="ReplyRFQStandard"
        component={ReplyRFQStandard}
        options={() => options}
      />
      <Stack.Screen
        name="ReplyRFQStandardPayment"
        component={ReplyRFQStandardPayment}
        options={() => options}
      />

      <Stack.Screen
        name="ReplyRFQDomestic"
        component={ReplyRFQDomestic}
        options={() => options}
      />

      <Stack.Screen
        name="ReplyRFQDomesticPayment"
        component={ReplyRFQDomesticPayment}
        options={() => options}
      />

      <Stack.Screen
        name="ReplyRFQInternational"
        component={ReplyRFQInternational}
        options={() => options}
      />

      <Stack.Screen
        name="ReplyRFQInternationalPayment"
        component={ReplyRFQInternationalPayment}
        options={() => options}
      />

      <Stack.Screen
        name="ReplyRFFOcean"
        component={ReplyRFFOcean}
        options={() => options}
      />

      <Stack.Screen
        name="ReplyRFFOceanPayment"
        component={ReplyRFFOceanPayment}
        options={() => options}
      />

      <Stack.Screen
        name="ReplyRFFAir"
        component={ReplyRFFAir}
        options={() => options}
      />

      <Stack.Screen
        name="ReplyRFFAirPayment"
        component={ReplyRFFAirPayment}
        options={() => options}
      />

      <Stack.Screen
        name="ReplyRFFLand"
        component={ReplyRFFLand}
        options={() => options}
      />
      <Stack.Screen
        name="ReplyRFFLandPayment"
        component={ReplyRFFLandPayment}
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
        name="RFFFilter"
        component={RFFFilter}
        options={() => options}
      />
      <Stack.Screen
        name="CustomPackageShipmentAddress"
        component={CustomPackageShipmentAddress}
        options={() => options}
      />
      <Stack.Screen
        name="CustomPackingShipment"
        component={CustomPackingShipment}
        options={() => options}
      />
      <Stack.Screen
        name="CustomMiniumOrderPayment"
        component={CustomMiniumOrderPayment}
        options={() => options}
      />
      <Stack.Screen
        name="CustomSellOffer"
        component={CustomSellOffer}
        options={() => options}
      />
      <Stack.Screen
        name="CustomSellOfferDetail"
        component={CustomSellOfferDetail}
        options={() => options}
      />
      <Stack.Screen
        name="SellOfferReplyList"
        component={SellOfferReplyList}
        options={() => options}
      />
      <Stack.Screen
        name="ReplyDetailSellOffer"
        component={ReplyDetailSellOffer}
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
        name="Products"
        component={MyProducts}
        options={() => options}
      />
      <Stack.Screen
        name="Sell Offers"
        component={MySellOffers}
        options={() => options}
      />
      <Stack.Screen name="RFF" component={RFFList} options={() => options} />
      <Stack.Screen name="RFQ" component={RFQList} options={() => options} />
    </Stack.Navigator>
  );
};

export default SellerStack;
