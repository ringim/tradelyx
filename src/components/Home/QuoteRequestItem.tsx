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
          flex: 0.3,
          justifyContent: 'center',
        }}>
        <FastImage
          source={{uri: fromImg}}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </View>

      {/* Buyer Country Name */}
      <View
        style={{
          flex: 1.5,
          marginLeft: SIZES.base,
          justifyContent: 'center',
        }}>
        <Text style={{...FONTS.h5, color: COLORS.Neutral6}}>From</Text>
        <Text
          numberOfLines={3}
          style={{
            ...FONTS.cap2,
            fontWeight: '600',
            marginTop: 2,
            color: COLORS.Neutral1,
          }}>
          {from}
        </Text>
      </View>

      {/* arrow */}
      <View
        style={{
          flex: 0.1,
          justifyContent: 'center',
        }}>
        <FastImage
          source={icons.right}
          resizeMode={FastImage.resizeMode.contain}
          tintColor={COLORS.Neutral5}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </View>

      {/* Buyer To Image */}
      <View
        style={{
          flex: 0.3,
          marginLeft: SIZES.padding,
          justifyContent: 'center',
        }}>
        <FastImage
          source={{uri: toImg}}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </View>

      {/* Buyer Country Name */}
      <View
        style={{
          flex: 1.5,
          marginLeft: SIZES.base,
          justifyContent: 'center',
        }}>
        <Text style={{...FONTS.h5, color: COLORS.Neutral6}}>To</Text>
        <Text
          numberOfLines={3}
          style={{
            ...FONTS.cap2,
            fontWeight: '600',
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
