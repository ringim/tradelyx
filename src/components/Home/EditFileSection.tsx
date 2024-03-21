import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';

import {COLORS, SIZES, FONTS, icons} from '../../constants';

const EditFileSection = ({
  file,
  title,
  onPress,
  setSingleFile,
  contentStyle,
}: any) => {
  // Delete a single image
  const deleteItem2 = (itemId: any) => {
    setSingleFile((prevData: any) =>
      prevData.filter((item: any) => item.uri !== itemId),
    );
  };

  return (
    <View style={{marginTop: SIZES.radius, ...contentStyle}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: SIZES.base,
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              color: COLORS.Neutral1,
            }}>
            {title}
          </Text>
        </View>

        <TouchableOpacity
          onPress={onPress}
          style={{marginRight: SIZES.base, justifyContent: 'center'}}>
          <FastImage
            tintColor={COLORS.primary1}
            source={icons.upload}
            style={{width: 24, height: 24}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={file}
        keyExtractor={item => item.uri}
        renderItem={({item, index}) => (
          <View key={index} style={{marginTop: SIZES.radius}}>
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

export default EditFileSection;
