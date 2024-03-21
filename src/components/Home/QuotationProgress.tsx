import {View, Text, ScrollView, Platform} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {SIZES, COLORS, FONTS, icons} from '../../constants';

const QuotationProgress = ({
  item2,
  item1,
  item3,
  item4,
  color1,
  color2,
  color3,
  color4,
  bgColor1,
  bgColor2,
  bgColor3,
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
        {/* checker */}
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

        {/* saver */}
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: bgColor2,
            width: 30,
            height: 30,
            borderRadius: SIZES.margin,
            top: 3,
          }}>
          <FastImage
            source={icons.saver}
            tintColor={item2}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 20, height: 20, alignSelf: 'center'}}
          />
        </View>
        <View style={{marginLeft: SIZES.radius, justifyContent: 'center'}}>
          <Text style={{...FONTS.h5, color: color2}}>Type</Text>
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

        {/* Terms of engagement */}
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
            source={icons.editDoc}
            tintColor={item3}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 16, height: 16, alignSelf: 'center'}}
          />
        </View>
        <View style={{marginLeft: SIZES.radius, justifyContent: 'center'}}>
          <Text style={{...FONTS.h5, color: color3}}>Terms of Engagement</Text>
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

        {/* Payment */}
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: bgColor4,
            width: 30,
            height: 30,
            borderRadius: SIZES.margin,
            top: 3,
          }}>
          <FastImage
            source={icons.pay}
            tintColor={item4}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 16, height: 16, alignSelf: 'center'}}
          />
        </View>
        <View style={{marginLeft: SIZES.radius, justifyContent: 'center'}}>
          <Text style={{...FONTS.h5, color: color4}}>Payment</Text>
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