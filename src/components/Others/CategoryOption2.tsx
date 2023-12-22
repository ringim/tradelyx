import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES} from '../../constants';

const CategoryOption2 = ({category, isSelected, onPress}: any) => {
  return (
    <TouchableOpacity
      style={{
        height: (SIZES.width - SIZES.padding * 2 - 30) / 3.2,
        width: (SIZES.width - SIZES.padding * 2 - 30) / 3,
        marginTop: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SIZES.radius,
        backgroundColor: isSelected ? COLORS.Teal1 : COLORS.primary10,
        borderWidth: isSelected == 'light' ? 0 : 1,
        borderColor: COLORS.primary10,
        borderRadius: SIZES.semi_margin
      }}
      onPress={onPress}>
      <FastImage
        source={category?.icon}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          width: 30,
          height: 30,
        }}
        tintColor={isSelected ? COLORS.white : COLORS.Neutral6}
      />

      <Text
        style={{
          textAlign: 'center',
          marginTop: SIZES.radius,
          ...FONTS.cap1,
          fontWeight: '500',
          color: isSelected ? COLORS.white : COLORS.Neutral1,
        }}>
        {category?.type}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryOption2;
