import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, images} from '../../constants';
import TextButton from '../Button/TextButton';

const ProductSuccess = ({onPress2, onPress}: any) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{marginTop: 0}}>
        <FastImage
          source={images.success_arrow}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: 120,
            height: 120,
          }}
        />
      </View>
      <View style={{marginTop: SIZES.padding}}>
        <Text
          style={{...FONTS.h4, textAlign: 'center', color: COLORS.Neutral1}}>
          Product Added Successfully
        </Text>
      </View>

      <View style={{margin: SIZES.margin}}>
        <Text
          style={{
            ...FONTS.body3,
            lineHeight: 24,
            textAlign: 'center',
            color: COLORS.Neutral5,
          }}>
          New product has been added to your store
        </Text>
      </View>

      <TextButton
        buttonContainerStyle={{
          marginTop: 5,
          height: 50,
        }}
        label="Home"
        labelStyle={{...FONTS.h4}}
        onPress={onPress}
      />
    </View>
  );
};

export default ProductSuccess;
