import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

const PushNotifications = () => {
  const navigation = useNavigation<any>();

  const [enabled, setEnabled] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    let unmounted = false;
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        setEnabled(true);
        await getDeviceToken();
      }
    }
    requestUserPermission();
    return () => {
      unmounted = true;
    };
  }, []);

  // useEffect(() => {
  //   if (!enabled) {
  //     return;
  //   }

  //   // handle notifications that are received while the application is in foreground state
  //   const unsubscribe = messaging().onMessage(handleNotification);

  //   // handle notifications that are opened the app from the background state
  //   messaging().onNotificationOpenedApp(handleNotification);

  //   // handle notifications that are opened the app from the Quit state
  //   messaging().getInitialNotification().then(handleNotification);

  //   return unsubscribe;
  // }, [enabled]);

  // const handleNotification = (
  //   remoteMessage?: FirebaseMessagingTypes.RemoteMessage,
  // ) => {
  //   console.log(JSON.stringify(remoteMessage, null, 2));

  //   if (!remoteMessage) {
  //     return;
  //   }

  //   if (remoteMessage.data?.postId) {
  //     navigation.navigate('Post', {id: remoteMessage?.data?.postId});
  //   }
  // };

  const getDeviceToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const newToken = await messaging().getToken();
    setToken(newToken);
  };

  console.log('Token:', token);

  return null;
};

export default PushNotifications;
