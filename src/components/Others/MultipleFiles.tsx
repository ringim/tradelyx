import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

const MultipleFiles = ({data, containerStyle}: any) => {
  return (
    <View
      style={{
        marginTop: data ? SIZES.base : SIZES.radius,
      }}>
      <FlatList
        data={data}
        keyExtractor={(item: any) => `${item}`}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={({item, index}) => {
          return (
            <View
              key={index}
              style={{
                marginTop: SIZES.radius,
                flexDirection: 'row',
                justifyContent: 'space-between',
                ...containerStyle,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <FastImage
                  tintColor={COLORS.secondary1}
                  source={icons.summary} 
                  style={{width: 20, height: 20}}
                />
              </View>

              {/* file name and date of upload */}
              <View
                style={{
                  flex: 1,
                  marginLeft: SIZES.base,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{...FONTS.cap1, fontWeight: '600', color: COLORS.primary1}}
                  numberOfLines={2}>
                  {item}
                </Text>
              </View>
            </View>
          );
        }}
        ListFooterComponent={
          <View style={{marginBottom: data?.length - SIZES.semi_margin}} />
        }
      />
    </View>
  );
};

export default MultipleFiles;
