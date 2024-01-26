import {Dimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {FlashList} from '@shopify/flash-list';
import Clipboard from '@react-native-clipboard/clipboard';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {COLORS, SIZES} from '../../../constants';
import {
  LoadingIndicator,
  NoItem,
  RFQItem,
  SearchBox2,
} from '../../../components';
import {ExploreStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {
  ModelSortDirection,
  RFQTYPE,
  RfqByDateQuery,
  RfqByDateQueryVariables,
} from '../../../API';
import {rfqByDate} from '../../../queries/RFQQueries';

const RFQInternational = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [fetchingMore, setFetchingMore] = useState<any>(false);

  // LIST RFQs
  const {data, loading, refetch, fetchMore} = useQuery<
    RfqByDateQuery,
    RfqByDateQueryVariables
  >(rfqByDate, {
    pollInterval: 500,
    variables: {
      SType: 'RFQ',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const rfqData =
    data?.rfqByDate?.items
      ?.filter(rfq => rfq?.rfqType === RFQTYPE?.INTERNATIONAL)
      ?.filter((item: any) => !item?._deleted) || [];

  // SEARCH FILTER
  const handleSearch = (text: any) => {
    setSearch(text);
    const filteredItems = rfqData.filter((item: any) =>
      item?.title.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredDataSource(filteredItems);
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
      setFilteredDataSource(rfqData);
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
          // showFiler={true}
          containerStyle={{margin: SIZES.semi_margin}}
        />

        <View style={{height: '100%', width: Dimensions.get('screen').width}}>
          <FlashList
            data={filteredDataSource}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            estimatedItemSize={20000}
            getItemType={({item}: any) => {
              return item;
            }}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              // copy to clipboard
              const copyToClipboard = () => {
                Clipboard.setString(item?.rfqNo);
              };
              /* RFQ items */
              return (
                <RFQItem
                  key={index}
                  item={item}
                  onCopy={copyToClipboard}
                  onPress={() =>
                    navigation.navigate('InternationalRFQDetail', {
                      rfqID: item?.id,
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

export default RFQInternational;
