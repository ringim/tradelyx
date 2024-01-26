import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, icons, SIZES} from '../../constants';

const AcceptPolicy = ({onPress, onCheck, text1, isSelected}: any) => {
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZES.semi_margin,
      }}
      onPress={onCheck}>
      <View style={{justifyContent: 'center'}}>
        <FastImage
          source={isSelected ? icons.checked : icons.circle}
          style={{width: 20, height: 20}}
          resizeMode={FastImage.resizeMode.contain}
          // tintColor=
        />
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            ...FONTS.cap1,
            color: COLORS.Neutral1,
            lineHeight: 20,
          }}>
          By checking this button, I agree with{' '}
          <Text
            style={{
              ...FONTS.cap1,
              color: COLORS.Blue5,
              fontWeight: '600',
              lineHeight: 20,
            }}>
            {text1}
          </Text>
        </Text>
      </TouchableOpacity>
    </Pressable>
  );
};

export default AcceptPolicy;
