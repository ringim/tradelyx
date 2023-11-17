import {ActivityIndicator, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {FlashList} from '@shopify/flash-list';

import {
  AllProductsRouteProp,
  HomeStackNavigatorParamList,
} from '../../../components/navigation/BuyerNav/type/navigation';
import {COLORS, SIZES} from '../../../constants';
import {AltHeader, NoItem, SearchBox2, SearchItem2} from '../../../components';

const AllProducts = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<AllProductsRouteProp>();

  const {loading, items} = route?.params;

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);

  // SEARCH FILTER
  const searchFilterFunction = (text: any) => {
    if (text) {
      const newData = masterDataSource.filter(function (item: any) {
        const itemData = item.title
          ? item?.title.toLowerCase()
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
      const filteredItems = items;
      setFilteredDataSource(items);
      setMasterDataSource(filteredItems);
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

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <AltHeader
          title={'All Products'}
          tintColor={COLORS.Neutral1}
          onPress={() => navigation.navigate('Home')}
        />

        {/* Search Box */}
        <SearchBox2
          searchFilterFunction={(text: any) => searchFilterFunction(text)}
          search={search}
          showFiler={true}
          onPress={() => navigation.navigate('SearchFilter')}
          containerStyle={{marginHorizontal: SIZES.margin}}
        />

        {filteredDataSource?.length === 0 && (
          <NoItem textCont={{marginTop: SIZES.margin}} />
        )}

        {/* list of categories */}
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
              <SearchItem2
                key={index}
                item={item}
                profile_image={item?.productImage}
                onPress={() =>
                  navigation.navigate('ProductDetail', {productItem: item})
                }
              />
            );
          }}
          ListFooterComponent={
            <View style={{height: filteredDataSource?.length - 1 && 200}} />
          }
        />
      </View>
    </Root>
  );
};

export default AllProducts;
