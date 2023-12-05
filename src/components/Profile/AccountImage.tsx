import {View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {
  DEFAULT_BANNER_IMAGE,
  DEFAULT_PROFILE_IMAGE,
} from '../../utilities/Utils';
import TextIconButton from '../Button/TextIconButton';

const AccountImage = ({
  profile_image,
  bg_image,
  onPress2,
  name,
  onEdit,
  showBanner,
  contentStyle,
  containerStyle,
}: any) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageUri2, setImageUri2] = useState<string | null>(null);

  useEffect(() => {
    let unmounted = true;
    if (profile_image && unmounted) {
      Storage.get(profile_image).then(setImageUri);
    }
    return () => {
      unmounted = false;
    };
  }, [profile_image]);

  useEffect(() => {
    let unmounted = true;
    if (bg_image && unmounted) {
      Storage.get(bg_image).then(setImageUri2);
    }
    return () => {
      unmounted = false;
    };
  }, [bg_image]);

  return (
    <View style={{marginTop: 0, ...containerStyle}}>
      {/* Banner Photo */}
      {showBanner && (
        <>
          <FastImage
            source={{
              uri: imageUri2 || DEFAULT_BANNER_IMAGE,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: '100%',
              height: 180,
            }}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              borderRadius: 100,
              marginTop: SIZES.radius,
              alignItems: 'center',
              backgroundColor: COLORS.primary1,
              padding: SIZES.base,
              right: 3,
              bottom: -15,
            }}
            onPress={onPress2}>
            <FastImage
              source={icons.edit}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={COLORS.white}
              style={{
                width: 17,
                height: 17,
              }}
            />
          </TouchableOpacity>
        </>
      )}
      <View
        style={{
          alignItems: 'center',
          top: 100,
          alignSelf: 'center',
          justifyContent: 'center',
          padding: SIZES.radius,
          position: 'absolute',
          ...contentStyle,
        }}>
        {/* Profile Photo */}
        <FastImage
          source={{
            uri: imageUri || DEFAULT_PROFILE_IMAGE,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: COLORS.primary1,
          }}
        />

        {/* change image */}
        <TextIconButton
          label={'Change'}
          labelStyle={{marginLeft: SIZES.base, ...FONTS.h5}}
          icon={icons.camera}
          iconPosition={'LEFT'}
          containerStyle={{
            marginTop: SIZES.semi_margin,
            width: 130,
            height: 45,
          }}
          onPress={onEdit}
        />
      </View>
    </View>
  );
};

export default AccountImage;
