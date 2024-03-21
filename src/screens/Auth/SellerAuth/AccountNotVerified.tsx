import {View, BackHandler, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useRef} from 'react';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

import {COLORS, SIZES, FONTS, images} from '../../../constants';
import {TextButton} from '../../../components';
import {SetupNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';

const AccountNotVerified = () => {
  const navigation = useNavigation<SetupNavigatorParamList>();

  const animation = useRef(null);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Return true to prevent the default behavior (going back)
        return true;
      },
    );

    return () => {
      // Clean up the event listener when the component is unmounted
      backHandler.remove();
    };
  }, [navigation]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* intro text */}
      <View
        style={{
          marginHorizontal: SIZES.semi_margin,
        }}>
        <FastImage
          source={images.logo}
          resizeMode={FastImage.resizeMode.contain}
          style={{width: 200, height: 200, alignSelf: 'center', top: -40}}
        />

        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 300,
            height: 300,
            alignSelf: 'center',
            top: -40,
          }}
          source={require('../../../../src/assets/json/noSuccess.json')}
        />

        <View style={{marginHorizontal: SIZES.semi_margin}}>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.Rose4,
              marginTop: SIZES.base,
              textAlign: 'center',
            }}>
            Account Not Verified!!!
          </Text>

          <Text
            style={{
              ...FONTS.sh3,
              color: COLORS.Neutral4,
              marginTop: SIZES.semi_margin,
              textAlign: 'justify',
              lineHeight: 22,
            }}>
            Your account have not yet been verified. You'll get an email
            notification when your account is Verified.
          </Text>
        </View>
      </View>

      <TextButton
        label={'Back to Sign In'}
        buttonContainerStyle={{
          alignSelf: 'center',
          marginTop: SIZES.padding * 2,
          marginBottom: 100,
        }}
        onPress={() => navigation.replace('SignIn')}
      />
    </SafeAreaView>
  );
};

export default AccountNotVerified;
