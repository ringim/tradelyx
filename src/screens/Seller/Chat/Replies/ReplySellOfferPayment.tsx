import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import {useMutation, useQuery} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';
import {v4 as uuidV4} from 'uuid';

import {ChatStackNavigatorParamList} from '../../../../components/navigation/SellerNav/type/navigation';
import {
  Header,
  TextButton,
  FormInput,
  ExpiryDate,
  SellerLocationMapHeader,
  UploadedID,
  UploadID,
  LoadingIndicator,
} from '../../../../components';
import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  icons,
  images,
} from '../../../../constants';
import {
  CreateSellOfferReplyInput,
  CreateSellOfferReplyMutation,
  CreateSellOfferReplyMutationVariables,
  GetSellOfferQuery,
  GetSellOfferQueryVariables,
  CreateMessageMutation,
  CreateMessageMutationVariables,
  MessageStatus,
  serviceType,
  UpdateChatRoomMutation,
  UpdateChatRoomMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
} from '../../../../API';
import {
  createSellOfferReply,
  getSellOffer,
} from '../../../../queries/SellOfferQueries';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {createMessage, updateChatRoom} from '../../../../queries/ChatQueries';
import {useAuthContext} from '../../../../context/AuthContext';
import {
  formatNumericValue,
  selectFile2,
  uploadFile2,
} from '../../../../utilities/service';
import {getUser} from '../../../../queries/UserQueries';

interface IFreight {
  qty: any;
  landmark: string;
  file: [string];
}

