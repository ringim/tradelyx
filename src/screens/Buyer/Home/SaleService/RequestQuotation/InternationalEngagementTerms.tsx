import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Controller, useForm} from 'react-hook-form';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-loading-spinner-overlay';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import DropDownPicker from 'react-native-dropdown-picker';
import {useMutation} from '@apollo/client';

import {
  FileSection,
  FormInput,
  Header,
  QuotationProgress,
  TextButton,
  UploadDocs,
  SellerLocationMapHeader,
  QuoteType,
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
import {updateRFQ} from '../../../../../queries/RFQQueries';
import {
  getCountryFlag,
  selectFile2,
  uploadFile2,
} from '../../../../../utilities/service';
import {useAuthContext} from '../../../../../context/AuthContext';

interface IProductQuotation {
  files: any;
}

const InternationalEngagementTerms = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<any>();

  const mapRef = useRef(null);

  const {control, handleSubmit, setValue}: any = useForm();

  const [address, setAddress] = useState<any>('');
  const [address2, setAddress2] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const [singleFile, setSingleFile] = useState<any>([]);
  const [code, setCode] = useState<any>('');
  const [cName, setCName] = useState<any>('');
  const [cCity, setCCity] = useState<any>('');
  const [code2, setCode2] = useState<any>('');
  const [cName2, setCName2] = useState<any>('');
  const [cCity2, setCCity2] = useState<any>('');

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [incoterms, setIncoterms] = useState('');
  const [incotermsType, setIncotermsType] = useState<any>(constants.incoterms2);

  const {location} = address;

  useEffect(() => {
    getCountryFlag(location?.lat, location?.lng, setCode, setCName, setCCity);
  }, [address]);

  useEffect(() => {
    getCountryFlag(
      address2?.location?.lat,
      address2?.location?.lng,
      setCode2,
      setCName2,
      setCCity2,
    );
  }, [address2]);

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
        placeOriginFlag: `https://flagcdn.com/32x24/${code}.png`, //flag
        placeOriginName: cCity, //country
        placeOriginCountry: cName, //country
        placeDestination: address2?.description?.formatted_address,
        placeDestinationName: cCity2, //city destination
        destinationCountry: cName2, //country
        placeDestinationFlag: `https://flagcdn.com/32x24/${code2}.png`,
        incoterms,
        documents: files,
      };

      if (singleFile) {
        const fileKeys = await Promise.all(
          singleFile.map((singleFile: any) => uploadFile2(singleFile?.uri)),
        );
        input.documents = fileKeys;
      }

      await doUpdateRFQ({
        variables: {
          input,
        },
      });
      navigation.navigate('InternationalPaymentQuotation', {rfqID: input.id});
      setSingleFile([]);
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

  function isSubmit() {
    return address2 !== '' && singleFile !== null;
  }

  useEffect(() => {
    if (route.params?.userAddress) {
      setAddress(route.params?.userAddress);
      setValue('address', address?.description?.formatted_address);
    }
  }, [
    setValue,
    route.params?.userAddress,
    address?.description?.formatted_address,
  ]);

  useEffect(() => {
    if (route.params?.userAddress2) {
      setAddress2(route.params?.userAddress2);
      setValue('address2', address2?.description?.formatted_address);
    }
  }, [
    setValue,
    route.params?.userAddress2,
    address2?.description?.formatted_address,
  ]);

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.margin,
          marginBottom: 100,
        }}>
        {/* Incoterms */}
        <Controller
          control={control}
          name="incoterms"
          rules={{
            required: 'Incoterms is required',
          }}
          render={({field: {onChange}, fieldState: {error}}: any) => (
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
                    ...FONTS.cap1,
                    color: COLORS.Rose4,
                    top: 14,
                    left: 5,
                    marginBottom: 2,
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
          // editable={false}
          placeholder="Port of Origin address"
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
          // editable={false}
          placeholder="Destination port address"
          rules={{
            required: 'Destination is required',
          }}
          containerStyle={{
            marginTop: address ? SIZES.radius : SIZES.padding * 1.3,
          }}
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

        {/* upload docs */}
        <View
          style={{
            flex: 1,
            marginTop: address2 ? 0 : SIZES.margin,
            justifyContent: 'center',
          }}>
          {singleFile?.length >= 1 ? (
            <FileSection
              file={singleFile}
              title="Product Brochures"
              setSingleFile={setSingleFile}
              contentStyle={{marginHorizontal: 5}}
            />
          ) : (
            <UploadDocs
              title={'Attach Product Brochure'}
              selectFile={() => selectFile2(setSingleFile, singleFile)}
              containerStyle={{
                marginTop: SIZES.semi_margin,
                marginHorizontal: 3,
              }}
            />
          )}
        </View>
      </View>
    );
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'Request for Quotation'} />

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
          bounces={false}
          enableOnAndroid={true}>
          <QuoteType
            image={images?.international}
            quoteType={'International'}
            subQuoteType={'Serving International delivery'}
            info="RFQ Information"
          />
          {requestForm()}
        </KeyboardAwareScrollView>

        <View style={{justifyContent: 'flex-end'}}>
          <TextButton
            disabled={isSubmit() ? false : true}
            buttonContainerStyle={{
              marginBottom: SIZES.padding,
              marginTop: 0,
              backgroundColor: isSubmit() ? COLORS.primary1 : COLORS.Neutral7,
            }}
            label="Continue"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </Root>
  );
};

export default InternationalEngagementTerms;
