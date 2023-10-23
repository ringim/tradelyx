import {ActivityIndicator, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

import {COLORS, SIZES} from '../../../constants';
import {SearchBox2, ProductItem} from '../../../components';
import {ListProductsQuery, ListProductsQueryVariables} from '../../../API';
import {useQuery} from '@apollo/client';
import {listProducts} from '../../../queries/ProductQueries';
import {useAuthContext} from '../../../context/AuthContext';

const MyStore = () => {
  const navigation = useNavigation<any>();
  const {userID} = useAuthContext();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);

  const {data, loading} = useQuery<
    ListProductsQuery,
    ListProductsQueryVariables
  >(listProducts, {
    pollInterval: 500,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });

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
        data?.listProducts?.items
          ?.filter(usrID => usrID?.userID === userID)
          .filter((item: any) => !item?._deleted) || [];
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
    <View style={{flex: 1}}>
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
          containerStyle={{margin: SIZES.semi_margin}}
        />

        {/* list of categories */}
        <FlatList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item?.id}`}
          renderItem={({item, index}) => {
            return (
              <ProductItem
                key={index}
                item={item}
                product_image={item?.image}
                onPress={() =>
                  navigation.navigate('StoreItem', {storeItem: item})
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

export default MyStore;
