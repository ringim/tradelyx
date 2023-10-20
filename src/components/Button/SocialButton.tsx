import {TouchableOpacity, Text} from 'react-native';
import React from 'react';

import {FONTS, SIZES} from '../../constants';
import FastImage from 'react-native-fast-image';

const SocialButton = ({
  socialIcon,
  title,
  bgColor,
  onPress,
  textColor,
  borderWidth,
  borderColor,
  iconStyle,
  containerStyle,
}: any) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 45,
        width: 280,
        backgroundColor: bgColor,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: borderWidth,
        borderColor: borderColor,
        marginTop: 10,
        ...containerStyle,
      }}
      onPress={onPress}>
      <FastImage
        source={socialIcon}
        resizeMode={FastImage.resizeMode.contain}
        style={{height: 20, width: 20}}
        tintColor={iconStyle}
      />
      <Text
        style={{
          color: textColor,
          left: 10,
          fontWeight: '500',
          ...FONTS.body3,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SocialButton;
