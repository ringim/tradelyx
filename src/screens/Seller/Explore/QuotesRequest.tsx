import {View, Dimensions} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {COLORS, SIZES} from '../../../constants';
import {
  LoadingIndicator,
  NoItem,
  RFFQuoteItem,
  SearchBox2,
} from '../../../components';
import {ExploreStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {
  ModelSortDirection,
  RffByDateQuery,
  RffByDateQueryVariables,
} from '../../../API';
import {rffByDate} from '../../../queries/RFFQueries';

const QuotesRequest = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();

  // LIST RFFs
  const {data, loading, refetch, fetchMore} = useQuery<
    RffByDateQuery,
    RffByDateQueryVariables
  >(rffByDate, {
    pollInterval: 500,
    variables: {
      SType: 'RFF',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const items =
    data?.rffByDate?.items.filter((item: any) => !item?._deleted) || [];

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [fetchingMore, setFetchingMore] = useState<any>(false);

  const nextToken = data?.rffByDate?.nextToken;
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
    const filteredItems = items.filter((item: any) =>
      item?.title.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredDataSource(filteredItems);
  };

  useEffect(() => {
    let isCurrent = true;
    try {
      setFilteredDataSource(items);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: `${(error as Error).message}`,
        autoClose: 1500,
      });
    }
    return () => {
      isCurrent = false;
    };
  }, [data]);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Root>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        {/* Search Box */}
        <SearchBox2
          searchFilterFunction={(text: any) => handleSearch(text)}
          search={search}
          containerStyle={{marginTop: SIZES.base}}
          contentStyle={{marginHorizontal: SIZES.radius}}
        />

        <View style={{height: '100%', width: Dimensions.get('screen').width}}>
          <FlashList
            data={filteredDataSource}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            estimatedItemSize={200}
            getItemType={({item}: any) => {
              return item;
            }}
            renderItem={({item, index}) => {
              /* RFF items */
              return (
                <RFFQuoteItem
                  key={index}
                  item={item}
                  onPress={() =>
                    navigation.navigate('QuotesRequestDetails', {
                      rffID: item?.id,
                    })
                  }
                />
              );
            }}
            refreshing={loading}
            onRefresh={() => refetch()}
            ListFooterComponent={
              <View
                style={{
                  marginBottom: filteredDataSource.length - 1 ? 150 : 150,
                }}>
                {filteredDataSource?.length === 0 && (
                  <NoItem contentStyle={{flex: 1}} />
                )}
              </View>
            }
            onEndReached={() => loadMoreItem()}
          />
        </View>
      </View>
    </Root>
  );
};

export default QuotesRequest;
