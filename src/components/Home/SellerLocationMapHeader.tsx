import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
const SellerLocationMapHeader = ({
  children,
  showHeader,
  address2,
  mapContStyle,
  contentStyle,
  showAddress,
}: any) => {
  return (
    <View
      style={{
        borderRadius: SIZES.radius,
        // backgroundColor: COLORS.white,
        marginHorizontal: SIZES.semi_margin,
        marginBottom: SIZES.base,
        marginTop: SIZES.semi_margin,
        ...contentStyle,
      }}>
      {showHeader && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              source={icons.placeholder}
              tintColor={COLORS.secondary1}
              resizeMode={FastImage.resizeMode.cover}
              style={{width: 20, height: 20}}
            />
          </View>

          <View
            style={{flex: 1, marginLeft: SIZES.base, justifyContent: 'center'}}>
            <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>
              Main Location
            </Text>
          </View>
        </View>
      )}
      <View
        style={{
          padding: SIZES.padding,
          marginTop: SIZES.margin,
          height: 120,
          alignSelf: 'center',
          width: '95%',
          ...mapContStyle,
        }}>
        {children}
      </View>

      {showAddress && (
        <View style={{marginTop: SIZES.semi_margin, marginLeft: SIZES.radius}}>
          <Text
            numberOfLines={2}
            style={{...FONTS.sh3, color: COLORS.Neutral6}}>
            {address2}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SellerLocationMapHeader;
