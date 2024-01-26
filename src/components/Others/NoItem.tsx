import {View, Text} from 'react-native';
import React, {useRef} from 'react';
import LottieView from 'lottie-react-native';

import {COLORS, FONTS, SIZES} from '../../constants';

const NoItem = ({containerStyle, textCont, contentStyle}: any) => {
  const animation = useRef(null);

  return (
    <View style={{margin: SIZES.margin, alignItems: 'center', ...contentStyle}}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 300,
          height: 300,
          alignSelf: 'center',
          ...containerStyle,
        }}
        source={require('../../../src/assets/json/noItem.json')}
      />

      <View style={{marginHorizontal: 40, bottom: 40, ...textCont}}>
        <Text style={{textAlign: 'center', color: COLORS.gray, ...FONTS.body2}}>
          No items found!
        </Text>
      </View>
    </View>
  );
};

export default NoItem;
