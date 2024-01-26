import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import FastImage from 'react-native-fast-image';
import DropDownPicker from 'react-native-dropdown-picker';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {useMutation} from '@apollo/client';

import {
  FormInput,
  Header,
  QuotationProgress,
  QuoteType,
  Tags as RenderTags,
  RequestTags,
  TextButton,
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
  UpdateRFQInput,
  UpdateRFQMutation,
  UpdateRFQMutationVariables,
} from '../../../../../API';
import {updateRFQ} from '../../../../../queries/RFQQueries';
import {useAuthContext} from '../../../../../context/AuthContext';
import { formatNumericValue } from '../../../../../utilities/service';

interface IProductQuotation {
  name: string;
  qty: number;
}

const InternationalTypeQuotation = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<any>();

  const {userID} = useAuthContext();
  const {control, handleSubmit}: any = useForm();

  const [budget, setBudget] = useState<any>('');
  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState('');
  const [jobType, setJobType] = useState<any>(constants.filterUnit);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [type2, setType2] = useState('');
  const [jobType2, setJobType2] = useState<any>(constants.buyFrequency);
  const [initialTags, setInitialTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (input: any) => {
    const formattedValue = formatNumericValue(input, budget);
    setBudget(formattedValue);
  };

  const onTagPress = (deleted: any) => {
    return deleted ? 'deleted' : 'not deleted';
  };

  const onChangeTags = (tags: any) => {
    setInitialTags(tags);
  };

  const renderTag = ({tag, index, onPress}: any) => {
    return <RenderTags key={index} tag={tag} onPress={onPress} />;
  };

  // UPDATE REQUEST QUOTATION
  const [doUpdateRFQ] = useMutation<
    UpdateRFQMutation,
    UpdateRFQMutationVariables
  >(updateRFQ);

  const onSubmit = async ({name, qty}: IProductQuotation) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: UpdateRFQInput = {
        id: route?.params.rfqID,
        productName: name,
        tags: initialTags,
        qty,
        budget,
        unit: type,
        buyFrequency: type2,
        userID,
      };
      await doUpdateRFQ({
        variables: {
          input,
        },
      });
      // console.log('job data', input);
      navigation.navigate('InternationalEngagementTerms', {rfqID: input.id});
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

  function isSubmit() {
    return budget !== '';
  }

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.margin,
          marginBottom: 150,
        }}>
        <FormInput
          label="Product Title"
          name="name"
          control={control}
          placeholder="Add Product Title"
          rules={{
            required: 'Product name is required',
          }}
          containerStyle={{marginTop: SIZES.margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.radius}}
        />

        {/* Tags or Keywords */}
        <RequestTags
          initialTags={initialTags}
          onChangeTags={onChangeTags}
          onTagPress={onTagPress}
          renderTag={renderTag}
          title={'Tags or Keywords'}
        />

        {/* Qty Handler */}
        <FormInput
          label="Quantity"
          name="qty"
          control={control}
          rules={{
            required: 'quantity is required',
          }}
          keyboardType={'numeric'}
          placeholder="Add Product Quantity"
          containerStyle={{marginTop: SIZES.semi_margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.radius}}
        />

        {/* Unit Type */}
        <Controller
          control={control}
          name="unit"
          rules={{
            required: 'Unit is required',
          }}
          render={({field: {value, onChange}, fieldState: {error}}: any) => (
            <View>
              <Text
                style={{
                  marginTop: SIZES.semi_margin,
                  color: COLORS.Neutral1,
                  ...FONTS.body3,
                }}>
                Unit
              </Text>
              <DropDownPicker
                schema={{
                  label: 'type',
                  value: 'type',
                }}
                onChangeValue={onChange}
                open={open}
                showArrowIcon={true}
                placeholder="Select Unit type"
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

        {/* Frequency Type */}
        <Controller
          control={control}
          name="frequency"
          rules={{
            required: 'Buy frequency is required',
          }}
          render={({field: {value, onChange}, fieldState: {error}}: any) => (
            <View style={{marginTop: SIZES.radius}}>
              <Text
                style={{
                  marginTop: SIZES.semi_margin,
                  color: COLORS.Neutral1,
                  ...FONTS.body3,
                }}>
                Buying Frequency
              </Text>
              <DropDownPicker
                schema={{
                  label: 'type',
                  value: 'type',
                }}
                onChangeValue={onChange}
                open={open2}
                showArrowIcon={true}
                placeholder="Choose Buy Frequency"
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
                modalTitle="Select buying frequency"
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

        {/* Budget */}
        <View
          style={{
            marginTop: SIZES.padding,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              color: COLORS.Neutral1,
            }}>
            Budget ($)
          </Text>
          <TextInput
            autoFocus={false}
            onChangeText={handleInputChange}
            value={budget}
            placeholder="Ex. $10,000"
            keyboardType="numeric"
            placeholderTextColor={COLORS.gray}
            style={{
              ...FONTS.body3,
              color: COLORS.Neutral1,
              marginTop: SIZES.radius,
              height: 50,
              fontWeight: '500',
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.base,
              borderWidth: 0.5,
              borderColor: COLORS.Neutral7,
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'Request for Quotation'} />

        <Spinner
          visible={loading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <QuotationProgress
          bgColor1={COLORS.primary1}
          bgColor2={COLORS.primary1}
          bgColor3={COLORS.white}
          bgColor4={COLORS.white}
          color1={COLORS.primary1}
          color2={COLORS.primary1}
          item2={COLORS.white}
          item4={COLORS.Neutral6}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          bounces={false}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          <QuoteType
            image={images?.international}
            quoteType={'International'}
            subQuoteType={'Serving International delivery'}
            info="RFQ Information"
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

export default InternationalTypeQuotation;
