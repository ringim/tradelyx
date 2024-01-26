import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {
  Header,
  LoadingIndicator,
  NoItem,
  RFFOrderItem,
  ReplyListItem2,
  SearchBox2,
} from '../../../components';
import {COLORS, SIZES} from '../../../constants';
import {
  OrderStackNavigatorParamList,
  ReplyListRFFRouteProp,
} from '../../../components/navigation/BuyerNav/type/navigation';
import {
  ModelSortDirection,
  RffByDateRelyQuery,
  RffByDateRelyQueryVariables,
} from '../../../API';
import {rffByDateRely} from '../../../queries/RFFQueries';
import {useAuthContext} from '../../../context/AuthContext';

const RFFReplyList = () => {
  const navigation = useNavigation<OrderStackNavigatorParamList>();
  const route: any = useRoute<ReplyListRFFRouteProp>();

  const {userID} = useAuthContext();

  // LIST RFFs ByDateRely
  const {data, loading, fetchMore, refetch} = useQuery<
    RffByDateRelyQuery,
    RffByDateRelyQueryVariables
  >(rffByDateRely, {
    variables: {
      SType: 'RFFREFPLY',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const allRffByDateRelies =
    data?.rffByDateRely?.items
      ?.filter(rffID => rffID?.RFF === route?.params?.sellerItem?.id)
      ?.filter(usrID => usrID?.userID === userID)
      .filter((item: any) => !item?._deleted) || [];

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [fetchingMore, setFetchingMore] = useState<any>(false);

  const nextToken = data?.rffByDateRely?.nextToken;
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
    const filteredItems = allRffByDateRelies.filter((item: any) =>
      item?.productName.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredDataSource(filteredItems);
  };

  useEffect(() => {
    let isCurrent = true;
    try {
      isCurrent && setFilteredDataSource(allRffByDateRelies);
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
        <Header title={'All RFF Replies'} tintColor={COLORS.Neutral1} />

        <RFFOrderItem
          desc={true}
          item={route?.params?.sellerItem}
          contentStyle={{backgroundColor: COLORS.Neutral10}}
          serviceImage={
            route?.params?.sellerItem?.rffType === 'AIR'
              ? require('../../../assets/images/air.png')
              : route?.params?.sellerItem?.rffType === 'LAND'
              ? require('../../../assets/images/land.png')
              : require('../../../assets/images/water.png')
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
              <ReplyListItem2
                containerStyle={{marginTop: SIZES.radius}}
                key={index}
                item={item}
                onPress2={() =>
                  navigation.navigate('CompanyDetail', {sellerItem: item})
                }
                onPress={() => {
                  item?.rffType === 'AIR'
                    ? navigation.navigate('ReplyDetailAir', {
                        sellerItem: item,
                      })
                    : item?.rffType === 'LAND'
                    ? navigation.navigate('ReplyDetailLand', {
                        sellerItem: item,
                      })
                    : navigation.navigate('ReplyDetailOcean', {
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
    </Root>
  );
};

export default RFFReplyList;
