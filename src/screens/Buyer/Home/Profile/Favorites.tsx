import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import {Header, NoItem, PopularItem} from '../../../../components';
import {COLORS} from '../../../../constants';
import {useProductContext} from '../../../../context/ProductContext';
import {HomeStackNavigatorParamList} from '../../../../components/navigation/BuyerNav/type/navigation';

const Favorites = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const {savedProductItem, removeItem}: any = useProductContext();

  // console.log(savedProductItem);

  const [onLoading, setLoading] = useState(false);

  const fetchSavedProducts = async () => {
    if (onLoading) {
      return;
    }
    setLoading(true);
    setLoading(false);
  };

  useEffect(() => {
    let isCurrent = true;
    if (savedProductItem.length > 0 && isCurrent) {
      fetchSavedProducts();
    }
    return () => {
      isCurrent = false;
    };
  }, [savedProductItem]);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
      <Header title={'My Favorites'} tintColor={COLORS.Neutral1} />

      <FlatList
        data={savedProductItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item?.id}`}
        renderItem={({item, index}: any) => {
          return (
            <PopularItem
              key={index}
              item={item}
              store_image={item?.productImage}
              onRemove={() => removeItem(item?.id)}
              showDelete={true}
              onPress={() =>
                navigation.navigate('ProductDetail', {productID: item?.id})
              }
            />
          );
        }}
        ListFooterComponent={
          <View
            style={{
              marginBottom: savedProductItem?.length - 1 ? 500 : 500,
            }}>
            {savedProductItem?.length === 0 && (
              <NoItem contentStyle={{flex: 1}} />
            )}
          </View>
        }
      />
    </View>
  );
};

export default Favorites;
