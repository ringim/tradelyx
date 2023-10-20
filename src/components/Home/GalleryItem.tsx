import {View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {SIZES} from '../../constants';

const GalleryItem = ({item, containerStyle}: any) => {
  return (
    <View style={{...containerStyle}}>
      <FastImage
        source={item?.image}
        resizeMode={FastImage.resizeMode.cover}
        style={{width: 80, height: 80, borderRadius: SIZES.base}}
      />
    </View>
  );
};

export default GalleryItem;
