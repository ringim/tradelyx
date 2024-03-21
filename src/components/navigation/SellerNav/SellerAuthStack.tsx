import React from 'react';
import {Easing} from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {useQuery} from '@apollo/client';

import {
  BusinessAddress,
  BusinessDetail,
  CompleteProfile,
  AccountNotVerified,
} from '../../../screens/Seller';
import {useAuthContext} from '../../../context/AuthContext';
import {getUser} from '../../../queries/UserQueries';
import {GetUserQuery, GetUserQueryVariables} from '../../../API';
import {
  ForgotPassword,
  NewPassword,
  SignIn,
  SignUp,
  VerificationCode,
} from '../../../screens';
import SellerStack from './SellerStack';

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

const SellerAuthStack = () => {
  const {userID} = useAuthContext();

  // GET USER
  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {
        id: userID,
      },
      pollInterval: 500,
    },
  );
  const userInfo: any = data?.getUser;
  // console.log('user info',userInfo)

  let stackScreens = null;

  if (userInfo?.accountType === 'SELLER' && userInfo?.accountStatus === true) {
    stackScreens = (
      <>
        <Stack.Screen
          name="SellerStack"
          component={SellerStack}
          options={() => options}
        />
      </>
    );
  } else if (
    userInfo?.accountType === 'SELLER' &&
    userInfo?.accountStatus === false
  ) {
    stackScreens = (
      <>
        <Stack.Screen
          name="AccountNotVerified"
          component={AccountNotVerified}
          options={() => options}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={() => options}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={() => options}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={() => options}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
          options={() => options}
        />
        <Stack.Screen
          name="VerificationCode"
          component={VerificationCode}
          options={() => options}
        />
      </>
    );
  } else {
    stackScreens = (
      <>
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
          name="Home"
          component={SellerStack}
          options={() => options}
        />
      </>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      detachInactiveScreens={true}>
      {stackScreens}
    </Stack.Navigator>
  );
};

export default SellerAuthStack;
