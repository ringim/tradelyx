import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

const Packaging = ({
  packageType,
  unit,
  containerStyle,
  file,
  file2,
  productCert,
  contentStyle
}: any) => {
  return (
    <View
      style={{
        padding: SIZES.semi_margin,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.semi_margin,
        ...contentStyle
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={icons.packages}
            tintColor={COLORS.secondary1}
            resizeMode={FastImage.resizeMode.cover}
            style={{width: 24, height: 24}}
          />
        </View>

        <View
          style={{flex: 1, marginLeft: SIZES.radius, justifyContent: 'center'}}>
          <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>Packaging</Text>
        </View>
      </View>

      {/* packageType */}
      <View
        style={{
          alignItems: 'center',
          marginTop: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
            Packaging type:
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

      {/* Qty */}
      <View
        style={{
          alignItems: 'center',
          marginTop: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>Unit:</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            numberOfLines={2}
            style={{...FONTS.body3, color: COLORS.Neutral1}}>
            {unit}
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
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
            Product certification:
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.semi_margin,
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={3}
            style={{...FONTS.body3, color: COLORS.Neutral1}}>
            {productCert}
          </Text>
        </View>
      </View>

      {/* Documents */}
      <View
        style={{
          marginTop: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
          ...containerStyle,
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <FastImage
            tintColor={COLORS.secondary1}
            source={icons.summary}
            style={{width: 20, height: 20}}
          />
        </View>

        {/* file name and date of upload */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.base,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.h5, color: COLORS.primary1}} numberOfLines={2}>
            {file}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
          ...containerStyle,
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <FastImage
            tintColor={COLORS.secondary1}
            source={icons.summary}
            style={{width: 20, height: 20}}
          />
        </View>

        {/* file name and date of upload */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.base,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.h5, color: COLORS.primary1}} numberOfLines={2}>
            {file2}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Packaging;
