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
import {listProducts} from '../../../queries/ProductQueries';
import {ListProductsQuery, ListProductsQueryVariables} from '../../../API';

const CategoryItemList = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route: any = useRoute<CategoryItemListRouteProp>();

  const {title}: any = route.params.cateItem;

  const [search, setSearch] = useState<any>('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>('');

  // LIST ALL PRODUCT BY CATEGORY ID
  const {data, loading} = useQuery<
    ListProductsQuery,
    ListProductsQueryVariables
  >(listProducts, {
    pollInterval: 300,
    nextFetchPolicy: 'cache-first',
  });
  const allProducts: any =
    data?.listProducts?.items
      .filter(cty => cty?.category === title)
      .filter((item: any) => !item?._deleted) || [];

  // console.log(allProducts);

  useEffect(() => {
    const filteredItems = allProducts.filter(
      (item: {title: string; storeName: string}) =>
        item?.title.toLowerCase().includes(search?.toLowerCase()) ||
        item?.storeName.toLowerCase().includes(search?.toLowerCase()),
    );
    setFilteredDataSource(filteredItems);
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
      <View style={{marginHorizontal: SIZES.radius}}>
        <SearchBox2
          searchFilterFunction={(text: any) => setSearch(text)}
          search={search}
        />
      </View>

      {/* Category Items */}
      {filteredDataSource?.length <= 0 && <NoItem />}
      <FlatList
        data={filteredDataSource}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item?.id}`}
        renderItem={({item, index}) => {
          return (
            <SearchItem2
              containerStyle={{marginTop: SIZES.radius}}
              key={index}
              profile_image={item?.image}
              profile_image2={item?.storeImage}
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
