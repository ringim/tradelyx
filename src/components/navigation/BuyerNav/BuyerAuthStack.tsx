import React from 'react';
import {Easing} from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import BuyerStack from './BuyerStack';
import { CompleteProfile, UserAddress } from '../../../screens/Buyer';

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

const BuyerAuthStack = () => {
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
        name="UserAddress"
        component={UserAddress}
        options={() => options}
      />
      <Stack.Screen
        name="HomeScreen"
        component={BuyerStack}
        options={() => options}
      />
    </Stack.Navigator>
  );
};

export default BuyerAuthStack;
