import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, icons, SIZES } from '../../constants';

const OneImage = ({setSelectedPhoto, selectedPhoto}:any) => {
  return (
    <View
      style={{
        marginTop: selectedPhoto ? SIZES.padding * 1.4 : SIZES.radius,
      }}>
      <View
        style={{
          width: 150,
          height: 150,
          marginLeft: SIZES.base,
        }}>
        <FastImage
          source={{uri: selectedPhoto}}
          style={{
            width: 150,
            height: 150,
            borderRadius: SIZES.base,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <TouchableOpacity
          onPress={() => setSelectedPhoto(null)}
          style={{
            padding: 8,
            top: -18,
            right: -10,
            borderRadius: SIZES.margin,
            backgroundColor: COLORS.NeutralBlue9,
            position: 'absolute',
          }}>
          <FastImage
            source={icons.remove}
            style={{width: 17, height: 17}}
            tintColor={COLORS.Rose5}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OneImage;
