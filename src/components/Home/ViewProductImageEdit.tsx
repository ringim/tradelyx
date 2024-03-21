import {View, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {COLORS, SIZES, icons} from '../../constants';
import {DUMMY_IMAGE, bucket, imageHandlerURL} from '../../utilities/Utils';
import {Product} from '../../API';

interface ProductImage {
  product: Product;
  onPress?: any;
}

const ViewProductImageEdit = ({product, onPress}: ProductImage) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    let unmounted = true;
    if (product?.productImage && unmounted) {
      Storage.get(product?.productImage).then(setImageUri);
    }
    return () => {
      unmounted = false;
    };
  }, [product?.productImage]);

  // IMAGE REQUEST
  const uriImage = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${product?.productImage}`,
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
  }, [product?.productImage, imageUri]);

  return (
    <View style={{marginTop: SIZES.radius}}>
      <FastImage
        source={{
          uri: uriImage || DUMMY_IMAGE,
          priority: FastImage.priority.high,
        }}
        style={{
          height: 180,
          width: 180,
          overflow: 'hidden',
          borderRadius: SIZES.radius,
        }}
      />
      <TouchableOpacity
        onPress={onPress}
        style={{
          padding: SIZES.base,
          top: -15,
          left: 160,
          borderRadius: SIZES.margin,
          backgroundColor: COLORS.NeutralBlue10,
          position: 'absolute',
        }}>
        <FastImage
          source={icons.edit}
          style={{width: 20, height: 20}}
          tintColor={COLORS.primary1}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ViewProductImageEdit;
