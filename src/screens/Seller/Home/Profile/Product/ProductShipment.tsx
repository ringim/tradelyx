import {StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm} from 'react-hook-form';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {v4 as uuidV4} from 'uuid';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-loading-spinner-overlay';
import dayjs from 'dayjs';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {useMutation, useQuery} from '@apollo/client';

import {
  FormInput,
  Header,
  QuotationProgress1,
  TextButton,
  SellerLocationMapHeader,
  ExpiryDate,
  LoadingIndicator,
} from '../../../../../components';
import {
  UpdateProductInput,
  UpdateProductMutation,
  UpdateProductMutationVariables,
  CreateNotificationMutation,
  CreateNotificationMutationVariables,
  GetProductQuery,
  GetProductQueryVariables,
  CreateNotificationInput,
  NotificationType,
  GetUserQuery,
  GetUserQueryVariables,
} from '../../../../../API';
import {getProduct, updateProduct} from '../../../../../queries/ProductQueries';
import {COLORS, FONTS, images, SIZES, icons} from '../../../../../constants';
import {createNotification} from '../../../../../queries/NotificationQueries';
import {useAuthContext} from '../../../../../context/AuthContext';
import {getUser} from '../../../../../queries/UserQueries';

const InternationalEngagementTerms = () => {
  const {userID} = useAuthContext();

  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const mapRef = useRef(null);

  const {control, handleSubmit, setValue}: any = useForm();

  const [address, setAddress] = useState<any>('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<any>('');
  const [loading, setLoading] = useState(false);

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

  // GET USER
  const {data: newData, loading: newLoad} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {
    variables: {
      id: userID,
    },
  });
  const userInfo: any = newData?.getUser?.title;

  // GET PRODUCT DETAIL
  const {data, loading: onLoad} = useQuery<
    GetProductQuery,
    GetProductQueryVariables
  >(getProduct, {variables: {id: route?.params.productID}});
  const ProductDetail = data?.getProduct?.title;

  // UPDATE REQUEST QUOTATION
  const [doUpdateProduct] = useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(updateProduct);

  const onSubmit = async ({landmark}: any) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: UpdateProductInput = {
        id: route?.params.productID,
        SType: 'JOB',
        placeOrigin: address?.description?.formatted_address,
        landmark,
        dateAvailable: date,
      };
      await doUpdateProduct({
        variables: {
          input,
        },
      });
      // console.log('product shipment', input);
      await createNotify();
      navigation.reset({
        index: 0,
        routes: [{name: 'SuccessService2'}],
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

  // CREATE AIR RFF NOTIFICATION
  const [doCreateNotification] = useMutation<
    CreateNotificationMutation,
    CreateNotificationMutationVariables
  >(createNotification);
  const createNotify = async () => {
    try {
      const input: CreateNotificationInput = {
        id: uuidV4(),
        readAt: 0,
        actorID: userID,
        requestType: 'Product',
        type: NotificationType?.PRODUCT,
        SType: 'NOTIFICATION',
        notificationProductId: route?.params.productID,
        title: 'New Product posted',
        description: `${userInfo} posted a new item - ${ProductDetail}`,
      };
      const res = await doCreateNotification({
        variables: {
          input,
        },
      });
      // console.log('notification created', res);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: (error as Error).message,
        autoClose: 1500,
      });
    }
  };

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

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.margin,
          marginBottom: 100,
        }}>
        {/* port of loading */}
        <FormInput
          label="Place of Origin"
          name="address"
          control={control}
          // editable={false}
          placeholder="Add Place Origin"
          rules={{
            required: 'Place origin is required',
          }}
          containerStyle={{marginTop: SIZES.padding}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.radius}}
          onPress={() => navigation.navigate('ProductShipmentAddress')}
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
              style={{width: 350, height: 150, alignSelf: 'center'}}
            />
          )}
        </SellerLocationMapHeader>

        <FormInput
          label="Landmark"
          name="landmark"
          control={control}
          placeholder="Enter a landmark or full address"
          rules={{
            required: 'Landmark is required',
          }}
          containerStyle={{
            marginTop: address ? SIZES.base : 70,
          }}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
        />

        {/* select date */}
        <ExpiryDate
          date={date}
          onPress={showDatePicker}
          title={'Date Available'}
          containerStyle={{marginTop: SIZES.radius}}
        />
      </View>
    );
  }

  if (onLoad || newLoad) {
    return <LoadingIndicator />;
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'Product Shipment'} />

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

        <QuotationProgress1
          bgColor1={COLORS.primary1}
          bgColor2={COLORS.primary1}
          bgColor4={COLORS.primary1}
          color1={COLORS.primary1}
          color2={COLORS.primary1}
          color4={COLORS.primary1}
          item1={COLORS.white}
          item2={COLORS.white}
          item4={COLORS.white}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          bounces={false}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          {requestForm()}
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
    </Root>
  );
};

export default InternationalEngagementTerms;
