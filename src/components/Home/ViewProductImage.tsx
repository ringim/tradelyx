import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, icons} from '../../constants';

const ViewProductImage = ({setSelectedPhoto, selectedPhoto}: any) => {
  return (
    <View style={{marginTop: SIZES.radius}}>
      <FastImage
        source={{uri: selectedPhoto.uri, priority: FastImage.priority.high}}
        style={{
          height: 200,
          width: 200,
          overflow: 'hidden',
          borderRadius: SIZES.radius,
        }}
      />
      <TouchableOpacity
        onPress={() => setSelectedPhoto(null)}
        style={{
          padding: SIZES.base,
          top: -18,
          left: 180,
          borderRadius: SIZES.margin,
          backgroundColor: COLORS.NeutralBlue10,
          position: 'absolute',
        }}>
        <FastImage
          source={icons.remove}
          style={{width: 20, height: 20}}
          tintColor={COLORS.Rose5}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ViewProductImage;
