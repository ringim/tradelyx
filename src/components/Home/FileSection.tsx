import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, FONTS, icons} from '../../constants';

const FileSection = ({file, onPress, containerStyle}: any) => {
  return (
    <View
      style={{
        // marginTop: SIZES.margin,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: SIZES.base,
        backgroundColor: COLORS.white,
        ...containerStyle,
      }}>
      <View
        style={{
          justifyContent: 'center',
        }}>
        <FastImage
          tintColor={COLORS.secondary1}
          source={icons.summary}
          style={{width: 20, height: 20}}
        />
      </View>

      {/* file name and date of upload */}
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.base,
          justifyContent: 'center',
        }}>
        <Text style={{...FONTS.h5, color: COLORS.primary1}} numberOfLines={2}>
          {file}
        </Text>
      </View>

      {/* delete file */}
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          marginRight: SIZES.base,
        }}
        onPress={onPress}>
        <FastImage
          tintColor={COLORS.Rose1}
          source={icons.remove}
          style={{width: 20, height: 20}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FileSection;
