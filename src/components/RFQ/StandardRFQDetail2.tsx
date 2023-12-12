import {View, Text, Linking, FlatList} from 'react-native';
import React from 'react';
import {Storage} from 'aws-amplify';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import TextButton from '../Button/TextButton';
import {COLORS, SIZES, FONTS} from '../../constants';

const StandardRFQDetail2 = ({onPress, documents, requestCategory}: any) => {
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
        textBody: 'Error downloading PDF!',
        autoClose: 2000,
      });
    }
  };

  return (
    <Root>
      <View>
        {/* Category */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.Neutral6,
              }}>
              Product Category
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...FONTS.cap1,
                color: COLORS.Neutral1,
              }}>
              {requestCategory}
            </Text>
          </View>
        </View>

        {/* support Doc */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.semi_margin,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
              Supporting Document:
            </Text>
          </View>

          {documents?.length === 0 && (
            <View style={{justifyContent: 'center', marginTop: 6}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>
                No attached document
              </Text>
            </View>
          )}

          <FlatList
            data={documents}
            keyExtractor={item => `${item}`}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({item, index}) => {
              return (
                <View
                  key={index}
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 6,
                  }}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text
                      numberOfLines={2}
                      style={{
                        ...FONTS.cap1,
                        color: COLORS.secondary1,
                        fontWeight: '500',
                      }}>
                      {item}
                    </Text>
                  </View>
                  <View style={{flex: 0, justifyContent: 'center'}}>
                    <TextButton
                      label={'View'}
                      onPress={() => downloadAndOpenPdf(item)}
                      labelStyle={{color: COLORS.primary1, ...FONTS.h5}}
                      buttonContainerStyle={{
                        marginTop: 0,
                        marginLeft: SIZES.radius,
                        alignSelf: 'flex-end',
                        backgroundColor: COLORS.white,
                        borderRadius: SIZES.base,
                        borderWidth: 1,
                        borderColor: COLORS.primary1,
                        width: 70,
                        height: 30,
                      }}
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>

        <TextButton
          label={'Contact'}
          onPress={onPress}
          buttonContainerStyle={{
            marginTop: SIZES.padding * 2,
            borderRadius: SIZES.base,
            width: 300,
            height: 45,
          }}
        />
      </View>
    </Root>
  );
};

export default StandardRFQDetail2;
