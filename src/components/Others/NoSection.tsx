import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

import {COLORS, FONTS, SIZES} from '../../constants';

const NoSection = () => {
  return (
    <View style={[styles.container, {backgroundColor: COLORS.Neutral9}]}>
      <LottieView
        style={styles.lottie}
        autoPlay
        speed={1.5}
        loop={true}
        source={require('../../../src/assets/json/noTransactions.json')}
      />

      <Text style={[styles.text, {color: COLORS.Neutral1}]}>
        You have no recent transactions
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: SIZES.radius,
    marginHorizontal: SIZES.padding * 1.5,
  },
  text: {
    ...FONTS.body2,
    fontWeight: '500'
  },
  lottie: {
    height: 250,
    alignSelf: 'center',
  },
});

export default NoSection;
