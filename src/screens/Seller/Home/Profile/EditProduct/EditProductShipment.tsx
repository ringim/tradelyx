import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {useMutation, useQuery} from '@apollo/client';
import {Controller, useForm} from 'react-hook-form';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import FastImage from 'react-native-fast-image';
import DropDownPicker from 'react-native-dropdown-picker';
import {Root, ALERT_TYPE, Toast} from 'react-native-alert-notification';

import {
  COLORS,
  SIZES,
  FONTS,
  images,
  icons,
  constants,
} from '../../../../../constants';
import {
  ExpiryDate,
  FormInput,
  Header,
  SellerLocationMapHeader,
  TextButton,
} from '../../../../../components';
import {
  EditProductShipmentRouteProp,
  ProfileStackNavigatorParamList,
} from '../../../../../components/navigation/SellerNav/type/navigation';
import {getProduct, updateProduct} from '../../../../../queries/ProductQueries';
import {
  UpdateProductMutation,
  UpdateProductMutationVariables,
  GetProductQuery,
  GetProductQueryVariables,
  UpdateProductInput,
} from '../../../../../API';

const EditProductShipment = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const routePrice = useRoute<EditProductShipmentRouteProp>();

  const route = useRoute<any>();
  const {id}: any = routePrice?.params?.product;

  const mapRef = useRef(null);
  const {control, handleSubmit, setValue}: any = useForm();

  // GET Product DETAIL
  const {loading: onLoad, data} = useQuery<
    GetProductQuery,
    GetProductQueryVariables
  >(getProduct, {
    variables: {id: id},
  });
  const productDetails: any = data?.getProduct;

  const [address, setAddress] = useState<any>('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<any>('');
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [tpMode, setTpMode] = useState(productDetails?.transportMode);
  const [tpModeType, setTpModeType] = useState<any>(constants.freight);

  function isSubmit() {
    return date !== '';
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    const selectedDate = dayjs(date).format('YYYY-MM-DD');
    setDate(selectedDate);
    hideDatePicker();
  };

  // UPDATE USER DETAILS
  const [doUpdateProduct] = useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(updateProduct);

  const onSubmit = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: UpdateProductInput = {
        id: id,
        placeOrigin: address?.description?.formatted_address,
        transportMode: tpMode,
        dateAvailable: date,
      };
      await doUpdateProduct({
        variables: {
          input,
        },
      });
      // console.log('product updated 10', input);
      navigation.reset({
        index: 0,
        routes: [{name: 'SuccessService2'}],
      });
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: (error as Error).message,
        textBody: 'Please complete all fields',
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isCurrent = true;
    if (productDetails && isCurrent) {
      setValue('transportMode', productDetails?.transportMode);
      setValue('address', productDetails?.placeOrigin);
    }
    return () => {
      isCurrent = false;
    };
  }, [productDetails, setValue]);

  useEffect(() => {
    let unmounted = true;
    if (route.params?.userAddress) {
      setAddress(route.params?.userAddress);
      setValue('address', address?.description?.formatted_address);
    }
    return () => {
      unmounted = false;
    };
  }, [
    setValue,
    route.params?.userAddress,
    address?.description?.formatted_address,
  ]);

  if (onLoad) {
    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center'}}
        size={'large'}
        color={COLORS.primary6}
      />
    );
  }

  function renderFormSection() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.margin,
        }}>
        {/* port of loading */}
        <FormInput
          label="Place of Origin"
          name="address"
          control={control}
          editable={false}
          placeholder="Add Place Origin"
          rules={{
            required: 'Place origin is required',
          }}
          containerStyle={{marginTop: SIZES.padding}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.radius}}
          onPress={() => navigation.navigate('EditProductShipmentAddress')}
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

        {/* transport mode */}
        <Controller
          control={control}
          name="transportMode"
          rules={{
            required: 'Transport Mode is required',
          }}
          render={({field: {value, onChange}, fieldState: {error}}: any) => (
            <View style={{marginTop: SIZES.padding * 1.5}}>
              <Text
                style={{
                  color: COLORS.Neutral1,
                  ...FONTS.body3,
                }}>
                Transport Mode
              </Text>
              <DropDownPicker
                schema={{
                  label: 'type',
                  value: 'type',
                }}
                onChangeValue={onChange}
                open={open}
                showArrowIcon={true}
                placeholder="Select Transport Mode"
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                value={value1 || value}
                items={tpModeType}
                setOpen={setOpen}
                setValue={setValue1}
                setItems={setTpModeType}
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
                modalTitle="Choose Transport Mode"
                modalTitleStyle={{
                  fontWeight: '600',
                }}
                onSelectItem={(value: any) => {
                  setTpMode(value?.type);
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

        {/* select date */}
        <ExpiryDate
          date={date}
          onPress={showDatePicker}
          title={'Date Available'}
          containerStyle={{marginTop: SIZES.padding, marginBottom: 50}}
        />
      </View>
    );
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header
          title={'Edit Product'}
          nav={true}
          onPress={() => navigation.goBack()}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <Spinner
          visible={loading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          extraHeight={150}
          extraScrollHeight={150}
          bounces={false}
          enableOnAndroid={true}>
          <View
            style={{
              marginHorizontal: SIZES.margin,
            }}>
            <Text style={{...FONTS.h4, color: COLORS.black}}>
              Update all fields
            </Text>
          </View>

          {renderFormSection()}
          <TextButton
            disabled={isSubmit() ? false : true}
            label={loading ? 'Loading...' : 'Continue'}
            buttonContainerStyle={{
              alignSelf: 'center',
              marginTop: SIZES.padding,
              backgroundColor: isSubmit() ? COLORS.primary1 : COLORS.Neutral7,
            }}
            onPress={handleSubmit(onSubmit)}
          />
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};

export default EditProductShipment;
