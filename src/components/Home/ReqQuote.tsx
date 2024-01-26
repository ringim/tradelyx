import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES} from '../../constants';

const ReqQuote = () => {
  return (
    <View>
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
          Type of RFQ
        </Text>
      </View>

      {/* Quotation type */}
      <View
        style={{
          marginTop: SIZES.margin,
          marginHorizontal: SIZES.margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            justifyContent: 'center',
            padding: SIZES.radius,
            backgroundColor: COLORS.lightYellow,
            borderRadius: SIZES.radius,
          }}>
          <FastImage
            source={require('../../../src/assets/images/standard.png')}
            style={{width: 20, height: 20}}
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
            Standard RFQ
          </Text>
          <Text style={{...FONTS.sh3, color: COLORS.Neutral5, paddingTop: 4}}>
            Request for Price Quotation from Suppliers
          </Text>
        </View>
      </View>

      {/* Additional Info */}
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.margin,
        }}>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.Neutral1,
          }}>
          Additional Information
        </Text>
      </View>
    </View>
  );
};

export default ReqQuote;
