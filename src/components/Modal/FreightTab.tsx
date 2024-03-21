import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, FONTS, icons} from '../../constants';

const FreightTab = ({item, selected, onPress}: any) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.margin,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: SIZES.radius,
        borderWidth: 0.5,
        padding: SIZES.radius,
        borderColor: selected ? COLORS.primary2 : COLORS.Neutral8,
        backgroundColor: selected ? COLORS.primary10 : COLORS.white,
      }}
      onPress={() => onPress(item)}>
      <View
        style={{
          justifyContent: 'center',
          padding: SIZES.radius,
          backgroundColor: selected ? COLORS.white : COLORS.lightYellow,
          borderRadius: SIZES.radius,
        }}>
        <FastImage
          source={item?.icon}
          style={{width: 30, height: 30}}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      <View
        style={{justifyContent: 'center', flex: 1, marginLeft: SIZES.radius}}>
        <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>{item?.label}</Text>
      </View>

      <View
        style={{
          justifyContent: 'center',
        }}>
        <FastImage
          source={selected ? icons.checkCircle : icons.circle}
          style={{width: 24, height: 24}}
          resizeMode={FastImage.resizeMode.contain}
          tintColor={selected ? COLORS.primary2 : COLORS.Neutral7}
        />
      </View>
    </TouchableOpacity>
  );
};

export default FreightTab;
