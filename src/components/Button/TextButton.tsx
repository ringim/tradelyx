import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import {FONTS, SIZES, COLORS} from '../../constants';

const TextButton = ({
  buttonContainerStyle,
  disabled,
  label,
  labelStyle,
  onPress,
}: any) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary1,
        marginTop: SIZES.padding,
        borderRadius: SIZES.radius,
        height: 50,
        width: 340,
        ...buttonContainerStyle,
      }}
      disabled={disabled}
      onPress={onPress}>
      <Text
        style={{
          justifyContent: 'center',
          ...FONTS.h4,
          color: COLORS.white,
          ...labelStyle,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
