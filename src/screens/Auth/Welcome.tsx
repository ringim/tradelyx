import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import {TextButton} from '../../components';
import {COLORS, FONTS, SIZES, images} from '../../constants';
import {AuthStackNavigatorParamList} from '../../components/navigation/navigation';

const Welcome = () => {
  const navigation = useNavigation<AuthStackNavigatorParamList>();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.primary1,
      }}>
      {/* Logo & Title */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <FastImage
          source={images.logo}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: 250,
            height: 115,
            marginTop: 200
          }}
        />
      </View>

      {/* Footer Buttons */}
      <View
        style={{
          margin: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}>
        <TextButton
          buttonContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          label="Get Started"
          labelStyle={{
            color: COLORS.primary1,
          }}
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
