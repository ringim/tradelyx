import {View, Text, Dimensions, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {FlashList} from '@shopify/flash-list';

import {COLORS, FONTS, SIZES, constants} from '../../../constants';
import {
  OrderTabItem,
  RFFOrderItem,
  LoadingIndicator,
  RFQOrderItem,
  SellOfferOrderItem,
  NoItem,
  TabHeader,
} from '../../../components';
import {
  ModelSortDirection,
  RfqByDateQuery,
  RfqByDateQueryVariables,
  RffByDateQuery,
  RffByDateQueryVariables,
  RfqByDateReplyQuery,
  RfqByDateReplyQueryVariables,
  RffByDateRelyQuery,
  RffByDateRelyQueryVariables,
  SellOffersByDateRelyQuery,
  SellOffersByDateRelyQueryVariables,
  GetUserQuery,
  GetUserQueryVariables,
} from '../../../API';
import {rffByDate, rffByDateRely} from '../../../queries/RFFQueries';
import {useAuthContext} from '../../../context/AuthContext';
import {rfqByDate, rfqByDateReply} from '../../../queries/RFQQueries';
import {OrderStackNavigatorParamList} from '../../../components/navigation/BuyerNav/type/navigation';
import {sellOffersByDateRely} from '../../../queries/SellOfferQueries';
import {getUser} from '../../../queries/UserQueries';

const Pending = () => {
  const {userID} = useAuthContext();
  const navigation = useNavigation<OrderStackNavigatorParamList>();

  const [RFFs, setRFFs] = useState<any>([]);
  const [RFQs, setRFQs] = useState<any>([]);
  const [sellOffers, setSellOffers] = useState<any>([]);

  // GET USER DETAILS
  const {loading: nowLoad, data: nowData} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {variables: {id: userID}});
  const user: any = nowData?.getUser;

  // LIST RFQs
  const {
    data,
    loading,
    fetchMore,
    refetch: refetching,
  } = useQuery<RfqByDateQuery, RfqByDateQueryVariables>(rfqByDate, {
    pollInterval: 500,
    variables: {
      SType: 'RFQ',
      sortDirection: ModelSortDirection.DESC,
    },
  });

  // LIST RFFs
  const {
    data: newData,
    loading: newLoad,
    fetchMore: keepFetch,
    refetch,
  } = useQuery<RffByDateQuery, RffByDateQueryVariables>(rffByDate, {
    pollInterval: 500,
    variables: {
      SType: 'RFF',
      sortDirection: ModelSortDirection.DESC,
    },
  });

  // LIST SELL OFFERS REPLIES
  const {
    data: sellOfferData,
    loading: sellOfferLoad,
    refetch: sellOfferRefetch,
    fetchMore: sellOfferFetchMore,
  } = useQuery<SellOffersByDateRelyQuery, SellOffersByDateRelyQueryVariables>(
    sellOffersByDateRely,
    {
      pollInterval: 500,
      variables: {
        SType: 'SELLOFFERREPLY',
        sortDirection: ModelSortDirection.DESC,
      },
    },
  );

  const [selectedOption, setSelectedOptions] = useState(true);
  const [fetchingMore, setFetchingMore] = useState<any>(false);
  const [itemSelected, setItemSelect] = useState<any>('RFQ');

  const nextToken = newData?.rffByDate?.nextToken;
  const nextToken2 = data?.rfqByDate?.nextToken;
  const nextToken3 = sellOfferData?.sellOffersByDateRely?.nextToken;

  const loadMoreItem = async () => {
    if (!nextToken || fetchingMore) {
      return;
    }
    setFetchingMore(true);
    await fetchMore({variables: {nextToken: nextToken}});
    setFetchingMore(false);
  };

  const loadMoreItem2 = async () => {
    if (!nextToken2 || fetchingMore) {
      return;
    }
    setFetchingMore(true);
    await keepFetch({variables: {nextToken: nextToken2}});
    setFetchingMore(false);
  };

  const loadMoreItem3 = async () => {
    if (!nextToken3 || fetchingMore) {
      return;
    }
    setFetchingMore(true);
    await sellOfferFetchMore({variables: {nextToken: nextToken3}});
    setFetchingMore(false);
  };

  // LIST RFQs REPLIES
  const {data: onData} = useQuery<
    RfqByDateReplyQuery,
    RfqByDateReplyQueryVariables
  >(rfqByDateReply, {
    pollInterval: 500,
    variables: {
      SType: 'RFQREFPLY',
      sortDirection: ModelSortDirection.DESC,
    },
  });

  // LIST RFFs REPLIES
  const {data: softData} = useQuery<
    RffByDateRelyQuery,
    RffByDateRelyQueryVariables
  >(rffByDateRely, {
    pollInterval: 500,
    variables: {
      SType: 'RFFREFPLY',
      sortDirection: ModelSortDirection.DESC,
    },
  });

  useEffect(() => {
    const allRFQs: any =
      data?.rfqByDate?.items
        ?.filter(usrId => usrId?.userID === userID)
        .filter((item: any) => !item?._deleted) || [];
    setRFQs(allRFQs);
  }, [data, loading]);

  useEffect(() => {
    const allRFFs: any =
      newData?.rffByDate?.items
        ?.filter(usrId => usrId?.userID === userID)
        .filter((item: any) => !item?._deleted) || [];
    setRFFs(allRFFs);
  }, [newData, newLoad]);

  useEffect(() => {
    const sellOffers: any =
      sellOfferData?.sellOffersByDateRely?.items
        ?.filter(uID => uID?.forUserID === userID)
        ?.filter((item: any) => !item?._deleted) || [];
    setSellOffers(sellOffers);
  }, [sellOfferData, sellOfferLoad]);

  if (loading || newLoad || sellOfferLoad || nowLoad) {
    return <LoadingIndicator />;
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
      <TabHeader
        userImage={user?.logo}
        containerStyle={{
          height:
            Platform.OS == 'ios' ? (SIZES.height > 700 ? '15%' : '15%') : '10%',
          marginBottom: SIZES.base,
        }}
      />

      {/* Tab Filter Button */}
      <View
        style={{
          marginTop: SIZES.base,
          marginHorizontal: SIZES.semi_margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: SIZES.base,
          alignSelf: 'flex-start',
        }}>
        {constants.OrderTabItem.map((item: any, index: any) => {
          return (
            <OrderTabItem
              key={`OrderTabItem-${index}`}
              item={item}
              selected={item.id == selectedOption}
              containerStyle={{
                marginLeft: index != 0 ? SIZES.radius : 0,
              }}
              onPress={() => {
                setSelectedOptions(item.id);
                setItemSelect(item.label);
              }}
            />
          );
        })}
      </View>

      <View style={{flex: 1, height: Dimensions.get('screen').height}}>
        {itemSelected === 'RFQ' ? (
          <FlashList
            data={RFQs}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item?.id}
            estimatedItemSize={20000}
            getItemType={({item}: any) => {
              return item;
            }}
            renderItem={({item, index}) => {
              const allRfqByDateReplies =
                onData?.rfqByDateReply?.items
                  ?.filter(rfqID => rfqID?.RFQ === item?.id)
                  ?.filter(usrID => usrID?.userID === userID)
                  .filter((item: any) => !item?._deleted) || [];
              return (
                <RFQOrderItem
                  key={index}
                  item={item}
                  showHR={true}
                  btn={true}
                  replyNumber={allRfqByDateReplies?.length || 0}
                  desc={true}
                  type={item?.__typename}
                  serviceImage={
                    item?.rfqType === 'STANDARD'
                      ? require('../../../assets/images/standard.png')
                      : item?.rfqType === 'DOMESTIC'
                      ? require('../../../assets/images/domestic.png')
                      : require('../../../assets/images/international.png')
                  }
                  onPress={() =>
                    navigation.navigate('RFQReplyList', {sellerItem: item})
                  }
                />
              );
            }}
            refreshing={newLoad}
            onRefresh={() => refetching()}
            ListFooterComponent={
              <View
                style={{
                  marginBottom: RFQs?.length - 1 ? 600 : 600,
                }}>
                {RFQs?.length === 0 && <NoItem contentStyle={{flex: 1}} />}
              </View>
            }
            onEndReached={() => loadMoreItem2()}
          />
        ) : itemSelected === 'RFF' ? (
          <FlashList
            data={RFFs}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item?.id}
            estimatedItemSize={20000}
            getItemType={({item}: any) => {
              return item;
            }}
            renderItem={({item, index}) => {
              const allRffByDateRelies =
                softData?.rffByDateRely?.items
                  ?.filter(rffID => rffID?.RFF === item.id)
                  ?.filter(usrID => usrID?.userID === userID)
                  .filter((item: any) => !item?._deleted) || [];
              return (
                <RFFOrderItem
                  key={index}
                  item={item}
                  showHR={true}
                  btn={true}
                  replyNumber={allRffByDateRelies?.length || 0}
                  desc={true}
                  type={item?.__typename}
                  serviceImage={
                    item?.rffType === 'AIR'
                      ? require('../../../assets/images/air.png')
                      : item?.rffType === 'LAND'
                      ? require('../../../assets/images/land.png')
                      : require('../../../assets/images/water.png')
                  }
                  // replies={RFFReplyLength}
                  onPress={() =>
                    navigation.navigate('RFFReplyList', {sellerItem: item})
                  }
                />
              );
            }}
            refreshing={loading}
            onRefresh={() => refetch()}
            ListFooterComponent={
              <View
                style={{
                  marginBottom: RFFs?.length - 1 ? 600 : 600,
                }}>
                {RFFs?.length === 0 && <NoItem contentStyle={{flex: 1}} />}
              </View>
            }
            onEndReached={() => loadMoreItem()}
          />
        ) : (
          <FlashList
            data={sellOffers}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={20000}
            getItemType={({item}: any) => {
              return item;
            }}
            keyExtractor={item => `${item?.id}`}
            renderItem={({item, index}) => {
              return (
                <SellOfferOrderItem
                  key={index}
                  item={item}
                  btn={false}
                  status={true}
                  showHR={true}
                  statusColor={COLORS.Yellow5}
                  onView={() =>
                    navigation.navigate('SellOfferDetails', {
                      sellOffer: item?.id,
                    })
                  }
                />
              );
            }}
            refreshing={sellOfferLoad}
            onRefresh={() => sellOfferRefetch()}
            ListFooterComponent={
              <View
                style={{
                  marginBottom: sellOffers?.length - 1 ? 600 : 600,
                }}>
                {sellOffers?.length === 0 && (
                  <NoItem contentStyle={{flex: 1}} />
                )}
              </View>
            }
            onEndReached={() => loadMoreItem3()}
          />
        )}
      </View>
    </View>
  );
};

export default Pending;
