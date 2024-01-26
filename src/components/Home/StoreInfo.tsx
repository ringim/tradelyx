import {View, Text} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {SIZES, FONTS, icons, COLORS} from '../../constants';
import TextButton from '../Button/TextButton';
import {DUMMY_IMAGE, bucket, imageHandlerURL} from '../../utilities/Utils';

const StoreInfo = ({
  address,
  supplier,
  locationStyle,
  supplierStyle,
  image,
  logoStyle,
  onPress,
  showDetail,
  addressStyle,
}: any) => {
  const [imageUri2, setImageUri2] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;
    if (image && isCurrent) {
      Storage.get(image).then(setImageUri2);
    }
    return () => {
      isCurrent = false;
    };
  }, [image]);

  // IMAGE REQUEST
  const uriImage = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${image}`,
      edits: {
        contentModeration: true,
        resize: {
          width: 50,
          height: 50,
          fit: 'cover',
        },
      },
    });
    const encodedImg = Buffer.from(imageRequest).toString('base64');
    return imageHandlerURL + encodedImg;
  }, [image, imageUri2]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: SIZES.semi_margin,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        marginTop: SIZES.margin,
        marginHorizontal: SIZES.radius,
      }}>
      <View
        style={{
          justifyContent: 'center',
        }}>
        <FastImage
          source={{
            uri: uriImage || DUMMY_IMAGE,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
          style={{
            width: 50,
            height: 50,
            borderRadius: SIZES.base,
            ...logoStyle,
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          marginLeft: SIZES.base,
          justifyContent: 'center',
        }}>
        <Text
          numberOfLines={2}
          style={{...FONTS.h4, color: COLORS.Neutral1, ...supplierStyle}}>
          {supplier}
        </Text>

        <View
          style={{
            alignItems: 'center',
            marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              tintColor={COLORS.Neutral6}
              resizeMode={FastImage.resizeMode.contain}
              source={icons.location}
              style={{
                width: 18,
                height: 18,
                ...locationStyle,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 2,
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.cap1,
                color: COLORS.Neutral6,
                textTransform: 'capitalize',
                ...addressStyle,
              }}>
              {address}
            </Text>
          </View>
        </View>
      </View>

      {showDetail && (
        <View style={{justifyContent: 'center'}}>
          <TextButton
            buttonContainerStyle={{
              height: 40,
              width: 76,
              justifyContent: 'center',
              marginTop: 0,
              backgroundColor: COLORS.white,
              borderWidth: 1,
              borderColor: COLORS.primary1,
              borderRadius: SIZES.base,
            }}
            label="Detail"
            labelStyle={{...FONTS.h4, color: COLORS.primary1}}
            onPress={onPress}
          />
        </View>
      )}
    </View>
  );
};

export default StoreInfo;
