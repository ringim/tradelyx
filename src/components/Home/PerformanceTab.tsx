import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES} from '../../constants';

const PerformanceTab = ({icon, title, content, contentStyle}: any) => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: SIZES.radius,
        backgroundColor: COLORS.Neutral10,
        borderRadius: SIZES.base,
        marginTop: SIZES.semi_margin,
        ...contentStyle
      }}>
      <View style={{justifyContent: 'center'}}>
        <FastImage
          source={icon}
          resizeMode={FastImage.resizeMode.contain}
          style={{width: 24, height: 24}}
          tintColor={COLORS.secondary1}
        />
      </View>

      <View
        style={{flex: 1, marginLeft: SIZES.radius, justifyContent: 'center'}}>
        <Text style={{...FONTS.body3, color: COLORS.Neutral4}}>{title}</Text>
      </View>

      <View style={{justifyContent: 'center'}}>
        <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>{content}</Text>
      </View>
    </View>
  );
};

export default PerformanceTab;
