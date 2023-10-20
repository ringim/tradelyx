import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

interface IItem {
  item: string | any;
  onPress: any;
  containerStyle?: any;
}

const PopularItem = ({containerStyle, item, onPress}: IItem) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.semi_margin,
        marginHorizontal: SIZES.semi_margin,
        borderRadius: SIZES.semi_margin,
        backgroundColor: COLORS.white,
        borderWidth: 0.2,
        padding: SIZES.base,
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
              width: 100,
              height: 137,
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            marginTop: SIZES.base,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <FastImage
                source={icons.store}
                tintColor={COLORS.Neutral6}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: 20,
                  height: 20,
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
                style={{...FONTS.sh3, color: COLORS.Neutral6}}>
                {item?.supplier}
              </Text>
            </View>
          </View>

          {/* Product title, */}
          <View style={{justifyContent: 'center', marginTop: SIZES.base}}>
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.h5,
                color: COLORS.Neutral1,
                lineHeight: 24,
              }}>
              {item?.name}
            </Text>
          </View>

          <View style={{justifyContent: 'center', marginTop: SIZES.base}}>
            <Text
              numberOfLines={2}
              style={{...FONTS.body3, color: COLORS.Neutral6}}>
              {item?.qty}
            </Text>
          </View>

          {/* location and rating */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: SIZES.radius,
            }}>
            <View style={{justifyContent: 'center'}}>
              <FastImage
                source={icons.location}
                resizeMode={FastImage.resizeMode.contain}
                tintColor={COLORS.Neutral6}
                style={{width: 20, height: 20}}
              />
            </View>

            <View
              style={{
                marginLeft: SIZES.base,
                justifyContent: 'center',
              }}>
              <Text style={{...FONTS.sh3, color: COLORS.Neutral6}}>
                {item?.address2}
              </Text>
            </View>

            <View style={{justifyContent: 'center', marginLeft: SIZES.base}}>
              <FastImage
                source={icons.dot}
                resizeMode={FastImage.resizeMode.contain}
                tintColor={COLORS.Neutral6}
                style={{width: 6, height: 6}}
              />
            </View>

            <View style={{justifyContent: 'center', marginLeft: SIZES.base}}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                source={icons.rate}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </View>

            <View
              style={{
                marginLeft: SIZES.base,
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text style={{...FONTS.h5, color: COLORS.Neutral6}}>
                {parseFloat(item?.rating).toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularItem;
