import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, icons, FONTS, SIZES} from '../../constants';

const ProfileItem = ({
  label,
  labelStyle,
  tintColor,
  iconStyle,
  icon,
  contentContainerStyle,
  showRight,
  transparentContainer,
  onPress,
}: any) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        marginHorizontal: SIZES.radius,
        padding: SIZES.radius,
        backgroundColor: COLORS.white,
        ...contentContainerStyle,
      }}
      onPress={onPress}>
      <View
        style={{
          justifyContent: 'center',
          padding: SIZES.base,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary10,
          ...transparentContainer
        }}>
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
      </View>

      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text
          style={{
            marginLeft: SIZES.margin,
            color: COLORS.Neutral1,
            ...FONTS.h5,
            ...labelStyle,
          }}>
          {label}
        </Text>
      </View>

      {showRight && (
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={icons.right}
            resizeMode={FastImage.resizeMode.contain}
            tintColor={COLORS.Neutral6}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ProfileItem;
