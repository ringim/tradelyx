import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

const UploadID = ({onScanPress, title, containerStyle}: any) => {
  return (
    <View style={{...containerStyle}}>
      <Text
        style={{
          color: COLORS.Neutral1,
          fontWeight: '500',
          ...FONTS.body3,
        }}>
        {title}
      </Text>
      <Text style={{...FONTS.cap1, color: COLORS.gray, paddingTop: 4}}>
        Supported formats: Only .pdf file format.
      </Text>

      <TouchableOpacity
        style={{
          marginTop: SIZES.radius,
          justifyContent: 'center',
          width: 50,
          height: 50,
          borderRadius: SIZES.base,
          backgroundColor: COLORS.primary2,
          alignItems: 'center',
        }}
        onPress={onScanPress}>
        <FastImage
          source={icons.upload}
          style={{width: 25, height: 25}}
          resizeMode={FastImage.resizeMode.contain}
          tintColor={COLORS.white}
        />
      </TouchableOpacity>
    </View>
  );
};

export default UploadID;
