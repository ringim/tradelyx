import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../constants';

const OrderTabItem = ({item, onPress, selected}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: selected ? COLORS.primary10 : COLORS.white,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.base,
        borderRadius: SIZES.margin,
        borderWidth: 1,
        borderColor: selected ? COLORS.primary1 : COLORS.Neutral8,
        marginLeft: SIZES.base
      }}>
      <Text
        style={{
          ...FONTS.body3,
          fontWeight: '500',
          color: selected ? COLORS.primary1 : COLORS.Neutral1,
        }}>
        {item?.label}
      </Text>
    </TouchableOpacity>
  );
};

export default OrderTabItem;
