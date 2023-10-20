import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {SIZES, FONTS, icons, COLORS} from '../../constants';
import {DEFAULT_PROFILE_IMAGE} from '../../utilities/Utils';

interface IDriverImage {
  userImage?: any;
  name: string;
  location: string;
  containerStyle?: any;
}

const ProfilePhoto = ({userImage, name, location}: IDriverImage) => {
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
          borderRadius: 60,
        }}
      />

      {/* name and location */}
      <View style={{margin: SIZES.semi_margin, alignItems: 'center'}}>
        <Text style={{...FONTS.h3, color: COLORS.Neutral1}}>{name}</Text>

        <View
          style={{
            alignItems: 'center',
            marginTop: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              tintColor={COLORS.Neutral5}
              resizeMode={FastImage.resizeMode.contain}
              source={icons.location}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </View>
          <View style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
            <Text
              numberOfLines={2}
              style={{...FONTS.body3, color: COLORS.Neutral5}}>
              {location}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfilePhoto;
