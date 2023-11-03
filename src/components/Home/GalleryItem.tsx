import {View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';

import {SIZES} from '../../constants';

const GalleryItem = ({sellerItem, containerStyle}: any) => {
  return (
    <FlatList
      data={sellerItem?.img}
      keyExtractor={item => `${item?.id}`}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => (
        <View key={index} style={{...containerStyle}}>
          <FastImage
            source={item?.image}
            resizeMode={FastImage.resizeMode.cover}
            style={{width: 80, height: 80, borderRadius: SIZES.base}}
          />
        </View>
      )}
    />
  );
};

export default GalleryItem;
