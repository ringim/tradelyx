import {StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DocumentPicker from 'react-native-document-picker';
import {useForm} from 'react-hook-form';
import {useMutation} from '@apollo/client';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import Geocoder from 'react-native-geocoding';
import {Storage} from 'aws-amplify';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

import {
  FileSection,
  FormInput,
  Header,
  QuotationProgress,
  TextButton,
  UploadDocs,
  SellerLocationMapHeader,
} from '../../../../../components';
import {COLORS, FONTS, SIZES, icons, images} from '../../../../../constants';
import {HomeStackNavigatorParamList} from '../../../../../components/navigation/SellerNav/type/navigation';
import {
  UpdateRFQInput,
  UpdateRFQMutation,
  UpdateRFQMutationVariables,
} from '../../../../../API';
import {updateRFQ} from '../../../../../queries/RequestQueries';
import {useAuthContext} from '../../../../../context/AuthContext';

interface IProductQuotation {
  landmark: string;
  files: string;
  address: string;
}

const EngagementTerms = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<any>();
  const mapRef = useRef(null);

  const {userID} = useAuthContext();

  const {control, handleSubmit, setValue}: any = useForm();

  const [address, setAddress] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const [singleFile, setSingleFile] = useState<any>(null);
  const [fileName, setFileName] = useState<any>('');
  const [countryCode, setCountryCode] = useState<any>('');
  const [countryName, setCountryName] = useState<any>('');
  const [countryCity, setCountryCity] = useState<any>('');

  const {location} = address;

  useEffect(() => {
    const getCountryFlag = async () => {
      Geocoder.from(location?.lat, location?.lng)
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
            }
          }
        })
        .catch(error => console.error(error));
    };
    getCountryFlag();
  }, [address]);

  // console.log(address);

  // UPDATE REQUEST QUOTATION
  const [doUpdateRFQ] = useMutation<
    UpdateRFQMutation,
    UpdateRFQMutationVariables
  >(updateRFQ);

  const onSubmit = async ({landmark, files}: IProductQuotation) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: UpdateRFQInput = {
        id: route?.params.rfqID,
        placeOriginFlag: `https://flagcdn.com/32x24/${countryCode}.png`, //flag
        city: countryCity, //city
        placeOriginName: countryName, //country
        countryName: countryName, //country
        placeOrigin: address?.description?.formatted_address,
        landmark,
        documents: files,
        userID,
      };

      if (singleFile && fileName) {
        input.documents = await uploadFile();
      }

      await doUpdateRFQ({
        variables: {
          input,
        },
      });
      // console.log('job data', input);
      navigation.navigate('PaymentQuotation', {rfqID: input.id});
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: (error as Error).message,
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  // SELECT FILE
  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.plainText],
        allowMultiSelection: false,
      });
      setSingleFile(res.uri);
      setFileName(res.name);
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

  useEffect(() => {
    let unmounted = false;
    if (route.params?.userAddress) {
      setAddress(route.params?.userAddress);
      setValue('address', address?.description?.formatted_address);
    }
    return () => {
      unmounted = true;
    };
  }, [
    route.params?.userAddress,
    setValue,
    address?.description?.formatted_address,
  ]);

  // UPLOAD FILE TO STORAGE
  const uploadFile = async () => {
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

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.margin,
        }}>
        {/* delivery address */}
        <FormInput
          label="Delivery Location"
          name="address"
          control={control}
          editable={false}
          placeholder="Add origin"
          rules={{
            required: 'Address is required',
          }}
          containerStyle={{marginTop: SIZES.padding}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.radius}}
          onPress={() => navigation.navigate('EngagementTermsAddress')}
        />

        {/* Map location address */}
        <SellerLocationMapHeader
          mapContStyle={{marginTop: address ? 20 : -5}}
          contentStyle={{
            marginHorizontal: 0,
            marginTop: 0,
          }}>
          {address?.location?.lat ? (
            <MapView
              provider={PROVIDER_GOOGLE}
              ref={mapRef}
              style={[
                {
                  borderRadius: SIZES.semi_margin,
                  ...StyleSheet.absoluteFillObject,
                },
              ]}
              scrollEnabled={false}
              initialRegion={{
                latitude: address?.location?.lat,
                longitude: address?.location?.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}>
              <Marker
                ref={mapRef}
                coordinate={{
                  latitude: address?.location?.lat,
                  longitude: address?.location?.lng,
                }}
                anchor={{x: 0.84, y: 1}}>
                <FastImage
                  source={icons.marker}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: 30, height: 30}}
                />
              </Marker>
            </MapView>
          ) : (
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              source={images.dummyMap}
              style={{width: 350, height: 120, alignSelf: 'center'}}
            />
          )}
        </SellerLocationMapHeader>

        {/* Landmark */}
        <FormInput
          label="Landmark"
          name="landmark"
          control={control}
          multiline={true}
          placeholder="Enter a Landmark or full address"
          containerStyle={{marginTop: address ? 8 : 30}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{
            marginTop: SIZES.radius,
            height: 120,
            padding: SIZES.base,
          }}
        />
      </View>
    );
  }

  return (
    <AlertNotificationRoot>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'Request Quotation'} />

        <Spinner
          visible={loading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <QuotationProgress
          bgColor1={COLORS.primary1}
          bgColor2={COLORS.primary1}
          bgColor3={COLORS.primary1}
          bgColor4={COLORS.white}
          color1={COLORS.primary1}
          color2={COLORS.primary1}
          color3={COLORS.primary1}
          item2={COLORS.white}
          item3={COLORS.white}
          item4={COLORS.Neutral6}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          {requestForm()}

          {/* upload docs */}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginHorizontal: SIZES.radius,
            }}>
            {singleFile != null ? (
              <FileSection
                file={fileName ? fileName : ''}
                onPress={() => setSingleFile(null)}
                containerStyle={{
                  marginTop: SIZES.radius,
                  marginHorizontal: SIZES.base,
                }}
              />
            ) : (
              <UploadDocs
                title="Attach Supporting Document"
                selectFile={selectFile}
                containerStyle={{marginHorizontal: 10}}
              />
            )}
          </View>
        </KeyboardAwareScrollView>

        <View style={{justifyContent: 'flex-end'}}>
          <TextButton
            buttonContainerStyle={{
              marginBottom: SIZES.padding,
              marginTop: 0,
            }}
            label="Continue"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default EngagementTerms;
