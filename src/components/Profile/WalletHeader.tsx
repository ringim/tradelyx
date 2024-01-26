import {View, Text} from 'react-native';
import React from 'react';

import TextButton from '../Button/TextButton';
import {COLORS, FONTS, SIZES} from '../../constants';
import {formatNumberWithCommas} from '../../utilities/service';

const WalletHeader = ({balance, onWithdraw, onDeposit}: any) => {
  return (
    <View style={{margin: SIZES.margin}}>
      <Text style={{...FONTS.d1, color: COLORS.white, textAlign: 'center'}}>
        ₦{formatNumberWithCommas(balance)}
      </Text>
      <Text
        style={{
          ...FONTS.body3,
          paddingTop: 5,
          color: COLORS.white,
          textAlign: 'center',
        }}>
        Wallet Balance
      </Text>

      <View
        style={{
          marginTop: SIZES.base,
          marginHorizontal: SIZES.padding * 1.5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TextButton
          buttonContainerStyle={{
            height: 45,
            width: 130,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.NeutralBlue2,
          }}
          label="Withdraw"
          labelStyle={{...FONTS.h5, color: COLORS.white}}
          onPress={onWithdraw}
        />

        <TextButton
          buttonContainerStyle={{
            height: 45,
            width: 130,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}
          label="Deposit"
          labelStyle={{...FONTS.h5, color: COLORS.Neutral1}}
          onPress={onDeposit}
        />
      </View>
    </View>
  );
};

export default WalletHeader;
