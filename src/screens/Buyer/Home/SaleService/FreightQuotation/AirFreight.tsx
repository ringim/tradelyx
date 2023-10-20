import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import dayjs from 'dayjs';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';

import {
  FormInput,
  FreightType,
  Handling,
  Header,
  TextButton,
  QuotationProgress2,
  ExpiryDate,
} from '../../../../../components';
import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  icons,
  images,
} from '../../../../../constants';
import {HomeStackNavigatorParamList} from '../../../../../components/navigation/SellerNav/type/navigation';
import {AirFreightRouteProp} from '../../../../../components/navigation/BuyerNav/type/navigation';

interface IFreight {
  name: string;
  handling: string;
}

const AirFreight = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<AirFreightRouteProp>();

  const {label, text}: any = route.params?.freightType;
  // console.log('air freight detail', text, label);

  const {control, handleSubmit}: any = useForm();

  const [selectedOption, setSelectedOptions] = useState('');
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<any>('');

  // console.log(value);

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState('');
  const [jobType, setJobType] = useState<any>(constants.product_categories);

  const onSubmit = async ({handling, name}: IFreight) => {
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

  function requestForm() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* Category Type */}
        <Controller
          control={control}
          name="category"
          rules={{
            required: 'Job type is required',
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
                Product Category
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
                placeholder="Select Category"
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                value={value1}
                items={jobType}
                setOpen={setOpen}
                setValue={setValue1}
                setItems={setJobType}
                style={{
                  borderRadius: SIZES.semi_margin,
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
                modalTitle="Select your category"
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

        {/* product name */}
        <FormInput
          label="Product Name"
          name="name"
          control={control}
          placeholder="Add product name"
          rules={{
            required: 'Product name is required',
          }}
          containerStyle={{marginTop: SIZES.padding}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.radius}}
        />

        {/* handling */}
        <View style={{marginTop: SIZES.semi_margin}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>Handling</Text>
          <View
            style={{
              marginTop: SIZES.radius,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {constants.handling.map((item: any, index: any) => {
              return (
                <Handling
                  key={`Handling-${index}`}
                  item={item}
                  selected={item.id == selectedOption}
                  containerStyle={{
                    marginLeft: index != 0 ? SIZES.radius : 0,
                  }}
                  onPress={() => {
                    setSelectedOptions(item.id);
                    setValue(item.label);
                  }}
                />
              );
            })}
          </View>
        </View>

        {/* select date */}
        <ExpiryDate
          date={date}
          onPress={showDatePicker}
          title={'Ready to Load'}
          containerStyle={{marginTop: SIZES.margin}}
        />
      </View>
    );
  }

  return (
    <AlertNotificationRoot>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'Request for Freight'} />

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

        <QuotationProgress2
          bgColor1={COLORS.primary1}
          bgColor2={COLORS.white}
          bgColor3={COLORS.white}
          color1={COLORS.primary1}
          item3={COLORS.Neutral6}
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
            freightType={label}
            image={images.land}
            freightDesc={text}
            info="Cargo Details"
          />

          {requestForm()}
        </KeyboardAwareScrollView>

        <View style={{justifyContent: 'flex-end'}}>
          <TextButton
            buttonContainerStyle={{marginBottom: SIZES.padding, marginTop: 0}}
            label="Continue"
            onPress={() => navigation.navigate('FreightPackage')}
          />
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default AirFreight;
