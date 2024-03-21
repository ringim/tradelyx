import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import {useMutation} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {
  FormInput,
  FreightType,
  Header,
  TextButton,
  QuotationProgress2,
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
import {
  UpdateRFFInput,
  UpdateRFFMutation,
  UpdateRFFMutationVariables,
} from '../../../../../API';
import {updateRFF} from '../../../../../queries/RFFQueries';
import FastImage from 'react-native-fast-image';
import DropDownPicker from 'react-native-dropdown-picker';

interface IFreight {
  weight: any;
  length: number;
  height: number;
  qty: number;
  width: number;
}

const AirFreightPackage = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<any>();

  const {control, handleSubmit}: any = useForm();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState('');
  const [jobType, setJobType] = useState<any>(constants.packageType);

  // CREATE UPDATE RFF
  const [doUpdateRFQ] = useMutation<
    UpdateRFFMutation,
    UpdateRFFMutationVariables
  >(updateRFF);

  const onSubmit = async ({length, height, qty, width, weight}: IFreight) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: UpdateRFFInput = {
        id: route?.params.rffID,
        weight,
        length,
        height,
        width,
        qty,
        packageType: type,
      };
      await doUpdateRFQ({
        variables: {
          input,
        },
      });
      // console.log('job data', input);
      navigation.navigate('AirPickupProcess', {rffID: input.id});
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
          marginHorizontal: SIZES.semi_margin,
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
              placeholder="Add weight"
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
        <FormInput
          label="Quantity"
          name="qty"
          control={control}
          rules={{
            required: 'quantity is required',
          }}
          keyboardType={'numeric'}
          placeholder="Add quantity"
          containerStyle={{marginTop: SIZES.semi_margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.base}}
        />

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
                  marginTop: SIZES.margin,
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
                placeholder="Select package type"
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
              width: 70,
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
              meters
            </Text>
          </View>
        </View>

        {/* height */}
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={{flex: 0.95, justifyContent: 'center'}}>
            <FormInput
              name="height"
              control={control}
              keyboardType={'numeric'}
              placeholder="Height"
              rules={{
                required: 'height is required',
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
              width: 70,
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
              meters
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
              width: 70,
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
              meters
            </Text>
          </View>
        </View>
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
          bounces={false}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          <FreightType
            freightType={'Air Freight'}
            image={images.airFreight}
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
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </Root>
  );
};

export default AirFreightPackage;
