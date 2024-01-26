import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {useNavigation, useRoute} from '@react-navigation/native';

import {COLORS, FONTS, SIZES, images} from '../../../../constants';
import {TextButton} from '../../../../components';
import {
  HomeStackNavigatorParamList,
  SuccessServiceRouteProp,
} from '../../../../components/navigation/BuyerNav/type/navigation';

const SuccessService = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<SuccessServiceRouteProp>();

  const {type}: any = route?.params;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        padding: SIZES.margin,
      }}>
      <View style={{marginTop: 0}}>
        <FastImage
          source={images.success_arrow}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: 200,
            height: 200,
            alignSelf: 'center',
          }}
        />
      </View>
      <View style={{marginTop: SIZES.padding * 2}}>
        <Text
          style={{...FONTS.h4, textAlign: 'center', color: COLORS.Neutral1}}>
          {type} Sent Successfully
        </Text>
      </View>
      <View style={{marginTop: SIZES.padding}}>
        <Text
          style={{
            ...FONTS.body3,
            lineHeight: 22,
            textAlign: 'center',
            color: COLORS.Neutral5,
          }}>
          Please wait for the review results from the seller. You can access the
          process via the "Order-Pending" menu.
        </Text>
      </View>

      <TextButton
        buttonContainerStyle={{
          marginTop: SIZES.padding * 2,
          height: 50,
          width: 300,
        }}
        label="Go to Orders"
        labelStyle={{...FONTS.h4}}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Home', screen: 'Orders'}],
          })
          // navigation.navigate('Home', {screen: 'Orders'});
        }}
      />

      <TextButton
        buttonContainerStyle={{
          backgroundColor: COLORS.white,
          marginTop: SIZES.base,
          height: 50,
          width: 300,
        }}
        label="Close"
        labelStyle={{...FONTS.h4, color: COLORS.primary1}}
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default SuccessService;
