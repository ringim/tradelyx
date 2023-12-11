import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {FlatList} from 'react-native-gesture-handler';

import {COLORS, FONTS, SIZES, constants} from '../../../constants';
import {HomeStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {
  Header,
  SearchItem2,
  SearchBox3,
  SearchModal,
  SearchItem4,
  SearchItem3,
  NoItem,
} from '../../../components';
import {
  AccountCategoryType,
  ListUsersQuery,
  ListUsersQueryVariables,
  ModelSortDirection,
  ProductByDateQuery,
  ProductByDateQueryVariables,
  SellOffersByDateQuery,
  SellOffersByDateQueryVariables,
} from '../../../API';
import SearchType from '../../../components/Modal/SearchType';
import {listUsers} from '../../../queries/UserQueries';
import {productByDate} from '../../../queries/ProductQueries';
import {sellOffersByDate} from '../../../queries/SellOfferQueries';

const Search = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  // LIST ALL PRODUCT BY CATEGORY ID
  const {data, loading} = useQuery<
    ProductByDateQuery,
    ProductByDateQueryVariables
  >(productByDate, {
    pollInterval: 500,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
    variables: {
      SType: 'JOB',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const allProducts: any =
    data?.productByDate?.items
      .filter(st => st?.SType === 'JOB')
      .filter((item: any) => !item?._deleted) || [];

  // LIST SUPPLIERS
  const {data: onData, loading: onLoad} = useQuery<
    ListUsersQuery,
    ListUsersQueryVariables
  >(listUsers, {
    pollInterval: 500,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
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
    pollInterval: 500,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
    variables: {
      SType: 'SELLOFFER',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const allSellOffers =
    newData?.sellOffersByDate?.items
      .filter(st => st?.SType === 'SELLOFFER')
      ?.filter((item: any) => !item?._deleted) || [];

  const mergedSearchType = [...allSellOffers, ...allProducts, ...suppliers];
  // console.log('all products', mergedSearchType);

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState<any>('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>('');

  const [selected, setSelected] = useState<any>(true);
  const [itemSelected, setItemSelect] = useState<any>('All');
  const [dataList, setDataList] = useState<any>(mergedSearchType);

  useEffect(() => {
    let isCurrent = true;
    const onChangeSelectionItem = (item: any) => {
      if (itemSelected === 'All') {
        isCurrent && setDataList([...mergedSearchType]);
      } else if (itemSelected === 'Product') {
        isCurrent &&
          setDataList([
            ...mergedSearchType.filter(x => x?.__typename === itemSelected),
          ]);
      } else if (itemSelected === 'SellOffer') {
        isCurrent &&
          setDataList([
            ...mergedSearchType.filter(x => x?.__typename === itemSelected),
          ]);
      } else if (itemSelected === 'User') {
        isCurrent &&
          setDataList([
            ...mergedSearchType.filter(x => x?.__typename === itemSelected),
          ]);
      } else {
        isCurrent && setItemSelect(item);
      }
    };
    onChangeSelectionItem(itemSelected);
    return () => {
      isCurrent = false;
    };
  }, [itemSelected, loading, newLoad, onLoad]);

  // SEARCH FILTER
  useEffect(() => {
    let isCurrent = true;
    const filteredItems =
      isCurrent &&
      dataList?.filter((item: {title: any}) =>
        item?.title.toLowerCase().includes(search?.toLowerCase()),
      );
    setFilteredDataSource(filteredItems);
    return () => {
      isCurrent = false;
    };
  }, [search, dataList]);

  if (newLoad || loading || onLoad) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={COLORS.primary6} />
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
      <FlatList
        data={filteredDataSource}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item?.id}`}
        renderItem={({item, index}: any) => {
          // console.log(item)
          if (item?.__typename === 'Product') {
            return (
              <SearchItem2
                containerStyle={{marginTop: SIZES.radius}}
                key={index}
                item={item}
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
                profile_image={item?.image || item?.images[0]}
                onPress={() =>
                  navigation.navigate('OfferDetail', {detail: item})
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
                  navigation.navigate('CompanyDetail', {ID: item?.id})
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
    </View>
  );
};

export default Search;
