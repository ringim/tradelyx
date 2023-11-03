import {View, ActivityIndicator, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {
  ALERT_TYPE,
  Root,
  Toast,
} from 'react-native-alert-notification';

import {COLORS, SIZES} from '../../../../constants';
import {NoItem, SearchBox2, SellOfferItem} from '../../../../components';
import {
  ModelSortDirection,
  SellOffersByDateQuery,
  SellOffersByDateQueryVariables,
} from '../../../../API';
import {sellOffersByDate} from '../../../../queries/RequestQueries';

import {useAuthContext} from '../../../../context/AuthContext';
import {FlatList} from 'react-native-gesture-handler';

const MySellOffers = () => {
  const navigation = useNavigation<any>();
  const {userID} = useAuthContext();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);

  const {data, loading, refetch} = useQuery<
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
        data?.sellOffersByDate?.items
          ?.filter(usrID => usrID?.userID === userID)
          .filter((item: any) => !item?._deleted) || [];
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

  if (loading) {
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator
        style={{justifyContent: 'center'}}
        size={'large'}
        color={COLORS.primary6}
      />
    </View>;
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        {/* Search Box */}
        <SearchBox2
          searchFilterFunction={(text: any) => searchFilterFunction(text)}
          search={search}
          showFiler={true}
          containerStyle={{margin: SIZES.semi_margin}}
        />
        {/* list of categories */}
        <FlatList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item?.id}`}
          renderItem={({item, index}) => {
            return (
              <SellOfferItem
                key={index}
                item={item}
                onPress={() =>
                  navigation.navigate('SellOfferDetail', {sellOffer: item})
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
            <View style={{height: filteredDataSource?.length - 1 && 200}} />
          }
        />

        {!filteredDataSource && <NoItem />}
      </View>
    </Root>
  );
};

export default MySellOffers;
