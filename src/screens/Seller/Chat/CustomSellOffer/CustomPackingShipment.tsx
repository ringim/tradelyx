import {View, Text, StyleSheet, Platform} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import DropDownPicker from 'react-native-dropdown-picker';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';
import {useMutation} from '@apollo/client';

import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  icons,
  images,
} from '../../../../constants';
import {ChatStackNavigatorParamList} from '../../../../components/navigation/SellerNav/type/navigation';
import {
  FormInput,
  Header,
  QuotationProgress2,
  SellerLocationMapHeader,
  TextButton,
} from '../../../../components';
import {
  UpdateSellOfferInput,
  UpdateSellOfferMutation,
  UpdateSellOfferMutationVariables,
} from '../../../../API';
import {updateSellOffer} from '../../../../queries/SellOfferQueries';

interface ISellOffer {
  detail: string;
  landmark: string;
}

const CustomPackingShipment = () => {
  const navigation = useNavigation<ChatStackNavigatorParamList>();
  const route = useRoute<any>();
  const {control, setValue, handleSubmit}: any = useForm();

  const mapRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [address1, setAddress1] = useState<any>('');
  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState('');
  const [jobType, setJobType] = useState<any>(constants.packageType);

  // UPDATE REQUEST QUOTATION
  const [doCreateSellOffer] = useMutation<
    UpdateSellOfferMutation,
    UpdateSellOfferMutationVariables
  >(updateSellOffer);

  const onSubmit = async ({landmark, detail}: ISellOffer) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: UpdateSellOfferInput = {
        id: route?.params.sellOfferID,
        packageDesc: detail,
        packageType: type,
        placeOrigin: address1?.description?.formatted_address,
        landmark,
      };

      await doCreateSellOffer({
        variables: {
          input,
        },
      });
      // console.log('job data', input);
      navigation.navigate('CustomMiniumOrderPayment', {
        sellOfferID: input.id,
        crID: route?.params?.crID,
      });
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

  useEffect(() => {
    let unmounted = true;
    if (route.params?.userAddress) {
      setAddress1(route.params?.userAddress);
      setValue('address1', address1?.description?.formatted_address);
    }
    return () => {
      unmounted = false;
    };
  }, [
    route.params?.userAddress,
    setValue,
    address1?.description?.formatted_address,
  ]);

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.semi_margin,
          marginBottom: 100,
        }}>
        {/* Package type */}
        <Controller
          control={control}
          name="packageType"
          rules={{
            required: 'Package type is required',
          }}
          render={({field: {value, onChange}, fieldState: {error}}: any) => (
            <>
              <Text
                style={{
                  marginTop: SIZES.margin,
                  color: COLORS.Neutral1,
                  ...FONTS.body3,
                  fontWeight: '500',
                }}>
                Package Type:
              </Text>
              <DropDownPicker
                schema={{
                  label: 'type',
                  value: 'type',
                  icon: 'icon',
                }}
                onChangeValue={onChange}
                open={open}
                showArrowIcon={true}
                placeholder="Select Package Type"
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                value={value1}
                items={jobType}
                setOpen={setOpen}
                setValue={setValue1}
                setItems={setJobType}
                style={{
                  borderRadius: SIZES.base,
                  height: 40,
                  marginTop: SIZES.radius,
                  borderColor: COLORS.Neutral7,
                  borderWidth: 0.5,
                  ...FONTS.body2,
                }}
                placeholderStyle={{color: COLORS.Neutral6, ...FONTS.body3}}
                textStyle={{color: COLORS.Neutral1}}
                closeIconStyle={{
                  width: 25,
                  height: 25,
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
                modalTitle="Select"
                modalTitleStyle={{
                  fontWeight: '600',
                }}
                onSelectItem={(value: any) => {
                  setType(value?.type);
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
            </>
          )}
        />
        {/* Packaging Detail */}
        <FormInput
          label="Packaging Description"
          name="detail"
          control={control}
          multiline={true}
          placeholder="Add description of the package"
          rules={{
            required: 'Packaging Detail is required',
          }}
          containerStyle={{marginTop: SIZES.padding}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{
            marginTop: SIZES.radius,
            height: 140,
            padding: SIZES.base,
          }}
        />

        {/* Delivery address */}
        <FormInput
          label="Place of Origin"
          name="address1"
          control={control}
          // editable={false}
          placeholder="e.g. Ringim, Jigawa State"
          rules={{
            required: 'Destination is required',
          }}
          containerStyle={{marginTop: SIZES.semi_margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.base}}
          onPress={() => navigation.navigate('CustomPackageShipmentAddress')}
        />
        {/* Map location address */}
        <SellerLocationMapHeader
          mapContStyle={{marginTop: 0}}
          contentStyle={{
            marginHorizontal: 0,
            marginTop: address1 ? SIZES.margin : 0,
            marginBottom: SIZES.padding * 2,
          }}>
          {address1?.location?.lat ? (
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
                latitude: address1?.location?.lat,
                longitude: address1?.location?.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}>
              <Marker
                ref={mapRef}
                coordinate={{
                  latitude: address1?.location?.lat,
                  longitude: address1?.location?.lng,
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
              style={{width: 330, height: 150, alignSelf: 'center'}}
            />
          )}
        </SellerLocationMapHeader>

        {/* Landmark */}
        <FormInput
          label="Landmark"
          name="landmark"
          control={control}
          placeholder="Enter a landmark or full address"
          rules={{
            required: 'Landmark is required',
          }}
          containerStyle={{
            marginTop: address1 ? -SIZES.padding * 1.3 : SIZES.padding,
          }}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
        />
      </View>
    );
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header
          title={'Create Custom Sell Offer'}
          contentStyle={{marginBottom: 0}}
          tintColor={COLORS.Neutral1}
        />
        <Spinner
          visible={loading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <QuotationProgress2
          bgColor1={COLORS.primary1}
          bgColor2={COLORS.primary1}
          bgColor3={COLORS.white}
          color1={COLORS.primary1}
          color2={COLORS.primary1}
          color3={COLORS.Neutral6}
          item2={COLORS.white}
          item3={COLORS.Neutral6}
          type={'Packaging'}
          type2={'Payment'}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={150}
          bounces={false}
          extraScrollHeight={150}
          enableOnAndroid={true}>
          <View style={{margin: SIZES.semi_margin}}>
            <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>
              Packaging and Shipment
            </Text>
          </View>

          {requestForm()}
        </KeyboardAwareScrollView>

        <View
          style={{
            justifyContent: 'flex-end',
            top: Platform.OS === 'android' ? 10 : 0,
          }}>
          <TextButton
            buttonContainerStyle={{marginBottom: SIZES.padding, marginTop: 0}}
            label="Continue"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </Root>
  );
};

export default CustomPackingShipment;
