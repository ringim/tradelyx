import {View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {COLORS, SIZES, icons} from '../../constants';
import {DUMMY_IMAGE} from '../../utilities/Utils';
import {Product} from '../../API';

interface ProductImage {
  product: Product | any;
  onPress?: any;
  contentStyle?: any;
  showEdit: boolean;
}

const SingleImage = ({
  product,
  showEdit,
  contentStyle,
  onPress,
}: ProductImage) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    let unmounted = true;
    if (product?.image && unmounted) {
      Storage.get(product?.image).then(setImageUri);
    }
    return () => {
      unmounted = false;
    };
  }, [product?.image]);

  return (
    <View
      style={{
        marginTop: imageUri ? SIZES.padding * 1.4 : SIZES.radius,
        ...contentStyle,
      }}>
      <View
        style={{
          width: 120,
          height: 120,
          marginLeft: SIZES.base,
        }}>
        <FastImage
          source={{
            uri: imageUri || DUMMY_IMAGE,
            priority: FastImage.priority.high,
          }}
          style={{
            width: 120,
            height: 120,
            borderRadius: SIZES.base,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        {showEdit && (
          <TouchableOpacity
            onPress={onPress}
            style={{
              padding: 8,
              top: -18,
              right: -10,
              borderRadius: SIZES.margin,
              backgroundColor: COLORS.primary1,
              position: 'absolute',
            }}>
            <FastImage
              source={icons.edit}
              style={{width: 17, height: 17}}
              tintColor={COLORS.white}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SingleImage;
