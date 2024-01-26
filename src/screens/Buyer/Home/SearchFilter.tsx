import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, TextInput} from 'react-native';
import {useQuery} from '@apollo/client';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Slider} from '@miblanchard/react-native-slider';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {
  Header,
  SliderContainer,
  TextButton,
  TextIconButton,
} from '../../../components';
import {
  ProductByDateQuery,
  ProductByDateQueryVariables,
  ModelSortDirection,
} from '../../../API';
import {productByDate} from '../../../queries/ProductQueries';
import {crateTypes} from '../../../../types/types';

const SearchFilter = () => {
  const navigation = useNavigation<any>();

  // LIST PRODUCTS
  const {data, loading: load} = useQuery<
    ProductByDateQuery,
    ProductByDateQueryVariables
  >(productByDate, {
    pollInterval: 500,
    variables: {
      SType: 'JOB',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const allProducts: any = data?.productByDate?.items
    .filter(st => st?.SType === 'JOB')
    .filter(((item: any) => !item?._deleted) || []);

  const mergedSearchType = allProducts;
  const [itemSelected, setItemSelect] = useState<any>('');
  const [dataList, setDataList] = useState<any>(mergedSearchType);
  const [address, setAddress] = useState<any>(null);
  const [productName, setProductName] = useState<any>('');
  const [qty, setQty] = useState<any>(null);
  const [sliderValue, setSliderValue] = useState([50000, 100000000]);
  const [isSelected, setIsSelected] = useState(false);

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState('');
  const [jobType, setJobType] = useState<any>(crateTypes);

  // console.log('filtered products', dataList);

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
              category: string;
              storeName: string;
              basePrice: number;
              title: string;
              storeAddress: string | any[];
              quantity: number;
            }) =>
              cp?.category === type &&
              cp?.title?.includes(productName) &&
              cp?.basePrice >= sliderValue[0] &&
              cp?.basePrice <= sliderValue[1] &&
              cp?.storeAddress?.includes(address) &&
              cp?.quantity >= qty,
          ),
        ]);
      }
      return () => {
        isCurrent = false;
      };
    };

    handleFunc();
  }, [load, itemSelected]);

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
              label: 'type',
              value: 'id',
              icon: 'icon',
            }}
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
              setType(value?.type);
              setItemSelect(value?.type);
            }}
          />
        </View>

        {/* Product Title */}
        <View style={{marginTop: SIZES.padding}}>
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
            onEndEditing={() => setItemSelect(qty)}
            returnKeyType="done"
          />
        </View>

        {/* Price range slider */}
        <View style={{marginTop: SIZES.semi_margin}}>
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
          onPress={() =>
            navigation.navigate('AllProducts', {items: dataList, loading: load})
          }
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SearchFilter;
