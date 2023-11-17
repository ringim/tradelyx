import {View, Text, Linking} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';
import {Storage} from 'aws-amplify';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {COLORS, SIZES, FONTS, icons} from '../../constants';
import TextButton from '../Button/TextButton';
import {TouchableOpacity} from 'react-native';

const ShowDocs = ({
  file,
  title,
  showEdit,
  onPress,
  buttonStyle,
  contentStyle,
  icon
}: any) => {
  // DOWNLOAD & OPEN PDF FILE
  const downloadAndOpenPdf = async (item: any) => {
    try {
      const pdfKey = item; // Replace with your S3 PDF file key
      const url = await Storage.get(pdfKey);
      // console.log('file download', url);

      // Open the PDF file using the device's default viewer
      Linking.openURL(url);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: 'Error downloading or opening PDF!',
        autoClose: 2000,
      });
    }
  };

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
          renderItem={({item, index}) => (
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
