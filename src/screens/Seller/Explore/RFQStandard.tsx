import {View, ActivityIndicator, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import Clipboard from '@react-native-clipboard/clipboard';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {COLORS, SIZES} from '../../../constants';
import {RFQItem2, SearchBox2} from '../../../components';
import {ExploreStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {
  ModelSortDirection,
  RFQTYPE,
  RfqByDateQuery,
  RfqByDateQueryVariables,
} from '../../../API';
import {rfqByDate} from '../../../queries/RFQQueries';

const RFQDomestic = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);
  const [fetchingMore, setFetchingMore] = useState<any>(false);

  // LIST RFQs
  const {data, loading, refetch, fetchMore} = useQuery<
    RfqByDateQuery,
    RfqByDateQueryVariables
  >(rfqByDate, {
    pollInterval: 500,
    fetchPolicy: 'network-only',
    variables: {
      SType: 'RFQ',
      sortDirection: ModelSortDirection.DESC,
      limit: 10,
    },
  });

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

  const nextToken = data?.rfqByDate?.nextToken;
  const loadMoreItem = async () => {
    if (!nextToken || fetchingMore) {
      return;
    }
    setFetchingMore(true);
    await fetchMore({variables: {nextToken: nextToken}});
    setFetchingMore(false);
  };

  useEffect(() => {
    let isCurrent = true;
    try {
      const items =
        (isCurrent &&
          data?.rfqByDate?.items
            ?.filter(rfq => rfq?.rfqType === RFQTYPE?.STANDARD)
            ?.filter((item: any) => !item?._deleted)) ||
        [];
      setFilteredDataSource(items);
      setMasterDataSource(items);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: `${(error as Error).message}`,
        autoClose: 1500,
      });
      return () => {
        isCurrent = false;
      };
    }
  }, [loading, data]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <ActivityIndicator size="large" color={COLORS.primary6} />
      </View>
    );
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
          searchFilterFunction={(text: any) => searchFilterFunction(text)}
          search={search}
          onPress={() => navigation.navigate('RFQFilter')}
          containerStyle={{margin: SIZES.semi_margin}}
        />

        <FlatList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          renderItem={({item, index}: any) => {
            // copy to clipboard
            const copyToClipboard = () => {
              Clipboard.setString(item?.rfqNo);
            };
            /* RFQ items */
            return (
              <RFQItem2
                key={index}
                item={item}
                onCopy={copyToClipboard}
                onPress={() =>
                  navigation.navigate('StandardRFQDetail', {
                    rfqItem: item,
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
                marginBottom: filteredDataSource.length - 1 ? 300 : 300,
              }}
            />
          }
          onEndReached={() => loadMoreItem()}
        />
      </View>
    </Root>
  );
};

export default RFQDomestic;
