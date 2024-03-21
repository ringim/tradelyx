import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

const Tags = ({onPress, tag, index}: any) => {
  return (
    <TouchableOpacity
      key={`${tag}-${index}`}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.NeutralBlue6,
        borderRadius: SIZES.semi_margin,
        padding: SIZES.base,
        paddingVertical: 5,
        margin: SIZES.base,
        marginRight: 2,
      }}>
      <View style={{justifyContent: 'center'}}>
        <Text style={{color: COLORS.white, ...FONTS.cap1, fontWeight: '500'}}>
          {tag}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          padding: 5,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.padding,
          marginLeft: 4,
        }}>
        <FastImage
          source={icons.close}
          resizeMode={FastImage.resizeMode.contain}
          tintColor={COLORS.NeutralBlue5}
          style={{width: 6, height: 6}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Tags;
