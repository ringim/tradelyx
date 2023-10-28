import {ActivityIndicator, Text, View} from 'react-native';
import React, {useState, useCallback} from 'react';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import dayjs from 'dayjs';
import {useMutation, useQuery} from '@apollo/client';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';
import {v4 as uuidV4} from 'uuid';

import {
  FormInput,
  FreightType,
  Header,
  TextButton,
  QuotationProgress2,
  ExpiryDate,
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
import {AirFreightRouteProp} from '../../../../../components/navigation/BuyerNav/type/navigation';
import {
  CreateRFFInput,
  CreateRFFMutation,
  CreateRFFMutationVariables,
  RFFTYPE,
  GetUserQuery,
  GetUserQueryVariables,
  ListCommodityCategoriesQuery,
  ListCommodityCategoriesQueryVariables,
} from '../../../../../API';
import {createRFF} from '../../../../../queries/RequestQueries';
import {useAuthContext} from '../../../../../context/AuthContext';
import {getUser} from '../../../../../queries/UserQueries';
import {referralCode} from '../../../../../utilities/Utils';
import {listCommodityCategories} from '../../../../../queries/ProductQueries';

interface IFreight {
  name: string;
}

const OceanFreight = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<AirFreightRouteProp>();

  const {userID} = useAuthContext();

  const {label, text}: any = route.params?.freightType;

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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<any>('');
  const [selectedOption, setSelectedOptions] = useState('');
  const [value, setValue] = useState(null);

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

  // GET USER
  const {data, loading: onLoad} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {
        id: userID,
      },
    },
  );
  const userInfo: any = data?.getUser;

  // UPDATE REQUEST QUOTATION
  const [doCreateRFF] = useMutation<
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
        SType: 'RFF',
        rffNo: referralCode(),
        requestCategory: type?.title,
        rffType: RFFTYPE.OCEAN,
        commoditycategoryID: ccID,
        packageType: value,
        productName: name,
        loadDate: date,
        userID,
      };

      await doCreateRFF({
        variables: {
          input,
        },
      });
      // console.log('job data', input);
      navigation.navigate('OceanContainerDetails', {rffID: input.id});
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
    const selectedDate = dayjs(date).format('DD, MMMM, YYYY');
    setDate(selectedDate);
    hideDatePicker();
  };

  function requestForm() {
    return (
      <View
        style={{
          marginTop: SIZES.base,
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* Category Type */}

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
            items={jobType}
            loading={newLoad}
            setOpen={setOpen}
            setValue={setValue1}
            setItems={setJobType}
            style={{
              borderRadius: SIZES.radius,
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
              <FastImage source={icons.down} style={{width: 15, height: 15}} />
            )}
            modalContentContainerStyle={{
              paddingHorizontal: SIZES.padding * 3,
            }}
            modalTitle="Select category"
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

        {/* product name */}
        <FormInput
          label="Product Name"
          name="name"
          control={control}
          placeholder="Add product name"
          rules={{
            required: 'Product name is required',
          }}
          containerStyle={{marginTop: SIZES.padding}}
          inputContainerStyle={{marginTop: SIZES.base}}
        />

        {/* Package Type */}
        <View style={{marginTop: SIZES.radius}}>
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

  if (onLoad || newLoad) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.primary6} />
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
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <Spinner
          visible={loading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />
        <QuotationProgress2
          bgColor1={COLORS.primary1}
          bgColor2={COLORS.white}
          bgColor3={COLORS.white}
          color1={COLORS.primary1}
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
            freightType={label}
            freightDesc={text}
            image={images.water}
            info="Cargo Details"
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

export default OceanFreight;
