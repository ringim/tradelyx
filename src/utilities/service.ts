import {
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
  ToastAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Storage} from 'aws-amplify';
import DocumentPicker from 'react-native-document-picker';
import {v4 as uuidV4} from 'uuid';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

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

export const uploadMedia = async (uri: string) => {
  try {
    // get the Blob of the file from uri
    const response = await fetch(uri);
    const blob = await response?.blob();

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

export const uploadMedia3 = async (uri: string) => {
  try {
    // get the Blob of the file from uri
    const response = await fetch(uri);
    const blob = await response?.blob();

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

// SELECT FILE
export const selectFile = async (setSingleFile: any, setFileName: any) => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf, DocumentPicker.types.plainText],
      allowMultiSelection: true,
    });
    setSingleFile(res);
    setFileName(res);
  } catch (err) {
    setSingleFile(null);
    if (DocumentPicker.isCancel(err)) {
      return;
    } else {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Unknown Error: ' + JSON.stringify(err),
        autoClose: 1500,
      });
      throw err;
    }
  }
};

// UPLOAD VIA GALLERY
export const onChangePhoto = (setSelectedPhoto: any) => {
  launchImageLibrary(
    {mediaType: 'photo', quality: 0.5, selectionLimit: 1},
    ({didCancel, errorCode, assets}) => {
      if (!didCancel && !errorCode && assets && assets.length > 0) {
        setSelectedPhoto(assets[0]);
      }
    },
  );
};

// UPLOAD VIA CAMERA
export const onCameraPress = (setSelectedPhoto: any) => {
  launchCamera(
    {mediaType: 'photo', quality: 0.5},
    ({didCancel, errorCode, assets}) => {
      if (!didCancel && !errorCode && assets && assets.length > 0) {
        setSelectedPhoto(assets[0]);
      }
    },
  );
};

// UPLOAD FILE TO STORAGE
export const uploadFile = async (fileName: any, singleFile: any) => {
  try {
    // upload file (blob) to s3
    const s3Response = await Storage.put(fileName, singleFile);
    return s3Response.key;
  } catch (err) {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      textBody: (err as Error).message,
      autoClose: 2000,
    });
  }
};

export const uploadFile2 = async (singleFile: any) => {
  try {
    // get the Blob of the file from uri
    const response = await fetch(singleFile);
    const blob = await response?.blob();

    // file extension splitting
    const uriParts = singleFile.split('.');
    const extension = uriParts[uriParts.length - 1];

    // upload file (blob) to s3
    const s3Response = await Storage.put(`${uuidV4()}.${extension}`, blob);
    return s3Response.key;
  } catch (err) {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      textBody: (err as Error).message,
      autoClose: 2000,
    });
  }
};

// Delete a single image
export const deleteItem = (itemId: any, setSelectedPhotos?: any) => {
  setSelectedPhotos((prevData: any) =>
    prevData.filter((item: any) => item.uri !== itemId),
  );
};
