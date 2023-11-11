import {ActivityIndicator, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

import {COLORS, SIZES} from '../../../constants';
import {RFFQuoteItem, SearchBox2} from '../../../components';
import {ExploreStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {
  ModelSortDirection,
  RFFTYPE,
  RffByDateQuery,
  RffByDateQueryVariables,
} from '../../../API';
import {rffByDate} from '../../../queries/RequestQueries';
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
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-and-network',
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
  }, [loading]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.primary6} />
      </View>
    );
  }

  return (
    <AlertNotificationRoot>
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
          showFiler={true}
          containerStyle={{margin: SIZES.semi_margin}}
        />

        <View style={{minHeight: 2}}>
          <FlashList
            data={filteredDataSource}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            keyExtractor={item => `${item.id}`}
            estimatedItemSize={200}
            getItemType={({item}: any) => {
              return item;
            }}
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
      </View>
    </AlertNotificationRoot>
  );
};

export default QuotesRequest;