const ReplySellOfferPayment = () => {
  const {authUser}: any = useAuthContext();

  const navigation = useNavigation<ChatStackNavigatorParamList>();
  const route: any = useRoute<any>();

  // console.log(route?.params?.forUserID);

  const {control, setValue, handleSubmit}: any = useForm();

  const mapRef = useRef(null);

  const [price, setPrice] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [singleFile, setSingleFile] = useState<any>([]);
  const [address1, setAddress1] = useState<any>('');
  const [date, setDate] = useState<any>('');
  const [date2, setDate2] = useState<any>('');

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState('');
  const [jobType, setJobType] = useState<any>(constants.filterUnit);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [type2, setType2] = useState('');
  const [jobType2, setJobType2] = useState<any>(constants.paymentMethod2);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [type3, setType3] = useState('');
  const [jobType3, setJobType3] = useState<any>(constants.paymentType2);

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(null);
  const [type4, setType4] = useState('');
  const [jobType4, setJobType4] = useState<any>(constants.packageType);

  const handleInputChange = (input: any) => {
    const formattedValue = formatNumericValue(input, price);
    setPrice(formattedValue);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };

  const handleConfirm = (date: any) => {
    const selectedDate = dayjs(date).format('YYYY-MM-DD');
    setDate(selectedDate);
    hideDatePicker();
  };

  const handleConfirm2 = (date: any) => {
    const selectedDate = dayjs(date).format('YYYY-MM-DD');
    setDate2(selectedDate);
    hideDatePicker2();
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

  // GET USER 1
  const {data: softData, loading: softLoad} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {
    variables: {
      id: authUser?.attributes?.sub,
    },
  });

  // GET SELL OFFER ID
  const {data, loading: onLoad} = useQuery<
    GetSellOfferQuery,
    GetSellOfferQueryVariables
  >(getSellOffer, {variables: {id: route?.params.sellOffer}});
  const getSellOfferDetail: any = data?.getSellOffer;

  // SEND MESSAGE
  const [doCreateMessage] = useMutation<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >(createMessage);

  // UPDATE CHAT ROOM MESSAGE
  const [doUpdateChatRoom] = useMutation<
    UpdateChatRoomMutation,
    UpdateChatRoomMutationVariables
  >(updateChatRoom);

  // CREATE SELL OFFER REPLY
  const [doCreateSellOfferReply] = useMutation<
    CreateSellOfferReplyMutation,
    CreateSellOfferReplyMutationVariables
  >(createSellOfferReply);

  const onSubmit = async ({landmark, qty, file}: IFreight) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: CreateSellOfferReplyInput = {
        id: uuidV4(),
        SType: 'SELLOFFERREPLY',
        sellOfferID: getSellOfferDetail?.sellOfferID,
        title: getSellOfferDetail?.title,
        requestCategory: getSellOfferDetail?.requestCategory,
        tags: getSellOfferDetail?.tags,
        productName: getSellOfferDetail?.productName,
        image: getSellOfferDetail?.image,
        images: getSellOfferDetail?.images,
        sellOfferImage: getSellOfferDetail?.sellOfferImage,
        description: getSellOfferDetail?.description,
        rfqType: getSellOfferDetail?.rfqType,
        packageDesc: getSellOfferDetail?.packageDesc,
        packageType: type4,
        userID: getSellOfferDetail?.userID,
        basePrice: price,
        paymentType: type3,
        paymentMethod: type2,
        offerValidity: date,
        agreement: file,
        deliveryDate: date2,
        qtyMeasure: qty,
        landmark,
        placeOrigin: address1?.description?.formatted_address,
        forUserID: route?.params?.forUserID,
        unit: type,
        SellOffer: getSellOfferDetail?.id,
      };

      if (singleFile) {
        const fileKeys = await Promise.all(
          singleFile.map((singleFile: any) => uploadFile2(singleFile?.uri)),
        );
        input.agreement = fileKeys;
      }

      const res = await doCreateSellOfferReply({
        variables: {
          input,
        },
      });

      const res1 = await doCreateMessage({
        variables: {
          input: {
            SType: 'MESSAGE',
            userID: authUser?.attributes?.sub,
            forUserID: getSellOfferDetail?.forUserID,
            status: MessageStatus.SENT,
            text: `Hello, I've replied your Sell Offer request - ${getSellOfferDetail?.title}`,
            title: `${softData?.getUser?.name} Response`,
            sellOfferID: getSellOfferDetail?.sellOfferID,
            requestTitle: getSellOfferDetail?.title,
            packageType: type,
            serviceImage: getSellOfferDetail?.sellOfferImage,
            requestID: res?.data?.createSellOfferReply?.id,
            requestQty: qty,
            requestPrice: price,
            serviceType: serviceType?.SELLOFFERS_REPLY,
            chatroomID: route?.params?.chatRoomID,
            readAt: 0
          },
        },
      });
      const updateLastMessage = async (newMessage: any) => {
        await doUpdateChatRoom({
          variables: {
            input: {
              id: route?.params?.chatRoomID,
              SType: 'CHATROOM',
              chatRoomLastMessageId: newMessage,
            },
          },
        });
      };
      await updateLastMessage(res1?.data?.createMessage?.id);
      navigation.replace('SuccessService4', {
        chatroomID: route?.params?.chatRoomID,
      });
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
    return price !== '' && singleFile?.length !== 0;
  }

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.radius,
          marginBottom: 100,
        }}>
        {/*  Quantity & Unit Measurement */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* Quantity */}
          <FormInput
            name="qty"
            label="Quantity & Unit Measurement"
            control={control}
            keyboardType={'numeric'}
            placeholder="E.g. 100"
            rules={{
              required: 'Quantity is required',
            }}
            containerStyle={{
              marginTop: SIZES.padding * 1.2,
              justifyContent: 'center',
            }}
            labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
            inputContainerStyle={{
              marginTop: SIZES.base,
              height: 47,
              width: 150,
            }}
          />

          {/* Quantity & Unit Measurement */}
          <Controller
            control={control}
            name="unit"
            rules={{
              required: 'Unit is required',
            }}
            render={({field: {value, onChange}, fieldState: {error}}: any) => (
              <View
                style={{
                  justifyContent: 'center',
                  marginTop: 30,
                  marginStart: -SIZES.padding * 2,
                }}>
                <DropDownPicker
                  schema={{
                    label: 'type',
                    value: 'type',
                  }}
                  onChangeValue={onChange}
                  open={open}
                  showArrowIcon={true}
                  placeholder="Select Unit"
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
                    width: 170,
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
                  modalTitle="Select unit type"
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
              </View>
            )}
          />
        </View>

        {/* Package Type */}
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
                  marginTop: SIZES.radius,
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
                open={open4}
                showArrowIcon={true}
                placeholder="Select Package Type"
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                value={value4}
                items={jobType4}
                setOpen={setOpen4}
                setValue={setValue4}
                setItems={setJobType4}
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
                modalTitle="Select"
                modalTitleStyle={{
                  fontWeight: '600',
                }}
                onSelectItem={(value: any) => {
                  setType4(value?.type);
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

        {/* base price */}
        <View
          style={{
            marginTop: SIZES.padding,
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
              Base Price (Exc. Delivery)
            </Text>
            <TextInput
              autoFocus={false}
              onChangeText={handleInputChange}
              value={price}
              placeholder="Ex. ₦100,000"
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

        {/* payment type */}
        <Controller
          control={control}
          name="paymentType"
          rules={{
            required: 'Payment Type is required',
          }}
          render={({field: {value, onChange}, fieldState: {error}}: any) => (
            <>
              <Text
                style={{
                  marginTop: SIZES.semi_margin,
                  color: COLORS.Neutral1,
                  ...FONTS.body3,
                  fontWeight: '500',
                }}>
                Payment Type
              </Text>
              <DropDownPicker
                schema={{
                  label: 'type',
                  value: 'type',
                }}
                onChangeValue={onChange}
                open={open3}
                showArrowIcon={true}
                placeholder="Select Payment Type"
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                value={value3}
                items={jobType3}
                setOpen={setOpen3}
                setValue={setValue3}
                setItems={setJobType3}
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
                modalTitle="Choose Payment Type"
                modalTitleStyle={{
                  fontWeight: '600',
                }}
                onSelectItem={(value: any) => {
                  setType3(value?.type);
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

        {/* Payment Method */}
        <Controller
          control={control}
          name="paymentMethod"
          rules={{
            required: 'Payment Method is required',
          }}
          render={({field: {value, onChange}, fieldState: {error}}: any) => (
            <>
              <Text
                style={{
                  marginTop: SIZES.padding,
                  color: COLORS.Neutral1,
                  ...FONTS.body3,
                }}>
                Payment Method
              </Text>
              <DropDownPicker
                schema={{
                  label: 'type',
                  value: 'type',
                }}
                onChangeValue={onChange}
                open={open2}
                showArrowIcon={true}
                placeholder="Select Payment Method"
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                value={value2}
                items={jobType2}
                setOpen={setOpen2}
                setValue={setValue2}
                setItems={setJobType2}
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
                modalTitle="Choose Payment Method"
                modalTitleStyle={{
                  fontWeight: '600',
                }}
                onSelectItem={(value: any) => {
                  setType2(value?.type);
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

        {/* Offer validity */}
        <ExpiryDate
          date={date}
          onPress={showDatePicker}
          title="Offer Validity"
          containerStyle={{marginTop: SIZES.padding}}
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
          onPress={() => navigation.navigate('ReplyPackageShipmentAddress')}
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
              style={{width: 330, height: 120, alignSelf: 'center'}}
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
            marginTop: address1 ? -SIZES.padding * 1.3 : 0,
          }}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
        />

        {/* select date */}
        <ExpiryDate
          date={date2}
          onPress={showDatePicker2}
          title={'Date Available'}
          containerStyle={{marginTop: SIZES.semi_margin}}
        />

        {/* Agreement file */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginTop:
              singleFile?.length >= 1 ? SIZES.semi_margin : SIZES.margin,
          }}>
          {singleFile?.length >= 1 ? (
            <UploadedID
              title={'Terms & Conditions'}
              file={singleFile}
              setSingleFile={setSingleFile}
            />
          ) : (
            <UploadID
              title="Attach Terms & Conditions"
              onScanPress={() => selectFile2(setSingleFile, singleFile)}
            />
          )}
        </View>
      </View>
    );
  }

  if (onLoad || softLoad) {
    return <LoadingIndicator />;
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header
          title={'Reply Sell Offer'}
          contentStyle={{marginBottom: 0}}
          tintColor={COLORS.Neutral1}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible2}
          mode="date"
          onConfirm={handleConfirm2}
          onCancel={hideDatePicker2}
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
          showsVerticalScrollIndicator={false}
          extraHeight={150}
          bounces={false}
          extraScrollHeight={150}
          enableOnAndroid={true}>
          <View
            style={{marginTop: SIZES.radius, marginHorizontal: SIZES.radius}}>
            <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>
              Price & Payment Terms
            </Text>
          </View>
          {requestForm()}
        </KeyboardAwareScrollView>

        <View style={{justifyContent: 'flex-end'}}>
          <TextButton
            disabled={isSubmit() ? false : true}
            buttonContainerStyle={{
              marginBottom: SIZES.padding,
              marginTop: SIZES.radius,
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

export default ReplySellOfferPayment;
