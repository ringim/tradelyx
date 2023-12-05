import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';

import {COLORS, FONTS, SIZES, constants} from '../../../constants';
import {
  OrderTabItem,
  RFFOrderItem,
  LoadingIndicator,
  RFQOrderItem,
  NoItem,
} from '../../../components';
import {
  ModelSortDirection,
  RfqByDateQuery,
  RfqByDateQueryVariables,
  RffByDateQuery,
  RffByDateQueryVariables,
} from '../../../API';
import {rffByDate} from '../../../queries/RFFQueries';
import {useAuthContext} from '../../../context/AuthContext';
import {rfqByDate} from '../../../queries/RFQQueries';
import {OrderStackNavigatorParamList} from '../../../components/navigation/BuyerNav/type/navigation';

const Pending = () => {
  const {userID} = useAuthContext();
  const navigation = useNavigation<OrderStackNavigatorParamList>();

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
      limit: 10,
    },
  });
  const allRFQs: any =
    data?.rfqByDate?.items
      ?.filter(usrId => usrId?.userID === userID)
      .filter((item: any) => !item?._deleted) || [];

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
      limit: 10,
    },
  });
  const allRFFs: any =
    newData?.rffByDate?.items
      ?.filter(usrId => usrId?.userID === userID)
      .filter((item: any) => !item?._deleted) || [];

  const [selectedOption, setSelectedOptions] = useState(true);
  const [fetchingMore, setFetchingMore] = useState<any>(false);
  const [itemSelected, setItemSelect] = useState<any>('RFF');

  const nextToken = newData?.rffByDate?.nextToken;
  const nextToken2 = data?.rfqByDate?.nextToken;

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

      {allRFFs?.length == 0 && <NoItem />}
      {allRFQs?.length == 0 && <NoItem />}

      {/* RFF List */}
      <View>
        {itemSelected === 'RFF' ? (
          <FlatList
            data={allRFFs}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item?.id}
            renderItem={({item, index}) => {
              return (
                <RFFOrderItem
                  key={index}
                  item={item}
                  showHR={true}
                  btn={true}
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
                  marginBottom: allRFFs?.length - 1 && 250,
                }}>
                {loading && (
                  <ActivityIndicator
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    color={COLORS.primary6}
                  />
                )}
              </View>
            }
            onEndReached={() => loadMoreItem()}
          />
        ) : (
          <FlatList
            data={allRFQs}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item?.id}
            renderItem={({item, index}) => {
              return (
                <RFQOrderItem
                  key={index}
                  item={item}
                  showHR={true}
                  btn={true}
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
                  marginBottom: allRFQs?.length - 1 && 250,
                }}>
                {newLoad && <LoadingIndicator />}
              </View>
            }
            onEndReached={() => loadMoreItem2()}
          />
        )}
      </View>
    </View>
  );
};

export default Pending;
