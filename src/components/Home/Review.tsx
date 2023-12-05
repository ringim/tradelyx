import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {SIZES, COLORS, FONTS, icons} from '../../constants';

const Review = ({contentStyle}: any) => {
  return (
    <View
      style={{
        padding: SIZES.base,
        marginTop: SIZES.base,
        marginHorizontal: SIZES.base,
        ...contentStyle,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={icons.rating}
            resizeMode={FastImage.resizeMode.cover}
            style={{width: 24, height: 24}}
          />
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>Reviews</Text>
        </View>
      </View>
    </View>
  );
};

export default Review;
