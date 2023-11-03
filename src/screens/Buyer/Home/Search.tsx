import {View, Text, ActivityIndicator} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useQuery} from '@apollo/client';

import {COLORS, FONTS, SIZES, constants, images} from '../../../constants';
import {HomeStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {
  Header,
  SearchItem2,
  SearchBox3,
  SearchModal,
  SearchItem4,
  SearchItem3,
} from '../../../components';
import {
  AccountCategoryType,
  ListUsersQuery,
  ListUsersQueryVariables,
  ProductByDateQuery,
  ProductByDateQueryVariables,
  SellOffersByDateQuery,
  SellOffersByDateQueryVariables,
} from '../../../API';
import SearchType from '../../../components/Modal/SearchType';
import {listUsers} from '../../../queries/UserQueries';
import {productByDate} from '../../../queries/ProductQueries';
import {sellOffersByDate} from '../../../queries/RequestQueries';

const Search = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  // LIST ALL PRODUCT BY CATEGORY ID
  const {data, loading} = useQuery<
    ProductByDateQuery,
    ProductByDateQueryVariables
  >(productByDate, {
    pollInterval: 300,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });
  const allProducts: any =
    data?.productByDate?.items.filter((item: any) => !item?._deleted) || [];

  // LIST SUPPLIERS
  const {data: onData, loading: onLoad} = useQuery<
    ListUsersQuery,
    ListUsersQueryVariables
  >(listUsers, {
    pollInterval: 300,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });
  const suppliers: any =
    onData?.listUsers?.items
      .filter(sup => sup?.accountType === AccountCategoryType?.SELLER)
      .filter((item: any) => !item?._deleted) || [];

  // LIST SELL OFFERS
  const {data: newData, loading: newLoad} = useQuery<
    SellOffersByDateQuery,
    SellOffersByDateQueryVariables
  >(sellOffersByDate, {
    pollInterval: 300,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });
  const allSellOffers =
    newData?.sellOffersByDate?.items?.filter((item: any) => !item?._deleted) ||
    [];

  const mergedSearchType = [...allSellOffers, ...allProducts, ...suppliers];

  // console.log('sell offer', allSellOffers);
  // console.log('all products', allProducts);
  console.log('suppliers', suppliers);

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState<any>('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>('');

  const [selected, setSelected] = useState<any>(true);
  const [itemSelected, setItemSelect] = useState<any>('All');
  const [dataList, setDataList] = useState<any>(mergedSearchType);

  useEffect(() => {
    const onChangeSelectionItem = (item: any) => {
      if (itemSelected === 'All') {
        setDataList([...mergedSearchType]);
      } else if (itemSelected === 'Product') {
        setDataList([
          ...mergedSearchType.filter(x => x?.__typename === itemSelected),
        ]);
      } else if (itemSelected === 'SellOffer') {
        setDataList([
          ...mergedSearchType.filter(x => x?.__typename === itemSelected),
        ]);
      } else if (itemSelected === 'User') {
        setDataList([
          ...mergedSearchType.filter(x => x?.__typename === itemSelected),
        ]);
      } else {
        setItemSelect(item);
      }
    };
    onChangeSelectionItem(itemSelected);
  }, [itemSelected, newLoad, loading, onLoad]);

  // SEARCH FILTER
  useEffect(() => {
    const filteredItems = dataList?.filter((item: {title: any}) =>
      item?.title.toLowerCase().includes(search?.toLowerCase()),
    );
    setFilteredDataSource(filteredItems);
  }, [search, dataList]);

  if (loading || onLoad || newLoad) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="small" color={COLORS.primary6} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
      <Header title={'Search'} tintColor={COLORS.Neutral1} />

      {showModal && (
        <SearchModal isVisible={showModal} onClose={() => setShowModal(false)}>
          {constants.searchType.map((item: any, index: any) => {
            return (
              <SearchType
                key={`SearchType-${index}`}
                item={item}
                selected={item.id == selected}
                onPress={() => {
                  setSelected(item.id);
                  setItemSelect(item.value);
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
      <FlashList
        data={filteredDataSource}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item?.id}`}
        estimatedItemSize={200}
        getItemType={({item}: any) => {
          return item;
        }}
        renderItem={({item, index}) => {
          // console.log(item)
          if (item?.__typename === 'Product') {
            return (
              <SearchItem2
                containerStyle={{marginTop: SIZES.radius}}
                key={index}
                item={item}
                profile_image2={item?.storeImage}
                profile_image={item?.productImage}
                onPress={() =>
                  navigation.navigate('ProductDetail', {productItem: item})
                }
              />
            );
          } else if (item?.__typename === 'SellOffer') {
            return (
              <SearchItem4
                containerStyle={{marginTop: SIZES.radius}}
                key={index}
                item={item}
                profile_image2={item?.storeImage}
                profile_image={item?.image || item?.images[0]}
                onPress={() =>
                  navigation.navigate('ProductDetail', {productItem: item})
                }
              />
            );
          } else {
            return (
              <SearchItem3
                containerStyle={{marginTop: SIZES.radius}}
                key={index}
                item={item}
                profile_image={item?.logo}
                onPress={() =>
                  navigation.navigate('ProductDetail', {productItem: item})
                }
              />
            );
          }
        }}
        ListFooterComponent={
          <View
            style={{
              marginBottom: filteredDataSource?.length - 1 && 300,
            }}
          />
        }
      />

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

export default Search;
