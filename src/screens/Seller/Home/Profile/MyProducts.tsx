import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {COLORS, SIZES} from '../../../../constants';
import {SearchBox2, ProductItem} from '../../../../components';

const MyProducts = ({data, refetch, loading}: any) => {
  const navigation = useNavigation<any>();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);

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
      const items = isCurrent && data;
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

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        {/* Search Box */}
        <SearchBox2
          searchFilterFunction={(text: any) => searchFilterFunction(text)}
          search={search}
          // showFiler={true}
          containerStyle={{margin: SIZES.semi_margin}}
        />

        <FlatList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <ProductItem
                key={index}
                item={item}
                product_image={item?.productImage}
                onPress={() =>
                  navigation.navigate('ProductItem', {storeItem: item})
                }
              />
            );
          }}
          refreshing={loading}
          onRefresh={() => refetch()}
          ListFooterComponent={
            <View style={{marginBottom: filteredDataSource?.length - 1 && 200}} />
          }
        />
      </View>
    </Root>
  );
};

export default MyProducts;
