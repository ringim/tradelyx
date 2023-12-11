import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import {
  Header,
  LoadingIndicator,
  RFFOrderItem,
  ReplyListItem2,
  SearchBox2,
} from '../../../components';
import {COLORS, SIZES, dummyData} from '../../../constants';
import {
  OrderStackNavigatorParamList,
  ReplyListRFFRouteProp,
} from '../../../components/navigation/BuyerNav/type/navigation';
import {useQuery} from '@apollo/client';
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

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);
  const [fetchingMore, setFetchingMore] = useState<any>(false);

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
  const searchFilterFunction = (text: any) => {
    if (text) {
      const newData = masterDataSource.filter(function (item: any) {
        const itemData = item.productName
          ? item.productName.toLowerCase()
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
      const items = isCurrent && allRffByDateRelies;
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
      <Header title={'All RFF Reply'} tintColor={COLORS.Neutral1} />

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
              marginBottom: dummyData?.replyList?.length - 1 && 200,
            }}
          />
        }
        onEndReached={() => loadMoreItem()}
      />
    </View>
  );
};

export default RFFReplyList;
