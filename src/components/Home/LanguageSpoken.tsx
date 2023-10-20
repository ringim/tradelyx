import {View, Text} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React from 'react';

import {COLORS, FONTS, SIZES} from '../../constants';

const LanguageSpoken = ({containerStyle, language}: any) => {
  return (
    <FlatList
      data={language}
      keyExtractor={item => `${item?.id}`}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => (
        <View
          key={index}
          style={{
            backgroundColor: COLORS.white,
            paddingBottom: 3,
            ...containerStyle,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text
                numberOfLines={2}
                style={{
                  ...FONTS.body3,
                  fontWeight: 'bold',
                  color: COLORS.Neutral1,
                }}>
                {item?.id}.
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: SIZES.base,
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={2}
                style={{
                  ...FONTS.body3,
                  fontWeight: 'bold',
                  color: COLORS.Neutral1,
                }}>
                {item?.lang}
              </Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default LanguageSpoken;
