import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

const UploadDocs = ({selectFile, title, containerStyle}: any) => {
  return (
    <View
      style={{
        marginTop: SIZES.margin,
        marginHorizontal: SIZES.padding,
        justifyContent: 'space-between',
        flexDirection: 'row',
        ...containerStyle,
      }}>
      <View style={{justifyContent: 'center'}}>
        <Text
          style={{
            ...FONTS.cap1,
            fontWeight: '600',
            color: COLORS.Neutral1,
          }}>
          {title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={selectFile}
        style={{
          justifyContent: 'center',
          padding: SIZES.base,
          backgroundColor: COLORS.white,
          borderWidth: 1,
          borderColor: COLORS.primary1,
          borderRadius: SIZES.radius,
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              tintColor={COLORS.primary1}
              source={icons.clip}
              style={{width: 20, height: 20}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={{marginLeft: 4, justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.h5,
                color: COLORS.primary1,
              }}>
              Browse
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UploadDocs;
