import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

const Shipment = ({landmark, date, address}: any) => {
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
            source={icons.trucked}
            tintColor={COLORS.secondary1}
            resizeMode={FastImage.resizeMode.cover}
            style={{width: 24, height: 24}}
          />
        </View>

        <View
          style={{flex: 1, marginLeft: SIZES.radius, justifyContent: 'center'}}>
          <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>Shipment</Text>
        </View>
      </View>

      {/* Shipping */}
      <View
        style={{
          alignItems: 'center',
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
            Shipping Origin:
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text
            numberOfLines={3}
            style={{...FONTS.body3, color: COLORS.Neutral1}}>
            {address}
          </Text>
        </View>
      </View>

      {/* landmark */}
      <View
        style={{
          alignItems: 'center',
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>Landmark</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            numberOfLines={2}
            style={{...FONTS.sh3, letterSpacing: -0.5, color: COLORS.Neutral1}}>
            {landmark}
          </Text>
        </View>
      </View>

      {/* Date Available */}
      <View
        style={{
          alignItems: 'center',
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
            Date Available:
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            numberOfLines={2}
            style={{...FONTS.body3, color: COLORS.Neutral1}}>
            {date}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Shipment;
