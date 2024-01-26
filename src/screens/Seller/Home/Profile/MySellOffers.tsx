import {View, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {FlashList} from '@shopify/flash-list';

import {COLORS, SIZES} from '../../../../constants';
import {
  LoadingIndicator,
  SearchBox2,
  SellOfferItem,
} from '../../../../components';
import {
  GetUserQuery,
  GetUserQueryVariables,
  ModelSortDirection,
  SellOffersByDateQuery,
  SellOffersByDateQueryVariables,
} from '../../../../API';
import {sellOffersByDate} from '../../../../queries/SellOfferQueries';
import {useAuthContext} from '../../../../context/AuthContext';
import {getUser} from '../../../../queries/UserQueries';

const MySellOffers = () => {
  const navigation = useNavigation<any>();
  const {userID} = useAuthContext();

  // GET USER
  const {data: newData, loading: newLoad} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {
    variables: {
      id: userID,
    },
  });
  const userInfo: any = newData?.getUser;

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
  const items =
    data?.sellOffersByDate?.items
      .filter(st => st?.SType === 'SELLOFFER')
      ?.filter(usrID => usrID?.userID === userID)
      .filter((item: any) => !item?._deleted) || [];

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);

  // SEARCH FILTER
  const handleSearch = (text: any) => {
    setSearch(text);
    const filteredItems = items.filter((item: any) =>
      item?.title.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredDataSource(filteredItems);
  };

  useEffect(() => {
    let isCurrent = true;
    try {
      setFilteredDataSource(items);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: `${(error as Error).message}`,
        autoClose: 1500,
      });
      return () => {
        isCurrent = false;
      };
    }
  }, [loading, data]);

  if (loading || newLoad) {
    <LoadingIndicator />;
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
                  title={userInfo?.title}
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
                  marginBottom: filteredDataSource?.length - 1 ? 300 : 300,
                }}
              />
            }
          />
        </View>
      </View>
    </Root>
  );
};

export default MySellOffers;
