import {View, Text, ImageBackground} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import TextIconButton from '../Button/TextIconButton';
import {bucket, imageHandlerURL} from '../../utilities/Utils';

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
    let isCurrent = true;
    if (banner_image && isCurrent) {
      Storage.get(banner_image).then(setImageUri2);
    }
    return () => {
      isCurrent = false;
    };
  }, [banner_image]);

  useEffect(() => {
    let isCurrent = true;
    if (logo && isCurrent) {
      Storage.get(logo).then(setImageUri);
    }
    return () => {
      isCurrent = false;
    };
  }, [logo]);

  // IMAGE REQUEST
  const uriImage = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${logo}`,
      edits: {
        contentModeration: true,
        resize: {
          width: 80,
          height: 80,
          fit: 'cover',
        },
      },
    });
    const encodedImg = Buffer.from(imageRequest).toString('base64');
    return imageHandlerURL + encodedImg;
  }, [logo, imageUri]);

  // IMAGE REQUEST
  const uriImage2 = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${banner_image}`,
      edits: {
        contentModeration: true,
        resize: {
          width: 400,
          height: 207,
          fit: 'cover',
        },
      },
    });
    const encodedImg = Buffer.from(imageRequest).toString('base64');
    return imageHandlerURL + encodedImg;
  }, [banner_image, imageUri2]);

  return (
    <View>
      <ImageBackground
        source={{uri: uriImage2}}
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
            source={{
              uri: uriImage,
              priority: FastImage.priority.high,
            }}
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
          <Text
            numberOfLines={2}
            style={{...FONTS.body3, color: COLORS.Neutral6}}>
            {address}
          </Text>
        </View>
      </View>

      {/* info buttons */}
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TextIconButton
          label={'About'}
          labelStyle={{color: COLORS.primary1, marginLeft: SIZES.radius}}
          containerStyle={{
            backgroundColor: COLORS.white,
            borderColor: COLORS.primary1,
            borderWidth: 1,
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
