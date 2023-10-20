import {ActivityIndicator, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@apollo/client';

import {
  CategoryItemListRouteProp,
  HomeStackNavigatorParamList,
} from '../../../components/navigation/BuyerNav/type/navigation';
import {COLORS, SIZES, dummyData} from '../../../constants';
import {Header, NoItem, SearchBox2, SearchItem2} from '../../../components';
import {getCategories} from '../../../queries/ProductQueries';
import {GetCategoriesQuery, GetCategoriesQueryVariables} from '../../../API';

const CategoryItemList = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route: any = useRoute<CategoryItemListRouteProp>();

  const [search, setSearch] = useState<any>('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>('');

  const {data, loading} = useQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(getCategories, {variables: route?.params?.cateItem});
  const categoryName: any = data?.getCategories?.title;

  useEffect(() => {
    const filteredItems = dummyData?.storeProducts.filter(
      item =>
        item?.name.toLowerCase().includes(search?.toLowerCase()) ||
        item?.supplier.toLowerCase().includes(search?.toLowerCase()) ||
        item?.address2.toLowerCase().includes(search?.toLowerCase()),
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
      <Header title={categoryName} tintColor={COLORS.Neutral1} />

      {/* Search box */}
      <View style={{marginHorizontal: SIZES.radius}}>
        <SearchBox2
          searchFilterFunction={(text: any) => setSearch(text)}
          search={search}
        />
      </View>

      {/* Category Items */}
      {!filteredDataSource ? (
        <NoItem />
      ) : (
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
          ListFooterComponent={<View style={{height: 200}} />}
        />
      )}
    </View>
  );
};

export default CategoryItemList;
