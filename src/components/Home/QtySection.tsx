import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../constants';

const QtySection = ({
  handleIncrease,
  handleDecrease,
  qty,
  title,
  containerStyle,
}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZES.padding,
        ...containerStyle,
      }}>
      <View style={{justifyContent: 'center'}}>
        <Text
          style={{
            ...FONTS.body3,
            fontWeight: '500',
            color: COLORS.Neutral1,
          }}>
          {title}
        </Text>
      </View>
      <View style={{justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={handleDecrease}
            style={{
              justifyContent: 'center',
              width: 50,
              height: 50,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary10,
            }}>
            <Text
              style={{
                ...FONTS.d2,
                textAlign: 'center',
                fontWeight: '500',
                color: COLORS.primary1,
                top: -5,
              }}>
              -
            </Text>
          </TouchableOpacity>
          <View
            style={{
              marginLeft: SIZES.semi_margin,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.Neutral1,
              }}>
              {qty}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleIncrease}
            style={{
              marginLeft: SIZES.semi_margin,
              justifyContent: 'center',
              width: 50,
              height: 50,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary10,
            }}>
            <Text
              style={{
                ...FONTS.d2,
                textAlign: 'center',
                fontWeight: '500',
                color: COLORS.primary1,
                top: -5,
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default QtySection;
