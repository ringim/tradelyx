import {Platform, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import DropDownPicker from 'react-native-dropdown-picker';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import {useMutation} from '@apollo/client';
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
} from '../../../../../components';
import {COLORS, FONTS, SIZES, constants, icons} from '../../../../../constants';
import {HomeStackNavigatorParamList} from '../../../../../components/navigation/SellerNav/type/navigation';
import {
  UpdateSellOfferInput,
  UpdateSellOfferMutation,
  UpdateSellOfferMutationVariables,
} from '../../../../../API';
import {updateSellOffer} from '../../../../../queries/RequestQueries';

interface IFreight {
  moq: string;
  paymentMethod: string;
  basePrice: number;
  fobPrice: number;
  qty: number;
  paymentType: string;
}

const EditSellOfferPricing = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<any>();

  const {control, setValue, handleSubmit}: any = useForm();

  const sellOfferDetails = route?.params?.sellOffer;
  console.log(sellOfferDetails);

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['48%', '48%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    return index;
  }, []);

  const [loading, setLoading] = useState(false);
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
    const selectedDate = dayjs(date).format('DD, MMMM, YYYY');
    setDate(selectedDate);
    hideDatePicker();
  };

  // UPDATE REQUEST QUOTATION
  const [doCreateSellOffer] = useMutation<
    UpdateSellOfferMutation,
    UpdateSellOfferMutationVariables
  >(updateSellOffer);

  const onSubmit = async ({basePrice, fobPrice, qty}: IFreight) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: UpdateSellOfferInput = {
        id: sellOfferDetails.id,
        basePrice,
        fobPrice,
        paymentType: type3,
        paymentMethod: type2,
        offerValidity: date,
        qtyMeasure: qty,
        unit: type,
      };

      await doCreateSellOffer({
        variables: {
          input,
        },
      });
      // console.log('job data', input);
      handlePresentModalPress();
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
    if (sellOfferDetails) {
      setValue('qty', sellOfferDetails?.qtyMeasure);
      setValue('unit', sellOfferDetails?.unit);
      setValue('basePrice', sellOfferDetails?.basePrice);
      setValue('paymentMethod', sellOfferDetails?.paymentMethod);
      setValue('fobPrice', sellOfferDetails?.fobPrice);
      setValue('paymentType', sellOfferDetails?.paymentType);
    }
  }, [sellOfferDetails, setValue]);

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
              required: 'price is required',
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
              required: 'Quantity type is required',
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
            required: 'price is required',
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

        <FormInput
          name="fobPrice"
          label="FOB Price (Inc. Delivery)"
          control={control}
          keyboardType={'numeric'}
          placeholder="Ex. ₦100,000"
          rules={{
            required: 'price is required',
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
          title="Offer Validity (1-30 days)"
          containerStyle={{marginTop: SIZES.padding, marginBottom: 100}}
        />
      </View>
    );
  }

  return (
    <AlertNotificationRoot>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header
          title={'Edit Sell Offer Payment'}
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
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default EditSellOfferPricing;
