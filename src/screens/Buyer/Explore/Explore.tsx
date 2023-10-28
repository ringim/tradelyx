import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useQuery} from '@apollo/client';
import {FlashList} from '@shopify/flash-list';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

import {COLORS, FONTS, SIZES, images} from '../../../constants';
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
  const {data: newData, loading: newLoad} = useQuery<
    SellOffersByDateQuery,
    SellOffersByDateQueryVariables
  >(sellOffersByDate, {
    pollInterval: 500,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
    variables: {
      SType: 'SELLOFFER',
      sortDirection: ModelSortDirection.DESC,
    },
  });

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
    try {
      const items =
        newData?.sellOffersByDate?.items?.filter(
          (item: any) => !item?._deleted,
        ) || [];
      setFilteredDataSource(items);
      setMasterDataSource(items);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: `${(error as Error).message}`,
        autoClose: 1500,
      });
    }
  }, [loading]);

  if (loading || newLoad) {
    <ActivityIndicator
      style={{flex: 1, justifyContent: 'center'}}
      size={'large'}
      color={COLORS.primary6}
    />;
  }

  return (
    <AlertNotificationRoot>
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
                showFiler={true}
                containerStyle={{margin: SIZES.semi_margin}}
              />

              <PopularProducts
                title={'Latest Sale Offers'}
                containerStyle={{marginTop: SIZES.base}}
              />
            </>
          }
          renderItem={({item, index}) => {
            return (
              <SearchItem
                key={index}
                item={item}
                logo={item?.storeImage}
                item_image={item?.image}
                item_image2={item?.images[0]}
                onPress={() =>
                  navigation.navigate('SellerDetail', {sellerItem: item})
                }
                onView={() =>
                  navigation.navigate('OfferDetail', {detail: item})
                }
              />
            );
          }}
          ListFooterComponent={
            <View style={{height: filteredDataSource?.length - 1 && 200}} />
          }
        />

        {/* No search items */}
        {!filteredDataSource && (
          <View style={{alignItems: 'center', top: -250}}>
            <FastImage
              source={images.NoItems}
              style={{width: 150, height: 150}}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text
              style={{
                ...FONTS.body2,
                color: COLORS.Neutral6,
                textAlign: 'center',
                margin: SIZES.margin,
                lineHeight: 24,
              }}>
              There are no sell offer at the moment
            </Text>
          </View>
        )}
      </View>
    </AlertNotificationRoot>
  );
};

export default Explore;
