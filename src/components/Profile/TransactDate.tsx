import {View, Text} from 'react-native';
import React from 'react';

import {COLORS, FONTS, SIZES} from '../../constants';

const TransactDate = ({item}: any) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.lightYellow,
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.radius,
      }}>
      <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>{item?.date}</Text>
    </View>
  );
};

export default TransactDate;
