import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import {
  Header,
  LoadingIndicator,
  SellOfferReplyListItem,
  SearchBox2,
  SellOfferOrderItem,
} from '../../../components';
import {COLORS, SIZES, dummyData} from '../../../constants';
import {
  OrderStackNavigatorParamList,
  SellOfferReplyListRouteProp,
} from '../../../components/navigation/BuyerNav/type/navigation';
import {useQuery} from '@apollo/client';
import {
  ModelSortDirection,
  SellOffersByDateRelyQuery,
  SellOffersByDateRelyQueryVariables,
} from '../../../API';
import {useAuthContext} from '../../../context/AuthContext';
import {sellOffersByDateRely} from '../../../queries/SellOfferQueries';

const SellOfferReplyList = () => {
  const navigation = useNavigation<OrderStackNavigatorParamList>();
  const route: any = useRoute<SellOfferReplyListRouteProp>();

  const {userID} = useAuthContext();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);
  const [fetchingMore, setFetchingMore] = useState<any>(false);

  // SELL OFFER REPLIES
  const {data, loading, fetchMore, refetch} = useQuery<
    SellOffersByDateRelyQuery,
    SellOffersByDateRelyQueryVariables
  >(sellOffersByDateRely, {
    pollInterval: 500,
    fetchPolicy: 'network-only',
    variables: {
      SType: 'SELLOFFERREPLY',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const allRfqByDateReplies =
    data?.sellOffersByDateRely?.items
      ?.filter(soID => soID?.SellOffer === route?.params?.sellOffer?.id)
      ?.filter(usrID => usrID?.userID === userID)
      .filter((item: any) => !item?._deleted) || [];

  const nextToken = data?.sellOffersByDateRely?.nextToken;

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
    let isCurrent = true;
    try {
      const items = isCurrent && allRfqByDateReplies;
      setFilteredDataSource(items);
      setMasterDataSource(items);
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
      <Header title={'All Sell Offer Replies'} tintColor={COLORS.Neutral1} />

      <SellOfferOrderItem item={route?.params?.sellOffer} btn={false} />

      {/* Search Box */}
      <SearchBox2
        searchFilterFunction={(text: any) => searchFilterFunction(text)}
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
            <SellOfferReplyListItem
              containerStyle={{marginTop: SIZES.radius}}
              key={index}
              item={item}
              onPress={() =>
                navigation.navigate('ReplyDetailSellOffer', {sellerOffer: item})
              }
            />
          );
        }}
        refreshing={loading}
        onRefresh={() => refetch()}
        ListFooterComponent={
          <View
            style={{
              marginBottom: dummyData?.replyList?.length - 1 ? 300 : 300,
            }}
          />
        }
        onEndReached={() => loadMoreItem()}
      />
    </View>
  );
};

export default SellOfferReplyList;
