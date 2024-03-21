import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

const ExpiryDate = ({onPress, date, title, containerStyle}: any) => {
  return (
    <Pressable style={{...containerStyle}} onPress={onPress}>
      <View>
        <Text
          style={{
            ...FONTS.body3,
            fontWeight: '500',
            color: COLORS.Neutral1,
          }}>
          {title}
        </Text>
      </View>
      <View
        style={{
          marginTop: SIZES.base,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View
          style={{
            justifyContent: 'center',
            borderWidth: 0.5,
            borderColor: COLORS.Neutral7,
            backgroundColor: COLORS.white,
            paddingHorizontal: 20,
            borderRadius: SIZES.radius,
            padding: SIZES.base,
            width: 220,
            height: 50,
          }}>
          {date ? (
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: '500',
                color: COLORS.Neutral1,
              }}>
              {date}
            </Text>
          ) : (
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.Neutral6,
              }}>
              Select date
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            padding: SIZES.base,
            paddingHorizontal: 14,
            backgroundColor: COLORS.white,
            borderWidth: 1,
            borderColor: COLORS.primary1,
            borderRadius: SIZES.semi_margin,
          }}>
          <TouchableOpacity
            onPress={onPress}
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View style={{justifyContent: 'center'}}>
              <FastImage
                tintColor={COLORS.primary1}
                source={icons.calender}
                style={{width: 24, height: 24}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
              <Text
                style={{
                  ...FONTS.h5,
                  color: COLORS.primary1,
                }}>
                Select
              </Text>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default ExpiryDate;
