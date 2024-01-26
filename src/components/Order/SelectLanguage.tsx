import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, FONTS, icons} from '../../constants';

const SelectLanguage = ({item, selected, onPress}: any) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.margin,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: SIZES.radius,
        borderWidth: 1,
        padding: SIZES.semi_margin,
        borderColor: selected ? COLORS.primary2 : COLORS.Neutral8,
        backgroundColor: selected ? COLORS.primary10 : 'transparent',
      }}
      onPress={() => onPress(item)}>
      <View
        style={{justifyContent: 'center', flex: 1}}>
        <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>{item?.type}</Text>
      </View>

      <Pressable
        onPress={() => onPress(item)}
        style={{
          justifyContent: 'center',
        }}>
        <FastImage
          source={selected ? icons.checkCircle : icons.circle}
          style={{width: 24, height: 24}}
          resizeMode={FastImage.resizeMode.contain}
          tintColor={selected ? COLORS.primary2 : COLORS.Neutral7}
        />
      </Pressable>
    </TouchableOpacity>
  );
};

export default SelectLanguage;
