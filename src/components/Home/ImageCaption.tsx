import {View, Text, ImageBackground} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {bucket, imageHandlerURL} from '../../utilities/Utils';

const ImageCaption = ({rating, name, commodityCategory, banner_image}: any) => {
  const [imageUri2, setImageUri2] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;
    if (banner_image && isCurrent) {
      Storage.get(banner_image).then(setImageUri2);
    }
    return () => {
      isCurrent = false;
    };
  }, [banner_image]);

  // IMAGE REQUEST
  const uriImage = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${banner_image}`,
      edits: {
        contentModeration: true,
        resize: {
          height: 450,
          width: SIZES.width - SIZES.padding * 1.3,
          fit: 'cover',
        },
      },
    });
    const encodedImg = Buffer.from(imageRequest).toString('base64');
    return imageHandlerURL + encodedImg;
  }, [banner_image, imageUri2]);

  return (
    <ImageBackground
      source={{
        uri: uriImage,
      }}
      resizeMode="cover"
      imageStyle={{borderRadius: SIZES.semi_margin}}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        marginHorizontal: SIZES.semi_margin,
        marginBottom: SIZES.margin,
        height: 450,
        width: SIZES.width - SIZES.padding * 1.3,
      }}>
      <View
        style={{
          alignSelf: 'auto',
          top: 320,
          marginLeft: SIZES.radius,
          backgroundColor: COLORS.transparentNeutral12,
          padding: SIZES.semi_margin,
          borderRadius: SIZES.base,
          width: '93%',
          opacity: 0.8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              source={icons.category}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={COLORS.primary5}
              style={{width: 20, height: 20}}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              paddingLeft: 4,
            }}>
            <Text
              style={{...FONTS.body3, fontWeight: '600', color: COLORS.white}}>
              {commodityCategory}
            </Text>
          </View>

          <View style={{paddingLeft: SIZES.base, justifyContent: 'center'}}>
            <FastImage
              source={icons.dot}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={COLORS.white}
              style={{width: 6, height: 6, top: 1}}
            />
          </View>

          <View style={{paddingLeft: SIZES.base, justifyContent: 'center'}}>
            <FastImage
              source={icons.rate}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={COLORS.secondary1}
              style={{width: 20, height: 20}}
            />
          </View>

          <View
            style={{
              flex: 1,
              paddingLeft: 2,
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body2, fontWeight: 'bold', color: COLORS.white}}>
              {rating}
            </Text>
          </View>
        </View>

        {/* Product Title */}
        <View style={{marginTop: 5}}>
          <Text numberOfLines={2} style={{...FONTS.h5, color: COLORS.white}}>
            {name}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ImageCaption;
