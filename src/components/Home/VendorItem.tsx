import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {DUMMY_IMAGE, bucket, imageHandlerURL} from '../../utilities/Utils';

interface IItem {
  item: string | any;
  onPress: any;
  containerStyle?: any;
  store_image?: any;
}

const VendorItem = ({containerStyle, item, store_image, onPress}: IItem) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;
    if (store_image && isCurrent) {
      Storage.get(store_image).then(setImageUri);
    }
    return () => {
      isCurrent = false;
    };
  }, [store_image]);

  // IMAGE REQUEST
  const uriImage = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${store_image}`,
      edits: {
        contentModeration: true,
        resize: {
          width: 120,
          height: 120,
          fit: 'cover',
        },
      },
    });
    const encodedImg = Buffer.from(imageRequest).toString('base64');
    return imageHandlerURL + encodedImg;
  }, [store_image, imageUri]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: SIZES.semi_margin,
        // padding: 17,
        paddingHorizontal: 14,
        marginTop: 5,
        paddingBottom: SIZES.semi_margin,
        ...containerStyle,
      }}>
      <View
        style={{
          borderRadius: SIZES.radius,
        }}>
        <FastImage
          source={{
            uri: uriImage || DUMMY_IMAGE,
            priority: FastImage.priority.high,
          }}
          style={{
            width: 120,
            height: 120,
            borderRadius: SIZES.radius,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      {/* Supplier Name, */}
      <View
        style={{
          marginTop: SIZES.base,
        }}>
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.cap1,
            fontWeight: '700',
            color: COLORS.Neutral1,
            maxWidth: 100,
          }}>
          {item?.title}
        </Text>
      </View>

      {/* Supplier address, */}
      <View
        style={{
          marginTop: 6,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <FastImage
            tintColor={COLORS.Neutral6}
            resizeMode={FastImage.resizeMode.contain}
            source={icons.location}
            style={{
              width: 16,
              height: 16,
            }}
          />
        </View>
        <View style={{flex: 1, paddingLeft: 4, justifyContent: 'center'}}>
          <Text
            numberOfLines={1}
            style={{
              ...FONTS.cap2,
              color: COLORS.Neutral6,
              textTransform: 'capitalize',
            }}>
            {item?.city}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VendorItem;
