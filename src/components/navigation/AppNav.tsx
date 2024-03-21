import {View, ActivityIndicator, Easing, Platform, Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useMutation, useQuery} from '@apollo/client';

import AuthStack from './AuthStack';
import {useEffect} from 'react';
import {useAuthContext} from '../../context/AuthContext';
import SellerStack from './SellerNav/SellerStack';
import BuyerStack from './BuyerNav/BuyerStack';
import {COLORS} from '../../constants';
import {
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '../../API';
import {getUser, updateUser} from '../../queries/UserQueries';
import {ChooseCategory, Welcome} from '../../screens';
import SellerAuthStack from './SellerNav/SellerAuthStack';
import BuyerAuthStack from './BuyerNav/BuyerAuthStack';
import PushNotifications from '../../Notifications/PushNotifications';
import {
  ForgotPassword,
  NewPassword,
  SignIn,
  SignUp,
  VerificationCode,
} from '../../screens';

const Stack = createNativeStackNavigator<any>();
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

const AppNav = ({onBoarded}: any) => {
  const {authUser, userID, isLoading} = useAuthContext();

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

  // UPDATING LAST SEEN ONLINE
  useEffect(() => {
    const interval = setInterval(async () => {
      await updateLastOnline();
    }, 1 * 30 * 1000);
    return () => clearInterval(interval);
  }, [userInfo]);

  // UPDATE LAST SEEN ONLINE
  const [doUpdateUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(updateUser);
  const updateLastOnline = async () => {
    if (!userInfo) {
      return null;
    }
    try {
      const res = await doUpdateUser({
        variables: {
          input: {
            id: userInfo?.id,
            // rating: jobberRatings,
            lastOnlineAt: +new Date(),
          },
        },
      });
      // console.log('UPDATED USER', res);
    } catch (error) {
      return error;
    }
  };

  // STACK SCREENS
  let stackScreens;
  if (userInfo?.accountType === 'BUYER') {
    stackScreens = (
      <Stack.Screen
        name="BuyerStack"
        component={BuyerStack}
        options={() => options}
      />
    );
  } else if (userInfo?.accountType === 'SELLER') {
    stackScreens = (
      <Stack.Screen
        name="SellerAuthStack"
        component={SellerAuthStack}
        options={() => options}
      />
    );
  } else {
    stackScreens = (
      <>
        <Stack.Screen
          name="ChooseCategory"
          component={ChooseCategory}
          options={() => options}
        />
        <Stack.Screen
          name="BuyerAuthStack"
          component={BuyerAuthStack}
          options={() => options}
        />
        <Stack.Screen
          name="SellerAuthStack"
          component={SellerAuthStack}
          options={() => options}
        />
      </>
    );
  }

  if (isLoading || loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.primary6} />
      </View>
    );
  }

  // Define the linking configuration
  const linking = {
    prefixes: ['tradely://'], // Replace with your app's custom scheme
    config: {
      screens: {
        // CompanyDetails: 'details/:itemId', // Define the URL format for the Details screen
        CompanyDetail: {
          path: 'company/:id',
          parse: {
            id: (id: any) => `${id}`,
          },
        },
        ProductDetail: {
          path: 'product/:id',
          parse: {
            id: (id: any) => `${id}`,
          },
        },
      },
    },
    // async getInitialURL() {
    //   // First, you may want to do the default deep link handling
    //   // Check if app was opened from a deep link
    //   const url = await Linking.getInitialURL();

    //   if (url != null) {
    //     return url;
    //   }

    //   // Handle URL from expo push notifications
    //   const response = await Notifications.getLastNotificationResponseAsync();

    //   return response?.notification.request.content.data.url;
    // },
    // subscribe(listener: (arg0: string) => void) {
    //   const onReceiveURL = ({url}: {url: string}) => listener(url);

    //   // Listen to incoming links from deep linking
    //   const eventListenerSubscription = Linking.addEventListener(
    //     'url',
    //     onReceiveURL,
    //   );

    //   // Listen to expo push notifications
    //   const subscription =
    //     Notifications.addNotificationResponseReceivedListener(response => {
    //       const url = response.notification.request.content.data.url;
    //       // Any custom logic to see whether the URL needs to be handled
    //       //...
    //       // Let React Navigation handle the URL
    //       listener(url);
    //     });

    //   return () => {
    //     // Clean up the event listeners
    //     eventListenerSubscription.remove();
    //     subscription.remove();
    //   };
    // },
  };

  return (
    <BottomSheetModalProvider>
      <NavigationContainer linking={linking}>
        <PushNotifications />
        {!authUser ? (
          <AuthStack onBoarded={onBoarded} />
        ) : (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {stackScreens}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </BottomSheetModalProvider>
  );
};

export default AppNav;
