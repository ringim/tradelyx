import {
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
  ToastAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Storage} from 'aws-amplify';
import {v4 as uuidV4} from 'uuid';

import appConfig from '../../app.json';

const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert(
      `Location permission denied! Turn on Location Services to allow Tradely Drive to determine your location.`,
      '',
      [
        {text: 'Settings', onPress: openSetting},
        {text: 'Cancel', onPress: () => {}},
      ],
    );
  }

  if (status === 'disabled') {
    Alert.alert(
      `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
      '',
      [
        {text: 'Settings', onPress: openSetting},
        {text: 'Cancel', onPress: () => {}},
      ],
    );
  }

  return false;
};

export const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
};

const uriToBlob = (uri: string) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      // return the blob
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error('uriToBlob failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);

    xhr.send(null);
  });
};

export const uploadMedia = async (uri: string) => {
  try {
    // get the Blob of the file from uri
    const blob = await uriToBlob(uri);

    // file extension splitting
    const uriParts = uri.split('.');
    const extension = uriParts[uriParts.length - 1];

    // console.log(uri);

    // upload file (blob) to s3
    const s3Response = await Storage.put(`${uuidV4()}.${extension}`, blob);
    return s3Response.key;
  } catch (error) {
    Alert.alert('Error uploading the file', (error as Error).message);
  }
};
