import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';

import {COLORS, SIZES, FONTS, icons} from '../../constants';
import TextButton from '../Button/TextButton';

const ShowFiles = ({file, title, onPress, buttonStyle, contentStyle}: any) => {
  return (
    <View style={{marginTop: SIZES.radius, ...contentStyle}}>
      <Text
        style={{
          ...FONTS.body3,
          fontWeight: '500',
          color: COLORS.Neutral1,
          marginBottom: 5,
        }}>
        {title}
      </Text>

      <FlatList
        data={file}
        keyExtractor={item => item}
        renderItem={({item, index}) => (
          <View key={index} style={{marginTop: SIZES.base}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: COLORS.white,
                paddingHorizontal: SIZES.base,
                paddingVertical: SIZES.radius,
                borderRadius: SIZES.base,
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
                  style={{
                    ...FONTS.cap1,
                    fontWeight: '500',
                    color: COLORS.primary1,
                  }}
                  numberOfLines={2}>
                  {item}
                </Text>
              </View>

              {/* upload file */}
              {/* <TouchableOpacity
                style={{
                  justifyContent: 'center',
                }}
                onPress={onPress}>
                <FastImage
                  tintColor={COLORS.Rose4}
                  source={icons.remove}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity> */}
            </View>
          </View>
        )}
      />

      <TextButton
        label={'Edit Docs'}
        labelStyle={{
          ...FONTS.body3,
          fontWeight: 'bold',
          color: COLORS.primary1,
        }}
        buttonContainerStyle={{
          alignSelf: 'flex-start',
          width: 120,
          height: 35,
          borderRadius: SIZES.base,
          borderWidth: 1,
          borderColor: COLORS.primary1,
          marginTop: SIZES.base,
          backgroundColor: COLORS.white,
          ...buttonStyle,
        }}
        onPress={onPress}
      />
    </View>
  );
};

export default ShowFiles;
