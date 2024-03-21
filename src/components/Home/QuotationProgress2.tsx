import {View, Text, ScrollView, Platform} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {SIZES, COLORS, FONTS, icons} from '../../constants';

const QuotationProgress2 = ({
  item2,
  item1,
  item3,
  color1,
  color2,
  color3,
  type,
  type2,
  bgColor1,
  bgColor2,
  bgColor3,
}: any) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.Neutral10,
        padding: SIZES.base,
        marginBottom: SIZES.radius,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* Details */}
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: bgColor1,
            width: 30,
            height: 30,
            borderRadius: SIZES.margin,
            top: 3,
          }}>
          <FastImage
            source={icons.checker}
            tintColor={item1}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 16, height: 16, alignSelf: 'center'}}
          />
        </View>
        <View style={{marginLeft: SIZES.radius, justifyContent: 'center'}}>
          <Text style={{...FONTS.h5, color: color1}}>Details</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            padding: SIZES.base,
          }}>
          <FastImage
            source={icons.forward}
            tintColor={COLORS.Neutral7}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 16, height: 16}}
          />
        </View>

        {/* Package */}
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: bgColor2,
            padding: SIZES.base,
            width: 30,
            height: 30,
            borderRadius: SIZES.margin,
            top: 3,
          }}>
          <FastImage
            source={icons.saver}
            tintColor={item2}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 16, height: 16, alignSelf: 'center'}}
          />
        </View>
        <View style={{marginLeft: SIZES.radius, justifyContent: 'center'}}>
          <Text style={{...FONTS.h5, color: color2}}>{type}</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            padding: SIZES.base,
          }}>
          <FastImage
            source={icons.forward}
            tintColor={COLORS.Neutral7}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 16, height: 16}}
          />
        </View>

        {/* Pickup */}
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: bgColor3,
            width: 30,
            height: 30,
            borderRadius: SIZES.margin,
            top: 3,
          }}>
          <FastImage
            source={icons.truck}
            tintColor={item3}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 16, height: 16, alignSelf: 'center'}}
          />
        </View>
        <View style={{marginLeft: SIZES.radius, justifyContent: 'center'}}>
          <Text style={{...FONTS.h5, color: color3}}>{type2}</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            padding: SIZES.base,
          }}>
          <FastImage
            source={icons.forward}
            tintColor={COLORS.Neutral7}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 16, height: 16}}
          />
        </View>
      </View>
    </View>
  );
};

export default QuotationProgress2;