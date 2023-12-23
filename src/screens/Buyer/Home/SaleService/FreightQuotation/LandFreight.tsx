import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import DropDownPicker from 'react-native-dropdown-picker';
import dayjs from 'dayjs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {useMutation} from '@apollo/client';
import FastImage from 'react-native-fast-image';
import {v4 as uuidV4} from 'uuid';

import {
  FormInput,
  FreightType,
  Header,
  TextButton,
  QuotationProgress2,
  ExpiryDate,
} from '../../../../../components';
import {COLORS, FONTS, SIZES, icons, images} from '../../../../../constants';
import {
  AirFreightRouteProp,
  HomeStackNavigatorParamList,
} from '../../../../../components/navigation/BuyerNav/type/navigation';
import {createRFF} from '../../../../../queries/RFFQueries';
import {
  CreateRFFInput,
  CreateRFFMutation,
  CreateRFFMutationVariables,
  RFFTYPE,
} from '../../../../../API';
import {useAuthContext} from '../../../../../context/AuthContext';
import {referralCode} from '../../../../../utilities/Utils';
import {crateTypes} from '../../../../../../types/types';

interface IFreight {
  name: string;
}

const LandFreight = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<AirFreightRouteProp>();

  const {userID} = useAuthContext();

  // console.log(route.params?.freightType);
  const {label, text}: any = route.params?.freightType;

  const {control, handleSubmit}: any = useForm();

  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<any>('');

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState<any>('');
  const [jobType, setJobType] = useState<any>(crateTypes);

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
        rffType: RFFTYPE.LAND,
        loadDate: date,
        userID,
      };
      await doCreateRFQ({
        variables: {
          input,
        },
      });
      // console.log('job data', input);
      navigation.navigate('LandFreightPackage', {rffID: input.id});
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
    const selectedDate = dayjs(date).format(('YYYY-MM-DD'));
    setDate(selectedDate);
    hideDatePicker();
  };

  function isSubmit() {
    return date !== '';
  }

  function requestForm() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.semi_margin,
          marginBottom: 100
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
                onChangeValue={onChange}
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

        {/* product name */}
        <FormInput
          label="Product Title"
          name="name"
          control={control}
          placeholder="Add Product Title"
          rules={{
            required: 'Product Title is required',
          }}
          containerStyle={{marginTop: SIZES.padding}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.radius}}
        />

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

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
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
            image={images.land}
            freightType={label}
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

export default LandFreight;
