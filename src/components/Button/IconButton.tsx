import React from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

const IconButton = ({
  containerStyle,
  icon,
  tintColor,
  iconStyle,
  onPress,
}: any) => {
  return (
    <TouchableOpacity
      style={{
        ...containerStyle,
      }}
      onPress={onPress}>
      <FastImage
        source={icon}
        resizeMode={FastImage.resizeMode.contain}
        tintColor={tintColor}
        style={{
          width: 20,
          height: 20,
          ...iconStyle,
        }}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
