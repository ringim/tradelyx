import {View, Text, ImageBackground} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import {
  Header,
  NoSection,
  TransactDate,
  TransactionItem,
  WalletHeader,
} from '../../../../components';
import {COLORS, SIZES, FONTS, dummyData, images} from '../../../../constants';
import {groupTransactionsByDate} from '../../../../utilities/Utils';
import {ProfileStackNavigatorParamList} from '../../../../components/navigation/SellerNav/type/navigation';

const Wallet = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();

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
    // <ImageBackground
    //   source={images.walletBG}
    //   style={{height: '100%', width: '100%'}}
    //   resizeMode="cover">
    //   <Header
    //     title={'My Wallet'}
    //     contentStyle={{backgroundColor: 'transparent'}}
    //     titleStyle={{color: COLORS.white}}
    //     tintColor={COLORS.white}
    //   />

    //   {/* Wallet Balance and Buttons */}
    //   <WalletHeader balance={dummyData?.myProfile?.walletAmt} />

    //   {/* Recent Transactions */}
    //   <View
    //     style={{
    //       flex: 1,
    //       marginTop: 20,
    //       borderTopLeftRadius: SIZES.margin,
    //       borderTopRightRadius: SIZES.margin,
    //       backgroundColor: COLORS.Neutral10,
    //     }}>
    //     {groupedTransactionList.length > 0 ? (
    //       <>
    //         <View
    //           style={{
    //             marginVertical: SIZES.semi_margin,
    //             marginHorizontal: SIZES.radius,
    //           }}>
    //           <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>
    //             Recent History
    //           </Text>
    //         </View>
    //         <FlatList
    //           data={groupedTransactionList}
    //           showsVerticalScrollIndicator={false}
    //           keyExtractor={item => item.id}
    //           renderItem={({item, index}) => {
    //             return (
    //               <View key={index} style={{flex: 1}}>
    //                 <TransactDate item={item} />
    //                 {item.transactions.map((transaction: any) => (
    //                   <TransactionItem transaction={transaction} />
    //                 ))}
    //               </View>
    //             );
    //           }}
    //           ListFooterComponent={
    //             <View
    //               style={{
    //                 marginBottom: lastIndex ? 300 : 300,
    //               }}
    //             />
    //           }
    //         />
    //       </>
    //     ) : (
    //       <NoSection />
    //     )}
    //   </View>
    // </ImageBackground>
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'Wallet'} tintColor={COLORS.Neutral1} />

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          top: -100,
          left: 50,
        }}>
        <LottieView
          style={{height: 400, width: 400}}
          autoPlay
          speed={0.5}
          loop={true}
          source={require('../../../../assets/json/comingSoon.json')}
        />
      </View>
    </View>
  );
};

export default Wallet;
