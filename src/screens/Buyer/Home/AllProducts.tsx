import {View,} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

import {
  AllProductsRouteProp,
  HomeStackNavigatorParamList,
} from '../../../components/navigation/BuyerNav/type/navigation';
import {COLORS, dummyData} from '../../../constants';
import {Header, SearchBox2, SearchItem2} from '../../../components';

const AllProducts = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<AllProductsRouteProp>();

  console.log(route?.params.filterItem);

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
    try {
      const items = dummyData?.storeProducts;
      setFilteredDataSource(items);
      setMasterDataSource(items);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: `${(error as Error).message}`,
        autoClose: 1500,
      });
    }
  }, []);

  return (
    <AlertNotificationRoot>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'Filtered Products'} tintColor={COLORS.Neutral1} />

        {/* Search Box */}
        <SearchBox2
          searchFilterFunction={(text: any) => searchFilterFunction(text)}
          search={search}
        />

        {/* list of categories */}
        <FlatList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item?.id}`}
          renderItem={({item, index}) => {
            return (
              <SearchItem2
                key={index}
                item={item}
                onPress={() =>
                  navigation.navigate('ProductDetail', {productItem: item})
                }
              />
            );
          }}
          ListFooterComponent={<View style={{height: 200}} />}
        />
      </View>
    </AlertNotificationRoot>
  );
};

export default AllProducts;
