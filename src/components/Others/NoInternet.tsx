import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

import {SIZES, FONTS, COLORS} from '../../constants';

const NoInternet = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
      }}>
      <View>
        <LottieView
          style={{height: 300, width: 300, alignSelf: 'center'}}
          autoPlay
          speed={0.5}
          loop={true}
          source={require('../../../src/assets/json/noInternet.json')}
        />
        <View style={{margin: SIZES.base}}>
          <Text
            style={{
              ...FONTS.h3,
              textAlign: 'center',
              color: COLORS.Neutral1
            }}>
            Network Error
          </Text>
        </View>

        <View style={{margin: SIZES.base}}>
          <Text
            style={{
              ...FONTS.body2,
              textAlign: 'center',
              color: COLORS.Neutral1
            }}>
            You have no active network connection
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NoInternet;
