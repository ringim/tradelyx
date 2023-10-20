import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {SIZES, FONTS, icons, COLORS} from '../../constants';
import TextButton from '../Button/TextButton';

const StoreInfo = ({productItem, onPress, showDetail}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: SIZES.margin,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        marginTop: SIZES.margin,
        marginHorizontal: SIZES.semi_margin,
      }}>
      <View
        style={{
          justifyContent: 'center',
          padding: SIZES.radius,
          backgroundColor: COLORS.lightYellow,
          borderRadius: SIZES.radius,
        }}>
        <FastImage
          source={productItem?.storeImg}
          resizeMode={FastImage.resizeMode.cover}
          style={{width: 30, height: 30}}
        />
      </View>

      <View
        style={{
          flex: 1,
          marginLeft: SIZES.semi_margin,
          justifyContent: 'center',
        }}>
        <Text numberOfLines={2} style={{...FONTS.h3, color: COLORS.Neutral1}}>
          {productItem?.supplier}
        </Text>

        <View
          style={{
            alignItems: 'center',
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
                width: 20,
                height: 20,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: SIZES.base,
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.sh3, color: COLORS.Neutral6}}>
              {productItem?.address2}
            </Text>
          </View>
        </View>
      </View>

      {showDetail && (
        <View style={{justifyContent: 'center'}}>
          <TextButton
            buttonContainerStyle={{
              height: 40,
              width: 76,
              justifyContent: 'center',
              marginTop: 0,
              backgroundColor: COLORS.white,
              borderWidth: 1,
              borderColor: COLORS.primary1,
              borderRadius: SIZES.base
            }}
            label="Detail"
            labelStyle={{...FONTS.h4, color: COLORS.primary1}}
            onPress={onPress}
          />
        </View>
      )}
    </View>
  );
};

export default StoreInfo;
