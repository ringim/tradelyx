import {View, ActivityIndicator, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {useQuery} from '@apollo/client';
import Clipboard from '@react-native-clipboard/clipboard';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {COLORS, SIZES} from '../../../constants';
import {NoItem, RFQItem3, SearchBox2} from '../../../components';
import {ExploreStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {
  ModelSortDirection,
  RFQTYPE,
  RfqByDateQuery,
  RfqByDateQueryVariables,
} from '../../../API';
import {rfqByDate} from '../../../queries/RequestQueries';

const RFQDomestic = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);

  // LIST RFQs
  const {data, loading, refetch} = useQuery<
    RfqByDateQuery,
    RfqByDateQueryVariables
  >(rfqByDate, {
    pollInterval: 300,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
    variables: {
      SType: 'RFQ',
      sortDirection: ModelSortDirection.DESC,
    },
  });

  // SEARCH FILTER
  const searchFilterFunction = (text: any) => {
    if (text) {
      const newData = masterDataSource.filter(function (item: any) {
        const itemData = item.productName
          ? item.productName.toLowerCase()
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
        (isCurrent &&
          data?.rfqByDate?.items
            ?.filter(rfq => rfq?.rfqType === RFQTYPE?.DOMESTIC)
            ?.filter((item: any) => !item?._deleted)) ||
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
  }, [loading]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <ActivityIndicator size="small" color={COLORS.primary6} />
      </View>
    );
  }

  return (
    <Root>
      <View
        style={{
          flex: 1,
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

        <FlashList
          data={filteredDataSource}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
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
              <RFQItem3
                key={index}
                item={item}
                onCopy={copyToClipboard}
                onPress={() =>
                  navigation.navigate('DomesticRFQDetail', {rfqItem: item})
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
                marginBottom: filteredDataSource.length - 1 && 200,
              }}
            />
          }
        />
      </View>
    </Root>
  );
};

export default RFQDomestic;
