import {TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {SIZES, COLORS, icons} from '../../constants';

const ImageUpload = ({onPress}: any) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.radius,
        justifyContent: 'center',
        width: 80,
        height: 80,
        borderRadius: SIZES.base,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: COLORS.Neutral6,
      }}
      onPress={onPress}>
      <FastImage
        source={icons.imageUpload}
        style={{width: 30, height: 30}}
        resizeMode={FastImage.resizeMode.contain}
        tintColor={COLORS.primary1}
      />
    </TouchableOpacity>
  );
};

export default ImageUpload;
