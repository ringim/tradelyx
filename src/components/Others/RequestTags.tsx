import {View, Text} from 'react-native';
import React from 'react';
import Tags from 'react-native-tags';

import {COLORS, FONTS, SIZES} from '../../constants';

const RequestTags = ({
  onChangeTags,
  initialTags,
  onTagPress,
  title,
  renderTag,
  placeholderText,
  contentStyle,
  key
}: any) => {
  return (
    <View style={{marginTop: SIZES.semi_margin, ...contentStyle}}>
      <Text
        style={{
          color: COLORS.Neutral1,
          ...FONTS.cap1,
          fontWeight: '600'
        }}>
        {/* Tags or Keywords */}
        {title}
      </Text>

      <View
        style={{
          flex: 1,
          marginTop: 5,
          borderWidth: 0.5,
          borderColor: COLORS.Neutral7,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
        }}>
        <Tags
          key={key}
          containerStyle={{
            margin: 4,
            borderRadius: SIZES.base,
            justifyContent: 'flex-start',
          }}
          initialText={''}
          textInputProps={{
            placeholderTextColor: COLORS.Neutral7,
            placeholder: placeholderText,
          }}
          inputStyle={{
            backgroundColor: COLORS.white,
            color: COLORS.black,
            ...FONTS.cap1,
          }}
          initialTags={initialTags}
          onChangeTags={onChangeTags}
          onTagPress={onTagPress}
          renderTag={renderTag}
        />
      </View>
    </View>
  );
};

export default RequestTags;
