import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {useQuery} from '@apollo/client';

import {HomeStackNavigatorParamList} from '../../../components/navigation/BuyerNav/type/navigation';
import {COLORS, SIZES} from '../../../constants';
import {
  AltHeader,
  LoadingIndicator,
  NoItem,
  SearchBox2,
  SearchItem2,
} from '../../../components';
import {
  ModelSortDirection,
  ProductByDateQuery,
  ProductByDateQueryVariables,
} from '../../../API';
import {productByDate} from '../../../queries/ProductQueries';

const AllProducts = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [fetchingMore, setFetchingMore] = useState<any>(false);

  // list of Products
  const {data, loading, refetch, fetchMore} = useQuery<
    ProductByDateQuery,
    ProductByDateQueryVariables
  >(productByDate, {
    pollInterval: 500,
    variables: {
      SType: 'JOB',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const allProducts =
    data?.productByDate?.items?.filter((item: any) => !item?._deleted) || [];

  const nextToken = data?.productByDate?.nextToken;
  const loadMoreItem = async () => {
    if (!nextToken || fetchingMore) {
      return;
    }
    setFetchingMore(true);
    await fetchMore({variables: {nextToken: nextToken}});
    setFetchingMore(false);
  };

  // SEARCH FILTER
  const handleSearch = (text: any) => {
    setSearch(text);
    const filteredItems = allProducts.filter((item: any) =>
      item?.title.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredDataSource(filteredItems);
  };

  useEffect(() => {
    let isCurrent = true;

    const handleFiltering = () => {
      try {
        setFilteredDataSource(allProducts);
      } catch (error) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          textBody: `${(error as Error).message}`,
          autoClose: 1500,
        });
      }
    };

    if (isCurrent) {
      handleFiltering();
    }

    // Cleanup function
    return () => {
      isCurrent = false;
    };
  }, [loading, data]);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <AltHeader
          title={'All Products'}
          tintColor={COLORS.Neutral1}
          onPress={() => navigation.navigate('Home')}
        />

        {/* Search Box */}
        <SearchBox2
          searchFilterFunction={(text: any) => handleSearch(text)}
          search={search}
          onPress={() => navigation.navigate('SearchFilter')}
          containerStyle={{marginHorizontal: SIZES.margin}}
        />

        {/* list of categories */}
        <FlatList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item, index}: any) => {
            return (
              <SearchItem2
                key={index}
                item={item}
                profile_image={item?.productImage}
                onPress={() =>
                  navigation.navigate('ProductDetail', {productID: item?.id})
                }
              />
            );
          }}
          refreshing={loading}
          onRefresh={() => refetch()}
          ListFooterComponent={
            <View
              style={{
                marginBottom: filteredDataSource?.length - 1 ? 300 : 300,
              }}>
              {filteredDataSource?.length === 0 && <NoItem contentStyle={{flex: 1}} />}
            </View>
          }
          onEndReached={() => loadMoreItem()}
        />
      </View>
    </Root>
  );
};

export default AllProducts;
