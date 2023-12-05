import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, FONTS, icons} from '../../constants';

const ProductImage = ({onChange, title}: any) => {
  return (
    <View>
      <Text
        style={{
          marginTop: SIZES.radius,
          color: COLORS.Neutral1,
          ...FONTS.body3,
          fontWeight: '500',
        }}>
        {title}
      </Text>
      <View
        style={{
          marginTop: SIZES.radius,
          borderWidth: 0.5,
          borderStyle: 'dashed',
          borderRadius: SIZES.base,
          borderColor: COLORS.gray,
          padding: SIZES.padding,
          width: 200,
          height: 120,
          backgroundColor: COLORS.white,
        }}>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center'}}
          onPress={onChange}>
          <FastImage
            source={icons.upload}
            resizeMode={FastImage.resizeMode.contain}
            tintColor={COLORS.primary1}
            style={{
              width: 30,
              height: 30,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              color: COLORS.black,
              textAlign: 'center',
            }}>
            Upload image
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductImage;
