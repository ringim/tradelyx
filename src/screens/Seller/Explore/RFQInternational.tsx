import {View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {useQuery} from '@apollo/client';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

import {COLORS, SIZES} from '../../../constants';
import {RFQItem, SearchBox2} from '../../../components';
import {ExploreStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {
  ModelSortDirection,
  RFQTYPE,
  RfqByDateQuery,
  RfqByDateQueryVariables,
} from '../../../API';
import {rfqByDate} from '../../../queries/RequestQueries';

const RFQInternational = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);

  // LIST RFQs
  const {data, loading} = useQuery<RfqByDateQuery, RfqByDateQueryVariables>(
    rfqByDate,
    {
      pollInterval: 300,
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-and-network',
      variables: {
        SType: 'RFQ',
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
        data?.rfqByDate?.items
          ?.filter(rfq => rfq?.rfqType === RFQTYPE?.INTERNATIONAL)
          ?.filter((item: any) => !item?._deleted) || [];
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
            keyExtractor={item => `${item?.id}`}
            estimatedItemSize={200}
            getItemType={({item}: any) => {
              return item;
            }}
            renderItem={({item, index}) => {
              // copy to clipboard
              const copyToClipboard = () => {
                Clipboard.setString(item?.rfqNo);
              };
              /* RFQ items */
              return (
                <RFQItem
                  key={index}
                  item={item}
                  onCopy={copyToClipboard}
                  onPress={() =>
                    navigation.navigate('RFQDetail', {sellerItem: item})
                  }
                />
              );
            }}
            ListFooterComponent={
              <View
                style={{
                  marginBottom: filteredDataSource.length - 1 && 200,
                }}
              />
            }
          />
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default RFQInternational;
