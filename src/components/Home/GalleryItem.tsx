import {View} from 'react-native';
import ImageModal, {ImageDetail} from 'react-native-image-modal';
import React, {useEffect, useRef, useState} from 'react';
import {Storage} from 'aws-amplify';

import {COLORS, SIZES} from '../../constants';
import {DUMMY_IMAGE} from '../../utilities/Utils';

const GalleryItem = ({images, containerStyle}: any) => {
  const element = useRef<ImageDetail>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);

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
    <View style={{...containerStyle, marginLeft: SIZES.radius}}>
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

export default GalleryItem;
