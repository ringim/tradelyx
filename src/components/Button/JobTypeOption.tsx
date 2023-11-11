import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, FONTS} from '../../constants';

const JobTypeOption = ({
  label,
  desc,
  icon,
  onPress,
  containerStyle,
  textStyle,
  isSelected,
  descStyle,
}: any) => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        width: 150,
        height: 200,
        borderRadius: SIZES.margin,
        borderColor: isSelected ? COLORS.yellow : COLORS.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
        ...containerStyle,
      }}
      onPress={onPress}>
      <View
        style={{
          padding: SIZES.radius,
          borderRadius: 100,
        }}>
        <FastImage
          source={icon}
          tintColor={isSelected ? COLORS.yellow : COLORS.Neutral1}
          style={{width: 30, height: 30}}
        />
      </View>

      <View style={{marginTop: SIZES.margin}}>
        <Text
          style={{
            ...FONTS.h5,
            color: COLORS.Neutral1,
            textAlign: 'center',
            ...textStyle,
          }}>
          {label}
        </Text>
      </View>

      <View style={{marginTop: SIZES.padding}}>
        <Text
          style={{
            ...FONTS.body4,
            color: COLORS.gray,
            textAlign: 'center',
            ...descStyle,
          }}>
          {desc}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default JobTypeOption;
