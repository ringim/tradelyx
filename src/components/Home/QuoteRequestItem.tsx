import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {SIZES, FONTS, COLORS, icons} from '../../constants';

const QuoteRequestItem = ({to, fromImg, toImg, from}: any) => {
  return (
    <View
      style={{
        margin: SIZES.radius,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      {/* Buyer from Image */}
      <View
        style={{
          justifyContent: 'center',
        }}>
        <FastImage
          source={{uri: fromImg}}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: 23,
            height: 23,
          }}
        />
      </View>

      {/* Buyer Country Name */}
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
          justifyContent: 'center',
        }}>
        <Text style={{...FONTS.cap1, color: COLORS.Neutral6}}>From</Text>
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.h5,
            marginTop: 2,
            color: COLORS.Neutral1,
          }}>
          {from}
        </Text>
      </View>

      {/* arrow */}
      <View
        style={{
          justifyContent: 'center',
        }}>
        <FastImage
          source={icons.right}
          resizeMode={FastImage.resizeMode.contain}
          tintColor={COLORS.Neutral5}
          style={{
            width: 25,
            height: 25,
          }}
        />
      </View>

      {/* Buyer To Image */}
      <View
        style={{
          marginLeft: SIZES.padding,
          justifyContent: 'center',
        }}>
        <FastImage
          source={{uri: toImg}}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: 23,
            height: 23,
          }}
        />
      </View>

      {/* Buyer Country Name */}
      <View
        style={{
          marginLeft: SIZES.radius,
          justifyContent: 'center',
        }}>
        <Text style={{...FONTS.cap1, color: COLORS.Neutral6}}>To</Text>
        <Text
          numberOfLines={2}
          style={{
            ...FONTS.h5,
            marginTop: 2,
            color: COLORS.Neutral1,
          }}>
          {to}
        </Text>
      </View>
    </View>
  );
};

export default QuoteRequestItem;
