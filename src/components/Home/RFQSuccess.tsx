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
        justifyContent: 'center',
      }}>
      <View style={{marginTop: -12}}>
        <FastImage
          source={images.success_arrow}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: 120,
            height: 120,
            alignSelf: 'center'
          }}
        />
      </View>
      <View style={{marginTop: SIZES.padding}}>
        <Text
          style={{...FONTS.h5, textAlign: 'center', color: COLORS.Neutral1}}>
          {requestType} Request Sent Successfully
        </Text>
      </View>
      <View style={{marginTop: SIZES.margin}}>
        <Text
          style={{
            ...FONTS.cap1,
            lineHeight: 22,
            textAlign: 'center',
            color: COLORS.Neutral5,
          }}>
          Please wait for the review results from the seller. You can access the
          process via the "Order-Pending" menu.
        </Text>
      </View>

      <TextButton
        buttonContainerStyle={{
          marginTop: SIZES.margin,
          height: 50,
          width: 300
        }}
        label="Order Menu"
        labelStyle={{...FONTS.h4}}
        onPress={onPress}
      />

      <TextButton
        buttonContainerStyle={{
          backgroundColor: COLORS.white,
          marginTop: SIZES.base,
          height: 50,
          width: 300
        }}
        label="Close"
        labelStyle={{...FONTS.h4, color: COLORS.primary1}}
        onPress={onPress2}
      />
    </View>
  );
};

export default RFQSuccess;
