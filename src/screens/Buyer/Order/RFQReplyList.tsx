import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@apollo/client';

import {
  Header,
  LoadingIndicator,
  NoItem,
  RFQOrderItem,
  ReplyListItem,
  SearchBox2,
} from '../../../components';
import {COLORS, SIZES} from '../../../constants';
import {
  OrderStackNavigatorParamList,
  ReplyListRFQRouteProp,
} from '../../../components/navigation/BuyerNav/type/navigation';
import {
  ModelSortDirection,
  RfqByDateReplyQuery,
  RfqByDateReplyQueryVariables,
} from '../../../API';
import {useAuthContext} from '../../../context/AuthContext';
import {rfqByDateReply} from '../../../queries/RFQQueries';

const RFQReplyList = () => {
  const navigation = useNavigation<OrderStackNavigatorParamList>();
  const route: any = useRoute<ReplyListRFQRouteProp>();

  const {userID} = useAuthContext();

  // LIST RFQs ByDateRely
  const {data, loading, fetchMore, refetch} = useQuery<
    RfqByDateReplyQuery,
    RfqByDateReplyQueryVariables
  >(rfqByDateReply, {
    variables: {
      SType: 'RFQREFPLY',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const allRfqByDateReplies =
    data?.rfqByDateReply?.items
      ?.filter(rfqID => rfqID?.RFQ === route?.params?.sellerItem?.id)
      ?.filter(usrID => usrID?.userID === userID)
      .filter((item: any) => !item?._deleted) || [];

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [fetchingMore, setFetchingMore] = useState<any>(false);

  const nextToken = data?.rfqByDateReply?.nextToken;
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
    const filteredItems = allRfqByDateReplies.filter((item: any) =>
      item?.title.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredDataSource(filteredItems);
  };

  useEffect(() => {
    let isCurrent = true;
    try {
      setFilteredDataSource(allRfqByDateReplies);
    } catch (error) {
      return;
    }
    return () => {
      isCurrent = false;
    };
  }, [loading, data]);

  if (loading) {
    <LoadingIndicator />;
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'All RFQ Replies'} tintColor={COLORS.Neutral1} />

      <RFQOrderItem
        desc={true}
        item={route?.params?.sellerItem}
        contentStyle={{backgroundColor: COLORS.Neutral10}}
        serviceImage={
          route?.params?.sellerItem?.rfQType === 'DOMESTIC'
            ? require('../../../assets/images/domestic.png')
            : route?.params?.sellerItem?.rfqType === 'STANDARD'
            ? require('../../../assets/images/standard.png')
            : require('../../../assets/images/international.png')
        }
      />

      {/* Search Box */}
      <SearchBox2
        searchFilterFunction={(text: any) => handleSearch(text)}
        search={search}
        containerStyle={{
          marginTop: SIZES.margin,
          width: '100%',
          alignSelf: 'center',
        }}
      />

      <FlatList
        data={filteredDataSource}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return (
            <ReplyListItem
              containerStyle={{marginTop: SIZES.radius}}
              key={index}
              item={item}
              onPress2={() =>
                navigation.navigate('CompanyDetail', {sellerItem: item})
              }
              onPress={() => {
                item?.rfqType === 'DOMESTIC'
                  ? navigation.navigate('ReplyDetailDomestic', {
                      sellerItem: item,
                    })
                  : item?.rfqType === 'STANDARD'
                  ? navigation.navigate('ReplyDetailStandard', {
                      sellerItem: item,
                    })
                  : navigation.navigate('ReplyDetailInternational', {
                      sellerItem: item,
                    });
              }}
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
            {filteredDataSource?.length === 0 && (
              <NoItem contentStyle={{flex: 1}} />
            )}
          </View>
        }
        onEndReached={() => loadMoreItem()}
      />
    </View>
  );
};

export default RFQReplyList;
