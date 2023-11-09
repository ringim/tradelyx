import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import { FlatList } from 'react-native-gesture-handler';

import {Header, NoItem, PopularItem} from '../../../../components';
import {COLORS} from '../../../../constants';
import {useProductContext} from '../../../../context/ProductContext';

const Favorites = () => {
  const {savedProductItem, removeItem}: any = useProductContext();

  // console.log(savedProductItem);

  const [onLoading, setLoading] = useState(false);
  const [items, setItems] = useState<any>([]);

  const fetchSavedProducts = async () => {
    if (onLoading) {
      return;
    }
    setLoading(true);
    setItems(savedProductItem);
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

      {items?.length === 0 && <NoItem />}

      <FlatList
        data={items}
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
            />
          );
        }}
      />
    </View>
  );
};

export default Favorites;
