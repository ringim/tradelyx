import {View} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import ImageModal, {ImageDetail} from 'react-native-image-modal';
import {Storage} from 'aws-amplify';

import {DUMMY_IMAGE, bucket, imageHandlerURL} from '../../utilities/Utils';
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

  // IMAGE REQUEST
  const uriImage = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${image}`,
      edits: {
        contentModeration: true,
        resize: {
          width: 150,
          height: 150,
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
        marginLeft: index == 0 ? 2 : 8,
        marginRight: index == image?.length - 1 ? SIZES.padding : 0,
        marginTop: SIZES.radius,
        ...containerStyle,
      }}>
      <ImageModal
        resizeMode="contain"
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

export default SOImage;
