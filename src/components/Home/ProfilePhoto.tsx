import React, {useEffect, useMemo, useState} from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {SIZES, FONTS, icons, COLORS} from '../../constants';
import {DEFAULT_PROFILE_IMAGE, bucket, imageHandlerURL} from '../../utilities/Utils';

interface IDriverImage {
  userImage?: any;
  name: string;
  location: string;
  containerStyle?: any;
}

const ProfilePhoto = ({userImage, name, location}: IDriverImage) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    let unmounted = true;
    if (userImage && unmounted) {
      Storage.get(userImage).then(setImageUri);
    }
    return () => {
      unmounted = false;
    };
  }, [userImage]);

  // IMAGE REQUEST
  const uriImage = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${userImage}`,
      edits: {
        contentModeration: true,
        resize: {
          width: 150,
          height: 150,
          fit: 'cover',
        },
      },
    });
    const encodedImg = Buffer.from(imageRequest).toString('base64');
    return imageHandlerURL + encodedImg;
  }, [userImage, imageUri]);

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.radius,
      }}>
      {/* Profile Photo */}
      <FastImage
        source={{
          uri: uriImage || DEFAULT_PROFILE_IMAGE,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
        style={{
          width: 150,
          height: 150,
          borderRadius: 200,
          borderWidth: 1,
          borderColor: COLORS.primary1,
        }}
      />

      {/* business name */}

      {/* name and location */}
      <View style={{margin: SIZES.semi_margin, alignItems: 'center'}}>
        <Text style={{...FONTS.h3, color: COLORS.Neutral1}}>{name}</Text>

        <View
          style={{
            alignItems: 'center',
            marginTop: SIZES.base,
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
