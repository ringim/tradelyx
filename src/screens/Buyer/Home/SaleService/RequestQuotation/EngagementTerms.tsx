import {StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm} from 'react-hook-form';
import {useMutation} from '@apollo/client';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-loading-spinner-overlay';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

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
import {updateRFQ} from '../../../../../queries/RFQQueries';
import {
  getCountryFlag,
  selectFile2,
  uploadFile2,
} from '../../../../../utilities/service';

interface IProductQuotation {
  landmark: string;
  files: any;
  address: string;
}

const EngagementTerms = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<any>();
  const mapRef = useRef(null);

  const {control, handleSubmit, setValue}: any = useForm();

  const [address, setAddress] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const [singleFile, setSingleFile] = useState<any>([]);
  const [code, setCode] = useState<any>('');
  const [cName, setCName] = useState<any>('');
  const [cCity, setCCity] = useState<any>('');

  const {location} = address;

  useEffect(() => {
    let isCurrent = true;
    isCurrent &&
      getCountryFlag(location?.lat, location?.lng, setCode, setCName, setCCity);
    return () => {
      isCurrent = false;
    };
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
        placeOriginFlag: `https://flagcdn.com/32x24/${code}.png`, //flag
        placeOriginCountry: cName, //country
        placeOrigin: address?.description?.formatted_address,
        placeOriginName: cCity,
        landmark,
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
      // console.log('job data', input);
      navigation.navigate('PaymentQuotation', {rfqID: input.id});
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
    return address !== '';
  }

  useEffect(() => {
    if (route.params?.userAddress) {
      setAddress(route.params?.userAddress);
      setValue('address', address?.description?.formatted_address);
    }
  }, [
    route.params?.userAddress,
    setValue,
    address?.description?.formatted_address,
  ]);

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.margin,
          marginBottom: 100,
        }}>
        {/* delivery address */}
        <FormInput
          label="Delivery Location"
          name="address"
          control={control}
          // editable={false}
          placeholder="Add delivery location"
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
          rules={{
            required: 'landmark is required',
          }}
          placeholder="Enter a Landmark"
          containerStyle={{marginTop: address ? 8 : 30}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{
            marginTop: SIZES.radius,
            height: 100,
            padding: SIZES.base,
          }}
        />

        {/* upload docs */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginTop: SIZES.base,
          }}>
          {singleFile?.length >= 1 ? (
            <FileSection
              title="Product Brochures"
              file={singleFile}
              setSingleFile={setSingleFile}
            />
          ) : (
            <UploadDocs
              title="Attach Supporting Document"
              selectFile={() => selectFile2(setSingleFile, singleFile)}
              containerStyle={{marginHorizontal: 10}}
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

export default EngagementTerms;
