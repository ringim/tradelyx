import {View, Text, ImageBackground, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {DEFAULT_BANNER_IMAGE} from '../../utilities/Utils';

const ImageCaption = ({
  productItem,
  name,
  commodityCategory,
  banner_image,
}: any) => {
  
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

  return (
    <ImageBackground
      source={{uri: imageUri2 || DEFAULT_BANNER_IMAGE}}
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
          alignSelf: 'flex-start',
          top: 350,
          marginLeft: SIZES.radius,
          backgroundColor: COLORS.transparentNeutral12,
          padding: SIZES.radius,
          borderRadius: SIZES.base,
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
              tintColor={COLORS.white}
              style={{width: 20, height: 20}}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              marginLeft: SIZES.base,
            }}>
            <Text
              style={{...FONTS.cap1, fontWeight: '600', color: COLORS.white}}>
              {commodityCategory}
            </Text>
          </View>

          <View style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
            <FastImage
              source={icons.dot}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={COLORS.white}
              style={{width: 6, height: 6}}
            />
          </View>

          <View style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
            <FastImage
              source={icons.rate}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={COLORS.white}
              style={{width: 20, height: 20}}
            />
          </View>

          <View
            style={{
              marginLeft: 4,
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body2, fontWeight: '500', color: COLORS.white}}>
              {productItem?.rating || 0}
            </Text>
          </View>
        </View>

        {/* Product Name */}
        <View style={{marginTop: 5}}>
          <Text numberOfLines={2} style={{...FONTS.h3, color: COLORS.white}}>
            {name}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ImageCaption;
