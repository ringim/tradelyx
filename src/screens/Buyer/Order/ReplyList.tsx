import {View} from 'react-native';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';

import {Header, OrderItem, ReplyListItem} from '../../../components';
import {COLORS, SIZES, dummyData} from '../../../constants';
import {
  OrderStackNavigatorParamList,
  ReplyListRouteProp,
} from '../../../components/navigation/BuyerNav/type/navigation';

const ReplyList = () => {
  const navigation = useNavigation<OrderStackNavigatorParamList>();
  const route = useRoute<ReplyListRouteProp>();

  // console.log(route?.params?.sellerItem);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);

  // SEARCH FILTER
  const searchFilterFunction = (text: any) => {
    if (text) {
      const newData = masterDataSource.filter(function (item: any) {
        const itemData = item.name ? item.name.toLowerCase() : ''.toLowerCase();
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
      const items = isCurrent && dummyData?.replyList;
      setFilteredDataSource(items);
      setMasterDataSource(items);
    } catch (error) {
      return;
    }
    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'All RFQ Reply'} tintColor={COLORS.Neutral1} />

      <OrderItem
        desc={true}
        item={route?.params?.sellerItem}
        contentStyle={{backgroundColor: COLORS.Neutral10}}
      />

      {/* Search Box */}
      {/* <SearchBox2
        searchFilterFunction={(text: any) => searchFilterFunction(text)}
        search={search}
        containerStyle={{
          marginTop: SIZES.margin,
          width: '92%',
          alignSelf: 'center',
        }}
      /> */}

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
            <ReplyListItem
              containerStyle={{marginTop: SIZES.radius}}
              key={index}
              item={item}
              onPress2={() =>
                navigation.navigate('CompanyDetail', {sellerItem: item})
              }
              onPress={() =>
                navigation.navigate('ReplyDetail', {sellerItem: item})
              }
            />
          );
        }}
        // refreshControl={
        //   <RefreshControl
        //     tintColor={COLORS.primary4}
        //     refreshing={newLoad}
        //     onRefresh={() => refetch()}
        //   />
        // }
        ListFooterComponent={
          <View
            style={{
              marginBottom: dummyData?.replyList?.length - 1 && 200,
            }}
          />
        }
      />
    </View>
  );
};

export default ReplyList;
