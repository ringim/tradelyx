import {View, Text, ImageBackground} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import TextIconButton from '../Button/TextIconButton';
import {
  DEFAULT_BANNER_IMAGE,
  DEFAULT_PROFILE_IMAGE,
} from '../../utilities/Utils';

const StoreBannerInfo = ({
  onPress,
  address,
  supplierName,
  onPress2,
  banner_image,
  logo,
}: any) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageUri2, setImageUri2] = useState<string | null>(null);

  useEffect(() => {
    if (banner_image) {
      Storage.get(banner_image).then(setImageUri2);
    }
  }, [banner_image]);

  useEffect(() => {
    if (logo) {
      Storage.get(logo).then(setImageUri);
    }
  }, [logo]);

  return (
    <View>
      <ImageBackground
        source={{uri: imageUri || DEFAULT_BANNER_IMAGE}}
        resizeMode="cover"
        style={{width: '100%', height: 207}}>
        <View
          style={{
            justifyContent: 'center',
            padding: SIZES.radius,
            width: 100,
            height: 100,
            alignSelf: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.Neutral10,
            borderRadius: SIZES.radius,
            marginTop: 90,
          }}>
          <FastImage
            source={{uri: imageUri2 || DEFAULT_PROFILE_IMAGE}}
            style={{width: 80, height: 80, borderRadius: 40}}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </ImageBackground>

      {/* Supplier Name */}
      <View style={{marginTop: 15, alignItems: 'center'}}>
        <Text style={{...FONTS.h2, color: COLORS.Neutral1}}>
          {supplierName}
        </Text>
      </View>

      {/* Supplier address, */}
      <View
        style={{
          alignSelf: 'center',
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <FastImage
            tintColor={COLORS.Neutral6}
            resizeMode={FastImage.resizeMode.contain}
            source={icons.location}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </View>
        <View style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
          <Text numberOfLines={2} style={{...FONTS.body3, color: COLORS.Neutral6}}>
            {address}
          </Text>
        </View>
      </View>

      {/* info buttons */}
      <View
        style={{
          alignSelf: 'center',
          marginTop: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TextIconButton
          label={'About'}
          labelStyle={{color: COLORS.primary1, marginLeft: SIZES.radius}}
          containerStyle={{
            backgroundColor: COLORS.white,
            borderColor: COLORS.primary1,
            borderWidth: 2,
            width: 160,
          }}
          iconPosition={'LEFT'}
          icon={icons.info}
          iconStyle={COLORS.primary1}
          onPress={onPress}
        />
        <TextIconButton
          label={'Contact'}
          labelStyle={{marginLeft: SIZES.radius}}
          containerStyle={{
            width: 160,
            marginLeft: SIZES.base,
          }}
          iconPosition={'LEFT'}
          icon={icons.chat}
          iconStyle={COLORS.white}
          onPress={onPress2}
        />
      </View>
    </View>
  );
};

export default StoreBannerInfo;
