import {Text, View} from 'react-native';
import React, {useState} from 'react';
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
  LoadingIndicator,
} from '../../../../components';
import {COLORS, FONTS, SIZES, constants, icons} from '../../../../constants';
import {
  CreateMessageMutation,
  CreateMessageMutationVariables,
  MessageStatus,
  serviceType,
  GetRFFQuery,
  GetRFFQueryVariables,
  CreateRFFReplyMutationVariables,
  CreateRFFReplyInput,
  RFFTYPE,
  CreateRFFReplyMutation,
  UpdateChatRoomMutation,
  UpdateChatRoomMutationVariables,
} from '../../../../API';
import {createMessage, updateChatRoom} from '../../../../queries/ChatQueries';
import {useAuthContext} from '../../../../context/AuthContext';
import {createRFFReply, getRFF} from '../../../../queries/RFFQueries';

interface IFreight {
  basePrice: number;
  qty: number;
  landmark: string;
  weight: any;
  length: number;
  height: number;
  width: number;
}

const ReplyRFFAirPayment = () => {
  const {authUser}: any = useAuthContext();

  const navigation = useNavigation<ChatStackNavigatorParamList>();
  const route: any = useRoute<any>();

  const {control, handleSubmit}: any = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<any>('');

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState('');
  const [jobType, setJobType] = useState<any>(constants.packageType);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [type2, setType2] = useState('');
  const [jobType2, setJobType2] = useState<any>(constants.paymentMethod);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [type3, setType3] = useState('');
  const [jobType3, setJobType3] = useState<any>(constants.paymentType);

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(null);
  const [type4, setType4] = useState('');
  const [jobType4, setJobType4] = useState<any>(constants.filterUnit);

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

  // GET RFF DETAILS
  const {data, loading} = useQuery<GetRFFQuery, GetRFFQueryVariables>(getRFF, {
    variables: {id: route?.params?.rffID},
  });
  const rffDetails: any = data?.getRFF;

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

  // CREATE RFF REPLY
  const [doCreateRFFReply] = useMutation<
    CreateRFFReplyMutation,
    CreateRFFReplyMutationVariables
  >(createRFFReply);

  const onSubmit = async ({basePrice, qty}: IFreight) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const input: CreateRFFReplyInput = {
        id: uuidV4(),
        rffNo: rffDetails?.rffNo,
        placeOrigin: rffDetails?.placeOrigin, // city
        placeOriginCountry: rffDetails?.placeOriginCountry, // country
        placeOriginName: rffDetails?.placeOriginName, // address
        placeOriginFlag: rffDetails?.placeOriginFlag, //flag
        placeDestination: rffDetails?.placeDestination, //city destination
        placeDestinationName: rffDetails?.placeDestinationName, // destination address
        destinationCountry: rffDetails?.destinationCountry, //country
        placeDestinationFlag: rffDetails?.placeDestinationFlag, // destination flag
        relatedServices: rffDetails?.relatedServices,
        productName: rffDetails?.productName,
        handling: rffDetails?.handling,
        rffType: RFFTYPE.AIR,
        notes: rffDetails?.notes,
        requestCategory: rffDetails?.requestCategory,
        budget: rffDetails?.budget,
        weight: rffDetails?.weight,
        length: rffDetails?.length,
        height: rffDetails?.height,
        width: rffDetails?.width,
        userID: rffDetails?.userID,
        forUserID: authUser?.attributes?.sub,
        paymentType: type3,
        paymentMethod: type2,
        packageType: type,
        unit: type4,
        price: basePrice,
        loadDate: date,
        SType: 'RFFREFPLY',
        RFF: rffDetails?.id,
        statusText: 'RFF Replies Sent',
        qty: qty,
      };

      const res = await doCreateRFFReply({
        variables: {
          input,
        },
      });

      const res1 = await doCreateMessage({
        variables: {
          input: {
            SType: 'MESSAGE',
            userID: authUser?.attributes?.sub,
            status: MessageStatus.SENT,
            text: "Hello, I've replied your RFF (Air) request",
            rffID: rffDetails?.rffNo,
            requestTitle: rffDetails?.productName,
            requestID: res?.data?.createRFFReply?.id,
            packageType: type,
            requestQty: qty,
            requestPrice: basePrice,
            rffType: RFFTYPE?.AIR,
            serviceType: serviceType?.RFF_REPLY,
            chatroomID: route?.params?.chatroomID,
          },
        },
      });
      // update last msg function
      const updateLastMessage = async (newMessage: any) => {
        await doUpdateChatRoom({
          variables: {
            input: {
              id: route?.params?.chatroomID,
              SType: 'CHATROOM',
              chatRoomLastMessageId: newMessage,
            },
          },
        });
      };
      updateLastMessage(res1?.data?.createMessage?.id);
      navigation.navigate('SuccessService6', {
        chatroomID: route?.params?.chatroomID,
      });
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: (error as Error).message,
        autoClose: 1500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.radius,
        }}>
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
              width: 180,
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
              <View style={{justifyContent: 'center', marginTop: 30}}>
                <DropDownPicker
                  schema={{
                    label: 'type',
                    value: 'type',
                  }}
                  onChangeValue={onChange}
                  open={open4}
                  showArrowIcon={true}
                  placeholder="Select Unit"
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
                    width: 150,
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
                  modalTitle="Select unit type"
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
                  marginTop: SIZES.semi_margin,
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
                placeholder="Select"
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

        {/* base price */}
        <FormInput
          name="basePrice"
          label="Base Price (Exc. Delivery)"
          control={control}
          keyboardType={'numeric'}
          placeholder="Ex. ₦100,000"
          rules={{
            required: 'Base price is required',
          }}
          containerStyle={{marginTop: SIZES.padding}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
          appendComponent={
            <View
              style={{
                paddingHorizontal: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightYellow,
                justifyContent: 'center',
                left: 12,
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
          }
        />

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
                modalContentContainerStyle={{
                  paddingHorizontal: SIZES.padding * 3,
                }}
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
                modalContentContainerStyle={{
                  paddingHorizontal: SIZES.padding * 3,
                }}
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
          title="Expected Load Date"
          containerStyle={{marginTop: SIZES.margin}}
        />
      </View>
    );
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header
          title={'Reply RFF'}
          contentStyle={{marginBottom: 0}}
          tintColor={COLORS.Neutral1}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <Spinner
          visible={isSubmitting}
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
            buttonContainerStyle={{
              marginBottom: SIZES.padding,
              marginTop: SIZES.radius,
            }}
            label="Continue"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </Root>
  );
};

export default ReplyRFFAirPayment;
