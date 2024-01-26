import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, FONTS, icons} from '../../constants';

const Handling = ({selected, item, onPress, contentStyle}: any) => {
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
        ...contentStyle
      }}>
      <View
        style={{
          justifyContent: 'center',
        }}>
        <FastImage
          source={item?.image}
          style={{width: 20, height: 20}}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      <View
        style={{
          marginLeft: SIZES.radius,
          justifyContent: 'center',
        }}>
        <Text style={{...FONTS.cap1, color: COLORS.Neutral1}}>
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
            style={{width: 20, height: 20}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Handling;
