import {View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React from 'react';

import {COLORS, FONTS, SIZES} from '../../constants';

const LanguageSpoken = ({containerStyle, languages}: any) => {
  return (
    <FlatList
      data={languages}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      renderItem={({item, index}) => (
        <View
          key={index}
          style={{
            backgroundColor: COLORS.white,
            paddingBottom: 2,
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
                  top: 3,
                }}>
                {item}
              </Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default LanguageSpoken;
