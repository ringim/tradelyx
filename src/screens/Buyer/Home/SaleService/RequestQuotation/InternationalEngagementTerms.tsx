import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DocumentPicker from 'react-native-document-picker';
import {Controller, useForm} from 'react-hook-form';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import DropDownPicker from 'react-native-dropdown-picker';
import {useMutation} from '@apollo/client';
import {Storage} from 'aws-amplify';

import {
  FileSection,
  FormInput,
  Header,
  QuotationProgress,
  TextButton,
  UploadDocs,
  SellerLocationMapHeader,
} from '../../../../../components';
import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  icons,
  images,
} from '../../../../../constants';
import {HomeStackNavigatorParamList} from '../../../../../components/navigation/SellerNav/type/navigation';
import {
  UpdateRFQInput,
  UpdateRFQMutation,
  UpdateRFQMutationVariables,
} from '../../../../../API';
import {updateRFQ} from '../../../../../queries/RequestQueries';
import {useAuthContext} from '../../../../../context/AuthContext';

interface IProductQuotation {
  files: string;
}

const InternationalEngagementTerms = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<any>();

  const {userID} = useAuthContext();

  const mapRef = useRef(null);

  const {control, handleSubmit, setValue}: any = useForm();

  const [address, setAddress] = useState<any>('');
  const [address2, setAddress2] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const [singleFile, setSingleFile] = useState<any>(null);
  const [fileName, setFileName] = useState<any>('');

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [incoterms, setIncoterms] = useState('');
  const [incotermsType, setIncotermsType] = useState<any>(constants.incoterms2);

  // UPDATE REQUEST QUOTATION
  const [doUpdateRFQ] = useMutation<
    UpdateRFQMutation,
    UpdateRFQMutationVariables
  >(updateRFQ);

  const onSubmit = async ({files}: IProductQuotation) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: UpdateRFQInput = {
        id: route?.params.rfqID,
        placeOrigin: address?.description?.formatted_address,
        placeDestination: address2?.description?.formatted_address,
        incoterms,
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
      console.log('job data', input);
      navigation.navigate('InternationalPaymentQuotation', {rfqID: input.id});
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
      setAddress2(route.params?.userAddress2);
      setValue('address2', address2?.description?.formatted_address);
    }
    return () => {
      unmounted = true;
    };
  }, [
    route.params?.userAddress,
    setValue,
    address?.description?.formatted_address,
    route.params?.userAddress2,
    address2?.description?.formatted_address,
  ]);

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.margin,
        }}>
        {/* Incoterms */}
        <Controller
          control={control}
          name="incoterms"
          rules={{
            required: 'Incoterms is required',
          }}
          render={({field: {value, onChange}, fieldState: {error}}: any) => (
            <View style={{marginTop: SIZES.padding}}>
              <Text
                style={{
                  color: COLORS.Neutral1,
                  ...FONTS.body3,
                }}>
                Incoterms
              </Text>
              <DropDownPicker
                schema={{
                  label: 'type',
                  value: 'type',
                }}
                onChangeValue={onChange}
                open={open}
                showArrowIcon={true}
                placeholder="Select Incoterms"
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                value={value1}
                items={incotermsType}
                setOpen={setOpen}
                setValue={setValue1}
                setItems={setIncotermsType}
                style={{
                  borderRadius: SIZES.base,
                  height: 40,
                  marginTop: SIZES.base,
                  borderColor: COLORS.Neutral7,
                  borderWidth: 0.5,
                }}
                placeholderStyle={{color: COLORS.Neutral6, ...FONTS.body3}}
                textStyle={{color: COLORS.Neutral1}}
                closeIconStyle={{
                  width: 24,
                  height: 24,
                }}
                modalProps={{
                  animationType: 'fade',
                }}
                ArrowDownIconComponent={({style}) => (
                  <FastImage
                    source={icons.down}
                    style={{width: 15, height: 15}}
                  />
                )}
                modalContentContainerStyle={{
                  paddingHorizontal: SIZES.padding * 3,
                }}
                modalTitle="Choose Incoterms"
                modalTitleStyle={{
                  fontWeight: '600',
                }}
                onSelectItem={(value: any) => {
                  setIncoterms(value?.type);
                }}
              />
              {error && (
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Rose1,
                    top: 14,
                    left: 5,
                  }}>
                  This field is required.
                </Text>
              )}
            </View>
          )}
        />

        {/* port of loading */}
        <FormInput
          label="Port of Loading"
          name="address"
          control={control}
          editable={false}
          placeholder="Add Port Destination"
          rules={{
            required: 'Address is required',
          }}
          containerStyle={{marginTop: SIZES.padding}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.radius}}
          onPress={() => navigation.navigate('InternationalPortAddress')}
        />

        {/* Map location address */}
        <SellerLocationMapHeader
          mapContStyle={{marginTop: 0}}
          contentStyle={{
            marginHorizontal: 0,
            marginTop:
              address?.description?.formatted_address.length > 0
                ? SIZES.semi_margin
                : -10,
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

        {/* port of Destination */}
        <FormInput
          label="Destination Port"
          name="address2"
          control={control}
          editable={false}
          placeholder="Add Destination "
          rules={{
            required: 'Address is required',
          }}
          containerStyle={{marginTop: SIZES.padding * 1.3}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.radius}}
          onPress={() => navigation.navigate('InternationalDestinationAddress')}
        />

        {/* Map location address */}
        <SellerLocationMapHeader
          mapContStyle={{marginTop: 0}}
          contentStyle={{
            marginHorizontal: 0,
            marginTop:
              address2?.description?.formatted_address.length > 0
                ? SIZES.semi_margin
                : -10,
          }}>
          {address2?.location?.lat ? (
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
                latitude: address2?.location?.lat,
                longitude: address2?.location?.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}>
              <Marker
                ref={mapRef}
                coordinate={{
                  latitude: address2?.location?.lat,
                  longitude: address2?.location?.lng,
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
              marginBottom: 100
            }}>
            {singleFile != null ? (
              <FileSection
                file={fileName ? fileName : ''}
                onPress={() => setSingleFile(null)}
                containerStyle={{
                  marginHorizontal: SIZES.margin,
                  marginTop: SIZES.margin,
                }}
              />
            ) : (
              <UploadDocs
                selectFile={selectFile}
                containerStyle={{
                  marginTop: address2 ? SIZES.margin : SIZES.padding * 2,
                }}
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

export default InternationalEngagementTerms;
