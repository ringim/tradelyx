import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, FONTS, icons} from '../../constants';

const ServiceTab = ({item, selected, onPress}: any) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.margin,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: SIZES.radius,
        borderWidth: 1,
        padding: SIZES.base,
        borderColor: selected ? COLORS.primary2 : COLORS.Neutral8,
        backgroundColor: selected ? COLORS.primary10 : 'transparent',
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
          style={{width: 20, height: 20}}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      <View
        style={{justifyContent: 'center', flex: 1, marginLeft: SIZES.radius}}>
        <Text
          style={{...FONTS.h5, fontWeight: '600', color: COLORS.Neutral1}}>
          {item?.label}
        </Text>
        <Text
          style={{...FONTS.cap1, paddingTop: 4, fontWeight: '600', color: COLORS.Neutral5}}>
          {item?.text}
        </Text>
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

export default ServiceTab;
