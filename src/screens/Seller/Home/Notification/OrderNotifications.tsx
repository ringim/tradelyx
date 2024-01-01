import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {Header} from '../../../../components';
import {COLORS, SIZES, FONTS} from '../../../../constants';

const OrderNotifications = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'Orders'} tintColor={COLORS.Neutral1} />


    </View>
  );
};

export default OrderNotifications;
