import {View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  dummyData,
  images,
} from '../../../constants';
import {HomeStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {
  Header,
  SearchItem3,
  SearchItem2,
  SearchBox3,
  SearchModal,
  SearchItem4,
} from '../../../components';
import SearchType from '../../../components/Modal/SearchType';

const RFFSearch = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState<any>('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>('');

  const [selected, setSelected] = useState<any>(true);
  const [itemSelected, setItemSelect] = useState<any>('Products');

  const lastIndex = filteredDataSource?.orders?.length - 1;

  console.log(itemSelected);

  // SEARCH FILTER
  useEffect(() => {
    const filteredItems = dummyData?.storeProducts.filter(
      item =>
        item?.name.toLowerCase().includes(search?.toLowerCase()) ||
        item?.supplier.toLowerCase().includes(search?.toLowerCase()) ||
        item?.address2.toLowerCase().includes(search?.toLowerCase()),
    );
    setFilteredDataSource(filteredItems);
  }, [search]);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'Search'} tintColor={COLORS.Neutral1} />

      {showModal && (
        <SearchModal isVisible={showModal} onClose={() => setShowModal(false)}>
          {constants.searchType2.map((item: any, index: any) => {
            return (
              <SearchType
                key={`SearchType-${index}`}
                item={item}
                selected={item.id == selected}
                onPress={() => {
                  setSelected(item.id);
                  setItemSelect(item.label);
                  setShowModal(false);
                }}
              />
            );
          })}
        </SearchModal>
      )}

      {/* header text */}
      <View style={{marginHorizontal: SIZES.semi_margin}}>
        <Text style={{...FONTS.h2, color: COLORS.Neutral1, lineHeight: 34}}>
          Find products, companies, and sell offers from sellers
        </Text>
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.Neutral5,
            marginTop: SIZES.radius,
          }}>
          Search everything here.
        </Text>
      </View>

      {/* Search box */}
      <SearchBox3
        category={itemSelected}
        searchFilterFunction={(text: any) => setSearch(text)}
        search={search}
        onPress={() => setShowModal(true)}
      />

      {/* showing results */}
      <View
        style={{
          marginHorizontal: SIZES.semi_margin,
          marginTop: SIZES.base,
          marginBottom: SIZES.radius,
        }}>
        <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>
          Showing {filteredDataSource?.length} results
        </Text>
      </View>

      {/* all items */}
      {itemSelected === 'Products' ? (
        <FlatList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item?.id}`}
          renderItem={({item, index}) => {
            return (
              <SearchItem2
                containerStyle={{marginTop: SIZES.radius}}
                key={index}
                item={item}
                onPress={() =>
                  navigation.navigate('ProductDetail', {productItem: item})
                }
              />
            );
          }}
          ListFooterComponent={
            <View
              style={{
                marginBottom: lastIndex ? 300 : 300,
              }}
            />
          }
        />
      ) : itemSelected === 'Air' ? (
        <FlatList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item?.id}`}
          renderItem={({item, index}) => {
            return (
              <SearchItem4
                containerStyle={{marginTop: SIZES.radius}}
                key={index}
                item={item}
                onPress={() =>
                  navigation.navigate('ProductDetail', {productItem: item})
                }
              />
            );
          }}
          ListFooterComponent={
            <View
              style={{
                marginBottom: lastIndex ? 300 : 300,
              }}
            />
          }
        />
      ) : itemSelected === 'Land' ? (
        <FlatList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item?.id}`}
          renderItem={({item, index}) => {
            return (
              <SearchItem4
                containerStyle={{marginTop: SIZES.radius}}
                key={index}
                item={item}
                onPress={() =>
                  navigation.navigate('ProductDetail', {productItem: item})
                }
              />
            );
          }}
          ListFooterComponent={
            <View
              style={{
                marginBottom: lastIndex ? 300 : 300,
              }}
            />
          }
        />
      ) : (
        <FlatList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item?.id}`}
          renderItem={({item, index}) => {
            return (
              <SearchItem3
                containerStyle={{marginTop: SIZES.radius}}
                key={index}
                item={item}
                onPress={() =>
                  navigation.navigate('ProductDetail', {productItem: item})
                }
              />
            );
          }}
          ListFooterComponent={
            <View
              style={{
                marginBottom: lastIndex ? 300 : 300,
              }}
            />
          }
        />
      )}

      {/* No search items */}
      {filteredDataSource.length === 0 && (
        <View style={{alignItems: 'center', top: -200}}>
          <FastImage
            source={images.NoItems}
            style={{width: 120, height: 120}}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text
            style={{
              ...FONTS.body2,
              color: COLORS.Neutral6,
              textAlign: 'center',
              margin: SIZES.margin,
              lineHeight: 24,
            }}>
            Type in keywords to find what you want. You can search for products,
            companies or sell offers
          </Text>
        </View>
      )}
    </View>
  );
};

export default RFFSearch;
