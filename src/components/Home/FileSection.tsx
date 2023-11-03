import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';

import {COLORS, SIZES, FONTS, icons} from '../../constants';

const FileSection = ({file, setSingleFile, contentStyle}: any) => {
  // Delete a single image
  const deleteItem2 = (itemId: any) => {
    setSingleFile((prevData: any) =>
      prevData.filter((item: any) => item.uri !== itemId),
    );
  };

  return (
    <View style={{marginTop: SIZES.radius, ...contentStyle}}>
      <Text
        style={{
          ...FONTS.body3,
          fontWeight: '500',
          color: COLORS.Neutral1,
        }}>
        Product Brochure
      </Text>

      <FlatList
        data={file}
        keyExtractor={item => item.uri}
        renderItem={({item}) => (
          <View style={{marginTop: SIZES.semi_margin}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: COLORS.white,
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
                  style={{...FONTS.h5, color: COLORS.primary1}}
                  numberOfLines={2}>
                  {item?.name}
                </Text>
              </View>

              {/* delete file */}
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  marginRight: SIZES.base,
                }}
                onPress={() => deleteItem2(item?.uri)}>
                <FastImage
                  tintColor={COLORS.Rose4}
                  source={icons.remove}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default FileSection;
