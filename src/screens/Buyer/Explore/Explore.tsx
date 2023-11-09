import {View, ActivityIndicator, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {FlashList} from '@shopify/flash-list';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {COLORS, SIZES} from '../../../constants';
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
  PromoSection,
  SearchBox2,
  SearchItem,
  TabHeader,
} from '../../../components';
import {getUser} from '../../../queries/UserQueries';
import {useAuthContext} from '../../../context/AuthContext';
import {sellOffersByDate} from '../../../queries/RequestQueries';
import {RefreshControl} from 'react-native-gesture-handler';

const Explore = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const {userID} = useAuthContext();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);

  // GET USER DETAILS
  const {loading, data} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: userID}},
  );
  const user: any = data?.getUser;

  // LIST SELL OFFERS
  const {
    data: newData,
    loading: newLoad,
    refetch,
  } = useQuery<SellOffersByDateQuery, SellOffersByDateQueryVariables>(
    sellOffersByDate,
    {
      pollInterval: 500,
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'network-only',
      variables: {
        SType: 'SELLOFFER',
        sortDirection: ModelSortDirection.DESC,
      },
    },
  );
  const sellOffer: any =
    newData?.sellOffersByDate?.items
      .filter(st => st?.SType === 'SELLOFFER')
      .filter((item: any) => !item?._deleted) || [];
  // console.log('sellOffers', sellOfer);

  // SEARCH FILTER
  const searchFilterFunction = (text: any) => {
    if (text) {
      const sellOfferData = masterDataSource.filter(function (item: any) {
        const itemData = item.title
          ? item.title.toLowerCase()
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
      const items = isCurrent && sellOffer;
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
  }, [newLoad]);

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <TabHeader userImage={user?.logo} />

        {/* all items */}
        <FlashList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item?.id}`}
          estimatedItemSize={200}
          getItemType={({item}: any) => {
            return item;
          }}
          ListHeaderComponent={
            <>
              {/* Promo */}
              <PromoSection containerStyle={{marginTop: SIZES.margin}} />

              {/* Search Box */}
              <SearchBox2
                searchFilterFunction={(text: any) => searchFilterFunction(text)}
                search={search}
                // showFiler={true}
                containerStyle={{margin: SIZES.semi_margin}}
                onPress={() => navigation.navigate('SearchFilter2')}
              />

              <PopularProducts
                title={'Latest Sell Offers'}
                containerStyle={{marginTop: SIZES.base}}
              />
            </>
          }
          renderItem={({item, index}) => {
            return (
              <SearchItem
                key={index}
                item={item}
                item_image={item?.image}
                item_image2={item?.images[0]}
                onPress={() =>
                  navigation.navigate('CompanyDetail', {sellerItem: item})
                }
                onView={() =>
                  navigation.navigate('OfferDetail', {detail: item})
                }
              />
            );
          }}
          refreshControl={
            <RefreshControl
              tintColor={COLORS.primary4}
              refreshing={loading}
              onRefresh={() => refetch()}
            />
          }
          ListFooterComponent={
            <View
              style={{
                marginBottom: filteredDataSource?.length - 1 && 300,
              }}>
              {newLoad && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30,
                  }}>
                  <ActivityIndicator size="small" color={COLORS.primary6} />
                </View>
              )}
            </View>
          }
        />
      </View>
    </Root>
  );
};

export default Explore;
