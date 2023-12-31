import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import {useMutation} from '@apollo/client';
import FastImage from 'react-native-fast-image';

import {
  FreightType,
  Header,
  TextButton,
  QuotationProgress2,
  QtySection,
  ContainerType,
  FormInput,
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
import {updateRFF} from '../../../../../queries/RequestQueries';
import {useAuthContext} from '../../../../../context/AuthContext';

interface IFreight {
  weight: any;
}

const OceanContainerDetails = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<any>();
  const {control, handleSubmit}: any = useForm();

  const {userID} = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(5);
  const [selectedOption, setSelectedOptions] = useState(true);
  const [contType, setContType] = useState('FCL');
  const [selectedOption2, setSelectedOptions2] = useState(true);
  const [contSize, setContSize] = useState('20 FT');

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState('');
  const [jobType, setJobType] = useState<any>(constants.containerType);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // CREATE UPDATE RFF
  const [doUpdateRFQ] = useMutation<
    UpdateRFFMutation,
    UpdateRFFMutationVariables
  >(updateRFF);

  const onSubmit = async ({weight}: IFreight) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: UpdateRFFInput = {
        id: route?.params.rffID,
        container: contType,
        qty: quantity,
        containerSize: contSize,
        containerType: type,
        weight,
        userID,
      };
      await doUpdateRFQ({
        variables: {
          input,
        },
      });
      // console.log('job data', input);
      navigation.navigate('OceanPickupProcess', {rffID: input.id});
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
          marginTop: SIZES.semi_margin,
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* container detail */}
        <View style={{marginTop: SIZES.semi_margin}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>
            Container
          </Text>
          <View
            style={{
              marginTop: SIZES.radius,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {constants.contDetails.map((item: any, index: any) => {
              return (
                <ContainerType
                  key={`ContainerType-${index}`}
                  item={item}
                  selected={item.id == selectedOption}
                  containerStyle={{
                    width: 175,
                  }}
                  onPress={() => {
                    setSelectedOptions(item.id);
                    setContType(item.label);
                  }}
                />
              );
            })}
          </View>
        </View>

        {/* container size */}
        <View style={{marginTop: SIZES.padding}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>
            Container Size
          </Text>
          <View
            style={{
              marginTop: SIZES.radius,
              marginRight: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {constants.contSize.map((item: any, index: any) => {
              return (
                <ContainerType
                  key={`ContainerType-${index}`}
                  item={item}
                  selected={item.id == selectedOption2}
                  containerStyle={{
                    width: 105,
                  }}
                  onPress={() => {
                    setSelectedOptions2(item.id);
                    setContSize(item.label);
                  }}
                />
              );
            })}
          </View>
        </View>

        {/* Category Type */}
        <Controller
          control={control}
          name="containerType"
          rules={{
            required: 'Container type is required',
          }}
          render={({field: {value, onChange}, fieldState: {error}}: any) => (
            <View style={{marginTop: SIZES.padding}}>
              <Text
                style={{
                  color: COLORS.Neutral1,
                  ...FONTS.body3,
                }}>
                Container type
              </Text>
              <DropDownPicker
                schema={{
                  label: 'type',
                  value: 'type',
                }}
                onChangeValue={onChange}
                open={open}
                showArrowIcon={true}
                placeholder="Select"
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
                modalTitle="Select "
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

        {/* Weight */}
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: SIZES.base,
          }}>
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
              containerStyle={{marginTop: SIZES.semi_margin}}
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
              top: 40,
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
          containerStyle={{marginTop: SIZES.padding, marginBottom: 70}}
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
          qty={quantity}
          title="Container Count"
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
          type={'Container'}
          type2={'Pickup'}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          <FreightType
            freightType={'Ocean Freight'}
            image={images.water}
            freightDesc={'Delivery within 20-25 days'}
            info="Container Details"
          />

          {requestForm()}
        </KeyboardAwareScrollView>

        <View style={{justifyContent: 'flex-end'}}>
          <TextButton
            buttonContainerStyle={{marginBottom: SIZES.padding, marginTop: 0}}
            label="Continue"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default OceanContainerDetails;
