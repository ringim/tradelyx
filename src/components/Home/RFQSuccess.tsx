import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, images} from '../../constants';
import TextButton from '../Button/TextButton';

const RFQSuccess = ({onPress, onPress2, requestType}: any) => {
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
      <View style={{marginTop: SIZES.padding * 1.5}}>
        <Text
          style={{...FONTS.h4, textAlign: 'center', color: COLORS.Neutral1}}>
          {requestType} Request Sent Successfully
        </Text>
      </View>
      <View style={{margin: SIZES.padding}}>
        <Text
          style={{
            ...FONTS.body3,
            lineHeight: 24,
            textAlign: 'center',
            color: COLORS.Neutral5,
          }}>
          Please wait for the review results from the seller. You can access the
          process via the "Order-Pending" menu.
        </Text>
      </View>

      <TextButton
        buttonContainerStyle={{
          marginTop: SIZES.base,
        }}
        label="Order Menu"
        labelStyle={{...FONTS.h4}}
        onPress={onPress}
      />

      <TextButton
        buttonContainerStyle={{
          backgroundColor: COLORS.white,
          marginTop: SIZES.semi_margin,
        }}
        label="Close"
        labelStyle={{...FONTS.h4, color: COLORS.primary1}}
        onPress={onPress2}
      />
    </View>
  );
};

export default RFQSuccess;
