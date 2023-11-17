import {
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
  ToastAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Storage} from 'aws-amplify';
import Geocoder from 'react-native-geocoding';
import DocumentPicker from 'react-native-document-picker';
import {v4 as uuidV4} from 'uuid';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Share from 'react-native-share';
import path from 'path';
import DocumentScanner from 'react-native-document-scanner-plugin';

import appConfig from '../../app.json';
import {GOOGLE_MAPS_APIKEY} from './Utils';

export const GEO = Geocoder.init(GOOGLE_MAPS_APIKEY, {language: 'en'});

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
    return;
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
    return;
  }
};

// SELECT FILE
export const selectFile = async (setSingleFile: any, singleFile: any) => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf, DocumentPicker.types.plainText],
      allowMultiSelection: false,
    });
    setSingleFile([...singleFile, ...res]);
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

export const selectFile2 = async (setSingleFile: any, singleFile: any) => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf, DocumentPicker.types.plainText],
      allowMultiSelection: true,
    });
    setSingleFile([...singleFile, ...res]);
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
    {mediaType: 'photo', quality: 0.4, selectionLimit: 1},
    ({didCancel, errorCode, assets}) => {
      if (!didCancel && !errorCode && assets && assets.length > 0) {
        setSelectedPhoto(assets[0]);
      }
    },
  );
};

export const openImageGallery = (
  setSelectedPhoto: any,
  setSelectedPhotos: any,
) => {
  launchImageLibrary(
    {mediaType: 'photo', selectionLimit: 7, quality: 0.4},
    ({didCancel, errorCode, assets}) => {
      if (!didCancel && !errorCode && assets && assets.length > 0) {
        if (assets.length === 1) {
          setSelectedPhoto(assets[0].uri);
        } else if (assets.length > 1) {
          assets.map(asset => asset.uri) as string[];
          setSelectedPhotos(assets);
        }
      }
    },
  );
};

// UPLOAD VIA CAMERA
export const onCameraPress = (setSelectedPhoto: any) => {
  launchCamera(
    {mediaType: 'photo', quality: 0.4},
    ({didCancel, errorCode, assets}) => {
      if (!didCancel && !errorCode && assets && assets.length > 0) {
        setSelectedPhoto(assets[0]);
      }
    },
  );
};

// UPLOAD FILE TO STORAGE
export const uploadFile = async (uri: string) => {
  try {
    const response = await fetch(uri);
    const blob = await response?.blob();

    // file extension splitting
    const uriParts = uri.split('.');
    const extension = uriParts[uriParts.length - 1];

    // upload file (blob) to s3
    const s3Response = await Storage.put(`${uuidV4()}.${extension}`, blob);
    return s3Response.key;
  } catch (err) {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      textBody: 'Error uploading file, try again!',
      autoClose: 2000,
    });
  }
};

const extractFileName = (filePath: any) => {
  const fileNameWithExtension = path.basename(filePath);
  return fileNameWithExtension;
};

export const uploadFile2 = async (singleFile: any) => {
  try {
    // get the Blob of the file from uri
    const response = await fetch(singleFile);
    const blob = await response?.blob();

    // file extension splitting
    // const uriParts = singleFile.split('.');
    // const extension = uriParts[uriParts.length - 1];
    const fileName = extractFileName(singleFile);

    // upload file (blob) to s3
    const s3Response = await Storage.put(fileName, blob);
    return s3Response.key;
  } catch (err) {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      textBody: 'Error uploading file, try again!',
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

export const getCountryFlag = async (
  locale1: any,
  locale2: any,
  setCountryCode: any,
  setCountryName: any,
  setCountryCity: any,
) => {
  Geocoder.from(locale1, locale2)
    .then(json => {
      const result = json.results[0];
      for (const component of result.address_components) {
        if (component.types.includes('country')) {
          const name = component.long_name; // Full country name
          const code = component.short_name?.toLowerCase(); // Country code (e.g., 'US' for the United States)
          setCountryCode(code);
          setCountryName(name);
        }
        if (component.types.includes('locality')) {
          const city = component.long_name;
          setCountryCity(city);
          // console.log(`City: ${city}`);
        }
      }
    })
    .catch(error => console.error(error));
};

export const shareOptions: any = {
  title: 'Share via',
  message: 'some message',
  url: 'some share url',
  // social: Share.Social.WHATSAPP,
  // attributionURL: 'http://deep-link-to-app', //in beta
};

// SCAN RECEIPT FUNCTION
export const onScanPress = async (setScannedImage: any) => {
  if (
    Platform.OS === 'android' &&
    (await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    )) !== PermissionsAndroid.RESULTS.GRANTED
  ) {
    Alert.alert(
      'Error',
      'User must grant camera permissions to use document scanner.',
    );
    return;
  }

  const {scannedImages}: any | [] = await DocumentScanner.scanDocument({
    croppedImageQuality: 40,
    maxNumDocuments: 10,
  });
  if (scannedImages.length > 0) {
    setScannedImage(scannedImages[0]);
  } else {
    Toast.show({
      type: ALERT_TYPE.WARNING,
      textBody: 'Unable to scan document',
      autoClose: 1500,
    });
  }
};
