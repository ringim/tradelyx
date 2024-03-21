import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';
import {Root} from 'react-native-alert-notification';

import {COLORS, SIZES, FONTS, icons} from '../../constants';
import TextButton from '../Button/TextButton';
import {TouchableOpacity} from 'react-native';
import {downloadAndOpenPdf} from '../../utilities/service';

const ShowDocs = ({
  file,
  title,
  showEdit,
  onPress,
  buttonStyle,
  contentStyle,
  icon,
}: any) => {
  return (
    <Root>
      <View style={{marginTop: SIZES.radius, ...contentStyle}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              source={icon}
              tintColor={COLORS.secondary1}
              resizeMode={FastImage.resizeMode.cover}
              style={{width: 24, height: 24}}
            />
          </View>

          <View
            style={{
              flex: 1,
              marginLeft: SIZES.radius,
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>{title}</Text>
          </View>
        </View>

        <FlatList
          data={file}
          keyExtractor={item => item}
          renderItem={({item, index}) => {
            return (
              <View key={index} style={{marginTop: SIZES.margin}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: COLORS.white,
                    paddingHorizontal: SIZES.base,
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
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      marginLeft: SIZES.base,
                      justifyContent: 'center',
                    }}
                    onPress={() => downloadAndOpenPdf(item)}>
                    <Text
                      style={{
                        ...FONTS.cap1,
                        fontWeight: '500',
                        color: COLORS.primary1,
                      }}
                      numberOfLines={2}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
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
              marginTop: SIZES.base,
              backgroundColor: COLORS.white,
              ...buttonStyle,
            }}
            onPress={onPress}
          />
        )}
      </View>
    </Root>
  );
};

export default ShowDocs;
