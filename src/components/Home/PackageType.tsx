import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, FONTS, icons} from '../../constants';

const PackageType = ({selected, item, onPress}: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderRadius: SIZES.radius,
          borderWidth: selected ? 1 : 0,
          padding: SIZES.semi_margin,
          borderColor: selected ? COLORS.primary2 : '',
          backgroundColor: selected ? COLORS.primary10 : COLORS.Neutral10,

          justifyContent: 'center',
        }}>
        <FastImage
          source={item?.image}
          style={{width: 40, height: 40}}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <Text
        style={{
          ...FONTS.body3,
          color: COLORS.Neutral1,
          textAlign: 'center',
          paddingTop: SIZES.base,
        }}>
        {item?.type}
      </Text>
    </TouchableOpacity>
  );
};

export default PackageType;
