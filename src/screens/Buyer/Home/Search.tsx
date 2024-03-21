import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {FlashList} from '@shopify/flash-list';

import {COLORS, FONTS, SIZES, constants} from '../../../constants';
import {HomeStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {
  Header,
  SearchItem2,
  SearchBox3,
  SearchModal,
  SearchItem4,
  SearchItem3,
  LoadingIndicator,
  NoItem,
} from '../../../components';
import {
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
import {useAuthContext} from '../../../context/AuthContext';
import {AccountCategoryType} from '../../../models';

const Search = () => {
  const {authUser}: any = useAuthContext();
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  // LIST ALL PRODUCT BY CATEGORY ID
  const {data, loading} = useQuery<
    ProductByDateQuery,
    ProductByDateQueryVariables
  >(productByDate, {
    pollInterval: 500,
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
    variables: {
      SType: 'SELLOFFER',
      sortDirection: ModelSortDirection.DESC,
    },
  });

  const SELLOFFER = 'SELLOFFER';
  const PRODUCT = 'Product';

  const allSellOffers =
    (newData?.sellOffersByDate?.items || []).filter(
      st => st?.SType === SELLOFFER && !st?._deleted,
    ) || [];

  const mergedSearchType = [...allSellOffers, ...allProducts, ...suppliers];

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [selected, setSelected] = useState(true);
  const [itemSelected, setItemSelect] = useState(PRODUCT);
  const [dataList, setDataList] = useState(mergedSearchType);

  useEffect(() => {
    let isCurrent = true;
    const onChangeSelectionItem = (item: any) => {
      setDataList([
        ...mergedSearchType.filter(x => x?.__typename === itemSelected),
      ]);
    };

    onChangeSelectionItem(itemSelected);
    return () => {
      isCurrent = false;
    };
  }, [itemSelected, loading]);

  // SEARCH FILTER
  useEffect(() => {
    let isCurrent = true;
    const filteredItems = dataList.filter(item =>
      item?.title.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredDataSource(filteredItems);
    return () => {
      isCurrent = false;
    };
  }, [search, dataList]);

  if (newLoad || loading || onLoad) {
    return <LoadingIndicator />;
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
        estimatedItemSize={20000}
        getItemType={({item}: any) => {
          return item;
        }}
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
                  navigation.navigate('ProductDetail', {productID: item?.id})
                }
              />
            );
          } else if (item?.__typename === 'SellOffer') {
            return (
              <SearchItem4
                containerStyle={{marginTop: SIZES.radius}}
                key={index}
                item={item}
                profile_image={item?.sellOfferImage}
                onPress={() =>
                  !authUser
                    ? navigation.navigate('SignUp')
                    : navigation.navigate('OfferDetail', {detail: item?.id})
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
                  !authUser
                    ? navigation.navigate('SignUp')
                    : navigation.navigate('BusinessDetail', {
                        businessItem: item,
                      })
                }
              />
            );
          }
        }}
        ListFooterComponent={
          <View
            style={{
              marginBottom: filteredDataSource?.length - 1 && 300,
            }}>
            {filteredDataSource?.length === 0 && (
              <NoItem contentStyle={{flex: 1}} />
            )}
          </View>
        }
      />
    </View>
  );
};

export default Search;
