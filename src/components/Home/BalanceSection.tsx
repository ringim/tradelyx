import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {COLORS, FONTS, SIZES, icons, images} from '../../constants';
import TextButton from '../Button/TextButton';

const BalanceSection = () => {
  return (
    <View
      style={{
        padding: SIZES.margin,
        backgroundColor: COLORS.primary1,
        borderRadius: SIZES.radius,
        margin: SIZES.semi_margin,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.white,
              paddingTop: 4,
            }}>
            ₦500,000.00
          </Text>

          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
              paddingTop: SIZES.radius,
            }}>
            Available for Withdrawal
          </Text>
        </View>

        <TextButton
          buttonContainerStyle={{
            height: 40,
            width: 100,
            marginTop: SIZES.base,
            justifyContent: 'center',
            backgroundColor: COLORS.white,
          }}
          label="Withdraw"
          labelStyle={{...FONTS.h5, color: COLORS.primary1}}
          // onPress={onPress}
        />
      </View>
    </View>
  );
};

export default BalanceSection;
