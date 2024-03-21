import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';

import {COLORS, SIZES, FONTS, icons} from '../../constants';

const FileSection = ({file, setSingleFile, title, contentStyle}: any) => {
  // Delete a single file
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
          marginBottom: 5,
        }}>
        {title}
      </Text>

      <FlatList
        data={file}
        keyExtractor={item => `${item}`}
        scrollEnabled={false}
        renderItem={({item, index}) => (
          <View key={index} style={{marginTop: SIZES.base}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: COLORS.white,
                paddingVertical: SIZES.base,
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
                  numberOfLines={1}>
                  {item?.name}
                </Text>
              </View>

              {/* delete file */}
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
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
