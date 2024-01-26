import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {v4 as uuidV4} from 'uuid';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import {useMutation, useQuery} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {
  ExpiryDate,
  Header,
  LoadingIndicator,
  QuotationProgress,
  QuoteType,
  TextButton,
} from '../../../../../components';
import {
  COLORS,
  FONTS,
  images,
  SIZES,
  icons,
  constants,
} from '../../../../../constants';
import {HomeStackNavigatorParamList} from '../../../../../components/navigation/SellerNav/type/navigation';
import {useAuthContext} from '../../../../../context/AuthContext';
import {
  NotificationType,
  RFQTYPE,
  UpdateRFQInput,
  UpdateRFQMutation,
  UpdateRFQMutationVariables,
  CreateNotificationMutation,
  CreateNotificationMutationVariables,
  CreateNotificationInput,
  GetRFQQuery,
  GetRFQQueryVariables,
} from '../../../../../API';
import {getRFQ, updateRFQ} from '../../../../../queries/RFQQueries';
import {createNotification} from '../../../../../queries/NotificationQueries';

const InternationalPaymentQuotation = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<any>();
  const {userID} = useAuthContext();

  const {control, handleSubmit}: any = useForm();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState('');
  const [jobType, setJobType] = useState<any>(constants.payType);

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

  // GET RFQ DETAIL
  const {data, loading: onLoad} = useQuery<GetRFQQuery, GetRFQQueryVariables>(
    getRFQ,
    {variables: {id: route?.params.rfqID}},
  );
  const rfqDetail = data?.getRFQ?.title;

  // UPDATE REQUEST QUOTATION
  const [doUpdateRFQ] = useMutation<
    UpdateRFQMutation,
    UpdateRFQMutationVariables
  >(updateRFQ);

  const onSubmit = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: UpdateRFQInput = {
        id: route?.params.rfqID,
        SType: 'RFQ',
        expiryDate: date,
        paymentMethod: type,
        userID,
      };

      await doUpdateRFQ({
        variables: {
          input,
        },
      });
      // console.log('job data', input);
      await createNotify();
      navigation.reset({
        index: 0,
        routes: [
          {name: 'SuccessService', params: {type: 'International Request'}},
        ],
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

  // CREATE INTERNATIONAL RFQ NOTIFICATION
  const [doCreateNotification] = useMutation<
    CreateNotificationMutation,
    CreateNotificationMutationVariables
  >(createNotification);
  const createNotify = async () => {
    try {
      const input: CreateNotificationInput = {
        id: uuidV4(),
        type: NotificationType?.RFQ,
        readAt: 0,
        actorID: userID,
        requestType: RFQTYPE?.INTERNATIONAL,
        SType: 'NOTIFICATION',
        notificationRFQId: route?.params.rfqID,
        title: 'International Quotation Request',
        description: `Buyer's Order - ${rfqDetail}`,
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

  function requestForm() {
    return (
      <View
        style={{
          marginTop: -SIZES.semi_margin,
          marginHorizontal: SIZES.semi_margin,
          marginBottom: 100,
        }}>
        {/* Date Select */}
        <ExpiryDate date={date} onPress={showDatePicker} title={'RFQ Expiry'} />

        <View
          style={{
            marginTop: SIZES.padding * 1.2,
          }}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.Neutral1,
            }}>
            Choose Payment Terms
          </Text>
        </View>

        {/* Payment type */}
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
                  marginTop: SIZES.margin,
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
                open={open}
                showArrowIcon={true}
                placeholder="Select Payment Type"
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
          title={'Request for Quotation'}
          contentStyle={{marginBottom: 0}}
          tintColor={COLORS.Neutral1}
        />

        <Spinner
          visible={loading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <QuotationProgress
          bgColor1={COLORS.primary1}
          bgColor2={COLORS.primary1}
          bgColor3={COLORS.primary1}
          bgColor4={COLORS.primary1}
          color1={COLORS.primary1}
          color2={COLORS.primary1}
          color3={COLORS.primary1}
          color4={COLORS.primary1}
          item2={COLORS.white}
          item3={COLORS.white}
          item4={COLORS.white}
        />

        <QuoteType
          image={images?.international}
          quoteType={'International'}
          subQuoteType={'Serving International delivery'}
        />
        {requestForm()}
      </View>

      <View style={{justifyContent: 'flex-end', backgroundColor: COLORS.white}}>
        <TextButton
          buttonContainerStyle={{marginBottom: SIZES.padding, marginTop: 0}}
          label="Send"
          labelStyle={{...FONTS.h4}}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Root>
  );
};

export default InternationalPaymentQuotation;
