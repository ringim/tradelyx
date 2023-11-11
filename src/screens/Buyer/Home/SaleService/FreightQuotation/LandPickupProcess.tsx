import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useState, useMemo, useRef, useCallback, useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import Geocoder from 'react-native-geocoding';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useMutation} from '@apollo/client';

import {
  FormInput,
  FreightType,
  SellerLocationMapHeader,
  Header,
  TextButton,
  QuotationProgress2,
  RFQSuccess,
  RelatedService,
} from '../../../../../components';
import {
  COLORS,
  FONTS,
  constants,
  SIZES,
  icons,
  images,
} from '../../../../../constants';
import {HomeStackNavigatorParamList} from '../../../../../components/navigation/SellerNav/type/navigation';
import {updateRFF} from '../../../../../queries/RequestQueries';
import {
  UpdateRFFInput,
  UpdateRFFMutation,
  UpdateRFFMutationVariables,
} from '../../../../../API';
import {useAuthContext} from '../../../../../context/AuthContext';

interface IFreight {
  notes: string;
  amount: number;
}

const LandPickupProcess = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<any>();
  const mapRef = useRef(null);

  const {userID} = useAuthContext();

  const {control, handleSubmit, setValue}: any = useForm();

  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [address1, setAddress1] = useState<any>('');
  const [address2, setAddress2] = useState<any>('');
  const [countryCode, setCountryCode] = useState<any>('');
  const [countryName, setCountryName] = useState<any>('');
  const [countryCode2, setCountryCode2] = useState<any>('');
  const [countryName2, setCountryName2] = useState<any>('');

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    return index;
  }, []);

  // console.log(value);

  const {location} = address1;

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
          }
        })
        .catch(error => console.error(error));
    };
    getCountryFlag();
  }, [address1]);

  useEffect(() => {
    const getCountryFlag = async () => {
      Geocoder.from(address2?.location?.lat, address2?.location?.lng)
        .then(json => {
          const result = json.results[0];
          for (const component of result.address_components) {
            if (component.types.includes('country')) {
              const name = component.long_name; // Full country name
              const code = component.short_name?.toLowerCase(); // Country code (e.g., 'US' for the United States)
              setCountryCode2(code);
              setCountryName2(name);
            }
          }
        })
        .catch(error => console.error(error));
    };
    getCountryFlag();
  }, [address2]);

  // CREATE UPDATE RFF
  const [doUpdateRFQ] = useMutation<
    UpdateRFFMutation,
    UpdateRFFMutationVariables
  >(updateRFF);

  const onSubmit = async ({notes, amount}: IFreight) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: UpdateRFFInput = {
        id: route?.params.rffID,
        placeOriginFlag: `https://flagcdn.com/32x24/${countryCode}.png`,
        placeOriginName: countryName,
        placeOrigin: address1?.description?.formatted_address,
        placeDestination: address2?.description?.formatted_address,
        placeDestinationFlag: `https://flagcdn.com/32x24/${countryCode2}.png`,
        placeDestinationName: countryName2,
        relatedServices: selectedCategories,
        invoiceAmount: amount,
        notes,
        userID,
      };
      await doUpdateRFQ({
        variables: {
          input,
        },
      });
      handlePresentModalPress();
      // console.log('job data', input);
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
      setValue('address1', address1?.description?.formatted_address);
    }
    return () => {
      unmounted = true;
    };
  }, [
    route.params?.userAddress,
    setValue,
    address1?.description?.formatted_address,
  ]);

  useEffect(() => {
    let unmounted = false;
    if (route.params?.userAddress2) {
      setAddress2(route.params?.userAddress2);
      setValue('address2', address2?.description?.formatted_address);
    }
    return () => {
      unmounted = true;
    };
  }, [
    route.params?.userAddress2,
    setValue,
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
            onPress={() => navigation.navigate('LandPickupAddress')}
          />

          {/* Map location address */}
          <SellerLocationMapHeader
            mapContStyle={{marginTop: 0}}
            contentStyle={{
              marginHorizontal: 0,
              marginTop: address1 ? SIZES.margin : 0,
              marginBottom: SIZES.padding,
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
                style={{width: 330, height: 100, alignSelf: 'center'}}
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
            labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
            inputContainerStyle={{marginTop: SIZES.radius, height: 50}}
            onPress={() => navigation.navigate('LandPickupAddress2')}
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
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                source={images.dummyMap}
                style={{width: 330, height: 100, alignSelf: 'center'}}
              />
            )}
          </SellerLocationMapHeader>
        </View>

        {/* Related Services */}
        <View style={{marginTop: SIZES.margin}}>
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
              inputContainerStyle={{marginTop: SIZES.radius}}
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
          multiline={true}
          containerStyle={{marginTop: SIZES.semi_margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{
            marginTop: SIZES.radius,
            height: 120,
            padding: SIZES.base,
            marginBottom: 120,
          }}
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
              requestType={'Land Freight'}
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
            freightType={'Land Freight'}
            info="Pickup Process"
            image={images.land}
            freightDesc={'Delivery within 20-25 days'}
          />

          {requestForm()}
        </KeyboardAwareScrollView>

        <View style={{justifyContent: 'flex-end'}}>
          <TextButton
            buttonContainerStyle={{marginBottom: SIZES.padding, marginTop: 0}}
            label="Send"
            labelStyle={{...FONTS.h4}}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default LandPickupProcess;
