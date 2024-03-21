import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {formatNumberWithCommas} from '../../utilities/service';

const TransactionItem = ({transaction}: any) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: SIZES.radius,
        }}>
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={icons.transaction}
            tintColor={COLORS.primary1}
            style={{width: 20, height: 20}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.base,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              color: COLORS.Neutral1,
            }}>
            {transaction?.status}
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              paddingTop: 3,
              color: COLORS.Neutral5,
            }}>
            {transaction?.title}
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignSelf: 'flex-end'}}>
          <Text
            style={{
              ...FONTS.h5,
              color:
                transaction?.status === 'DEBIT' ? COLORS.Rose5 : COLORS.Teal5,
            }}>
            {transaction?.status === 'DEBIT' ? '-' : '+'}₦
            {formatNumberWithCommas(transaction?.amount)}
          </Text>

          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.Neutral6,
              paddingTop: 3,
            }}>
            {transaction?.date}
          </Text>
        </View>
      </View>
      {/* Horizontal Rule */}
      <View
        style={{
          marginTop: SIZES.radius,
          alignSelf: 'center',
          width: '100%',
          borderWidth: 0.5,
          borderColor: COLORS.Neutral7,
        }}
      />
    </>
  );
};

export default TransactionItem;
