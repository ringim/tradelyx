import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, FONTS, icons} from '../../constants';

const SearchType = ({selected, item, onPress}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: SIZES.radius,
        borderWidth: 1,
        marginTop: SIZES.base,
        marginHorizontal: SIZES.margin,
        padding: SIZES.radius,
        borderColor: selected ? COLORS.primary2 : COLORS.Neutral8,
        backgroundColor: selected ? COLORS.primary10 : 'transparent',
      }}>
      <View
        style={{
          justifyContent: 'center',
        }}>
        <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>
          {item?.label}
        </Text>
      </View>

      {/* checked icon */}
      <TouchableOpacity
        style={{justifyContent: 'center'}}
        onPress={() => onPress(item)}>
        <FastImage
          source={selected ? icons.checked : icons.circle}
          style={{width: 24, height: 24}}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SearchType;
