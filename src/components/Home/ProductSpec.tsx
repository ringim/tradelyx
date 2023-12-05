import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import ViewMoreText from 'react-native-view-more-text';

import {COLORS, FONTS, SIZES} from '../../constants';

const ProductSpec = ({spec, title, icon}: any) => {
  function renderViewMore(onPress: any) {
    return (
      <TouchableOpacity style={{marginTop: SIZES.radius}} onPress={onPress}>
        <Text
          style={{color: COLORS.primary6, ...FONTS.cap1, fontWeight: '500'}}>
          View more
        </Text>
      </TouchableOpacity>
    );
  }

  function renderViewLess(onPress: any) {
    return (
      <TouchableOpacity style={{marginTop: SIZES.radius}} onPress={onPress}>
        <Text
          style={{color: COLORS.primary6, ...FONTS.cap1, fontWeight: '500'}}>
          View less
        </Text>
      </TouchableOpacity>
    );
  }

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

      <View style={{alignItems: 'flex-start', marginTop: SIZES.radius}}>
        <ViewMoreText
          numberOfLines={5}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
          textStyle={{...FONTS.body3, color: COLORS.Neutral5}}>
          <Text>{spec}</Text>
        </ViewMoreText>
      </View>
    </View>
  );
};

export default ProductSpec;
