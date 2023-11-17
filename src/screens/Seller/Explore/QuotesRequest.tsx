import {ActivityIndicator, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {COLORS, SIZES} from '../../../constants';
import {NoItem, RFFQuoteItem, SearchBox2} from '../../../components';
import {ExploreStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {
  ModelSortDirection,
  RffByDateQuery,
  RffByDateQueryVariables,
} from '../../../API';
import {rffByDate} from '../../../queries/RequestQueries';
import {FlatList} from 'react-native-gesture-handler';
const QuotesRequest = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);

  // LIST RFFs
  const {data, loading} = useQuery<RffByDateQuery, RffByDateQueryVariables>(
    rffByDate,
    {
      pollInterval: 300,
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'network-only',
      variables: {
        SType: 'RFF',
        sortDirection: ModelSortDirection.DESC,
      },
    },
  );

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
    let isCurrent = true;
    try {
      const items =
        data?.rffByDate?.items.filter((item: any) => !item?._deleted) || [];
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
  }, [loading]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="small" color={COLORS.primary6} />
      </View>
    );
  }

  // console.log(filteredDataSource);

  return (
    <Root>
      <View
        style={{
          flex: 1,
          marginTop: SIZES.radius,
          backgroundColor: COLORS.white,
        }}>
        {/* Search Box */}
        <SearchBox2
          searchFilterFunction={(text: any) => searchFilterFunction(text)}
          search={search}
          // showFiler={true}
          containerStyle={{margin: SIZES.semi_margin}}
        />

        {filteredDataSource?.length === 0 && <NoItem />}

        <FlatList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          keyExtractor={item => `${item?.id}`}
          renderItem={({item, index}) => {
            /* RFF items */
            return (
              <RFFQuoteItem
                key={index}
                item={item}
                onPress={() =>
                  navigation.navigate('QuotesRequestDetails', {
                    quoteItem: item,
                  })
                }
              />
            );
          }}
          ListFooterComponent={
            <View
              style={{
                marginBottom: filteredDataSource?.length - 1 && 200,
              }}
            />
          }
        />
      </View>
    </Root>
  );
};

export default QuotesRequest;
