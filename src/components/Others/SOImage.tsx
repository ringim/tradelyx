import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Storage} from 'aws-amplify';
import FastImage from 'react-native-fast-image';

import {DUMMY_IMAGE} from '../../utilities/Utils';
import {SIZES} from '../../constants';

const SOImage = ({image, index}: any) => {
  const [imageUri2, setImageUri2] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      Storage.get(image).then(setImageUri2);
    }
  }, [image]);

  return (
    <View
      style={{
        width: 100,
        height: 100,
        marginLeft: index == 0 ? 2 : 15,
        marginRight: index == image.length - 1 ? SIZES.padding : 0,
        marginTop: SIZES.radius,
      }}>
      <FastImage
        source={{uri: imageUri2 || DUMMY_IMAGE}}
        style={{
          width: 100,
          height: 100,
          borderRadius: SIZES.base,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
};

export default SOImage;
