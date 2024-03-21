import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, FONTS, icons} from '../../constants';

const RelatedService = ({selected, item, containerStyle, onPress}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: SIZES.radius,
        borderWidth: 1,
        padding: SIZES.base,
        borderColor: selected ? COLORS.primary2 : COLORS.Neutral8,
        backgroundColor: selected ? COLORS.primary10 : 'transparent',
        ...containerStyle,
      }}>
      <View
        style={{
          justifyContent: 'center',
        }}>
        <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>
          {item?.label}
        </Text>
      </View>

      {selected && (
        <View
          style={{
            marginLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <FastImage
            source={icons.checked}
            style={{width: 24, height: 24}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RelatedService;
