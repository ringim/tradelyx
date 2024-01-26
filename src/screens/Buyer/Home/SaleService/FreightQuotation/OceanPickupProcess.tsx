import {Text, StyleSheet, View, TextInput} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useState, useRef, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';
import {v4 as uuidV4} from 'uuid';
import {useMutation, useQuery} from '@apollo/client';

import {
  FormInput,
  FreightType,
  Header,
  TextButton,
  QuotationProgress2,
  SellerLocationMapHeader,
  RelatedService,
  LoadingIndicator,
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
import {
  UpdateRFFInput,
  UpdateRFFMutation,
  UpdateRFFMutationVariables,
  CreateNotificationMutation,
  CreateNotificationMutationVariables,
  NotificationType,
  CreateNotificationInput,
  GetRFFQuery,
  GetRFFQueryVariables,
  RFFTYPE,
} from '../../../../../API';
import {getRFF, updateRFF} from '../../../../../queries/RFFQueries';
import {useAuthContext} from '../../../../../context/AuthContext';
import {
  formatNumericValue,
  getCountryFlag,
} from '../../../../../utilities/service';
import {createNotification} from '../../../../../queries/NotificationQueries';

const OceanPickupProcess = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<any>();
  const mapRef = useRef(null);

  const {userID} = useAuthContext();

  const {control, handleSubmit, setValue}: any = useForm();

  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [amount, setAmount] = useState<any>('');
  const [notes, setNotes] = useState('');
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
    getCountryFlag(location?.lat, location?.lng, setCode, setCName, setCCity);
  }, [address1]);

  useEffect(() => {
    getCountryFlag(
      address2?.location?.lat,
      address2?.location?.lng,
      setCode2,
      setCName2,
      setCCity2,
    );
  }, [address2]);

  // console.log(value);

  // GET RFF DETAIL
  const {data, loading: onLoad} = useQuery<GetRFFQuery, GetRFFQueryVariables>(
    getRFF,
    {variables: {id: route?.params.rffID}},
  );
  const rffDetail = data?.getRFF?.productName;

  // CREATE UPDATE RFF
  const [doUpdateRFF] = useMutation<
    UpdateRFFMutation,
    UpdateRFFMutationVariables
  >(updateRFF);
  const onSubmit = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: UpdateRFFInput = {
        id: route?.params.rffID,
        SType: 'RFF',
        placeOriginName: address1?.description?.formatted_address, // address
        placeOrigin: cCity, //city
        placeOriginCountry: cName, // country
        placeOriginFlag: `https://flagcdn.com/32x24/${code}.png`, // flag
        placeDestination: cCity2, //city destination
        placeDestinationName: address2?.description?.formatted_address, // address
        destinationCountry: cName2, //country
        placeDestinationFlag: `https://flagcdn.com/32x24/${code2}.png`,
        relatedServices: selectedProp,
        budget: amount,
        notes,
        userID,
      };
      const res = await doUpdateRFF({
        variables: {
          input,
        },
      });
      await createNotify();
      navigation.reset({
        index: 0,
        routes: [{name: 'SuccessService', params: {type: 'Ocean Request'}}],
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

  // CREATE LAND RFF NOTIFICATION
  const [doCreateNotification] = useMutation<
    CreateNotificationMutation,
    CreateNotificationMutationVariables
  >(createNotification);
  const createNotify = async () => {
    try {
      const input: CreateNotificationInput = {
        id: uuidV4(),
        type: NotificationType?.RFF,
        readAt: 0,
        actorID: userID,
        requestType: RFFTYPE?.OCEAN,
        notificationRFFId: route?.params.rffID,
        SType: 'NOTIFICATION',
        title: 'Ocean Freight Request',
        description: `Buyer's request - ${rffDetail}`,
      };
      const res = await doCreateNotification({
        variables: {
          input,
        },
      });
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: (error as Error).message,
        autoClose: 1500,
      });
    }
  };

  useEffect(() => {
    if (route.params?.userAddress) {
      setAddress1(route.params?.userAddress);
      setValue('address1', address1?.description?.formatted_address);
    }
  }, [
    route.params?.userAddress,
    setValue,
    address1?.description?.formatted_address,
  ]);

  useEffect(() => {
    if (route.params?.userAddress2) {
      setAddress2(route.params?.userAddress2);
      setValue('address2', address2?.description?.formatted_address);
    }
  }, [
    route.params?.userAddress2,
    setValue,
    address2?.description?.formatted_address,
  ]);

  function isSubmit() {
    return address1 !== '' && address2 !== '';
  }

  const handleInputChange = (input: any) => {
    const formattedValue = formatNumericValue(input, amount);
    setAmount(formattedValue);
  };

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
            placeholder="Add origin"
            rules={{
              required: 'Address is required',
            }}
            containerStyle={{marginTop: SIZES.base}}
            labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
            inputContainerStyle={{marginTop: SIZES.base, height: 50}}
            onPress={() => navigation.navigate('OceanPortOriginAddress')}
          />

          {/* Map location address */}
          <SellerLocationMapHeader
            mapContStyle={{marginTop: 0}}
            contentStyle={{
              marginBottom: SIZES.padding,
              marginHorizontal: 0,
              marginTop: address1 ? SIZES.semi_margin : 0,
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
            placeholder="Add destination"
            rules={{
              required: 'Destination is required',
            }}
            containerStyle={{marginTop: SIZES.base}}
            labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
            inputContainerStyle={{marginTop: SIZES.base}}
            onPress={() => navigation.navigate('OceanDestinationAddress')}
          />

          {/* Map location address */}
          <SellerLocationMapHeader
            mapContStyle={{marginTop: 0}}
            contentStyle={{
              marginHorizontal: 0,
              marginTop: address2 ? SIZES.semi_margin : 0,
              marginBottom: SIZES.padding * 2,
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
                style={{width: 330, height: 120, alignSelf: 'center'}}
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
            marginTop: SIZES.semi_margin,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={{flex: 0.95, justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: '500',
                color: COLORS.Neutral1,
              }}>
              Invoice Amount
            </Text>
            <TextInput
              autoFocus={false}
              onChangeText={handleInputChange}
              value={amount}
              placeholder="Invoice Amount"
              keyboardType="numeric"
              placeholderTextColor={COLORS.gray}
              style={{
                ...FONTS.body3,
                color: COLORS.Neutral1,
                marginTop: SIZES.base,
                height: 50,
                fontWeight: '500',
                paddingHorizontal: SIZES.radius,
                borderRadius: SIZES.base,
                borderWidth: 0.5,
                borderColor: COLORS.Neutral7,
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: COLORS.lightYellow,
              width: 80,
              height: 50,
              top: 25,
              borderRadius: SIZES.semi_margin,
            }}>
            <Text
              style={{
                ...FONTS.h5,
                color: COLORS.Neutral6,
                textAlign: 'center',
              }}>
              Naira (₦)
            </Text>
          </View>
        </View>

        {/* Additional Notes */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              color: COLORS.Neutral1,
            }}>
            Additional Notes
          </Text>
          <TextInput
            autoFocus={false}
            onChangeText={setNotes}
            value={notes}
            multiline={true}
            placeholder="Add notes"
            placeholderTextColor={COLORS.gray}
            style={{
              ...FONTS.body3,
              color: COLORS.Neutral1,
              marginTop: SIZES.base,
              paddingTop: SIZES.base,
              height: 120,
              fontWeight: '500',
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.base,
              borderWidth: 0.5,
              marginBottom: 120,
              borderColor: COLORS.Neutral7,
            }}
          />
        </View>
      </View>
    );
  }

  if (onLoad) {
    return <LoadingIndicator />;
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
          type={'Container'}
          type2={'Pickup'}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          bounces={false}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          <FreightType
            freightType={'Ocean Freight'}
            image={images.water}
            freightDesc={'Delivery within 20-25 days'}
            info="Container Details"
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
            label="Send"
            labelStyle={{...FONTS.h4}}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </Root>
  );
};

export default OceanPickupProcess;
