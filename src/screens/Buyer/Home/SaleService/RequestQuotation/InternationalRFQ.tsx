import {ActivityIndicator, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import {useMutation, useQuery} from '@apollo/client';
import DropDownPicker from 'react-native-dropdown-picker';
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
  ListCommodityCategoriesQuery,
  ListCommodityCategoriesQueryVariables,
  RFQTYPE,
} from '../../../../../API';
import {createRFQ} from '../../../../../queries/RequestQueries';
import {useAuthContext} from '../../../../../context/AuthContext';
import {referralCode} from '../../../../../utilities/Utils';
import {listCommodityCategories} from '../../../../../queries/ProductQueries';
interface IRequestQuotation {
  title: string;
  requirements: string;
}

const InternationalRFQ = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const {userID} = useAuthContext();

  const {control, handleSubmit}: any = useForm();

  // LIST COMMODITY CATEGORIES
  const {data: newData, loading: newLoad} = useQuery<
    ListCommodityCategoriesQuery,
    ListCommodityCategoriesQueryVariables
  >(listCommodityCategories, {
    pollInterval: 300,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState<any>('');
  const [jobType, setJobType] = useState<any>();
  const [ccID, setCCID] = useState<any>('');

  useFocusEffect(
    useCallback(() => {
      const allCommodityCategories: any =
        newData?.listCommodityCategories?.items.filter(
          (item: any) => !item?._deleted,
        ) || [];
      setJobType(allCommodityCategories);
    }, [newLoad]),
  );

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
        SType: 'RFQ',
        rfqNo: referralCode(),
        title,
        requestCategory: type?.title,
        rfqType: RFQTYPE.INTERNATIONAL,
        commoditycategoryID: ccID,
        description: requirements,
        userID,
      };
      await doCreateRFQ({
        variables: {
          input,
        },
      });
      // console.log('job data', input);
      navigation.navigate('InternationalTypeQuotation', {rfqID: input.id});
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
          placeholder="Add quotation name"
          rules={{
            required: 'Quotation is required',
          }}
          containerStyle={{marginTop: SIZES.margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.radius, height: 50}}
        />

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
              label: 'title',
              value: 'id',
            }}
            open={open}
            showArrowIcon={true}
            placeholder="Select Category"
            showTickIcon={true}
            dropDownDirection="AUTO"
            listMode="MODAL"
            value={value1}
            loading={newLoad}
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
              <FastImage source={icons.down} style={{width: 15, height: 15}} />
            )}
            modalContentContainerStyle={{
              paddingHorizontal: SIZES.padding * 3,
            }}
            modalTitle="Select your category"
            modalTitleStyle={{
              fontWeight: '600',
            }}
            onChangeValue={(value: any) => {
              setCCID(value);
            }}
            onSelectItem={(value: any) => {
              setType(value);
            }}
          />
        </View>

        <FormInput
          label="Detailed Description"
          name="requirements"
          control={control}
          multiline={true}
          placeholder="Add description"
          rules={{
            required: 'Product detail is required',
          }}
          containerStyle={{marginTop: SIZES.padding}}
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

  if (newLoad) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="small" color={COLORS.primary6} />
      </View>
    );
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header
          title={'Request Quotation'}
          contentStyle={{marginBottom: 0}}
          tintColor={COLORS.Neutral1}
        />

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
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          <QuoteType
            image={images?.international}
            quoteType={'International'}
            subQuoteType={'Serving International delivery'}
            info="Advance RFQ  Information"
          />

          {requestForm()}
        </KeyboardAwareScrollView>

        <View style={{justifyContent: 'flex-end'}}>
          <TextButton
            buttonContainerStyle={{
              marginBottom: SIZES.padding,
              marginTop: 0,
            }}
            label="Continue"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </Root>
  );
};

export default InternationalRFQ;
