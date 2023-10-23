import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, FONTS, icons} from '../../constants';

const BusinessDesc = ({productItem, title}: any) => {
  return (
    <View
      style={{
        padding: SIZES.semi_margin,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.semi_margin,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={icons.content}
            resizeMode={FastImage.resizeMode.cover}
            tintColor={COLORS.secondary1}
            style={{width: 20, height: 20}}
          />
        </View>

        <View
          style={{flex: 1, marginLeft: SIZES.radius, justifyContent: 'center'}}>
          <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>{title}</Text>
        </View>
      </View>

      <View style={{marginTop: SIZES.radius}}>
        <Text style={{...FONTS.body3, lineHeight: 24, color: COLORS.Neutral6}}>
          {productItem}
        </Text>
      </View>
    </View>
  );
};

export default BusinessDesc;
