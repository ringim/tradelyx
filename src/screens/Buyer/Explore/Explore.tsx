import {View, FlatList, Platform, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {COLORS, FONTS, SIZES} from '../../../constants';
import {HomeStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {
  GetUserQuery,
  GetUserQueryVariables,
  ModelSortDirection,
  SellOffersByDateQuery,
  SellOffersByDateQueryVariables,
} from '../../../API';
import {
  PopularProducts,
  SearchBox2,
  SearchItem,
  TabHeader,
} from '../../../components';
import {getUser} from '../../../queries/UserQueries';
import {useAuthContext} from '../../../context/AuthContext';
import {sellOffersByDate} from '../../../queries/SellOfferQueries';

const Explore = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const {userID} = useAuthContext();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);
  const [fetchingMore, setFetchingMore] = useState<any>(false);

  // GET USER DETAILS
  const {data} = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {
    variables: {id: userID},
  });
  const user: any = data?.getUser;

  // LIST SELL OFFERS
  const {
    data: newData,
    loading: newLoad,
    refetch,
    fetchMore,
  } = useQuery<SellOffersByDateQuery, SellOffersByDateQueryVariables>(
    sellOffersByDate,
    {
      pollInterval: 500,
      fetchPolicy: 'network-only',
      variables: {
        SType: 'SELLOFFER',
        sortDirection: ModelSortDirection.DESC,
        limit: 10,
      },
    },
  );
  const nextToken = newData?.sellOffersByDate?.nextToken;

  const loadMoreItem = async () => {
    if (!nextToken || fetchingMore) {
      return;
    }
    setFetchingMore(true);
    await fetchMore({variables: {nextToken}});
    setFetchingMore(false);
  };

  // SEARCH FILTER
  const searchFilterFunction = (text: any) => {
    if (text) {
      const sellOfferData = masterDataSource.filter(function (item: any) {
        const itemData = item.productName
          ? item.productName.toLowerCase()
          : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(sellOfferData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  useEffect(() => {
    let isCurrent = true;
    try {
      const items =
        (isCurrent &&
          newData?.sellOffersByDate?.items.filter(
            (item: any) => !item?._deleted,
          )) ||
        [];
      setFilteredDataSource(items);
      setMasterDataSource(items);
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
  }, [newLoad, newData]);

  if (newLoad) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={COLORS.primary6} />
      </View>
    );
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <TabHeader
          userImage={user?.logo}
          containerStyle={{
            paddingTop:
              Platform.OS === 'android'
                ? SIZES.height > 700
                  ? 10
                  : SIZES.base
                : 50,
            height: Platform.OS == 'ios' ? '14%' : '8%',
            marginBottom: SIZES.base,
          }}
        />

        {/* Search Box */}
        <SearchBox2
          searchFilterFunction={(text: any) => searchFilterFunction(text)}
          search={search}
          containerStyle={{margin: SIZES.radius}}>
          <Text
            style={{
              ...FONTS.h5,
              textAlign: 'left',
              alignSelf: 'flex-start',
              color: COLORS.Neutral1,
              marginBottom: 4
            }}>
            Latest Sell Offers
          </Text>
        </SearchBox2>

        {/* all items */}
        <FlatList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item?.id}`}
          renderItem={({item, index}) => {
            return (
              <SearchItem
                key={index}
                item={item}
                item_image2={item?.sellOfferImage}
                onPress={() =>
                  navigation.navigate('CompanyDetail', {
                    ID: item?.userID,
                  })
                }
                onView={() =>
                  navigation.navigate('OfferDetail', {sellOfferID: item})
                }
              />
            );
          }}
          refreshing={newLoad}
          onRefresh={() => refetch()}
          ListFooterComponent={
            <View
              style={{
                marginBottom: filteredDataSource?.length - 1 ? 300 : 300,
              }}
            />
          }
          onEndReached={() => loadMoreItem()}
        />
      </View>
    </Root>
  );
};

export default Explore;
