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
  contentStyle,
  key
}: any) => {
  return (
    <View style={{marginTop: SIZES.semi_margin, ...contentStyle}}>
      <Text
        style={{
          color: COLORS.Neutral1,
          ...FONTS.body3,
        }}>
        {/* Tags or Keywords */}
        {title}
      </Text>

      <View
        style={{
          flex: 1,
          marginTop: 10,
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
            placeholder: 'Add any type of item e.g. vegetables, agriculture',
          }}
          inputStyle={{
            backgroundColor: COLORS.white,
            color: COLORS.black,
            ...FONTS.body3,
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
