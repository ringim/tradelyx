import {View, Text} from 'react-native';
import React, {useRef} from 'react';
import LottieView from 'lottie-react-native';

import {COLORS, FONTS, SIZES} from '../../constants';

const NoItem = () => {
  const animation = useRef(null);

  return (
    <View style={{flex: 1, margin: SIZES.margin, alignItems: 'center'}}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 400,
          height: 400,
          alignSelf: 'center',
        }}
        source={require('../../../src/assets/json/noItem.json')}
      />

      <View style={{marginHorizontal: 40, bottom: 40}}>
        <Text style={{textAlign: 'center', color: COLORS.gray, ...FONTS.body2}}>
          Your search query can't be found!
        </Text>
      </View>
    </View>
  );
};

export default NoItem;
