import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import {COLORS, FONTS, SIZES, images} from '../../../constants';
import {TextButton} from '../../../components';
import {HomeStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';

const SuccessService3 = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

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
          Sell Offer Sent Successfully
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
          Your Sell Offer has been published and will be seen by your potential
          buyers.
        </Text>
      </View>

      <TextButton
        buttonContainerStyle={{
          marginTop: SIZES.padding * 2,
          height: 50,
          width: 300,
        }}
        label="Go to Store"
        labelStyle={{...FONTS.h4}}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'StoreProduct'}],
          })
        }
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
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          })
        }
      />
    </View>
  );
};

export default SuccessService3;
