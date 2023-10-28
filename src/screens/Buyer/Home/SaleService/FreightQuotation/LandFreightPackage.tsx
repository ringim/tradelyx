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
import FastImage from 'react-native-fast-image';
import {useMutation} from '@apollo/client';

import {
  FreightType,
  QtySection,
  Header,
  TextButton,
  QuotationProgress2,
  PackageType,
  FormInput,
} from '../../../../../components';
import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  images,
} from '../../../../../constants';
import {HomeStackNavigatorParamList} from '../../../../../components/navigation/SellerNav/type/navigation';
import {updateRFF} from '../../../../../queries/RequestQueries';
import {
  UpdateRFFInput,
  UpdateRFFMutation,
  UpdateRFFMutationVariables,
} from '../../../../../API';
import {useAuthContext} from '../../../../../context/AuthContext';

interface IFreight {
  weight: any;
}

const LandFreightPackage = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<any>();

  const {userID} = useAuthContext();

  const {control, handleSubmit}: any = useForm();

  const [quantity, setQuantity] = useState(10);
  const [selectedOption, setSelectedOptions] = useState(true);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);

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
        packageType: value,
        weight,
        qty: quantity,
        userID,
      };
      await doUpdateRFQ({
        variables: {
          input,
        },
      });
      // console.log('job data', input);
      navigation.navigate('LandPickupProcess', {rffID: input.id});
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
        {/* Package Type */}
        <View style={{marginTop: SIZES.padding}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>
            Package Type
          </Text>
          <View
            style={{
              marginTop: SIZES.radius,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {constants.packageType2.map((item: any, index: any) => {
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
                    setValue(item.type);
                  }}
                />
              );
            })}
          </View>
        </View>

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
          containerStyle={{marginTop: SIZES.padding * 1.2}}
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
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default LandFreightPackage;
