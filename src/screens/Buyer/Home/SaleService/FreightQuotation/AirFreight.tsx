import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import dayjs from 'dayjs';
import DropDownPicker from 'react-native-dropdown-picker';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';
import {useMutation} from '@apollo/client';
import {v4 as uuidV4} from 'uuid';

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
import {createRFF} from '../../../../../queries/RFFQueries';
import {
  CreateRFFInput,
  CreateRFFMutation,
  CreateRFFMutationVariables,
  RFFTYPE,
} from '../../../../../API';
import {useAuthContext} from '../../../../../context/AuthContext';
import {referralCode} from '../../../../../utilities/Utils';
import {cateRFQ} from '../../../../../../types/types';

interface IFreight {
  name: string;
}

const AirFreight = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<AirFreightRouteProp>();
  const {label, text}: any = route.params?.freightType;

  const {userID} = useAuthContext();
  const {control, handleSubmit}: any = useForm();

  const [selectedOption, setSelectedOptions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<any>('');

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState<any>('');
  const [jobType, setJobType] = useState<any>(cateRFQ);

  // CREATE RFF
  const [doCreateRFQ] = useMutation<
    CreateRFFMutation,
    CreateRFFMutationVariables
  >(createRFF);

  const onSubmit = async ({name}: IFreight) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: CreateRFFInput = {
        id: uuidV4(),
        rffNo: referralCode(),
        productName: name,
        requestCategory: type,
        rffType: RFFTYPE.AIR,
        handling: value,
        loadDate: date,
        userID,
      };
      await doCreateRFQ({
        variables: {
          input,
        },
      });
      // console.log('job data', input);
      navigation.navigate('AirFreightPackage', {rffID: input.id});
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
    const selectedDate = dayjs(date).format('YYYY-MM-DD');
    setDate(selectedDate);
    hideDatePicker();
  };

  function isSubmit() {
    return value !== '' && date !== '';
  }

  function requestForm() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.semi_margin,
          marginBottom: 100,
        }}>
        {/* Category Type */}
        <Controller
          control={control}
          name="category"
          rules={{
            required: 'Category type is required',
          }}
          render={({field: {onChange}, fieldState: {error}}: any) => (
            <View>
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
                  value: 'id',
                }}
                open={open}
                showArrowIcon={true}
                placeholder="Select Category"
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                onChangeValue={onChange}
                value={value1}
                items={jobType}
                setOpen={setOpen}
                setValue={setValue1}
                setItems={setJobType}
                style={{
                  borderRadius: SIZES.base,
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
                    ...FONTS.cap1,
                    color: COLORS.Rose4,
                    top: 8,
                    left: 5,
                    marginBottom: 2,
                  }}>
                  This field is required.
                </Text>
              )}
            </View>
          )}
        />

        {/* product name */}
        <FormInput
          label="Product Title"
          name="name"
          control={control}
          placeholder="Add product title"
          rules={{
            required: 'Product title is required',
          }}
          containerStyle={{marginTop: SIZES.semi_margin}}
          inputContainerStyle={{marginTop: SIZES.base}}
        />

        {/* handling */}
        <View style={{marginTop: SIZES.semi_margin}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>Handling</Text>
          <View
            style={{
              marginTop: SIZES.base,
              marginRight: 100,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {constants.handling.map((item: any, index: any) => {
              return (
                <Handling
                  key={`Handling-${index}`}
                  item={item}
                  selected={item.id == selectedOption}
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
    <Root>
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
          bounces={false}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          <FreightType
            freightType={label}
            image={images.airFreight}
            freightDesc={text}
            info="Cargo Details"
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
            label="Continue"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </Root>
  );
};

export default AirFreight;
