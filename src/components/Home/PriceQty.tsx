import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES} from '../../constants';

const PriceQty = ({
  title,
  moq,
  icon,
  cert,
  packageType,
  supply,
  paymentType,
  transMode,
}: any) => {
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
            source={icon}
            tintColor={COLORS.secondary1}
            resizeMode={FastImage.resizeMode.cover}
            style={{width: 24, height: 24}}
          />
        </View>

        <View
          style={{flex: 1, marginLeft: SIZES.radius, justifyContent: 'center'}}>
          <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>{title}</Text>
        </View>
      </View>

      {/* package type */}
      <View
        style={{
          alignItems: 'center',
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
            Package Type:
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            numberOfLines={2}
            style={{...FONTS.sh3, letterSpacing: -0.5, color: COLORS.Neutral1}}>
            {packageType}
          </Text>
        </View>
      </View>

      {/*Min Order Qty */}
      <View
        style={{
          alignItems: 'center',
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
            Minimum Order Quantity
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            numberOfLines={2}
            style={{...FONTS.body3, color: COLORS.Neutral1}}>
            {moq}
          </Text>
        </View>
      </View>

      {/* Supply capacity */}
      <View
        style={{
          alignItems: 'center',
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
            Supply Capacity
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            numberOfLines={2}
            style={{...FONTS.body3, color: COLORS.Neutral1}}>
            {supply}
          </Text>
        </View>
      </View>

      {/* certification */}
      <View
        style={{
          alignItems: 'center',
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
            Product Certification
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            numberOfLines={2}
            style={{...FONTS.body3, color: COLORS.Neutral1}}>
            {cert}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PriceQty;
