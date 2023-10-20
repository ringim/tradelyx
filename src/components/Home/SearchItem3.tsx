import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

interface IItem {
  item: string | any;
  onPress: any;
  containerStyle?: any;
}

const SearchItem3 = ({containerStyle, item, onPress}: IItem) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.base,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        padding: SIZES.radius,
        ...containerStyle,
      }}
      onPress={onPress}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {/* Product image */}
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: COLORS.lightYellow,
            width: 100,
            height: 100,
            borderRadius: SIZES.radius,
          }}>
          <FastImage
            source={item?.storeImg}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 66,
              height: 52,
              alignSelf: 'center',
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <FastImage
                source={icons.location}
                tintColor={COLORS.Neutral6}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: 16,
                  height: 16,
                  top: 1,
                }}
              />
            </View>

            {/* Supplier Name, */}
            <View
              style={{
                flex: 1,
                marginLeft: SIZES.base,
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={2}
                style={{...FONTS.cap1, color: COLORS.Neutral6}}>
                {item?.address2}
              </Text>
            </View>
          </View>

          {/* Product title, */}
          <View style={{justifyContent: 'center', marginTop: SIZES.base}}>
            <Text
              numberOfLines={2}
              style={{...FONTS.h4, color: COLORS.Neutral1}}>
              {item?.supplier}
            </Text>
          </View>

          {/* description */}
          <View style={{justifyContent: 'center', marginTop: 4}}>
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.body3,
                color: COLORS.Neutral6,
                lineHeight: 24,
              }}>
              {item?.overview}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem3;
