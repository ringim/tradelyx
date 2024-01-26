import {View, TouchableOpacity, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {DUMMY_IMAGE} from '../../utilities/Utils';

const EditUploadedID = ({IDImage, contentStyle, onPress}: any) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    let unmounted = true;
    if (IDImage && unmounted) {
      Storage.get(IDImage).then(setImageUri);
    }
    return () => {
      unmounted = false;
    };
  }, [IDImage]);

  return (
    <View
      style={{
        marginBottom: 50,
        ...contentStyle,
      }}>
      <Text
        style={{
          color: COLORS.Neutral1,
          fontWeight: '500',
          ...FONTS.body3,
        }}>
        Identification Image
      </Text>
      <FastImage
        source={{
          uri: imageUri || DUMMY_IMAGE,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
        style={{
          height: 220,
          width: '100%',
          overflow: 'hidden',
          borderRadius: SIZES.radius,
          marginTop: SIZES.semi_margin,
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
          right: 0,
          bottom: -15,
        }}
        onPress={onPress}>
        <FastImage
          source={icons.edit}
          resizeMode={FastImage.resizeMode.contain}
          tintColor={COLORS.white}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default EditUploadedID;
