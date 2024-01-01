import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {Header} from '../../../../components';
import {COLORS, SIZES, FONTS} from '../../../../constants';

const PromotionNotifications = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'Promotions'} tintColor={COLORS.Neutral1} />

      <View
        style={{
          margin: SIZES.radius,
        }}>
        <LottieView
          style={{
            height: 300,
            width: 300,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          autoPlay
          speed={0.5}
          loop={true}
          source={require('../../../../assets/json/noNotification.json')}
        />
      </View>

      <View
        style={{
          alignItems: 'center',
          top: -SIZES.padding * 3,
          marginHorizontal: SIZES.padding * 1.2,
        }}>
        <Text
          style={{
            ...FONTS.body2,
            color: COLORS.Neutral1,
            lineHeight: 24,
            textAlign: 'center',
          }}>
          No Notification received.
        </Text>
      </View>
    </View>
  );
};

export default PromotionNotifications;
