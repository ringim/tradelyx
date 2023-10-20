import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES} from '../../constants';

const QuoteType = ({quoteType, image, subQuoteType, info}: any) => {
  return (
    <View>
      <View
        style={{
          marginTop: SIZES.margin,
        }}>
        <Text
          style={{
            marginLeft: SIZES.margin,
            ...FONTS.h4,
            color: COLORS.Neutral1,
          }}>
          Advance RFQ
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: SIZES.radius,
            padding: SIZES.margin,
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
              {quoteType}
            </Text>
            <Text style={{...FONTS.body3, color: COLORS.Neutral5, paddingTop: 4}}>
              {subQuoteType}
            </Text>
          </View>
        </View>
      </View>

      {/* RFQ Info */}
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.margin,
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

export default QuoteType;
