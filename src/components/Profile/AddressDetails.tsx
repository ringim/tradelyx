import React from 'react';
import {View, Text, Pressable} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../constants';

const AddressDetails = ({address, onPress, containerStyle}: any) => {
  return (
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
  );
};

export default AddressDetails;
