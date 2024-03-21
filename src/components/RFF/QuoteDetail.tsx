import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {SIZES, COLORS, FONTS, icons} from '../../constants';

const QuoteDetail = ({place}: any) => {
  return (
    <View
      style={{
        marginTop: SIZES.semi_margin,
        marginHorizontal: SIZES.base,
        borderRadius: SIZES.radius,
        padding: SIZES.radius,
        backgroundColor: COLORS.Neutral10,
      }}>
      <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>Destination</Text>
      <View
        style={{
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            marginTop: 5,
            justifyContent: 'center',
            padding: SIZES.base,
            width: 32,
            height: 32,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.secondary10,
          }}>
          <FastImage
            source={icons?.location}
            tintColor={COLORS.secondary1}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              paddingTop: 4,
              ...FONTS.body3,
              color: COLORS.Neutral6,
            }}>
            {place}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default QuoteDetail;
