import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';

import {FONTS, SIZES, COLORS, icons} from '../../constants';
import FastImage from 'react-native-fast-image';

const CheckBox = ({
  containerStyle,
  isSelected,
  onPress,
  label,
  labelStyle,
}: any) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        ...containerStyle,
      }}
      onPress={onPress}>
      <View
        style={{
          width: 24,
          height: 24,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: SIZES.base,
          borderWidth: 3,
          borderColor: isSelected ? COLORS.primary1 : COLORS.Neutral6,
          backgroundColor: isSelected ? COLORS.primary1 : null,
        }}>
        {isSelected && (
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            source={icons.checkmark}
            style={{
              width: 20,
              height: 20,
            }}
          />
        )}
      </View>

      {label && (
        <Text
          style={{
            flex: 1,
            marginLeft: SIZES.base,
            ...FONTS.body3,
            lineHeight: 20,
            ...labelStyle,
          }}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;
