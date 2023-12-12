import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';

import {COLORS, FONTS, SIZES, constants} from '../../../constants';
import {
  OrderTabItem,
  RFFReplyOrderItem,
  RFQReplyOrderItem,
} from '../../../components';
import {
  ModelSortDirection,
  RffByDateRelyQuery,
  RffByDateRelyQueryVariables,
  RfqByDateReplyQuery,
  RfqByDateReplyQueryVariables,
} from '../../../API';
import {rfqByDateReply} from '../../../queries/RFQQueries';
import {useAuthContext} from '../../../context/AuthContext';
import {OrderStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {rffByDateRely} from '../../../queries/RFFQueries';

const Pending = () => {
  const navigation = useNavigation<OrderStackNavigatorParamList>();
  const {userID} = useAuthContext();

  // LIST RFQs
  const {
    data,
    loading,
    fetchMore,
    refetch: refetching,
  } = useQuery<RfqByDateReplyQuery, RfqByDateReplyQueryVariables>(
    rfqByDateReply,
    {
      pollInterval: 500,
      fetchPolicy: 'network-only',
      variables: {
        SType: 'RFQREFPLY',
        sortDirection: ModelSortDirection.DESC,
        limit: 10,
      },
    },
  );
  const allReplyRFQs: any =
    data?.rfqByDateReply?.items
      ?.filter(usrId => usrId?.forUserID === userID)
      .filter((item: any) => !item?._deleted) || [];

  // LIST RFFs
  const {
    data: newData,
    loading: newLoad,
    fetchMore: keepFetch,
    refetch,
  } = useQuery<RffByDateRelyQuery, RffByDateRelyQueryVariables>(rffByDateRely, {
    pollInterval: 500,
    fetchPolicy: 'network-only',
    variables: {
      SType: 'RFFREFPLY',
      sortDirection: ModelSortDirection.DESC,
      limit: 10,
    },
  });
  const allReplyRFFs: any =
    newData?.rffByDateRely?.items
      ?.filter(usrId => usrId?.forUserID === userID)
      .filter((item: any) => !item?._deleted) || [];

  const [selectedOption, setSelectedOptions] = useState(true);
  const [fetchingMore, setFetchingMore] = useState<any>(false);
  const [itemSelected, setItemSelect] = useState<any>('RFF');

  const nextToken = newData?.rffByDateRely?.nextToken;
  const nextToken2 = data?.rfqByDateReply?.nextToken;

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

  if (loading || newLoad) {
    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center'}}
        color={COLORS.primary6}
        size="large"
      />
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{marginHorizontal: SIZES.margin, marginTop: SIZES.margin}}>
        <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>Manage Reply</Text>
      </View>

      {/* Tab Filter Button */}
      <View
        style={{
          marginTop: SIZES.margin,
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

      {/* Order List */}
      <View>
        {itemSelected === 'RFQ' ? (
          <FlatList
            data={allReplyRFQs}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <RFQReplyOrderItem
                  item={item}
                  desc={true}
                  statusColor={COLORS.Yellow5}
                  showHR={true}
                  status={true}
                  serviceImage={
                    item?.rfqType === 'STANDARD'
                      ? require('../../../assets/images/standard.png')
                      : item?.rfqType === 'DOMESTIC'
                      ? require('../../../assets/images/domestic.png')
                      : require('../../../assets/images/international.png')
                  }
                  onPress={() => {
                    item?.rfqType === 'DOMESTIC'
                      ? navigation.navigate('RFQReplyDetailDomestic', {
                          rfq: item?.id,
                        })
                      : item?.rfqType === 'STANDARD'
                      ? navigation.navigate('RFQReplyDetailStandard', {
                          rfq: item?.id,
                        })
                      : navigation.navigate('RFQReplyDetailInternational', {
                          rfq: item?.id,
                        });
                  }}
                />
              );
            }}
            refreshing={loading}
            onRefresh={() => refetching()}
            ListFooterComponent={
              <View
                style={{
                  marginBottom: allReplyRFQs?.length - 1 ? 300 : 300,
                }}
              />
            }
            onEndReached={() => loadMoreItem()}
          />
        ) : (
          <FlatList
            data={allReplyRFFs}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item?.id}
            renderItem={({item, index}) => {
              return (
                <RFFReplyOrderItem
                  item={item}
                  desc={true}
                  service={true}
                  statusColor={COLORS.Yellow5}
                  onPress={() => {
                    item?.rffType === 'AIR'
                      ? navigation.navigate('RFFReplyDetailAir', {
                          rff: item?.id,
                        })
                      : item?.rffType === 'LAND'
                      ? navigation.navigate('RFFReplyDetailLand', {
                          rff: item?.id,
                        })
                      : navigation.navigate('RFFReplyDetailOcean', {
                          rff: item?.id,
                        });
                  }}
                  showHR={true}
                  status={true}
                  serviceImage={
                    item?.rffType === 'AIR'
                      ? require('../../../assets/images/air.png')
                      : item?.rffType === 'LAND'
                      ? require('../../../assets/images/land.png')
                      : require('../../../assets/images/water.png')
                  }
                />
              );
            }}
            refreshing={loading}
            onRefresh={() => refetch()}
            ListFooterComponent={
              <View
                style={{
                  marginBottom: allReplyRFFs?.length - 1 ? 300 : 300,
                }}
              />
            }
            onEndReached={() => loadMoreItem2()}
          />
        )}
      </View>
    </View>
  );
};

export default Pending;
