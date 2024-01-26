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
            ...FONTS.body3,
            fontWeight: '500',
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
          borderWidth: 2,
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
              style={{width: 24, height: 24}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
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
