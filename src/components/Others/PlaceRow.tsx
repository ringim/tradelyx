import React from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

import {FONTS, icons, COLORS, SIZES} from '../../constants';

const PlaceRow = ({data}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZES.base,
      }}>
      <View style={{justifyContent: 'center'}}>
        {data.description && (
          <FastImage
            source={icons.location}
            resizeMode={FastImage.resizeMode.contain}
            tintColor={COLORS.primary1}
            style={{
              width: 20,
              height: 20,
              left: -15,
            }}
          />
        )}
      </View>

      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text
          style={{
            ...FONTS.h5,
            color: COLORS.Neutral1,
          }}>
          {data.description || data.vicinity}
        </Text>

        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.Neutral1,
            paddingTop: 3,
          }}>
          {data?.structured_formatting?.secondary_text}
        </Text>
      </View>
    </View>
  );
};

export default PlaceRow;
