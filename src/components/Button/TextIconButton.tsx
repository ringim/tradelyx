import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import {FONTS, COLORS, SIZES} from '../../constants';

interface ITextIconButton {
  label: string;
  iconPosition?: any;
  onPress?: any;
  containerStyle?: any;
  labelStyle?: any;
  icon?: any;
  iconStyle?: any;
  iconSize?: any;
}

const TextIconButton = ({
  label,
  containerStyle,
  onPress,
  labelStyle,
  icon,
  iconStyle,
  iconSize,
  iconPosition,
}: ITextIconButton) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: COLORS.primary1,
        width: 330,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary1,
        marginTop: SIZES.padding,
        ...containerStyle,
      }}
      onPress={onPress}>
      {iconPosition == 'LEFT' && (
        <FastImage
          source={icon}
          resizeMode={FastImage.resizeMode.contain}
          tintColor={iconStyle}
          style={{width: 20, height: 20, ...iconSize}}
        />
      )}
      <Text
        style={{
          ...FONTS.h5,
          color: COLORS.white,
          ...labelStyle,
        }}>
        {label}
      </Text>
      {iconPosition == 'RIGHT' && (
        <FastImage
          source={icon}
          resizeMode={FastImage.resizeMode.contain}
          tintColor={iconStyle}
          style={{width: 20, height: 20, ...iconSize}}
        />
      )}
    </TouchableOpacity>
  );
};

TextIconButton.propTypes = {
  iconPosition: PropTypes.oneOf(['LEFT', 'RIGHT']),
};

const styles = StyleSheet.create({
  image: {
    marginLeft: 5,
    width: 24,
    height: 24,
    tintColor: COLORS.white,
  },
});

export default TextIconButton;
