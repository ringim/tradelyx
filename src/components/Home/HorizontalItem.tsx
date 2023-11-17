import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

interface ICategory {
  item: string | any;
  // name: string;
  onPress: any;
  containerStyle?: any;
}

const HorizontalRecentJobs = ({containerStyle, item, onPress}: ICategory) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.semi_margin,
        paddingVertical: SIZES.base,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.base,
        backgroundColor: COLORS.white,
        borderWidth: 0.5,
        borderColor: COLORS.Neutral7,
        ...containerStyle,
      }}
      onPress={onPress}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {/*  image */}
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={item.image}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: 40,
              height: 40,
              borderRadius: 200 / 2,
            }}
          />
        </View>

        {/* name */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text numberOfLines={2} style={{...FONTS.h5, color: COLORS.Neutral1}}>
            {item?.title}
          </Text>
        </View>

        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={icons.right}
            tintColor={COLORS.Neutral6}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 24,
              height: 24,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalRecentJobs;
