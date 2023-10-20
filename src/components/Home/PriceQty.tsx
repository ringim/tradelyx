import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

const PriceQty = ({productItem}: any) => {
  const options = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

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
            source={icons.info}
            resizeMode={FastImage.resizeMode.cover}
            style={{width: 24, height: 24}}
          />
        </View>

        <View
          style={{flex: 1, marginLeft: SIZES.radius, justifyContent: 'center'}}>
          <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>
            Price and Minimum Quantity
          </Text>
        </View>
      </View>

      {/* Price USD */}
      <View
        style={{
          alignItems: 'center',
          marginTop: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{...FONTS.body3, color: COLORS.Neutral6}}>
            Price in USD
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            numberOfLines={2}
            style={{...FONTS.sh3, letterSpacing: -0.5, color: COLORS.Neutral1}}>
            ${productItem?.usdPrice.toLocaleString('en-US', options)}
          </Text>
        </View>
      </View>

      {/* Qty */}
      <View
        style={{
          alignItems: 'center',
          marginTop: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
            Minimum Order Quantity
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text numberOfLines={2} style={{...FONTS.body3, color: COLORS.Neutral1}}>
            {productItem?.qty}
          </Text>
        </View>
      </View>

      {/* Sample */}
      <View
        style={{
          alignItems: 'center',
          marginTop: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>Sample</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text numberOfLines={2} style={{...FONTS.body3, color: COLORS.Neutral1}}>
            {productItem?.sample}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PriceQty;
