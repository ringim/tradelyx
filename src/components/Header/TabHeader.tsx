import React, {useEffect, useState} from 'react';
import {View, Platform, TouchableOpacity, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {SIZES, COLORS, images, icons} from '../../constants';
import {DEFAULT_PROFILE_IMAGE} from '../../utilities/Utils';

const TabHeader = ({userImage}: any) => {
  const navigation = useNavigation<any>();

  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    let unmounted = false;
    if (userImage) {
      Storage.get(userImage).then(setImageUri);
    }
    return () => {
      unmounted = true;
    };
  }, [userImage]);

  return (
    <View
      style={{
        paddingTop: Platform.OS == 'ios' ? 45 : SIZES.radius,
        height: Platform.OS == 'ios' ? '14%' : '10%',
        backgroundColor: COLORS.white,
      }}>
      <View
        style={{
          paddingTop: SIZES.height > 700 ? SIZES.base : 15,
          marginHorizontal: SIZES.padding,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* User Image */}
        <Pressable
          style={{
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('Profile')}>
          <FastImage
            source={{uri: imageUri || DEFAULT_PROFILE_IMAGE}}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: COLORS.primary1,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Pressable>

        {/* Logo */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <FastImage
            source={images.logo}
            style={{width: 111, height: 50}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>

        {/* Notification */}
        <TouchableOpacity
          style={{marginLeft: SIZES.padding, justifyContent: 'center'}}
          onPress={() => navigation.navigate('Notifications')}>
          <FastImage
            source={icons.bell}
            style={{width: 24, height: 24}}
            tintColor={COLORS.Neutral1}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TabHeader;
