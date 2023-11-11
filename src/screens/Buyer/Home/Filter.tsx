import {View, Text, Pressable, ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import {Slider} from '@miblanchard/react-native-slider';
import {useQuery} from '@apollo/client';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, constants, icons} from '../../../constants';
import {
  FormInput,
  Header,
  QtySection,
  SliderContainer,
  TextButton,
} from '../../../components';
import {HomeStackNavigatorParamList} from '../../../components/navigation/BuyerNav/type/navigation';
import {
  AccountCategoryType,
  ListCategoriesQuery,
  ListCategoriesQueryVariables,
  ListUsersQuery,
  ListUsersQueryVariables,
} from '../../../API';
import {listCategories} from '../../../queries/ProductQueries';
import {listUsers} from '../../../queries/UserQueries';

interface IFilter {
  address: string;
}

const Filter = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<any>();

  const {control, handleSubmit, setValue}: any = useForm();

  // LIST COMMODITY CATEGORIES
  const {data: newData, loading: newLoad} = useQuery<
    ListCategoriesQuery,
    ListCategoriesQueryVariables
  >(listCategories, {
    pollInterval: 300,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  // LIST SUPPLIERS
  const {data: onData, loading: onLoad} = useQuery<
    ListUsersQuery,
    ListUsersQueryVariables
  >(listUsers, {
    variables: {limit: 4},
    pollInterval: 300,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  const [address, setAddress] = useState<any>('');
  const [isSelected, setIsSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(10);
  const [sliderValue, setSliderValue] = useState([800, 500000]);

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState('');
  const [jobType, setJobType] = useState<any>();

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [type2, setType2] = useState('');
  const [jobType2, setJobType2] = useState<any>();

  // console.log(isSelected);
  console.log('slider start value', sliderValue);
  console.log('category ', type);
  console.log('suppliers ', type2);
  console.log('address ', address?.description?.formatted_address);
  console.log('quantity', quantity);

  useEffect(() => {
    let unmounted = false;
    if (route.params?.userAddress) {
      setAddress(route.params?.userAddress);
      setValue('address', address?.description?.formatted_address);
    }
    return () => {
      unmounted = true;
    };
  }, [
    route.params?.userAddress,
    setValue,
    address?.description?.formatted_address,
  ]);

  useFocusEffect(
    useCallback(() => {
      const allCommodityCategories: any =
        newData?.listCategories?.items.filter((item: any) => !item?._deleted) ||
        [];
      setJobType(allCommodityCategories);
    }, [newLoad]),
  );

  useFocusEffect(
    useCallback(() => {
      const suppliers: any =
        onData?.listUsers?.items
          .filter(sup => sup?.accountType === AccountCategoryType?.SELLER)
          .filter((item: any) => !item?._deleted) || [];
      setJobType2(suppliers);
    }, [onLoad]),
  );

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

  const onSubmit = async ({address}: IFilter) => {
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
        <View style={{marginTop: SIZES.radius}}>
          <Text
            style={{
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
            placeholder="Select"
            showTickIcon={true}
            dropDownDirection="AUTO"
            listMode="MODAL"
            loading={newLoad}
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
              <FastImage source={icons.down} style={{width: 15, height: 15}} />
            )}
            modalContentContainerStyle={{
              paddingHorizontal: SIZES.padding * 3,
            }}
            modalTitle="Select category"
            modalTitleStyle={{
              fontWeight: '600',
            }}
            onSelectItem={(value: any) => {
              setType(value?.title);
            }}
          />
        </View>

        {/* Supplier Type */}
        <View style={{marginTop: SIZES.padding * 1.2}}>
          <Text
            style={{
              color: COLORS.Neutral1,
              ...FONTS.body3,
              fontWeight: '500',
            }}>
            Suppliers
          </Text>
          <DropDownPicker
            schema={{
              label: 'type',
              value: 'type',
            }}
            open={open2}
            showArrowIcon={true}
            placeholder="Select"
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
            modalTitle="Select Seller"
            modalTitleStyle={{
              fontWeight: '600',
            }}
            onSelectItem={(value: any) => {
              setType2(value?.businessName);
            }}
          />
        </View>

        {/* Price range slider */}
        <View style={{marginTop: SIZES.padding * 1.2}}>
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

        {/* location */}
        <Pressable
          style={{flexDirection: 'row', justifyContent: 'space-between'}}
          onPress={() => navigation.navigate('SearchAddressFilter')}>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              source={icons.location}
              tintColor={COLORS.secondary1}
              style={{width: 24, height: 24, top: 25}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <Pressable
            style={{
              flex: 1,
              marginLeft: SIZES.semi_margin,
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('SearchAddressFilter')}>
            <FormInput
              label="By Location"
              name="address"
              control={control}
              editable={false}
              placeholder="Add your address"
              rules={{
                required: 'Address is required',
              }}
              containerStyle={{marginTop: SIZES.margin}}
              labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
              inputContainerStyle={{marginTop: SIZES.radius}}
              onPress={() => navigation.navigate('SearchAddressFilter')}
            />
          </Pressable>
        </Pressable>

        {/* Qty Handler */}
        <QtySection
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
          qty={quantity}
          title={'Quantity'}
        />
      </View>
    );
  }

  if (newLoad || onLoad) {
    <ActivityIndicator
      style={{flex: 1, justifyContent: 'center'}}
      size={'large'}
      color={COLORS.primary6}
    />;
  }

  return (
    <AlertNotificationRoot>
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
          extraHeight={100}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          {renderForm()}
        </KeyboardAwareScrollView>

        {/* button */}
        <View style={{justifyContent: 'flex-end'}}>
          <TextButton
            buttonContainerStyle={{marginBottom: SIZES.padding, marginTop: 0}}
            label="Apply"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default Filter;
