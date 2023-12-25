import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES} from '../../constants';

const FinanceTabs = ({icon, text, amount}: any) => {
  const options = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 5,
        borderRadius: SIZES.radius,
        paddingVertical: SIZES.base,
        backgroundColor: COLORS.Neutral10,
      }}>
      <View style={{padding: SIZES.radius}}>
        <View
          style={{
            backgroundColor: COLORS.primary1,
            justifyContent: 'center',
            width: 32,
            height: 32,
            borderRadius: SIZES.base,
          }}>
          <FastImage
            source={icon}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 20, height: 20, alignSelf: 'center'}}
          />
        </View>
        <View style={{paddingTop: SIZES.radius}}>
          <Text
            style={{
              ...FONTS.cap1,
              fontWeight: '400',
              color: COLORS.Neutral5,
            }}>
            {text}
          </Text>

          <Text
            style={{
              ...FONTS.h4,
              top: 8,
              color: COLORS.Neutral1,
            }}>
            ₦{amount.toLocaleString('en-US', options)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FinanceTabs;
