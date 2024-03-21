import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {HomeStackNavigatorParamList} from '../../../components/navigation/BuyerNav/type/navigation';
import {COLORS, SIZES, constants} from '../../../constants';
import {Header, HorizontalItem, NoItem, SearchBox2} from '../../../components';

const AllCategories = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const items = constants.allCategories;

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);

  // SEARCH FILTER
  const handleSearch = (text: any) => {
    setSearch(text);
    const filteredItems = items.filter((item: any) =>
      item?.title.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredDataSource(filteredItems);
  };

  useEffect(() => {
    let isCurrent = true;
    try {
      isCurrent && setFilteredDataSource(items);
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
  }, []);

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'All Categories'} tintColor={COLORS.Neutral1} />

        {/* Search Box */}
        <SearchBox2
          searchFilterFunction={(text: any) => handleSearch(text)}
          search={search}
          containerStyle={{marginBottom: SIZES.base}}
        />

        {/* list of categories */}
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
          ListFooterComponent={
            <View
              style={{
                marginBottom: filteredDataSource?.length - 1 ? 300 : 300,
              }}>
              {filteredDataSource?.length === 0 && (
                <NoItem contentStyle={{flex: 1}} />
              )}
            </View>
          }
        />
      </View>
    </Root>
  );
};

export default AllCategories;
