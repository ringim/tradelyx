import {ActivityIndicator, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
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
  >(listCategories);
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
  }, []);

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
        <View style={{marginHorizontal: SIZES.radius}}>
          <SearchBox2
            searchFilterFunction={(text: any) => searchFilterFunction(text)}
            search={search}
            containerStyle={{marginBottom: SIZES.base}}
          />
        </View>

        {/* list of categories */}
        {filteredDataSource?.length === 0 ? (
          <NoItem />
        ) : (
          <FlatList
            data={filteredDataSource}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item?.id}`}
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
