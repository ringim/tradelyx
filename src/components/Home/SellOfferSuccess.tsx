import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, images} from '../../constants';
import TextButton from '../Button/TextButton';

const SellOfferSuccess = ({onPress}: any) => {
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
            width: 140,
            height: 140,
          }}
        />
      </View>
      <View style={{marginTop: SIZES.padding}}>
        <Text
          style={{...FONTS.h4, textAlign: 'center', color: COLORS.Neutral1}}>
          Offer Sent Successfully
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
          Your offer has been published and will be seen by your potential
          buyers.
        </Text>
      </View>

      <TextButton
        buttonContainerStyle={{
          backgroundColor: COLORS.white,
          marginTop: 2,
          borderWidth: 1,
          borderColor: COLORS.primary1,
        }}
        label="Close"
        labelStyle={{...FONTS.h4, color: COLORS.primary1}}
        onPress={onPress}
      />
    </View>
  );
};

export default SellOfferSuccess;
