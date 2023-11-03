import {View, Text} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import {Slider} from '@miblanchard/react-native-slider';
import {
  ALERT_TYPE,
  Root,
  Toast,
} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, constants, icons} from '../../../constants';
import {
  Header,
  QtySection,
  SliderContainer,
  TextButton,
  TextIconButton,
} from '../../../components';
import {HomeStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';

interface IFilter {
  category: string;
  requestType: string;
}

const Filter = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const {control, handleSubmit}: any = useForm();

  const [isSelected, setIsSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(5);
  const [sliderValue, setSliderValue] = useState([800, 500000]);

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState('');
  const [jobType, setJobType] = useState<any>(constants.allCategories);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [type2, setType2] = useState('');
  const [jobType2, setJobType2] = useState<any>(constants.requestType);

  // console.log(isSelected);
  // console.log('slider start value', sliderValue);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 5) {
      setQuantity(quantity - 1);
    }
  };

  const handlePress = () => {
    setIsSelected(!isSelected);
  };

  const onSubmit = async ({category, requestType}: IFilter) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      // console.log('job data', res);
      const filteredItem = {
        isSelected,
        quantity,
        type,
        type2,
        sliderValue,
      };
      navigation.navigate('AllProducts', {filterItem: filteredItem});
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

  function renderForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* Select Category */}
        <Controller
          control={control}
          name="category"
          rules={{
            required: 'Category is required',
          }}
          render={({field: {value, onChange}, fieldState: {error}}: any) => (
            <View style={{marginTop: SIZES.radius}}>
              <Text
                style={{
                  color: COLORS.Neutral1,
                  ...FONTS.body3,
                  fontWeight: '500',
                }}>
                Category
              </Text>
              <DropDownPicker
                schema={{
                  label: 'type',
                  value: 'type',
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
                  borderRadius: SIZES.base,
                  height: 40,
                  marginTop: SIZES.base,
                  borderColor: COLORS.Neutral7,
                  borderWidth: 0.5,
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
                modalTitle="Select your Container type"
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

        {/* Select Request Type */}
        <Controller
          control={control}
          name="requestType"
          rules={{
            required: 'Request type is required',
          }}
          render={({field: {value, onChange}, fieldState: {error}}: any) => (
            <View style={{marginTop: SIZES.padding}}>
              <Text
                style={{
                  color: COLORS.Neutral1,
                  ...FONTS.body3,
                  fontWeight: '500',
                }}>
                Request Type
              </Text>
              <DropDownPicker
                schema={{
                  label: 'type',
                  value: 'type',
                }}
                onChangeValue={onChange}
                open={open2}
                showArrowIcon={true}
                placeholder="Select Request type "
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
                modalTitle="Select your Container type"
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
            </View>
          )}
        />

        {/* Qty Handler */}
        <QtySection
          containerStyle={{marginTop: SIZES.padding}}
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
          qty={quantity}
          title={'Quantity'}
        />

        {/* Price range slider */}
        <View style={{marginTop: SIZES.radius}}>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: '500',
                color: COLORS.Neutral1,
              }}>
              Price Range
            </Text>
          </View>
          <SliderContainer sliderValue={[800, 500000]}>
            <Slider
              animateTransitions={false}
              maximumTrackTintColor={COLORS.Neutral8}
              maximumValue={5000000}
              minimumTrackTintColor={COLORS.primary1}
              minimumValue={100}
              step={0.5}
              thumbTintColor={COLORS.primary1}
              onSlidingComplete={(value: any) => {
                setSliderValue(value);
              }}
            />
          </SliderContainer>
        </View>

        {/* Reviews over 4 star */}
        <View>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              color: COLORS.Neutral1,
            }}>
            Reviews
          </Text>

          <TextIconButton
            label={'& above'}
            containerStyle={{
              borderWidth: 0.6,
              borderColor: isSelected ? COLORS.primary1 : COLORS.Neutral6,
              height: 35,
              width: 130,
              backgroundColor: isSelected ? COLORS.primary10 : 'transparent',
              alignSelf: 'flex-start',
              marginTop: SIZES.radius,
            }}
            labelStyle={{
              ...FONTS.cap1,
              fontWeight: '600',
              marginLeft: 6,
              color: COLORS.Neutral1,
            }}
            icon={icons.four_star}
            iconPosition={'LEFT'}
            iconSize={{width: 60, height: 60}}
            onPress={handlePress}
          />
        </View>
      </View>
    );
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'Filter By'} tintColor={COLORS.Neutral1} />

        <Spinner
          visible={loading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={150}
          extraScrollHeight={150}
          enableOnAndroid={true}>
          {renderForm()}

          <TextButton
            buttonContainerStyle={{
              height: 50,
              width: 300,
              marginBottom: 350,
              marginTop: SIZES.padding * 2,
            }}
            label="Apply"
            labelStyle={{...FONTS.h4}}
            onPress={handleSubmit(onSubmit)}
          />
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};

export default Filter;
