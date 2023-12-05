import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, icons, SIZES} from '../../constants';

const AcceptPolicy = ({onPress, text1, text2}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZES.radius,
      }}>
      <View style={{justifyContent: 'center'}}>
        <FastImage
          source={icons.checked}
          style={{width: 20, height: 20}}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            ...FONTS.cap1,
            color: COLORS.Neutral1,
            lineHeight: 20,
          }}>
          {text1} {'\n'}
          <Text style={{fontWeight: '600'}} onPress={onPress}>
            {text2}.
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default AcceptPolicy;
