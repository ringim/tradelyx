import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

const PopularProducts = ({
  title,
  showViewAll,
  containerStyle,
  textStyle,
  onPress,
}: any) => {
  return (
    // {/* Header */}
    <View style={{...containerStyle}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.semi_margin,
          marginTop: 32,
          marginBottom: SIZES.radius,
          ...containerStyle,
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              flex: 1,
              ...FONTS.h4,
              color: COLORS.Neutral1,
              ...textStyle,
            }}>
            {title}
          </Text>
        </View>

        {showViewAll && (
          <TouchableOpacity
            style={{marginLeft: 80, justifyContent: 'center', top: -2}}
            onPress={onPress}>
            <Text
              style={{
                color: COLORS.primary1,
                ...FONTS.h5,
              }}>
              See all
            </Text>
          </TouchableOpacity>
        )}

        {showViewAll && (
          <TouchableOpacity style={{justifyContent: 'center', top: -2}}>
            <FastImage
              source={icons.right_arrow}
              tintColor={COLORS.primary1}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PopularProducts;
