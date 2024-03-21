import {View, Text, Linking, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';

import {COLORS, SIZES, FONTS, icons} from '../../constants';
import TextButton from '../Button/TextButton';

const ShowFiles = ({
  file,
  title,
  showEdit,
  onPress,
  buttonStyle,
  contentStyle,
}: any) => {
  return (
    <View style={{marginTop: 0, ...contentStyle}}>
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
          <View key={index} style={{marginTop: SIZES.radius}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: COLORS.white,
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
            </View>
          </View>
        )}
      />

      {showEdit && (
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
            marginTop: SIZES.semi_margin,
            backgroundColor: COLORS.white,
            ...buttonStyle,
          }}
          onPress={onPress}
        />
      )}
    </View>
  );
};

export default ShowFiles;
