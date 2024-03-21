import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, FONTS, icons} from '../../constants';

const SourceLocationItem = ({item, selected, onPress}: any) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.radius,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: SIZES.radius,
        borderWidth: 1,
        paddingHorizontal: SIZES.margin,
        paddingVertical: SIZES.base,
        borderColor: selected ? COLORS.primary2 : COLORS.Neutral8,
        backgroundColor: selected ? COLORS.primary10 : 'transparent',
      }}
      onPress={() => onPress(item)}>
      <View style={{justifyContent: 'center'}}>
        <Text style={{...FONTS.body3, color: COLORS.Neutral1, }}>
          {item?.label}
        </Text>
      </View>

      <Pressable
        onPress={() => onPress(item)}
        style={{
          justifyContent: 'center',
        }}>
        <FastImage
          source={selected ? icons.checkCircle : icons.circle}
          style={{width: 22, height: 22, marginLeft: 10}}
          resizeMode={FastImage.resizeMode.contain}
          tintColor={selected ? COLORS.primary2 : COLORS.Neutral7}
        />
      </Pressable>
    </TouchableOpacity>
  );
};

export default SourceLocationItem;
