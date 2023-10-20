import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

import {
  FreightType,
  QtySection,
  Header,
  TextButton,
  QuotationProgress2,
  PackageType,
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
import FastImage from 'react-native-fast-image';

const LandFreightPackage = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const {control, handleSubmit}: any = useForm();

  const [quantity, setQuantity] = useState(10);
  const [selectedOption, setSelectedOptions] = useState(true);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [productName, setProductName] = useState('');
  const [productNameType, setProductNameType] = useState<any>([
    {
      id: 1,
      type: 'Full Container Load',
    },
    {
      id: 2,
      type: 'Full Truck Load',
    },
    {
      id: 3,
      type: 'Less Truck Load',
    },
  ]);

  // console.log(value);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 10) {
      setQuantity(quantity - 1);
    }
  };

  const onSubmit = async () => {
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
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* Weight*/}
        <Controller
          control={control}
          name="productName"
          rules={{
            required: 'Job type is required',
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
                Type of Load
              </Text>
              <DropDownPicker
                schema={{
                  label: 'type',
                  value: 'type',
                }}
                onChangeValue={onChange}
                open={open}
                showArrowIcon={true}
                placeholder="Select Load Type"
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                value={value1}
                items={productNameType}
                setOpen={setOpen}
                setValue={setValue1}
                setItems={setProductNameType}
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
                modalTitle="Select Load Type"
                modalTitleStyle={{
                  fontWeight: '600',
                }}
                onSelectItem={(value: any) => {
                  setProductName(value?.type);
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

        {/* Package Type */}
        <View style={{marginTop: SIZES.margin}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>
            Package Type
          </Text>
          <View
            style={{
              marginTop: SIZES.radius,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {constants.packageType.map((item: any, index: any) => {
              return (
                <PackageType
                  key={`PackageType-${index}`}
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

        {/* Qty Handler */}
        <QtySection
          title={'Quantity'}
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
          qty={quantity}
        />
      </View>
    );
  }

  return (
    <AlertNotificationRoot>
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

        <QuotationProgress2
          bgColor1={COLORS.primary1}
          bgColor2={COLORS.primary1}
          bgColor3={COLORS.white}
          color1={COLORS.primary1}
          color2={COLORS.primary1}
          item2={COLORS.white}
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
            freightType={'Land Freight'}
            image={images.land}
            freightDesc={'Delivery within 20-25 days'}
            info="Package Details"
          />

          {requestForm()}
        </KeyboardAwareScrollView>

        <View style={{justifyContent: 'flex-end'}}>
          <TextButton
            buttonContainerStyle={{marginBottom: SIZES.padding, marginTop: 0}}
            label="Continue"
            onPress={() => navigation.navigate('LandPickupProcess')}
          />
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default LandFreightPackage;
