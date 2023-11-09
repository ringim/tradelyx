import {Text, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useState, useRef, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import FastImage from 'react-native-fast-image';
import {useMutation} from '@apollo/client';
import Geocoder from 'react-native-geocoding';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {
  FormInput,
  FreightType,
  Header,
  TextButton,
  SellerLocationMapHeader,
  QuotationProgress2,
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
import {updateRFF} from '../../../../../queries/RequestQueries';
import {
  UpdateRFFInput,
  UpdateRFFMutation,
  UpdateRFFMutationVariables,
} from '../../../../../API';
import {useAuthContext} from '../../../../../context/AuthContext';
import {GOOGLE_MAPS_APIKEY} from '../../../../../utilities/Utils';
import {getCountryFlag} from '../../../../../utilities/service';

interface IFreight {
  notes: string;
  amount: number;
}

const AirPickupProcess = () => {
  Geocoder.init(GOOGLE_MAPS_APIKEY, {language: 'en'});

  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<any>();

  const mapRef = useRef(null);

  const {userID} = useAuthContext();

  const {control, handleSubmit, setValue}: any = useForm();

  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [address1, setAddress1] = useState<any>('');
  const [address2, setAddress2] = useState<any>('');
  const [code, setCode] = useState<any>('');
  const [cName, setCName] = useState<any>('');
  const [cCity, setCCity] = useState<any>('');
  const [code2, setCode2] = useState<any>('');
  const [cName2, setCName2] = useState<any>('');
  const [cCity2, setCCity2] = useState<any>('');

  const selectedProp = selectedCategories?.map(
    (obj: {label: any}) => obj?.label,
  );

  const {location} = address1;

  useEffect(() => {
    let isCurrent = true;
    isCurrent &&
      getCountryFlag(location?.lat, location?.lng, setCode, setCName, setCCity);
    return () => {
      isCurrent = false;
    };
  }, [address1]);

  useEffect(() => {
    let isCurrent = true;
    isCurrent &&
      getCountryFlag(
        address2?.location?.lat,
        address2?.location?.lng,
        setCode2,
        setCName2,
        setCCity2,
      );
    return () => {
      isCurrent = false;
    };
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
        SType: 'RFF',
        city: cCity, //city
        placeOriginName: address1?.description?.formatted_address, // address
        placeOrigin: cName, //country
        placeOriginFlag: `https://flagcdn.com/32x24/${code}.png`, // flag
        placeDestination: cCity2, //city destination
        placeDestinationName: address2?.description?.formatted_address, // address
        destinationCountry: cName2, //country
        placeDestinationFlag: `https://flagcdn.com/32x24/${code2}.png`,
        relatedServices: selectedProp,
        invoiceAmount: amount,
        notes: notes,
        userID,
      };
      await doUpdateRFQ({
        variables: {
          input,
        },
      });
      // console.log('job data', input);
      navigation.replace('SuccessService', {type: 'Air Request'});
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
    if (route.params?.userAddress && unmounted) {
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

  useEffect(() => {
    let unmounted = true;
    if (route.params?.userAddress2 && unmounted) {
      setAddress2(route.params?.userAddress2);
      setValue('address2', address2?.description?.formatted_address);
    }
    return () => {
      unmounted = false;
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
    <Root>
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
            image={images.airFreight}
            freightDesc={'Delivery within 7-10 days'}
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
    </Root>
  );
};

export default AirPickupProcess;
