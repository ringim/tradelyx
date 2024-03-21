import {View, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {FlashList} from '@shopify/flash-list';

import {COLORS, SIZES} from '../../../../constants';
import {
  LoadingIndicator,
  NoItem,
  SearchBox2,
  SellOfferItem,
} from '../../../../components';
import {
  ModelSortDirection,
  SellOffersByDateQuery,
  SellOffersByDateQueryVariables,
} from '../../../../API';
import {sellOffersByDate} from '../../../../queries/SellOfferQueries';
import {useAuthContext} from '../../../../context/AuthContext';

const MySellOffers = () => {
  const navigation = useNavigation<any>();
  const {userID} = useAuthContext();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);

  const {data, loading, refetch} = useQuery<
    SellOffersByDateQuery,
    SellOffersByDateQueryVariables
  >(sellOffersByDate, {
    pollInterval: 500,
    variables: {
      SType: 'SELLOFFER',
      sortDirection: ModelSortDirection.DESC,
    },
  });

  // SEARCH FILTER
  const handleSearch = (text: any) => {
    setSearch(text);
    const filteredItems =
      data?.sellOffersByDate?.items?.filter((item: any) =>
        item?.title.toLowerCase().includes(text.toLowerCase()),
      ) || [];
    setFilteredDataSource(filteredItems);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items =
          data?.sellOffersByDate?.items?.filter(
            st => st?.userID === userID && !st?._deleted,
          ) || [];
        setFilteredDataSource(items);
      } catch (error) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          textBody: `${(error as Error).message}`,
          autoClose: 1500,
        });
      }
    };

    fetchData();
  }, [data, userID]);

  // Loading state handling
  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        {/* Search Box */}
        <SearchBox2
          searchFilterFunction={(text: any) => handleSearch(text)}
          search={search}
          containerStyle={{margin: SIZES.semi_margin}}
        />

        {/* list of categories */}
        <View style={{height: '100%', width: Dimensions.get('screen').width}}>
          <FlashList
            data={filteredDataSource}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item?.id}`}
            estimatedItemSize={20000}
            getItemType={({item}: any) => {
              return item;
            }}
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
            refreshing={loading}
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
          />
        </View>
      </View>
    </Root>
  );
};

export default MySellOffers;
