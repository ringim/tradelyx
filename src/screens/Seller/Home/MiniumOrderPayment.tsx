import {Text, View} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import DropDownPicker from 'react-native-dropdown-picker';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';

import {
  Header,
  TextButton,
  QuotationProgress2,
  SellOfferSuccess,
  FormInput,
  ExpiryDate,
} from '../../../components';
import {COLORS, FONTS, SIZES, constants, icons} from '../../../constants';
import {HomeStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';

interface IFreight {
  moq: string;
  validity: string;
  basePrice: number;
  fobPrice: number;
}

const MiniumOrderPayment = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['1%', '45%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const {control, handleSubmit}: any = useForm();

  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(5);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<any>('');

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState('');
  const [jobType, setJobType] = useState<any>(constants.containerType);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [type3, setType3] = useState('');
  const [jobType3, setJobType3] = useState<any>([
    {
      id: 1,
      type: 'Full Payment',
    },
    {
      id: 2,
      type: 'Advance Payment',
    },
  ]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    const selectedDate = dayjs(date).format('DD, MMMM, YYYY');
    setDate(selectedDate);
    hideDatePicker();
  };

  const onSubmit = async ({basePrice, fobPrice, validity}: IFreight) => {
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

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.radius,
        }}>
        <FormInput
          name="basePrice"
          label="Base Price (Exc. Delivery)"
          control={control}
          keyboardType={'numeric'}
          placeholder="Ex. ₦100,000"
          rules={{
            required: 'price is required',
          }}
          containerStyle={{marginTop: SIZES.padding * 1.2}}
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

        <FormInput
          name="fobPrice"
          label="FOB Price (Inc. Delivery)"
          control={control}
          keyboardType={'numeric'}
          placeholder="Ex. ₦100,000"
          rules={{
            required: 'price is required',
          }}
          containerStyle={{marginTop: SIZES.padding * 1.2}}
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
                  setType3(value?.type);
                }}
              />
              {error && (
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Rose1,
                    top: 14,
                    left: 5,
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
          title="Offer Validity (1-30 days)"
          containerStyle={{marginTop: SIZES.padding}}
        />
      </View>
    );
  }

  return (
    <AlertNotificationRoot>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header
          title={'Create Sell Offer'}
          contentStyle={{marginBottom: 0}}
          tintColor={COLORS.Neutral1}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
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
            <SellOfferSuccess onPress={() => navigation.navigate('Home')} />
          </View>
        </BottomSheetModal>

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
          type={'Packaging'}
          type2={'Payment'}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={150}
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

        <View
          style={{
            justifyContent: 'flex-end',
            top: Platform.OS === 'android' ? 10 : 0,
          }}>
          <TextButton
            buttonContainerStyle={{marginBottom: SIZES.padding, marginTop: 0}}
            label="Post Sell Offer"
            labelStyle={{...FONTS.h4}}
            // onPress={handleSubmit(onSubmit)}
            onPress={handlePresentModalPress}
          />
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default MiniumOrderPayment;
