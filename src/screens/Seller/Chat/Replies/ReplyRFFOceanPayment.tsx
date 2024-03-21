import {Text, TextInput, View} from 'react-native';
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
  UploadID,
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
  GetUserQuery,
  GetUserQueryVariables,
} from '../../../../API';
import {createMessage, updateChatRoom} from '../../../../queries/ChatQueries';
import {useAuthContext} from '../../../../context/AuthContext';
import {createRFFReply, getRFF} from '../../../../queries/RFFQueries';
import {getUser} from '../../../../queries/UserQueries';
import {
  formatNumericValue,
  selectFile2,
  uploadFile2,
} from '../../../../utilities/service';

interface IFreight {
  qty: number;
  file: [string];
}

const ReplyRFFOceanPayment = () => {
  const {authUser}: any = useAuthContext();

  const navigation = useNavigation<ChatStackNavigatorParamList>();
  const route: any = useRoute<any>();

  const {control, handleSubmit}: any = useForm();

  const [singleFile, setSingleFile] = useState<any>([]);
  const [price, setPrice] = useState<any>('');
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

  // GET USER
  const {data: softData, loading: softLoad} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {
    variables: {
      id: rffDetails?.userID,
    },
  });
  const userDetails = softData?.getUser;

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

  const onSubmit = async ({qty, file}: IFreight) => {
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
        productName: rffDetails?.productName,
        containerDetails: rffDetails?.containerDetails,
        containerType: rffDetails?.containerType,
        requestCategory: rffDetails?.requestCategory,
        rffType: RFFTYPE.OCEAN,
        notes: rffDetails?.notes,
        containerSize: rffDetails?.containerSize,
        budget: rffDetails?.budget,
        weight: rffDetails?.weight,
        userID: rffDetails?.userID,
        agreement: file,
        forUserID: authUser?.attributes?.sub,
        RFF: rffDetails?.id,
        paymentType: type3,
        paymentMethod: type2,
        packageType: type,
        unit: type4,
        price: price,
        loadDate: date,
        SType: 'RFFREFPLY',
        statusText: 'RFF Replies Sent',
        qty: qty,
      };

      if (singleFile) {
        const fileKeys = await Promise.all(
          singleFile.map((singleFile: any) => uploadFile2(singleFile?.uri)),
        );
        input.agreement = fileKeys;
      }

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
            forUserID: input?.userID,
            status: MessageStatus.SENT,
            text: `Hello, I've replied your RFF (Ocean) request - ${rffDetails?.productName}`,
            title: `${userDetails?.name} RFF Response`,
            rffID: rffDetails?.rffNo,
            requestTitle: rffDetails?.productName,
            requestID: res?.data?.createRFFReply?.id,
            packageType: type,
            requestQty: qty,
            requestPrice: price,
            rffType: RFFTYPE?.OCEAN,
            serviceType: serviceType?.RFF_REPLY,
            chatroomID: route?.params?.chatroomID,
            readAt: 0,
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
      navigation.replace('SuccessService6', {
        chatroomID: route?.params?.chatroomID,
      });
      setSingleFile([]);
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

  const handleInputChange = (input: any) => {
    const formattedValue = formatNumericValue(input, price);
    setPrice(formattedValue);
  };

  function isSubmit() {
    return price !== '';
  }

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.radius,
          marginBottom: 100,
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
                    width: 200,
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
          title="Expected Load Date"
          containerStyle={{marginTop: SIZES.margin}}
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

  if (loading || softLoad) {
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

export default ReplyRFFOceanPayment;
