import {View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {
  Header,
  LoadingIndicator,
  SellOfferReplyListItem,
  SearchBox2,
  SellOfferOrderItem,
  NoItem,
  SellOfferItem1,
} from '../../../components';
import {COLORS, SIZES} from '../../../constants';
import {
  OrderStackNavigatorParamList,
  SellOfferReplyListRouteProp,
} from '../../../components/navigation/BuyerNav/type/navigation';
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

  // SELL OFFER REPLIES
  const {data, loading, fetchMore, refetch} = useQuery<
    SellOffersByDateRelyQuery,
    SellOffersByDateRelyQueryVariables
  >(sellOffersByDateRely, {
    pollInterval: 500,
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

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [fetchingMore, setFetchingMore] = useState<any>(false);

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
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: `${(error as Error).message}`,
        autoClose: 1500,
      });
    }
    return () => {
      isCurrent = false;
    };
  }, [loading, data]);

  if (loading) {
    <LoadingIndicator />;
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'All Sell Offer Replies'} tintColor={COLORS.Neutral1} />

        <SellOfferOrderItem item={route?.params?.sellOffer} btn={false} />

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

        <FlashList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          estimatedItemSize={20000}
          getItemType={({item}: any) => {
            return item;
          }}
          renderItem={({item, index}) => {
            return (
              // <SellOfferReplyListItem
              //   containerStyle={{marginTop: SIZES.radius}}
              //   key={index}
              //   item={item}
              //   onPress={() =>
              //     navigation.navigate('ReplyDetailSellOffer', {
              //       sellerOffer: item,
              //     })
              //   }
              // />
              <SellOfferItem1
                key={index}
                item={item}
                item_image2={item?.sellOfferImage}
                onView={() =>
                  navigation.navigate('OfferDetail', {detail: item?.id})
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
              {filteredDataSource?.length === 0 && (
                <NoItem contentStyle={{flex: 1}} />
              )}
            </View>
          }
          onEndReached={() => loadMoreItem()}
        />
      </View>
    </Root>
  );
};

export default SellOfferReplyList;
