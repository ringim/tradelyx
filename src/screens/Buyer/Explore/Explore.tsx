import {View, Platform, Text, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
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
  LoadingIndicator,
  NoItem,
  SearchBox2,
  SellOfferItem1,
  TabHeader,
} from '../../../components';
import {getUser} from '../../../queries/UserQueries';
import {useAuthContext} from '../../../context/AuthContext';
import {sellOffersByDate} from '../../../queries/SellOfferQueries';

const Explore = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const {userID, authUser} = useAuthContext();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [fetchingMore, setFetchingMore] = useState<any>(false);

  // GET USER DETAILS
  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {id: userID},
    },
  );
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
      variables: {
        SType: 'SELLOFFER',
        sortDirection: ModelSortDirection.DESC,
      },
    },
  );
  const sellOfer =
    newData?.sellOffersByDate?.items.filter((item: any) => !item?._deleted) ||
    [];

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
  const handleSearch = (text: any) => {
    setSearch(text);
    const filteredItems = sellOfer.filter((item: any) =>
      item?.productName.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredDataSource(filteredItems);
  };

  useEffect(() => {
    let isCurrent = true;
    try {
      setFilteredDataSource(sellOfer);
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

  if (newLoad || loading) {
    return <LoadingIndicator />;
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
        <TabHeader
          userImage={user?.logo}
          containerStyle={{
            height:
              Platform.OS == 'ios'
                ? SIZES.height > 700
                  ? '15%'
                  : '15%'
                : '10%',
            marginBottom: SIZES.base,
          }}
        />

        {/* Search Box */}
        <SearchBox2
          searchFilterFunction={(text: any) => handleSearch(text)}
          search={search}
          containerStyle={{margin: SIZES.radius}}>
          {filteredDataSource?.length > 0 && (
            <Text
              style={{
                ...FONTS.h5,
                textAlign: 'left',
                alignSelf: 'flex-start',
                color: COLORS.Neutral1,
                marginBottom: SIZES.base,
              }}>
              Latest Sell Offers
            </Text>
          )}
        </SearchBox2>

        {/* all items */}
        <View style={{height: '100%', width: Dimensions.get('screen').width}}>
          <FlashList
            data={filteredDataSource}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item?.id}`}
            estimatedItemSize={200000}
            getItemType={({item}: any) => {
              return item;
            }}
            renderItem={({item, index}) => {
              return (
                <SellOfferItem1
                  key={index}
                  item={item}
                  item_image2={item?.sellOfferImage}
                  onPress={() =>
                    !authUser
                      ? navigation.navigate('SignUp')
                      : navigation.navigate('CompanyDetail', {
                          ID: item?.userID,
                        })
                  }
                  onView={() =>
                    !authUser
                      ? navigation.navigate('SignUp')
                      : navigation.navigate('OfferDetail', {detail: item?.id})
                  }
                />
              );
            }}
            refreshing={newLoad}
            onRefresh={() => refetch()}
            ListFooterComponent={
              <View
                style={{
                  marginBottom: filteredDataSource?.length - 1 ? 500 : 500,
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

export default Explore;
