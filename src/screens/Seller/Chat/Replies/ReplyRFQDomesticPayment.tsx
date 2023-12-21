import {ActivityIndicator, Text, View} from 'react-native';
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
  UploadedID,
  UploadID
} from '../../../../components';
import {COLORS, FONTS, SIZES, constants, icons} from '../../../../constants';
import {
  CreateMessageMutation,
  CreateMessageMutationVariables,
  MessageStatus,
  serviceType,
  GetRFQQuery,
  GetRFQQueryVariables,
  RFQTYPE,
  CreateRFQReplyMutation,
  CreateRFQReplyMutationVariables,
  CreateRFQReplyInput,
  UpdateChatRoomMutation,
  UpdateChatRoomMutationVariables,
} from '../../../../API';
import {createMessage, updateChatRoom} from '../../../../queries/ChatQueries';
import {useAuthContext} from '../../../../context/AuthContext';
import {createRFQReply, getRFQ} from '../../../../queries/RFQQueries';
import { selectFile2 } from '../../../../utilities/service';

interface IFreight {
  basePrice: number;
  qty: number;
  landmark: string;
}

const ReplyRFQDomesticPayment = () => {
  const {authUser}: any = useAuthContext();

  const navigation = useNavigation<ChatStackNavigatorParamList>();
  const route: any = useRoute<any>();

  const {control, handleSubmit}: any = useForm();

  const [singleFile, setSingleFile] = useState<any>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<any>('');

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState('');
  const [jobType, setJobType] = useState<any>(constants.filterUnit);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [type2, setType2] = useState('');
  const [jobType2, setJobType2] = useState<any>(constants.paymentMethod);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [type3, setType3] = useState('');
  const [jobType3, setJobType3] = useState<any>(constants.paymentType);

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

  // GET RFQ DETAILS
  const {data, loading} = useQuery<GetRFQQuery, GetRFQQueryVariables>(getRFQ, {
    variables: {id: route?.params?.rfqID},
  });
  const rfqDetails: any = data?.getRFQ;

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

  // CREATE RFQ REPLY
  const [doCreateRFQReply] = useMutation<
    CreateRFQReplyMutation,
    CreateRFQReplyMutationVariables
  >(createRFQReply);

  const onSubmit = async ({basePrice, qty}: IFreight) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const input: CreateRFQReplyInput = {
        id: uuidV4(),
        SType: 'RFQREFPLY',
        rfqNo: rfqDetails?.rfqNo,
        placeOrigin: rfqDetails?.placeOrigin, // city name
        placeOriginName: rfqDetails?.placeOriginName, // address
        placeOriginFlag: rfqDetails?.placeOriginFlag, //flag
        title: rfqDetails?.title,
        rfqType: RFQTYPE.DOMESTIC,
        description: rfqDetails?.description,
        documents: rfqDetails?.documents,
        requestCategory: rfqDetails?.requestCategory,
        buyFrequency: rfqDetails?.buyFrequency,
        budget: rfqDetails?.budget,
        productName: rfqDetails?.productName,
        tags: rfqDetails?.tags,
        landmark: rfqDetails?.landmark,
        userID: rfqDetails?.userID,
        forUserID: authUser?.attributes?.sub,
        RFQ: rfqDetails?.id,
        price: basePrice,
        paymentType: type3,
        paymentMethod: type2,
        expiryDate: date,
        statusText: 'RFQ Replies Sent',
        qty: qty,
        unit: type,
      };

      const res = await doCreateRFQReply({
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
            text: "Hello, I've replied your RFQ (Domestic) request",
            rfqID: rfqDetails?.rfqNo,
            requestTitle: rfqDetails?.title,
            requestID: res?.data?.createRFQReply?.id,
            packageType: type,
            requestQty: qty,
            requestPrice: basePrice,
            rfqType: RFQTYPE?.DOMESTIC,
            serviceType: serviceType?.RFQ_REPLY,
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

      navigation.navigate('SuccessService5', {
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

        <FormInput
          name="basePrice"
          label="Base Price (Exc. Delivery)"
          control={control}
          keyboardType={'numeric'}
          placeholder="Ex. ₦100,000"
          rules={{
            required: 'Base price is required',
          }}
          containerStyle={{marginTop: SIZES.semi_margin}}
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
          title="Expiry Date"
          containerStyle={{marginTop: SIZES.margin}}
        />

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

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="small" color={COLORS.primary6} />
      </View>
    );
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header
          title={'Reply RFQ'}
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

export default ReplyRFQDomesticPayment;
