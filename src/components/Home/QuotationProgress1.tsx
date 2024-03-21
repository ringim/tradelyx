import {View, Text, ScrollView, Platform} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {SIZES, COLORS, FONTS, icons} from '../../constants';

const QuotationProgress = ({
  item2,
  item1,
  item4,
  color1,
  color2,
  color4,
  bgColor1,
  bgColor2,
  bgColor4,
}: any) => {
  return (
    <View
      style={{
        marginTop: Platform?.OS === 'android' ? 20 : 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          backgroundColor: COLORS.Neutral10,
          padding: SIZES.base,
          marginBottom: SIZES.base,
        }}>
        {/* Info */}
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: bgColor1,
            width: 30,
            height: 30,
            borderRadius: SIZES.margin,
          }}>
          <FastImage
            source={icons.info}
            tintColor={item1}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 16, height: 16, alignSelf: 'center'}}
          />
        </View>
        <View style={{marginLeft: SIZES.radius, justifyContent: 'center'}}>
          <Text style={{...FONTS.h5, color: color1}}>Information</Text>
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

        {/* package */}
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: bgColor2,
            width: 30,
            height: 30,
            borderRadius: SIZES.margin,
          }}>
          <FastImage
            source={icons.packages}
            tintColor={item2}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 15, height: 15, alignSelf: 'center'}}
          />
        </View>
        <View style={{marginLeft: SIZES.radius, justifyContent: 'center'}}>
          <Text style={{...FONTS.h5, color: color2}}>Specification</Text>
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

        {/* shipment */}
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: bgColor4,
            width: 30,
            height: 30,
            borderRadius: SIZES.margin,
          }}>
          <FastImage
            source={icons.trucked}
            tintColor={item4}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 20, height: 20, alignSelf: 'center'}}
          />
        </View>
        <View style={{marginLeft: SIZES.radius, justifyContent: 'center'}}>
          <Text style={{...FONTS.h5, color: color4}}>Shipment</Text>
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
      </ScrollView>
    </View>
  );
};

export default QuotationProgress;