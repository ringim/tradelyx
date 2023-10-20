import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';

import {Header, IconButton, PopularItem} from '../../../../components';
import {COLORS, SIZES, icons} from '../../../../constants';
import {HomeStackNavigatorParamList} from '../../../../components/navigation/SellerNav/type/navigation';
import {useProductContext} from '../../../../context/ProductContext';

const Favorites = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const {savedProductItem, removeProductItem}: any = useProductContext();

  // console.log(savedProductItem);

  const [onLoading, setLoading] = useState(false);
  const [items, setItems] = useState<any>([]);

  const deleteItem = (itemId: any) => {
    removeProductItem(itemId);
    // console.log(itemId);
  };

  const fetchSavedProducts = async () => {
    if (onLoading) {
      return;
    }
    setLoading(true);
    setItems(savedProductItem);
    setLoading(false);
  };

  useEffect(() => {
    if (savedProductItem.length > 0) {
      fetchSavedProducts();
    }
  }, [savedProductItem]);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'My Favorites'} tintColor={COLORS.Neutral1} />

      <SwipeListView
        data={items}
        keyExtractor={item => `${item}`}
        showsVerticalScrollIndicator={false}
        disableRightSwipe={true}
        rightOpenValue={-75}
        renderItem={({item, index}: any) => {
          return (
            <PopularItem
              key={index}
              item={item}
              onPress={() =>
                navigation.navigate('ProductDetail', {productItem: item})
              }
            />
          );
        }}
        renderHiddenItem={(data: any, rowMap) => (
          <IconButton
            containerStyle={{
              flex: 1,
              justifyContent: 'flex-end',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: SIZES.radius,
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.radius,
            }}
            icon={icons.remove}
            iconStyle={{
              marginRight: 12,
              width: 24,
              height: 24,
            }}
            tintColor={COLORS.Rose5}
            onPress={() => deleteItem(data.item)}
          />
        )}
      />
    </View>
  );
};

export default Favorites;
