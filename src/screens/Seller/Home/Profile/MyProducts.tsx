import {View, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {COLORS, SIZES} from '../../../../constants';
import {
  SearchBox2,
  ProductItem,
  LoadingIndicator,
  NoItem,
} from '../../../../components';
import {
  ModelSortDirection,
  ProductByDateQuery,
  ProductByDateQueryVariables,
} from '../../../../API';
import {productByDate} from '../../../../queries/ProductQueries';
import {useAuthContext} from '../../../../context/AuthContext';

const MyProducts = () => {
  const navigation = useNavigation<any>();
  const {userID} = useAuthContext();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);

  const {data, loading, refetch} = useQuery<
    ProductByDateQuery,
    ProductByDateQueryVariables
  >(productByDate, {
    pollInterval: 500,
    variables: {
      SType: 'JOB',
      sortDirection: ModelSortDirection.DESC,
    },
  });

  // SEARCH FILTER
  const handleSearch = (text: any) => {
    setSearch(text);
    const filteredItems =
      data?.productByDate?.items?.filter((item: any) =>
        item?.title.toLowerCase().includes(text.toLowerCase()),
      ) || [];
    setFilteredDataSource(filteredItems);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProducts =
          data?.productByDate?.items?.filter(
            st => st?.userID === userID && !st?._deleted,
          ) || [];
        setFilteredDataSource(userProducts);
      } catch (error) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          textBody: `${(error as Error).message}`,
          autoClose: 1500,
        });
      }
    };
    fetchData();
  }, [data, userID]);

  // Properly handle loading state
  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        {/* Search Box */}
        <SearchBox2
          searchFilterFunction={(text: any) => handleSearch(text)}
          search={search}
          containerStyle={{margin: SIZES.semi_margin}}
        />

        <View style={{height: '80%', width: Dimensions.get('screen').width}}>
          <FlashList
            data={filteredDataSource}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item?.id}`}
            estimatedItemSize={20000}
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
                    navigation.navigate('ProductItem', {storeItem: item?.id})
                  }
                />
              );
            }}
            refreshing={loading}
            onRefresh={() => refetch()}
            ListFooterComponent={
              <View
                style={{
                  marginBottom: filteredDataSource?.length - 1 ? 500 : 500,
                }}>
                {filteredDataSource?.length === 0 && (
                  <NoItem contentStyle={{flex: 1}} />
                )}
              </View>
            }
          />
        </View>
      </View>
    </Root>
  );
};

export default MyProducts;
