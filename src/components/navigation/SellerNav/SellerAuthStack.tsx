import React from 'react';
import {Easing} from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {
  BusinessAddress,
  BusinessDetail,
  CompleteProfile,
  AccountSuccessSeller,
} from '../../../screens/Seller';
import AuthStack from '../AuthStack';

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
      config: {durationpna: 300, easing: Easing.inOut(Easing.ease)},
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

const SellerAuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      detachInactiveScreens={true}>
      <Stack.Screen
        name="CompleteProfile"
        component={CompleteProfile}
        options={() => options}
      />
      <Stack.Screen
        name="BusinessAddress"
        component={BusinessAddress}
        options={() => options}
      />
      <Stack.Screen
        name="BusinessDetail"
        component={BusinessDetail}
        options={() => options}
      />
      <Stack.Screen
        name="AccountSuccessSeller"
        component={AccountSuccessSeller}
        options={() => options}
      />

      <AuthStack />
    </Stack.Navigator>
  );
};

export default SellerAuthStack;
