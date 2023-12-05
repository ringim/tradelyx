import {
  View,
  ActivityIndicator,
  Easing,
  AppState,
  Platform,
  NativeModules,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useMutation, useQuery} from '@apollo/client';
import {DataStore} from 'aws-amplify';

import AuthStack from './AuthStack';
import {useEffect, useState} from 'react';
import NoInternet from '../Others/NoInternet';
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
import {ChooseCategory} from '../../screens';
import SellerAuthStack from './SellerNav/SellerAuthStack';
import BuyerAuthStack from './BuyerNav/BuyerAuthStack';
import {User} from '../../models';

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

  const [connection, setConnection] = useState<any>(true);
  const [user, setUser] = useState<User | null>(null);

  // GET USER
  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {
        id: userID,
      },
      pollInterval: 100,
    },
  );
  const userInfo: any = data?.getUser;

  const fetchUser = async () => {
    setUser(userInfo);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    const subscription = DataStore.observe(User, user.id).subscribe(msg => {
      if (msg.model === User && msg.opType === 'UPDATE') {
        setUser(msg.element);
      }
    });
    return () => subscription.unsubscribe();
  }, [user?.id]);

  // UPDATING LAST SEEN ONLINE
  useEffect(() => {
    const interval = setInterval(async () => {
      await updateLastOnline();
    }, 10000);
    return () => clearInterval(interval);
  }, [user]);

  // UPDATE LAST SEEN ONLINE
  const [doUpdateUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(updateUser);
  const updateLastOnline = async () => {
    if (!userInfo) {
      return null;
    }
    const res = await doUpdateUser({
      variables: {
        input: {
          id: userInfo?.id,
          // rating: jobberRatings,
          lastOnlineAt: +new Date(),
        },
      },
    });
  };

  // Switching between different Wi-Fi does not send events in iOS
  useEffect(() => {
    const subAppState = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (Platform.OS === 'ios' && nextAppState == 'active') {
          await NativeModules.RNCNetInfo.getCurrentState('wifi');
        }
      },
    );

    const unSubNetState = NetInfo.addEventListener(state => {
      setConnection(state.isInternetReachable);
    });

    return () => {
      if (subAppState) {
        subAppState.remove();
      }
      unSubNetState();
    };
  }, [connection]);

  // IF NO NETWORK CONNECTION
  if (!connection) {
    return <NoInternet />;
  }

  // STACK SCREENS
  let stackScreens = null;
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
        name="SellerStack"
        component={SellerStack}
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
  };

  return (
    <BottomSheetModalProvider>
      <NavigationContainer linking={linking}>
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
