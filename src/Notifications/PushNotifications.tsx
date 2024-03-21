import {PermissionsAndroid, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

import {
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '../API';
import {getUser, updateUser} from '../queries/UserQueries';
import {useAuthContext} from '../context/AuthContext';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log(
  //   'Message handled in the background!',
  //   JSON.stringify(remoteMessage, null, 2),
  // );
});

const PushNotifications = () => {
  const {userID} = useAuthContext();
  const navigation = useNavigation<any>();

  const [enabled, setEnabled] = useState(false);
  const [token, setToken] = useState('');

  // GET USER
  const {data} = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {
    variables: {
      id: userID,
    },
  });

  // UPDATE USER FCM TOKEN
  const [doUpdateUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(updateUser);

  useEffect(() => {
    if (token && data?.getUser) {
      doUpdateUser({
        variables: {
          input: {
            id: data.getUser.id,
            fcmToken: token,
          },
        },
      });
    }
  }, [token, data?.getUser?.id]);

  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        // console.log('Authorization status:', authStatus);
        setEnabled(true);
        await getDeviceToken();
      }
    }
    requestUserPermission();
    requestAndroidPermission();
  }, []);

  const requestAndroidPermission = async () => {
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Post Notification permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Post Notification permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // handle notifications that are received while the application is in foreground state
    const unsubscribe = messaging().onMessage(handleNotification);

    // handle notifications that are opened the app from the background state
    messaging().onNotificationOpenedApp(handleNotification);

    // handle notifications that are opened the app from the Quit state
    messaging().getInitialNotification().then(handleNotification);

    return unsubscribe;
  }, [enabled]);

  const handleNotification = (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage | null,
  ) => {
    // console.log(JSON.stringify(remoteMessage, null, 2));

    if (!remoteMessage) {
      return;
    }

    if (remoteMessage.data?.productID) {
      navigation.navigate('Chat', {
        id: remoteMessage?.data?.crID,
      });
    }
    if (remoteMessage.data?.crID) {
      navigation.navigate('Chat', {
        id: remoteMessage?.data?.crID,
      });
    }
    if (remoteMessage.data?.sellOfferID) {
      navigation.navigate('OfferDetail', {
        detail: remoteMessage?.data?.sellOfferID,
      });
    }
    if (remoteMessage.data?.standardID) {
      navigation.navigate('StandardRFQDetail', {
        rfqID: remoteMessage?.data?.standardID,
      });
    }
    if (remoteMessage.data?.intID) {
      navigation.navigate('InternationalRFQDetail', {
        rfqID: remoteMessage?.data?.intID,
      });
    }
    if (remoteMessage.data?.domesticID) {
      navigation.navigate('DomesticRFQDetail', {
        rfqID: remoteMessage?.data?.domesticID,
      });
    }
    if (remoteMessage.data?.rffID) {
      navigation.navigate('QuotesRequestDetails', {
        rffID: remoteMessage?.data?.rffID,
      });
    }
  };

  const getDeviceToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const newToken = await messaging().getToken();
    setToken(newToken);
  };

  // console.log('Token:', token);

  return null;
};

export default PushNotifications;
