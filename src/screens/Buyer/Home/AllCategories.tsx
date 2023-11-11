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

import {HomeStackNavigatorParamList} from '../../../components/navigation/BuyerNav/type/navigation';
import {COLORS, SIZES} from '../../../constants';
import {Header, HorizontalItem, NoItem, SearchBox2} from '../../../components';
import {ListCategoriesQuery, ListCategoriesQueryVariables} from '../../../API';
import {listCategories} from '../../../queries/ProductQueries';

const AllCategories = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);

  // LIST PRODUCT CATEGORIES
  const {data, loading} = useQuery<
    ListCategoriesQuery,
    ListCategoriesQueryVariables
  >(listCategories, {
    pollInterval: 300,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });
  const allCategories: any =
    data?.listCategories?.items.filter((item: any) => !item?._deleted) || [];

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
    try {
      const items = allCategories;
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
    <ActivityIndicator
      style={{flex: 1, justifyContent: 'center'}}
      size={'large'}
      color={COLORS.primary6}
    />;
  }

  return (
    <AlertNotificationRoot>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'All Categories'} tintColor={COLORS.Neutral1} />

        {/* Search Box */}
        <SearchBox2
          searchFilterFunction={(text: any) => searchFilterFunction(text)}
          search={search}
          containerStyle={{marginBottom: SIZES.base}}
        />

        {/* list of categories */}
        {!filteredDataSource ? (
          <NoItem />
        ) : (
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
                <HorizontalItem
                  key={index}
                  item={item}
                  onPress={() =>
                    navigation.navigate('CategoryItemList', {cateItem: item})
                  }
                />
              );
            }}
            ListFooterComponent={<View style={{height: 200}} />}
          />
        )}
      </View>
    </AlertNotificationRoot>
  );
};

export default AllCategories;
