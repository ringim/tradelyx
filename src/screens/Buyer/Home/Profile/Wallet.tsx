import {View, Text, ImageBackground} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import React, {useEffect} from 'react';

import {
  Header,
  NoSection,
  TransactDate,
  TransactionItem,
  WalletHeader,
} from '../../../../components';
import {COLORS, SIZES, FONTS, dummyData, images} from '../../../../constants';
import {groupTransactionsByDate} from '../../../../utilities/Utils';

const Wallet = () => {
  const groupedTransactions = groupTransactionsByDate(
    dummyData?.transactionHistory,
  );

  // Convert the grouped data to an array of objects for rendering
  const groupedTransactionList: any = Object.keys(groupedTransactions).map(
    date => ({
      date,
      transactions: groupedTransactions[date],
    }),
  );
  const lastIndex = groupedTransactionList?.length - 1;

  return (
    <ImageBackground
      source={images.walletBG}
      style={{height: '100%', width: '100%'}}
      resizeMode="cover">
      <Header
        title={'My Wallet'}
        contentStyle={{backgroundColor: 'transparent'}}
        titleStyle={{color: COLORS.white}}
        tintColor={COLORS.white}
      />

      {/* Wallet Balance and Buttons */}
      <WalletHeader balance={dummyData?.myProfile?.walletAmt} />

      {/* Recent Transactions */}
      <View
        style={{
          flex: 1,
          marginTop: 20,
          borderTopLeftRadius: SIZES.margin,
          borderTopRightRadius: SIZES.margin,
          backgroundColor: COLORS.Neutral10,
        }}>
        {groupedTransactionList.length > 0 ? (
          <>
            <View
              style={{
                marginVertical: SIZES.semi_margin,
                marginHorizontal: SIZES.radius,
              }}>
              <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>
                Recent History
              </Text>
            </View>
            <FlashList
              data={groupedTransactionList}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => `${item?.date}`}
              estimatedItemSize={200}
              getItemType={({item}: any) => {
                return item;
              }}
              renderItem={({item, index}) => {
                return (
                  <View key={index} style={{flex: 1}}>
                    <TransactDate item={item} />
                    {item.transactions.map((transaction: any) => (
                      <TransactionItem transaction={transaction} />
                    ))}
                  </View>
                );
              }}
              ListFooterComponent={
                <View
                  style={{
                    marginBottom: lastIndex ? 300 : 300,
                  }}
                />
              }
            />
          </>
        ) : (
          <NoSection />
        )}
      </View>
    </ImageBackground>
  );
};

export default Wallet;
