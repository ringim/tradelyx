import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES} from '../../constants';
import {DUMMY_IMAGE, bucket, imageHandlerURL} from '../../utilities/Utils';

interface IItem {
  item: string | any;
  onPress?: any;
  containerStyle?: any;
  profile_image: any;
}

const SellerItem = ({containerStyle, profile_image, item, onPress}: IItem) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;
    if (profile_image && isCurrent) {
      Storage.get(profile_image).then(setImageUri);
    }
    return () => {
      isCurrent = false;
    };
  }, [profile_image]);

  // IMAGE REQUEST
  const uriImage = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${profile_image}`,
      edits: {
        contentModeration: true,
        resize: {
          width: 100,
          height: 80,
          fit: 'cover',
        },
      },
    });
    const encodedImg = Buffer.from(imageRequest).toString('base64');
    return imageHandlerURL + encodedImg;
  }, [profile_image, imageUri]);

  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.semi_margin,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        borderWidth: 0.2,
        padding: SIZES.radius,
        borderColor: COLORS.Neutral7,
        ...containerStyle,
      }}
      onPress={onPress}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {/* Main image */}
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={{
              uri: uriImage || DUMMY_IMAGE,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: 100,
              height: 80,
              borderRadius: SIZES.radius,
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: 'center',
            padding: 3,
            paddingStart: 0,
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.body3, color: COLORS.Neutral1}}>
              {item?.title}
            </Text>
          </View>
          {/* Product title, */}
          <View style={{justifyContent: 'center'}}>
            <Text
              numberOfLines={2}
              style={{...FONTS.h5, color: COLORS.Neutral1, lineHeight: 24}}>
              {item?.city}
              {', '}
              {item?.country}
            </Text>
          </View>

          {/* Business Overview */}
          <View style={{justifyContent: 'center', marginTop: SIZES.base}}>
            <Text
              numberOfLines={2}
              style={{...FONTS.cap1, color: COLORS.Neutral5}}>
              {item?.overview}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SellerItem;
