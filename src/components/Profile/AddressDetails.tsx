import React from 'react';
import {Text, Pressable} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../constants';

const AddressDetails = ({address, onPress, containerStyle}: any) => {
  return (
    <Pressable style={{marginTop: SIZES.radius}} onPress={onPress}>
      <Text
        style={{
          color: COLORS.Neutral1,
          ...FONTS.body3,
        }}>
        Address
      </Text>

      <Pressable
        style={{
          height: 50,
          borderWidth: 0.5,
          borderColor: COLORS.Neutral7,
          marginTop: SIZES.base,
          borderRadius: SIZES.base,
          padding: SIZES.radius,
          backgroundColor: COLORS.white,
          ...containerStyle,
        }}
        onPress={onPress}>
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.body3,
            lineHeight: 24,
            color: COLORS.Neutral1,
          }}>
          {address}
        </Text>
      </Pressable>
    </Pressable>
  );
};

export default AddressDetails;
