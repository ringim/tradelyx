import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {DEFAULT_PROFILE_IMAGE} from '../../utilities/Utils';
import TextIconButton from '../Button/TextIconButton';

const AccountImage = ({profile_image, name, onEdit}: any) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    if (profile_image) {
      Storage.get(profile_image).then(setImageUri);
    }
  }, [profile_image]);

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.radius,
      }}>
      {/* Profile Photo */}
      <FastImage
        source={{uri: imageUri || DEFAULT_PROFILE_IMAGE}}
        resizeMode={FastImage.resizeMode.cover}
        style={{
          width: 100,
          height: 100,
          borderRadius: 70,
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
  );
};

export default AccountImage;
