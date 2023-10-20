import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

interface IItem {
  item: string | any;
  onPress?: any;
  containerStyle?: any;
}

const SearchItem2 = ({containerStyle, item, onPress}: IItem) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.semi_margin,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        borderWidth: 0.2,
        padding: SIZES.radius,
        borderColor: COLORS.Neutral7,
        ...containerStyle,
      }}
      onPress={onPress}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {/* Product image */}
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={item?.image}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 80,
              height: 110,
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: 'center',
            padding: 3,
            paddingStart: 0,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                justifyContent: 'center',
                padding: 6,
                backgroundColor: COLORS.lightYellow,
                borderRadius: 6,
              }}>
              <FastImage
                source={item?.storeImg}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: 18,
                  height: 18,
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
                style={{...FONTS.body3, color: COLORS.Neutral1}}>
                {item?.supplier}
              </Text>
            </View>
          </View>

          {/* Product title, */}
          <View style={{justifyContent: 'center', marginTop: 4}}>
            <Text
              numberOfLines={2}
              style={{...FONTS.h5, color: COLORS.Neutral1, lineHeight: 24}}>
              {item?.name}
            </Text>
          </View>

          {/* Qty required */}
          <View
            style={{
              marginTop: SIZES.base,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{...FONTS.cap1, color: COLORS.Neutral5}}>
                Min. Order:
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text
                numberOfLines={2}
                style={{...FONTS.cap1, color: COLORS.Neutral1}}>
                {item?.minOrder}
              </Text>
            </View>
          </View>

          {/* Supplier Qty */}
          <View
            style={{
              marginTop: 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{...FONTS.cap1, color: COLORS.Neutral5}}>
                Supply Ability:
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text
                numberOfLines={2}
                style={{...FONTS.cap1, color: COLORS.Neutral1}}>
                {item?.supplyAbility}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem2;
