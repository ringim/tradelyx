import {ActivityIndicator, RefreshControl, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

import {COLORS, SIZES} from '../../../../constants';
import {SearchBox2, ProductItem, NoItem} from '../../../../components';

const MyStore = ({data, refetch, loading}: any) => {
  const navigation = useNavigation<any>();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);

  // console.log('list products', filteredDataSource)

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
      const items = data;
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
    <AlertNotificationRoot>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        {/* Search Box */}
        <SearchBox2
          searchFilterFunction={(text: any) => searchFilterFunction(text)}
          search={search}
          showFiler={true}
          containerStyle={{margin: SIZES.semi_margin}}
        />
        {/* list of items */}
        {!filteredDataSource && <NoItem />}

        <FlashList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item?.id}`}
          estimatedItemSize={200}
          getItemType={({item}: any) => {
            return item;
          }}
          renderItem={({item, index}) => {
            return (
              <ProductItem
                key={index}
                item={item}
                product_image={item?.productImage}
                onPress={() =>
                  navigation.navigate('StoreItem', {storeItem: item})
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
      </View>
    </AlertNotificationRoot>
  );
};

export default MyStore;
