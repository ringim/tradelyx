import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {useNavigation, useRoute} from '@react-navigation/native';

import {COLORS, FONTS, SIZES, images} from '../../../../constants';
import {TextButton} from '../../../../components';
import {HomeStackNavigatorParamList} from '../../../../components/navigation/SellerNav/type/navigation';

const SuccessService6 = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<any>();

  return (
    <View style={styles.container}>
      <View>
        <FastImage
          source={images.success_arrow}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.imageContainer}
        />
      </View>
      <View style={{marginTop: SIZES.padding * 2}}>
        <Text
          style={{...FONTS.h4, textAlign: 'center', color: COLORS.Neutral1}}>
          RFF Replied Successfully
        </Text>
      </View>
      <View style={{marginTop: SIZES.padding}}>
        <Text style={styles.text}>
          Please wait for your offer to be accepted by the buyer. The buyer will
          review your offer
        </Text>
      </View>

      <TextButton
        buttonContainerStyle={{
          backgroundColor: COLORS.white,
          marginTop: SIZES.padding * 2,
          height: 50,
          width: 300,
          borderWidth: 1,
          borderColor: COLORS.primary1,
        }}
        label="Close"
        labelStyle={{...FONTS.h4, color: COLORS.primary1}}
        onPress={() => {
          navigation.pop(2);
          navigation.navigate('Chat', {id: route?.params?.chatroomID});
        }}
      />
    </View>
  );
};

export default SuccessService6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    padding: SIZES.margin,
  },
  imageContainer: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  text: {
    ...FONTS.body3,
    lineHeight: 22,
    textAlign: 'center',
    color: COLORS.Neutral5,
  },
});
