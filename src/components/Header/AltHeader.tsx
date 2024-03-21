import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';

import {FONTS, SIZES, icons, COLORS} from '../../constants';

const AltHeader = ({
  title,
  onOther,
  other,
  titleContainerStyle,
  contentStyle,
  onOther2,
  icon,
  tintColor2,
  titleStyle,
  onPress,
  iconStyle,
  tintColor,
  otherStyle,
  other2,
}: any) => {
  return (
    <View
      style={{
        paddingTop:
          Platform.OS === 'android'
            ? SIZES.height > 700
              ? 15
              : SIZES.radius
            : 55,
        height: Platform.OS === 'android' ? (SIZES.height > 700 ? 50 : 50) : 90,
        marginBottom: SIZES.semi_margin,
        backgroundColor: COLORS.white,
        ...contentStyle,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding * 1.1,
        }}>
        {/* Header Back Button */}
        <TouchableOpacity onPress={onPress} style={{padding: 5}}>
          <FastImage
            source={icons.back}
            resizeMode={FastImage.resizeMode.contain}
            tintColor={tintColor}
            style={{
              width: 20,
              height: 20,
              right: SIZES.margin,
            }}
          />
        </TouchableOpacity>

        {/* Header Title */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            ...titleContainerStyle,
          }}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.Neutral1,
              ...titleStyle,
            }}>
            {title}
          </Text>
        </View>

        {other && (
          <TouchableOpacity
            onPress={onOther}
            style={{justifyContent: 'center', ...otherStyle}}>
            <FastImage
              source={icon}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={tintColor2}
              style={{
                width: 24,
                height: 24,
                ...iconStyle,
              }}
            />
          </TouchableOpacity>
        )}

        {other2 && (
          <TouchableOpacity
            onPress={onOther2}
            style={{marginLeft: SIZES.radius, justifyContent: 'center'}}>
            <FastImage
              source={icons.share}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={COLORS.primary1}
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

export default AltHeader;
