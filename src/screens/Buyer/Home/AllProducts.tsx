import {ActivityIndicator, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {useQuery} from '@apollo/client';

import {HomeStackNavigatorParamList} from '../../../components/navigation/BuyerNav/type/navigation';
import {COLORS, SIZES} from '../../../constants';
import {AltHeader, SearchBox2, SearchItem2} from '../../../components';
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
  const [masterDataSource, setMasterDataSource] = useState<any>([]);
  const [fetchingMore, setFetchingMore] = useState<any>(false);

  // list of Products
  const {data, loading, refetch, fetchMore} = useQuery<
    ProductByDateQuery,
    ProductByDateQueryVariables
  >(productByDate, {
    pollInterval: 500,
    fetchPolicy: 'network-only',
    variables: {
      SType: 'JOB',
      sortDirection: ModelSortDirection.DESC,
      limit: 10,
    },
  });
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
  const searchFilterFunction = (text: any) => {
    if (text) {
      const newData = masterDataSource.filter(function (item: any) {
        const itemData = item.title
          ? item?.title.toLowerCase()
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
    let isCurrent = true;

    const handleFiltering = () => {
      try {
        const filteredItems: any =
          data?.productByDate?.items?.filter(item => !item?._deleted) || [];

        setFilteredDataSource(filteredItems);
        setMasterDataSource(filteredItems);
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
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="small" color={COLORS.primary6} />
      </View>
    );
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
          searchFilterFunction={(text: any) => searchFilterFunction(text)}
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
                  navigation.navigate('ProductDetail', {productItem: item})
                }
              />
            );
          }}
          refreshing={loading}
          onRefresh={() => refetch()}
          ListFooterComponent={
            <View
              style={{marginBottom: filteredDataSource?.length - 1 ? 300 : 300}}
            />
          }
          onEndReached={() => loadMoreItem()}
        />
      </View>
    </Root>
  );
};

export default AllProducts;
