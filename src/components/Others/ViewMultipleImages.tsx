import React, {useEffect, useMemo, useRef, useState} from 'react';
import ImageModal, {ImageDetail} from 'react-native-image-modal';
import {Storage} from 'aws-amplify';
import {View} from 'react-native';

import {SIZES, COLORS} from '../../constants';
import {DUMMY_IMAGE, bucket, imageHandlerURL} from '../../utilities/Utils';

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

  // IMAGE REQUEST
  const uriImage = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${images}`,
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
  }, [images, imageUri]);

  return (
    <View
      style={{
        width: 120,
        height: 120,
        marginLeft: index == 0 ? 2 : 15,
        marginRight: index == images.length - 1 ? SIZES.padding : 0,
        marginTop: SIZES.radius,
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
          uri: uriImage || DUMMY_IMAGE,
          priority: 'high'
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
