import {ActivityIndicator, Text, StyleSheet, View} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, {useState, useMemo, useRef, useCallback, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import FastImage from 'react-native-fast-image';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import {
  FormInput,
  FreightType,
  Header,
  TextButton,
  SellerLocationMapHeader,
  QuotationProgress2,
  RFQSuccess,
  RelatedService,
} from '../../../../../components';
import {
  COLORS,
  FONTS,
  SIZES,
  images,
  constants,
  icons,
} from '../../../../../constants';
import {HomeStackNavigatorParamList} from '../../../../../components/navigation/SellerNav/type/navigation';

interface IFreight {
  notes: number;
  amount: number;
}

const AirPickupProcess = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<any>();

  const mapRef = useRef(null);

  const {control, handleSubmit, setValue}: any = useForm();

  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [address1, setAddress1] = useState<any>('');
  const [address2, setAddress2] = useState<any>('');

  // console.log('address1', address1);
  // console.log('address2', address2);

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['1%', '65%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // console.log(value);

  const onSubmit = async ({notes, amount}: IFreight) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      // console.log('job data', res);
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
    let unmounted = false;
    if (route.params?.userAddress) {
      setAddress1(route.params?.userAddress);
      setAddress2(route.params?.userAddress2);
      setValue('address1', address1?.description?.formatted_address);
      setValue('address2', address2?.description?.formatted_address);
    }
    return () => {
      unmounted = true;
    };
  }, [
    route.params?.userAddress,
    route.params?.userAddress2,
    setValue,
    address1?.description?.formatted_address,
    address2?.description?.formatted_address,
  ]);

  function requestForm() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.semi_margin,
        }}>
        <View
          style={{
            backgroundColor: COLORS.Neutral10,
            paddingTop: SIZES.base,
            paddingHorizontal: SIZES.semi_margin,
            borderRadius: SIZES.semi_margin,
          }}>
          {/* port origin */}
          <FormInput
            label="Port of Origin"
            name="address1"
            control={control}
            editable={false}
            placeholder="Add origin"
            rules={{
              required: 'Address is required',
            }}
            containerStyle={{marginTop: SIZES.base}}
            labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
            inputContainerStyle={{marginTop: SIZES.base, height: 50}}
            onPress={() => navigation.navigate('AirPortOriginAddress')}
          />

          {/* Map location address */}
          <SellerLocationMapHeader
            mapContStyle={{marginTop: 0}}
            contentStyle={{
              marginBottom: address1 ? -5 : SIZES.padding,
              marginHorizontal: 0,
              marginTop: address1 ? SIZES.margin : 0,
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
                style={{width: 330, height: 120, alignSelf: 'center'}}
              />
            )}
          </SellerLocationMapHeader>

          {/* port destination */}
          <FormInput
            label="Port of Destination"
            name="address2"
            control={control}
            editable={false}
            placeholder="Add destination"
            rules={{
              required: 'Destination is required',
            }}
            containerStyle={{marginTop: SIZES.margin}}
            labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
            inputContainerStyle={{marginTop: SIZES.base, height: 50}}
            onPress={() => navigation.navigate('AirDestinationAddress')}
          />

          {/* Map location address */}
          <SellerLocationMapHeader
            mapContStyle={{marginTop: 0}}
            contentStyle={{
              marginHorizontal: 0,
              marginTop: address2 ? SIZES.margin : 0,
              marginBottom: SIZES.padding,
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
              <View style={{alignSelf: 'center'}}>
                <FastImage
                  resizeMode={FastImage.resizeMode.cover}
                  source={images.dummyMap}
                  style={{width: 330, height: 100, alignSelf: 'center'}}
                />
              </View>
            )}
          </SellerLocationMapHeader>
        </View>

        {/* Related Services */}
        <View style={{marginTop: address1 ? SIZES.semi_margin : SIZES.padding}}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.Neutral1,
            }}>
            Related Services
          </Text>
          <View style={{marginTop: SIZES.radius}}>
            <FlatList
              data={constants.relatedServices}
              keyExtractor={item => `${item?.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <RelatedService
                  item={item}
                  selected={
                    selectedCategories.findIndex(
                      (category: {id: number}) => category?.id === item.id,
                    ) >= 0
                  }
                  containerStyle={{
                    marginLeft: index == 0 ? 0 : SIZES.padding,
                    marginRight:
                      index == constants?.relatedServices.length - 1
                        ? SIZES.padding
                        : -18,
                  }}
                  onPress={() => {
                    let newSelectedCategories = JSON.parse(
                      JSON.stringify(selectedCategories),
                    );

                    const index = selectedCategories.findIndex(
                      (category: {id: number}) => category?.id === item.id,
                    );

                    if (index >= 0) {
                      newSelectedCategories.splice(index, 1);
                    } else {
                      newSelectedCategories.push(item);
                    }
                    setSelectedCategories(newSelectedCategories);
                  }}
                />
              )}
            />
          </View>
        </View>

        {/* Invoice amount */}
        <View
          style={{
            marginTop: 6,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={{flex: 0.95, justifyContent: 'center'}}>
            <FormInput
              name="amount"
              label="Invoice Amount"
              control={control}
              keyboardType={'numeric'}
              placeholder="Amount"
              rules={{
                required: 'amount is required',
              }}
              containerStyle={{marginTop: SIZES.radius}}
              labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
              inputContainerStyle={{marginTop: SIZES.radius, height: 50}}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: COLORS.lightYellow,
              width: 55,
              height: 50,
              top: 40,
              borderRadius: SIZES.semi_margin,
            }}>
            <Text
              style={{
                ...FONTS.h5,
                color: COLORS.Neutral6,
                textAlign: 'center',
              }}>
              NGN
            </Text>
          </View>
        </View>

        {/* Additional Notes */}
        <FormInput
          label="Additional Notes"
          name="notes"
          control={control}
          placeholder="Add notes"
          containerStyle={{marginTop: SIZES.semi_margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.radius, marginBottom: 50}}
        />
      </View>
    );
  }

  return (
    <AlertNotificationRoot>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header
          title={'Request for Freight'}
          contentStyle={{marginBottom: 0}}
          tintColor={COLORS.Neutral1}
        />

        <Spinner
          visible={loading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View
            style={{
              padding: SIZES.padding,
            }}>
            <RFQSuccess
              requestType={'Air Request'}
              onPress={() => navigation.navigate('Order')}
              onPress2={() => navigation.navigate('Homes')}
            />
          </View>
        </BottomSheetModal>

        <QuotationProgress2
          bgColor1={COLORS.primary1}
          bgColor2={COLORS.primary1}
          bgColor3={COLORS.primary1}
          color1={COLORS.primary1}
          color2={COLORS.primary1}
          color3={COLORS.primary1}
          item2={COLORS.white}
          item3={COLORS.white}
          type={'Package'}
          type2={'Pickup'}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          <FreightType
            freightType={'Air Freight'}
            info="Pickup Process"
            image={images.land}
            freightDesc={'Delivery within 7-10 days'}
          />

          {requestForm()}
        </KeyboardAwareScrollView>

        <View style={{justifyContent: 'flex-end'}}>
          <TextButton
            buttonContainerStyle={{marginBottom: SIZES.padding, marginTop: 0}}
            label="Send"
            labelStyle={{...FONTS.h4}}
            // onPress={handleSubmit(onSubmit)}
            onPress={handlePresentModalPress}
          />
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default AirPickupProcess;
