import {ActivityIndicator, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import {FlashList} from '@shopify/flash-list';

import {HomeStackNavigatorParamList} from '../../../components/navigation/BuyerNav/type/navigation';
import {COLORS, SIZES} from '../../../constants';
import {Header, NoItem, SearchBox2, SellerItem} from '../../../components';
import {
  AccountCategoryType,
  ListUsersQuery,
  ListUsersQueryVariables,
} from '../../../API';
import {useQuery} from '@apollo/client';
import {listUsers} from '../../../queries/UserQueries';

const AllSellers = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  // const route = useRoute<AllProductsRouteProp>();

  // console.log(route?.params.filterItem);

  // LIST SUPPLIERS
  const {data, loading} = useQuery<ListUsersQuery, ListUsersQueryVariables>(
    listUsers,
    {
      variables: {limit: 4},
      pollInterval: 300,
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-and-network',
    },
  );
  const suppliers: any =
    data?.listUsers?.items
      .filter(sup => sup?.accountType === AccountCategoryType?.SELLER)
      .filter((item: any) => !item?._deleted) || [];

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);

  // SEARCH FILTER
  const searchFilterFunction = (text: any) => {
    if (text) {
      const newData = masterDataSource.filter(function (item: any) {
        const itemData = item.businessName ? item.businessName.toLowerCase() : ''.toLowerCase();
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
      const items = suppliers;
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
      color={COLORS.primary4}
    />;
  }

  return (
    <AlertNotificationRoot>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'All Sellers'} tintColor={COLORS.Neutral1} />

        {/* Search Box */}
        <SearchBox2
          searchFilterFunction={(text: any) => searchFilterFunction(text)}
          search={search}
          containerStyle={{marginHorizontal: SIZES.margin}}
        />

        {/* list of categories */}
        {filteredDataSource?.length === 0 && <NoItem />}

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
              <SellerItem
                key={index}
                item={item}
                profile_image={item?.logo}
                onPress={() =>
                  navigation.navigate('BusinessDetail', {businessItem: item})
                }
              />
            );
          }}
          ListFooterComponent={
            <View style={{height: filteredDataSource?.length - 1 && 200}} />
          }
        />
      </View>
    </AlertNotificationRoot>
  );
};

export default AllSellers;
