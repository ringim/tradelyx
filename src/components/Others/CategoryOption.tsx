import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../constants';
import FastImage from 'react-native-fast-image';

const CategoryOption = ({category, isSelected, onPress}: any) => {
  return (
    <TouchableOpacity
      style={{
        height: (SIZES.width - SIZES.padding * 2 - 30) / 2,
        width: (SIZES.width - SIZES.padding * 2 ) / 2.5,
        marginTop: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: isSelected ? COLORS.Teal1 : COLORS.primary10,
        borderWidth: isSelected == 'light' ? 0 : 1,
        borderColor: COLORS.primary10,
      }}
      onPress={onPress}>
      <FastImage
        source={category?.icon}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          width: 40,
          height: 40,
        }}
        tintColor={isSelected ? COLORS.white : COLORS.Neutral6}
      />

      <Text
        style={{
          textAlign: 'center',
          marginTop: SIZES.radius,
          ...FONTS.h5,
          color: isSelected ? COLORS.white : COLORS.Neutral1,
          lineHeight: 18,
        }}>
        {category?.label}
      </Text>

      <Text
        style={{
          textAlign: 'center',
          marginTop: SIZES.radius,
          ...FONTS.cap1,
          color: isSelected ? COLORS.white : COLORS.Neutral1,
          fontWeight: '500'
        }}>
        {category?.desc}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryOption;
