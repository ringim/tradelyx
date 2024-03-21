import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import DropDownPicker from 'react-native-dropdown-picker';
import {useMutation} from '@apollo/client';
import {v4 as uuidV4} from 'uuid';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';

import {
  FormInput,
  Header,
  QuotationProgress,
  QuoteType,
  TextButton,
} from '../../../../../components';
import {COLORS, FONTS, SIZES, icons, images} from '../../../../../constants';
import {HomeStackNavigatorParamList} from '../../../../../components/navigation/BuyerNav/type/navigation';
import {
  CreateRFQInput,
  CreateRFQMutation,
  CreateRFQMutationVariables,
  RFQTYPE,
} from '../../../../../API';
import {useAuthContext} from '../../../../../context/AuthContext';
import {referralCode} from '../../../../../utilities/Utils';
import {cateRFQ} from '../../../../../../types/types';
import {createRFQ} from '../../../../../queries/RFQQueries';

interface IRequestQuotation {
  title: string;
  requirements: string;
}

const DomesticRFQ = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const {userID} = useAuthContext();
  const {control, handleSubmit}: any = useForm();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState<any>('');
  const [jobType, setJobType] = useState<any>(cateRFQ);

  // CREATE REQUEST QUOTATION
  const [doCreateRFQ] = useMutation<
    CreateRFQMutation,
    CreateRFQMutationVariables
  >(createRFQ);

  const onSubmit = async ({requirements, title}: IRequestQuotation) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: CreateRFQInput = {
        id: uuidV4(),
        rfqNo: referralCode(),
        title,
        requestCategory: type,
        rfqType: RFQTYPE.DOMESTIC,
        description: requirements,
        userID,
      };
      await doCreateRFQ({
        variables: {
          input,
        },
      });

      // console.log('job data', input);
      navigation.navigate('TypeQuotation', {rfqID: input.id});
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
          marginHorizontal: SIZES.margin,
        }}>
        <FormInput
          label="Title of Quotation"
          name="title"
          control={control}
          placeholder="Title of Quotation "
          rules={{
            required: 'Quotation title is required',
          }}
          containerStyle={{marginTop: SIZES.margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
        />

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
                  marginTop: SIZES.semi_margin,
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
                placeholder="Select Category type"
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                value={value1}
                onChangeValue={onChange}
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

        <FormInput
          label="Detailed Description"
          name="requirements"
          control={control}
          multiline={true}
          placeholder="Provide more details about the product you are 
          looking for"
          rules={{
            required: 'Product detail is required',
          }}
          containerStyle={{marginTop: SIZES.padding, marginBottom: 150}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{
            marginTop: SIZES.radius,
            height: 120,
            padding: SIZES.base,
          }}
        />
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
          bgColor2={COLORS.white}
          bgColor3={COLORS.white}
          bgColor4={COLORS.white}
          color1={COLORS.primary1}
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
            image={images?.domestic}
            quoteType={'Domestic'}
            subQuoteType={'Only serving domestic delivery'}
            info="RFQ Information"
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
    </Root>
  );
};

export default DomesticRFQ;
