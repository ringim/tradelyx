import {View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ImageModal, {ImageDetail} from 'react-native-image-modal';
import {Storage} from 'aws-amplify';

import {DUMMY_IMAGE} from '../../utilities/Utils';
import {COLORS, SIZES} from '../../constants';

const SOImage = ({image, index, containerStyle}: any) => {
  const [imageUri2, setImageUri2] = useState<string | null>(null);

  const element = useRef<ImageDetail>(null);

  useEffect(() => {
    let isCurrent = true;
    if (image && isCurrent) {
      Storage.get(image).then(setImageUri2);
    }
    return () => {
      isCurrent = false;
    };
  }, [image]);

  return (
    <View
      style={{
        marginLeft: index == 0 ? 2 : 8,
        marginRight: index == image?.length - 1 ? SIZES.padding : 0,
        marginTop: SIZES.radius,
        ...containerStyle,
      }}>
      <ImageModal
        resizeMode="cover"
        imageBackgroundColor={COLORS.white}
        isTranslucent={false}
        swipeToDismiss={false}
        modalRef={element}
        style={{
          width: 150,
          height: 150,
          borderRadius: SIZES.base,
        }}
        source={{
          uri: imageUri2 || DUMMY_IMAGE,
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

export default SOImage;
