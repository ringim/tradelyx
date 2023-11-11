import {View, Text, TouchableOpacity} from 'react-native';
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
  profile_image2,
  onPress2,
  name,
  onEdit,
  showBanner,
  contentStyle,
  containerStyle
}: any) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageUri2, setImageUri2] = useState<string | null>(null);

  useEffect(() => {
    if (profile_image) {
      Storage.get(profile_image).then(setImageUri);
    }
  }, [profile_image]);

  useEffect(() => {
    if (profile_image2) {
      Storage.get(profile_image2).then(setImageUri2);
    }
  }, [profile_image2]);

  return (
    <View style={{marginTop: 0, ...containerStyle}}>
      {/* Banner Photo */}
      {showBanner && (
        <>
          <FastImage
            source={{uri: imageUri2 || DEFAULT_BANNER_IMAGE}}
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
              right: 5,
              bottom: 140,
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
          ...contentStyle
        }}>
        {/* Profile Photo */}
        <FastImage
          source={{uri: imageUri || DEFAULT_PROFILE_IMAGE}}
          resizeMode={FastImage.resizeMode.cover}
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: COLORS.primary1,
          }}
        />
        <View
          style={{
            marginTop: SIZES.base,
          }}>
          <Text style={{...FONTS.h3, color: COLORS.Neutral1}}>{name}</Text>
        </View>

        {/* change image */}
        <TextIconButton
          label={'Change'}
          labelStyle={{marginLeft: SIZES.base, ...FONTS.h5}}
          icon={icons.camera}
          iconPosition={'LEFT'}
          containerStyle={{
            padding: SIZES.radius,
            marginTop: SIZES.radius,
            width: 134,
            height: 41,
          }}
          onPress={onEdit}
        />
      </View>
    </View>
  );
};

export default AccountImage;
