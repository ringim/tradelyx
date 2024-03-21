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
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

import appConfig from '../../app.json';
import {GOOGLE_MAPS_API_KEY} from './Utils';
import axios from 'axios';

export const GEO = Geocoder.init(GOOGLE_MAPS_API_KEY, {language: 'en'});

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

export async function hasAndroidPermission() {
  const getCheckPermissionPromise = () => {
    if (Platform.Version >= 33) {
      return Promise.all([
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        ),
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ),
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission,
      );
    } else {
      return PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
  };

  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return true;
  }
  const getRequestPermissionPromise = () => {
    if (Platform.Version >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        statuses =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  return await getRequestPermissionPromise();
}

export const uploadMedia = async (uri: string) => {
  try {
    // get the Blob of the file from uri
    const response = await fetch(uri);
    const blob = await response?.blob();

    // file extension splitting
    const uriParts = uri.split('.');
    const extension = uriParts[uriParts.length - 1];

    // console.log('uri', uri);

    // upload file (blob) to s3
    const s3Response = await Storage.put(`${uuidV4()}.${extension}`, blob);
    return s3Response.key;
  } catch (error) {
    return;
  }
};

export const uriToBlob = (uri: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // If successful -> return with blob
    xhr.onload = function () {
      resolve(xhr.response);
    };

    // reject on error
    xhr.onerror = function () {
      reject(new Error('uriToBlob failed'));
    };

    // Set the response type to 'blob' - this means the server's response
    // will be accessed as a binary object
    xhr.responseType = 'blob';

    // Initialize the request. The third argument set to 'true' denotes
    // that the request is asynchronous
    xhr.open('GET', uri, true);

    // Send the request. The 'null' argument means that no body content is given for the request
    xhr.send(null);
  });
};

export const uploadFile2 = async (uri: string) => {
  try {
    const response = await uriToBlob(uri);
    const fileName = extractFileName(uri);
    const res = await Storage.put(fileName, response, {
      contentType: 'application/pdf', // contentType is optional
    });
    return res?.key;
  } catch (error) {
    return;
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

export const extractFileName = (filePath: any) => {
  const fileNameWithExtension = path.basename(filePath);
  return fileNameWithExtension;
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
    .catch(error => {
      return error;
    });
};

export const shareOptions: any = {
  title: 'Share via',
  message: 'some message',
  url: 'some share url',
  // social: Share.Social.WHATSAPP,
  // attributionURL: 'http://deep-link-to-app', //in beta
};

// DOWNLOAD & OPEN PDF FILE
export const downloadAndOpenPdf = async (item: any) => {
  try {
    const pdfKey = item; // Replace with your S3 PDF file key
    const url = await Storage.get(pdfKey);

    // Open the PDF file using the device's default viewer
    Linking.openURL(url);
  } catch (error) {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      textBody: 'Error downloading PDF!',
      autoClose: 2000,
    });
  }
};

export const saveImageToCameraRoll = async ({imageUri}: any) => {
  if (imageUri) {
    try {
      const saveResult = await CameraRoll.saveToCameraRoll(imageUri, 'photo');
      if (saveResult) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          textBody: 'Image saved to camera roll',
          autoClose: 1500,
        });
      } else {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          textBody: 'Image save failed.',
          autoClose: 1500,
        });
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        textBody: 'Error saving image to camera roll',
        autoClose: 1500,
      });
    }
  }
};

export function areArraysSimilar(
  arr1: any[],
  arr2: any[],
  compareFunction: any,
) {
  return arr1.every((obj1: any) =>
    arr2.some((obj2: any) => compareFunction(obj1, obj2)),
  );
}

export const formatNumericValue = (input: any, amount: any) => {
  // Remove non-numeric characters except for decimal point
  const cleanedValue = input?.replace(/[^0-9.]/g, '');

  // Allow only one decimal point
  const decimalCount = cleanedValue?.split('.')?.length - 1;
  if (decimalCount > 1) {
    return amount;
  }

  // Add commas for thousands separator
  const parts = cleanedValue?.split('.');
  parts[0] = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts?.join('.');
};

export const formatNumberWithCommas = (numberText: any) => {
  const numericValue = parseFloat(numberText?.replace(/,/g, ''));

  if (!isNaN(numericValue)) {
    const numberWithCommas = numericValue.toLocaleString();
    return numberWithCommas;
  } else {
    return 'Invalid number';
  }
};
