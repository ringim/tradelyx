import {ActivityIndicator, View} from 'react-native';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {useQuery} from '@apollo/client';

import {
  FilteredProductsRouteProp,
  HomeStackNavigatorParamList,
} from '../../../components/navigation/BuyerNav/type/navigation';
import {COLORS, SIZES} from '../../../constants';
import {Header, NoItem, SearchBox2, SearchItem2} from '../../../components';
import {productByDate} from '../../../queries/ProductQueries';
import {
  ModelSortDirection,
  ProductByDateQuery,
  ProductByDateQueryVariables,
} from '../../../API';

const FilteredProducts = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<FilteredProductsRouteProp>();

  const {qty, type, type2, address, sliderValue}: any =
    route?.params?.filterItem;
  console.log('filtered items', type2);
  console.log('filtered ', route?.params?.filterItem);

  // LIST PRODUCTS
  const {
    data: newData,
    loading,
    refetch,
  } = useQuery<ProductByDateQuery, ProductByDateQueryVariables>(productByDate, {
    pollInterval: 500,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
    variables: {
      limit: 4,
      SType: 'JOB',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const allProducts: any =
    newData?.productByDate?.items
      .filter(quan => (quan?.quantity ?? 0) >= qty)
      .filter(cat => cat?.category === type)
      .filter(name => name?.title === type2)
      .filter(
        price =>
          (price?.fobPrice ?? 0) >= sliderValue[0] &&
          (price?.fobPrice ?? 0) <= sliderValue[1],
      )
      .filter(addy => addy?.storeAddress?.includes(address))
      .filter((item: any) => !item?._deleted) || [];

  console.log('allProducts items', allProducts);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);

  // SEARCH FILTER
  const searchFilterFunction = (text: any) => {
    if (text) {
      const newData = masterDataSource.filter(function (item: any) {
        const itemData = item.title
          ? item.title.toLowerCase()
          : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  useEffect(() => {
    try {
      const items = allProducts;
      setFilteredDataSource(items);
      setMasterDataSource(items);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: `${(error as Error).message}`,
        autoClose: 1500,
      });
    }
  }, [search]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="small" color={COLORS.primary6} />
      </View>
    );
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'Products'} tintColor={COLORS.Neutral1} />

        {/* Search Box */}
        <SearchBox2
          searchFilterFunction={(text: any) => searchFilterFunction(text)}
          search={search}
          containerStyle={{marginHorizontal: SIZES.margin}}
        />

        {filteredDataSource?.length === 0 && (
          <NoItem textCont={{marginTop: SIZES.margin}} />
        )}

        {/* list of categories */}
        <FlatList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item?.id}`}
          renderItem={({item, index}) => {
            return (
              <SearchItem2
                key={index}
                item={item}
                profile_image={item?.productImage}
                profile_image2={item?.storeImage}
                onPress={() =>
                  navigation.navigate('ProductDetail', {productItem: item})
                }
              />
            );
          }}
          refreshControl={
            <RefreshControl
              tintColor={COLORS.primary4}
              refreshing={loading}
              onRefresh={() => refetch()}
            />
          }
          ListFooterComponent={
            <View style={{height: filteredDataSource?.length - 1 && 200}} />
          }
        />
      </View>
    </Root>
  );
};

export default FilteredProducts;
