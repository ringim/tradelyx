import {ActivityIndicator, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@apollo/client';

import {
  CategoryItemListRouteProp,
  HomeStackNavigatorParamList,
} from '../../../components/navigation/BuyerNav/type/navigation';
import {COLORS, SIZES} from '../../../constants';
import {Header, NoItem, SearchBox2, SearchItem2} from '../../../components';
import {productByDate} from '../../../queries/ProductQueries';
import {
  ProductByDateQueryVariables,
  ProductByDateQuery,
  ModelSortDirection,
} from '../../../API';

const CategoryItemList = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route: any = useRoute<CategoryItemListRouteProp>();

  const {title}: any = route.params.cateItem;

  const [search, setSearch] = useState<any>('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>('');

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
      .filter(cty => cty?.category === title)
      .filter((item: any) => !item?._deleted) || [];

  useEffect(() => {
    let isCurrent = true;
    const filteredItems =
      isCurrent &&
      allProducts.filter(
        (item: {title: string; storeName: string}) =>
          item?.title.toLowerCase().includes(search?.toLowerCase()) ||
          userInfo?.title.toLowerCase().includes(search?.toLowerCase()),
      );
    setFilteredDataSource(filteredItems);
    return () => {
      isCurrent = false;
    };
  }, [search]);

  if (loading) {
    <ActivityIndicator
      style={{flex: 1, justifyContent: 'center'}}
      size={'large'}
      color={COLORS.primary6}
    />;
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={title} tintColor={COLORS.Neutral1} />

      {/* Search box */}
      <SearchBox2
        searchFilterFunction={(text: any) => setSearch(text)}
        search={search}
      />

      {/* Category Items */}
      {filteredDataSource?.length === 0 && <NoItem />}
      <FlatList
        data={filteredDataSource}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item?.id}`}
        renderItem={({item, index}) => {
          return (
            <SearchItem2
              containerStyle={{marginTop: SIZES.radius}}
              key={index}
              profile_image={item?.image || item?.images[0]}
              item={item}
              onPress={() =>
                navigation.navigate('ProductDetail', {productItem: item})
              }
            />
          );
        }}
        ListFooterComponent={
          <View style={{height: filteredDataSource?.length && 200}} />
        }
      />
    </View>
  );
};

export default CategoryItemList;
