import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {SIZES, COLORS, FONTS, icons} from '../../constants';

const SeeAll = ({onPress, containerStyle}: any) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZES.semi_margin,
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        ...containerStyle,
      }}
      onPress={onPress}>
      <View style={{justifyContent: 'center'}}>
        <Text
          style={{
            color: COLORS.primary1,
            ...FONTS.h5,
          }}>
          See all
        </Text>
      </View>

      <View style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
        <FastImage
          source={icons.right_arrow}
          tintColor={COLORS.primary1}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: 24,
            height: 24,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SeeAll;
