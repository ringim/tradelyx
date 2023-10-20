import React from 'react';
import {Easing} from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {
  Account,
  InviteFriends,
  Notifications,
  Profile,
  Refer,
  Wallet,
  SellOffer,
  AddProducts,
  PackingShipment,
  PackageShipmentAddress,
  MiniumOrderPayment,
  Filter,
  RFQFilter,
  UserAddress,
  QuotesRequestDetails,
  RFQDetail,
  RFQSearch,
  RFFSearch,
  OrderDetail,
  ProgressOrderDetail,
  AgentRequestDetails,
  AccountAddress,
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
        name="Notifications"
        component={Notifications}
        options={() => options}
      />
      <Stack.Screen
        name="SellOffer"
        component={SellOffer}
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
      <Stack.Screen name="Filter" component={Filter} options={() => options} />
      <Stack.Screen
        name="RFQFilter"
        component={RFQFilter}
        options={() => options}
      />
      <Stack.Screen
        name="RFFSearch"
        component={RFFSearch}
        options={() => options}
      />
      <Stack.Screen
        name="RFQSearch"
        component={RFQSearch}
        options={() => options}
      />
      <Stack.Screen
        name="UserAddress"
        component={UserAddress}
        options={() => options}
      />
      <Stack.Screen
        name="RFQDetail"
        component={RFQDetail}
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
