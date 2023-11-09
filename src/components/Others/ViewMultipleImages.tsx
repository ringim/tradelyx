import React, {useEffect, useRef, useState} from 'react';
import ImageModal, {ImageDetail} from 'react-native-image-modal';
import {Storage} from 'aws-amplify';
import {View} from 'react-native';

import {SIZES, COLORS} from '../../constants';
import {DUMMY_IMAGE} from '../../utilities/Utils';

interface ProductImage {
  images: string;
  onPress?: any;
  index?: any;
}

const ViewMultipleImages = ({images, index}: ProductImage) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const element = useRef<ImageDetail>(null);

  useEffect(() => {
    let unmounted = true;
    if (images && unmounted) {
      Storage.get(images).then(setImageUri);
    }
    return () => {
      unmounted = false;
    };
  }, [images]);

  return (
    <View
      style={{
        width: 120,
        height: 120,
        marginLeft: index == 0 ? 2 : 15,
        marginRight: index == images.length - 1 ? SIZES.padding : 0,
        marginTop: SIZES.radius,
        borderWidth: 0.5,
        borderColor: COLORS.Neutral7,
        borderRadius: SIZES.base,
      }}>
      <ImageModal
        resizeMode="cover"
        imageBackgroundColor={COLORS.white}
        isTranslucent={false}
        swipeToDismiss={false}
        modalRef={element}
        style={{
          width: 120,
          height: 120,
          borderRadius: SIZES.base,
        }}
        source={{
          uri: imageUri || DUMMY_IMAGE,
        }}
        onOpen={() => {
          setTimeout(() => {
            element.current?.close();
          }, 10000);
        }}
      />
    </View>
  );
};

export default ViewMultipleImages;
