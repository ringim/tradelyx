import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

const OptionButton = ({containerStyle, label, isSelected, onPress}: any) => {
  return (
    <TouchableOpacity
      style={[
        styles.cont,
        {
          backgroundColor: isSelected ? COLORS.primary1 : COLORS.primary10,
          ...containerStyle,
        },
      ]}
      onPress={onPress}>
      {/* Checked */}
      <View style={styles.subCont}>
        <View
          style={{
            width: 30,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: SIZES.semi_margin,
            borderWidth: 1,
            borderColor: isSelected ? COLORS.primary1 : COLORS.gray,
            backgroundColor: isSelected ? COLORS.white : null,
          }}>
          {isSelected && (
            <FastImage
              source={icons.checked}
              tintColor={COLORS.primary1}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 20,
                height: 20,
              }}
            />
          )}
        </View>
      </View>

      {/* Label */}
      <Text
        style={{
          color: isSelected ? COLORS.white : COLORS.Neutral1,
          ...FONTS.h3,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    paddingVertical: SIZES.radius,
    paddingHorizontal: SIZES.semi_margin,
    borderRadius: SIZES.base,
  },
  subCont: {
    alignItems: 'flex-end',
  },
});

export default OptionButton;
