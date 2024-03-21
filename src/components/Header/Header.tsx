import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import {FONTS, SIZES, icons, COLORS} from '../../constants';

const Header = ({
  title,
  onOther,
  other,
  titleContainerStyle,
  contentStyle,
  onOther2,
  icon,
  titleStyle,
  tintColor,
}: any) => {
  const navigation = useNavigation<any>();

  return (
    <View
      style={{
        paddingTop:
          Platform.OS === 'android'
            ? SIZES.height > 700
              ? 15
              : SIZES.radius
            : 55,
        height:
          Platform.OS === 'android' ? (SIZES.height > 700 ? 50 : 50) : 90,
          marginBottom: SIZES.semi_margin,
        backgroundColor: COLORS.white,
        ...contentStyle,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding * 1.2,
        }}>
        {/* Header Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{padding: 5}}>
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
          <>
            <TouchableOpacity
              onPress={onOther}
              style={{justifyContent: 'center'}}>
              <FastImage
                source={icon}
                resizeMode={FastImage.resizeMode.contain}
                tintColor={COLORS.primary1}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onOther2}
              style={{
                marginLeft: SIZES.base,
                justifyContent: 'center',
                left: 10,
              }}>
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
          </>
        )}
      </View>
    </View>
  );
};

export default Header;
