import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

interface IItem {
  item: string | any;
  onPress: any;
  containerStyle?: any;
}

const VendorItem = ({containerStyle, item, onPress}: IItem) => {
  return (
    <View
      style={{
        borderRadius: SIZES.semi_margin,
        padding: SIZES.base,
        paddingBottom: SIZES.semi_margin,
        ...containerStyle,
      }}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: COLORS.Neutral10,
          width: 120,
          paddingVertical: SIZES.padding,
          borderRadius: SIZES.radius,
        }}>
        <FastImage
          source={item.image}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: 70,
            height: 70,
          }}
        />
      </View>

      {/* Supplier Name, */}
      <View
        style={{
          marginTop: SIZES.base,
        }}>
        <Text numberOfLines={2} style={{...FONTS.h5, color: COLORS.Neutral1}}>
          {item?.supplier}
        </Text>
      </View>

      {/* Supplier address, */}
      <View
        style={{
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <FastImage
            tintColor={COLORS.Neutral6}
            resizeMode={FastImage.resizeMode.contain}
            source={icons.location}
            style={{
              width: 16,
              height: 16,
            }}
          />
        </View>
        <View
          style={{flex: 1, marginLeft: SIZES.base, justifyContent: 'center'}}>
          <Text
            numberOfLines={2}
            style={{...FONTS.cap1, color: COLORS.Neutral6}}>
            {item?.address2}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VendorItem;
