import {View, Text, ImageBackground, Platform} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

const ImageCaption = ({productItem, item}: any) => {
  return (
    <ImageBackground
      source={item?.image}
      resizeMode="cover"
      imageStyle={{borderRadius: SIZES.semi_margin}}
      style={{
        height: 470,
        width: Platform.OS === 'ios' ? 405 : 380,
        borderRadius: SIZES.padding,
      }}>
      <View
        style={{
          alignSelf: 'flex-start',
          top: 350,
          marginLeft: SIZES.radius,
          backgroundColor: COLORS.transparentNeutral12,
          padding: SIZES.radius,
          borderRadius: SIZES.base,
          opacity: 0.8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              source={icons.category}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={COLORS.white}
              style={{width: 24, height: 24}}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              marginLeft: SIZES.base,
            }}>
            <Text style={{...FONTS.sh3, color: COLORS.white}}>
              {productItem?.supplier}
            </Text>
          </View>

          <View style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
            <FastImage
              source={icons.dot}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={COLORS.white}
              style={{width: 6, height: 6}}
            />
          </View>

          <View style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
            <FastImage
              source={icons.rate}
              resizeMode={FastImage.resizeMode.contain}
              style={{width: 24, height: 24}}
            />
          </View>

          <View
            style={{
              marginLeft: SIZES.base,
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              {parseFloat(productItem?.rating).toFixed(1)}
            </Text>
          </View>
        </View>

        {/* Product Name */}
        <View style={{marginTop: 5}}>
          <Text numberOfLines={2} style={{...FONTS.h3, color: COLORS.white}}>
            {productItem?.name}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ImageCaption;
