import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

import {
  FormInput,
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
  images,
} from '../../../../../constants';
import {HomeStackNavigatorParamList} from '../../../../../components/navigation/SellerNav/type/navigation';

interface IFreight {
  weight: number;
  length: number;
  height: number;
}

const FreightPackage = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const {control, handleSubmit}: any = useForm();

  const [quantity, setQuantity] = useState(10);
  const [selectedOption, setSelectedOptions] = useState('');
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);

  // console.log(value);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 10) {
      setQuantity(quantity - 1);
    }
  };

  const onSubmit = async ({length, height, weight}: IFreight) => {
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
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.margin,
          marginBottom: 100,
        }}>
        {/* Weight*/}
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={{flex: 0.95, justifyContent: 'center'}}>
            <FormInput
              label="Weight"
              name="weight"
              control={control}
              keyboardType={'numeric'}
              placeholder="Add nominal"
              rules={{
                required: 'weight is required',
              }}
              containerStyle={{marginTop: SIZES.margin}}
              labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
              inputContainerStyle={{marginTop: SIZES.radius}}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: COLORS.lightYellow,
              width: 55,
              height: 50,
              top: 48,
              borderRadius: SIZES.semi_margin,
            }}>
            <Text
              style={{
                ...FONTS.h5,
                color: COLORS.Neutral6,
                textAlign: 'center',
              }}>
              Kg
            </Text>
          </View>
        </View>

        {/* Qty Handler */}
        <QtySection
          title={'Quantity'}
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
          qty={quantity}
          containerStyle={{marginTop: SIZES.margin}}
        />

        {/* Package Type */}
        <View style={{marginTop: SIZES.semi_margin}}>
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

        {/* Length */}
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={{flex: 0.95, justifyContent: 'center'}}>
            <FormInput
              label="Dimension"
              name="length"
              control={control}
              keyboardType={'numeric'}
              placeholder="Length"
              rules={{
                required: 'length is required',
              }}
              containerStyle={{marginTop: SIZES.padding}}
              labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
              inputContainerStyle={{marginTop: SIZES.radius}}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: COLORS.lightYellow,
              width: 55,
              height: 50,
              top: 52,
              borderRadius: SIZES.semi_margin,
            }}>
            <Text
              style={{
                ...FONTS.h5,
                color: COLORS.Neutral6,
                textAlign: 'center',
              }}>
              Kg
            </Text>
          </View>
        </View>

        {/* height */}
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={{flex: 0.95, justifyContent: 'center'}}>
            <FormInput
              name="weight"
              control={control}
              keyboardType={'numeric'}
              placeholder="Height"
              rules={{
                required: 'weight is required',
              }}
              containerStyle={{marginTop: -SIZES.radius}}
              labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
              inputContainerStyle={{marginTop: SIZES.base}}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: COLORS.lightYellow,
              width: 55,
              height: 50,
              top: 8,
              borderRadius: SIZES.semi_margin,
            }}>
            <Text
              style={{
                ...FONTS.h5,
                color: COLORS.Neutral6,
                textAlign: 'center',
              }}>
              Kg
            </Text>
          </View>
        </View>

        {/* width */}
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={{flex: 0.95, justifyContent: 'center'}}>
            <FormInput
              name="width"
              control={control}
              keyboardType={'numeric'}
              placeholder="Width"
              rules={{
                required: 'width is required',
              }}
              containerStyle={{marginTop: -SIZES.radius}}
              labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
              inputContainerStyle={{marginTop: SIZES.base, height: 50}}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: COLORS.lightYellow,
              width: 55,
              height: 50,
              top: 8,
              borderRadius: SIZES.semi_margin,
            }}>
            <Text
              style={{
                ...FONTS.h5,
                color: COLORS.Neutral6,
                textAlign: 'center',
              }}>
              Kg
            </Text>
          </View>
        </View>
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
            freightType={'Air Freight'}
            image={images.land}
            freightDesc={'Delivery within 7-10 days'}
            info="Package Details"
          />

          {requestForm()}
        </KeyboardAwareScrollView>

        <View style={{justifyContent: 'flex-end'}}>
          <TextButton
            buttonContainerStyle={{marginBottom: SIZES.padding, marginTop: 0}}
            label="Continue"
            labelStyle={{...FONTS.h4}}
            // onPress={handleSubmit(onSubmit)}
            onPress={() => navigation.navigate('AirPickupProcess')}
          />
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default FreightPackage;
