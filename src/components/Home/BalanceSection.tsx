import {View, Text} from 'react-native';
import React from 'react';

import {COLORS, FONTS, SIZES} from '../../constants';
import TextButton from '../Button/TextButton';

const BalanceSection = ({balance, onPress}: any) => {
  const options = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return (
    <View
      style={{
        padding: SIZES.semi_margin,
        backgroundColor: COLORS.primary1,
        borderRadius: SIZES.radius,
        margin: SIZES.semi_margin,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
        <View style={{flex: 1,justifyContent: 'center'}}>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.white,
              paddingTop: 4,
            }}>
            ₦{balance.toLocaleString('en-US', options)}
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
              paddingTop: 4,
            }}>
            {balance >= 20
              ? 'Available for Withdrawal'
              : 'Do some business to withdraw'}
          </Text>
        </View>

        <View style={{ justifyContent: 'center',}}>
          <TextButton
            disabled={balance < 20 ? true : false}
            buttonContainerStyle={{
              height: 35,
              width: 90,
              flex: 0,
              marginTop: -SIZES.margin,
              backgroundColor: balance < 20 ? COLORS.Neutral7 : COLORS.white,
            }}
            label="Withdraw"
            labelStyle={{
              ...FONTS.body3,
              fontWeight: '700',
              color: balance < 20 ? COLORS.Neutral6 : COLORS.primary1,
            }}
            onPress={onPress}
          />
        </View>
      </View>
    </View>
  );
};

export default BalanceSection;
