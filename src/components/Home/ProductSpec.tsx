import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import ViewMoreText from 'react-native-view-more-text';

import {COLORS, FONTS, SIZES} from '../../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ProductSpec = ({spec, title, icon}: any) => {
  function renderViewMore(onPress: any) {
    return (
      <TouchableOpacity style={{marginTop: SIZES.radius}} onPress={onPress}>
        <Text
          style={{color: COLORS.primary4, ...FONTS.cap1, fontWeight: '500'}}>
          View more
        </Text>
      </TouchableOpacity>
    );
  }

  function renderViewLess(onPress: any) {
    return (
      <TouchableOpacity style={{marginTop: SIZES.radius}} onPress={onPress}>
        <Text
          style={{color: COLORS.primary4, ...FONTS.cap1, fontWeight: '500'}}>
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

      {/* Price USD */}
      <View style={{alignItems: 'flex-start', marginTop: SIZES.radius}}>
        <ViewMoreText
          numberOfLines={5}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
          textStyle={{...FONTS.cap2, color: COLORS.Neutral1}}>
          <Text>{spec}</Text>
        </ViewMoreText>
        {/* <Text style={{...FONTS.cap2, color: COLORS.Neutral1}}>{spec}</Text> */}
      </View>
    </View>
  );
};

export default ProductSpec;
