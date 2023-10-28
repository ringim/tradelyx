import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES} from '../../constants';

const FreightType = ({freightType, freightDesc, info, image}: any) => {
  return (
    <View>
      <View
        style={{
          marginTop: SIZES.radius,
        }}>
        <Text
          style={{
            marginLeft: SIZES.semi_margin,
            ...FONTS.h4,
            color: COLORS.Neutral1,
          }}>
          Delivery Type
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: SIZES.radius,
            padding: SIZES.radius,
            marginTop: SIZES.semi_margin
          }}>
          <View
            style={{
              justifyContent: 'center',
              padding: SIZES.radius,
              backgroundColor: COLORS.lightYellow,
              borderRadius: SIZES.radius,
            }}>
            <FastImage
              source={image}
              style={{width: 30, height: 30}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              flex: 1,
              marginLeft: SIZES.radius,
            }}>
            <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>
              {freightType}
            </Text>
            <Text style={{...FONTS.sh3, color: COLORS.Neutral5, paddingTop: 4}}>
              {freightDesc}
            </Text>
          </View>
        </View>
      </View>

      {/* RFQ Info */}
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.semi_margin,
        }}>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.Neutral1,
          }}>
          {info}
        </Text>
      </View>
    </View>
  );
};

export default FreightType;
