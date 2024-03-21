import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, TextInput} from 'react-native';
import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Slider} from '@miblanchard/react-native-slider';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {
  ExpiryDate,
  Header,
  SliderContainer,
  TextButton,
  TextIconButton,
} from '../../../components';
import {
  SellOffersByDateQuery,
  SellOffersByDateQueryVariables,
  ModelSortDirection,
} from '../../../API';
import {sellOffersByDate} from '../../../queries/SellOfferQueries';

const SearchFilter2 = () => {
  const navigation = useNavigation<any>();

  // LIST SELL OFFERS
  const {data, loading: load} = useQuery<
    SellOffersByDateQuery,
    SellOffersByDateQueryVariables
  >(sellOffersByDate, {
    pollInterval: 500,
    variables: {
      SType: 'SELLOFFER',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const allSellOffers: any = data?.sellOffersByDate?.items
    .filter(st => st?.SType === 'SELLOFFER')
    .filter(((item: any) => !item?._deleted) || []);

  const mergedSearchType = allSellOffers;
  const currentDate = dayjs();

  const [itemSelected, setItemSelect] = useState<any>('');
  const [dataList, setDataList] = useState<any>(mergedSearchType);
  const [address, setAddress] = useState<any>(null);
  const [productName, setProductName] = useState<any>('');
  const [sellOfferID, setSellOfferID] = useState<any>('');
  const [qty, setQty] = useState<any>(null);
  const [sliderValue, setSliderValue] = useState([50000, 100000000]);
  const [isSelected, setIsSelected] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<any>('');

  // console.log('filtered products', dataList);
  // console.log(date);

  const handlePress = () => {
    setIsSelected(!isSelected);
  };

  useEffect(() => {
    const handleFunc = () => {
      let isCurrent = true;
      if (itemSelected === '' && isCurrent) {
        setDataList(mergedSearchType);
      } else {
        setDataList([
          ...mergedSearchType.filter(
            (cp: {
              sellOfferID: string;
              basePrice: number;
              productName: string;
              storeAddress: string | any[];
              qtyMeasure: number;
            }) =>
              cp?.sellOfferID?.includes(sellOfferID) &&
              cp?.productName?.includes(productName) &&
              cp?.basePrice >= sliderValue[0] &&
              cp?.basePrice <= sliderValue[1] &&
              cp?.storeAddress?.includes(address) &&
              cp?.qtyMeasure >= qty,
          ),
        ]);
      }
      return () => {
        isCurrent = false;
      };
    };

    handleFunc();
  }, [load, itemSelected]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    const selectedDate = dayjs(date).format('YYYY-MM-DD');
    setDate(selectedDate);
    hideDatePicker();
  };

  function renderForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* Sell Offer ID */}
        <View style={{marginTop: SIZES.padding}}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              color: COLORS.Neutral1,
            }}>
            Sell Offer ID
          </Text>
          <TextInput
            style={{
              ...FONTS.body3,
              color: COLORS.Neutral1,
              marginTop: SIZES.base,
              height: 50,
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.base,
              borderWidth: 0.5,
              borderColor: COLORS.Neutral7,
            }}
            value={sellOfferID}
            placeholder="Add sell offer ID"
            placeholderTextColor={COLORS.Neutral7}
            onChangeText={setSellOfferID}
            onEndEditing={() => setItemSelect(qty)}
            returnKeyType="done"
          />
        </View>

        {/* Product Title */}
        <View style={{marginTop: SIZES.radius}}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              color: COLORS.Neutral1,
            }}>
            Product Title
          </Text>
          <TextInput
            style={{
              // flex: 1,
              ...FONTS.body3,
              color: COLORS.Neutral1,
              marginTop: SIZES.base,
              height: 50,
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.base,
              borderWidth: 0.5,
              borderColor: COLORS.Neutral7,
            }}
            value={productName}
            placeholder="Add product name"
            placeholderTextColor={COLORS.Neutral7}
            onChangeText={setProductName}
            onEndEditing={() => setItemSelect(productName)}
            returnKeyType="done"
          />
        </View>

        {/* select date */}
        <ExpiryDate
          date={date}
          onPress={showDatePicker}
          title={'Expiry Date'}
          containerStyle={{marginTop: SIZES.radius}}
        />

        {/* Price range slider */}
        <View style={{marginTop: SIZES.margin}}>
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
          <SliderContainer sliderValue={sliderValue}>
            <Slider
              animateTransitions={false}
              maximumTrackTintColor={COLORS.Neutral8}
              maximumValue={100000000}
              minimumTrackTintColor={COLORS.primary1}
              minimumValue={50000}
              step={0.5}
              thumbTintColor={COLORS.primary1}
              onSlidingComplete={(value: any) => {
                setSliderValue(value);
                setItemSelect(value);
              }}
            />
          </SliderContainer>
        </View>

        {/* location */}
        <Pressable
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: -15,
          }}
          onPress={() => navigation.navigate('SearchAddressFilter')}>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              source={icons.location}
              tintColor={COLORS.secondary1}
              style={{width: 24, height: 24, top: 12}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: SIZES.semi_margin,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: '500',
                color: COLORS.Neutral1,
                marginTop: SIZES.radius,
              }}>
              Search location
            </Text>
            <TextInput
              style={{
                ...FONTS.body3,
                color: COLORS.Neutral1,
                marginTop: SIZES.base,
                height: 50,
                paddingHorizontal: SIZES.radius,
                borderRadius: SIZES.base,
                borderWidth: 0.5,
                borderColor: COLORS.Neutral7,
              }}
              value={address}
              placeholder="Search address"
              placeholderTextColor={COLORS.Neutral7}
              onChangeText={setAddress}
              onKeyPress={() => setItemSelect(address)}
              returnKeyType="done"
            />
          </View>
        </Pressable>

        {/* Qty Handler */}
        <View style={{marginTop: SIZES.semi_margin}}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              color: COLORS.Neutral1,
            }}>
            Quantity
          </Text>
          <TextInput
            style={{
              // flex: 1,
              ...FONTS.body3,
              color: COLORS.Neutral1,
              marginTop: SIZES.base,
              height: 50,
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.base,
              borderWidth: 0.5,
              borderColor: COLORS.Neutral7,
            }}
            value={qty}
            placeholder="Add your quantity"
            placeholderTextColor={COLORS.Neutral7}
            keyboardType={'numeric'}
            onChangeText={setQty}
            onEndEditing={() => setItemSelect(qty)}
            returnKeyType="done"
          />
        </View>

        {/* 4 star rating button */}
        <View style={{marginTop: SIZES.semi_margin}}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              color: COLORS.Neutral1,
            }}>
            Reviews
          </Text>

          <TextIconButton
            label={'& above'}
            containerStyle={{
              borderWidth: 0.6,
              borderColor: isSelected ? COLORS.primary1 : COLORS.Neutral6,
              height: 40,
              width: 130,
              backgroundColor: isSelected ? COLORS.primary10 : 'transparent',
              alignSelf: 'flex-start',
              marginTop: SIZES.base,
            }}
            labelStyle={{
              ...FONTS.cap1,
              fontWeight: '600',
              marginLeft: 6,
              color: COLORS.Neutral1,
            }}
            icon={icons.four_star}
            iconPosition={'LEFT'}
            iconSize={{width: 60, height: 60}}
            onPress={handlePress}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* Header */}
      <Header
        title={'Filter By'}
        tintColor={COLORS.Neutral1}
        contentStyle={{paddingTop: 20, height: 60}}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        extraHeight={100}
        bounces={false}
        extraScrollHeight={100}
        enableOnAndroid={true}>
        {/* Contents */}
        {renderForm()}

        <TextButton
          buttonContainerStyle={{
            marginTop: 50,
            marginBottom: 200,
          }}
          label={`Show ${dataList?.length} results`}
          // onPress={() =>
          //   navigation.navigate('Explore', {items: dataList, loading: load})
          // }
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SearchFilter2;
