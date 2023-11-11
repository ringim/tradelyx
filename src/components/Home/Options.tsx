import {View, Text, Alert} from 'react-native';
import React from 'react';

import {COLORS, FONTS, SIZES} from '../../constants';
import TextButton from '../Button/TextButton';

const Options = ({onEdit, onDelete}: any) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TextButton
        buttonContainerStyle={{
          marginTop: -4,
          height: 48,
        }}
        label="Edit Item"
        labelStyle={{...FONTS.h4}}
        onPress={onEdit}
      />

      <TextButton
        buttonContainerStyle={{
          backgroundColor: COLORS.white,
          borderWidth: 1,
          borderColor: COLORS.Rose4,
          marginTop: SIZES.semi_margin,
          height: 48,
        }}
        label="Delete Item"
        labelStyle={{...FONTS.h4, color: COLORS.Rose4}}
        onPress={onDelete}
      />
    </View>
  );
};

export default Options;
