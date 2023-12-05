import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import ViewMoreText from 'react-native-view-more-text';

import {COLORS, SIZES, FONTS, icons} from '../../constants';

const BusinessDesc = ({productItem, title}: any) => {
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
            source={icons.content}
            resizeMode={FastImage.resizeMode.cover}
            tintColor={COLORS.secondary1}
            style={{width: 20, height: 20}}
          />
        </View>

        <View
          style={{flex: 1, marginLeft: SIZES.radius, justifyContent: 'center'}}>
          <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>{title}</Text>
        </View>
      </View>

      <View style={{alignItems: 'flex-start', marginTop: SIZES.radius}}>
        <ViewMoreText
          numberOfLines={5}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
          textStyle={{...FONTS.body3, color: COLORS.Neutral5}}>
          <Text>{productItem}</Text>
        </ViewMoreText>
      </View>
    </View>
  );
};

export default BusinessDesc;
