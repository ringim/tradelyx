import {View, Text, TouchableOpacity, Linking, FlatList} from 'react-native';
import React from 'react';
import {Storage} from 'aws-amplify';
import {useNavigation, useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {ScrollView} from 'react-native-gesture-handler';

import {COLORS, SIZES, icons, FONTS} from '../../../constants';
import {Header, TextButton} from '../../../components';
import {
  ExploreStackNavigatorParamList,
  StandardDomesticRFQDetailRouteProp,
} from '../../../components/navigation/SellerNav/type/navigation';

const StandardDomesticRFQDetail = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();
  const route: any = useRoute<StandardDomesticRFQDetailRouteProp>();

  const {
    placeOriginFlag,
    incoterms,
    rfqNo,
    description,
    documents,
    title,
    countryName,
    requestCategory,
    city,
  }: any = route?.params?.rfqItem;

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
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'RFQ Detail'} tintColor={COLORS.Neutral1} />

        <ScrollView
          style={{marginHorizontal: 5}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: SIZES.base,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: SIZES.semi_margin,
            }}>
            {/* Buyer Country Name */}
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
                Buyer from
              </Text>
            </View>

            {/* Buyer from */}
            <View
              style={{
                justifyContent: 'center',
              }}>
              <FastImage
                source={{uri: placeOriginFlag}}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: 23,
                  height: 23,
                }}
              />
            </View>

            <View
              style={{
                justifyContent: 'center',
                padding: SIZES.base,
                borderRadius: SIZES.radius,
              }}>
              <Text
                style={{
                  ...FONTS.h5,
                  color: COLORS.Neutral1,
                }}>
                {city}
                {', '}
                {countryName}
              </Text>
            </View>
          </View>

          {/* RFQ Number */}
          <View
            style={{
              marginTop: SIZES.radius,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: SIZES.semi_margin,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
                RFQ No
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  ...FONTS.h5,
                  color: COLORS.Neutral1,
                }}>
                {rfqNo}
              </Text>
            </View>

            {/* Copy icon */}
            <TouchableOpacity
              style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                source={icons.copy}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
          </View>

          {/* Horizontal Rule */}
          <View
            style={{
              alignSelf: 'center',
              width: '95%',
              borderWidth: 0.5,
              borderColor: COLORS.Neutral7,
              marginTop: SIZES.semi_margin,
            }}
          />

          {/* Description */}
          <View
            style={{
              marginTop: SIZES.radius,
              marginHorizontal: SIZES.semi_margin,
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
              Detail Description
            </Text>
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: '500',
                color: COLORS.Neutral1,
                marginTop: 4,
              }}>
              {description}
            </Text>
          </View>

          {/* Product Name */}
          <View
            style={{
              marginTop: SIZES.semi_margin,
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
                  lineHeight: 24,
                }}>
                Product Name
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.Neutral1,
                  lineHeight: 24,
                }}>
                {title}
              </Text>
            </View>
          </View>

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
                  lineHeight: 24,
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
                  ...FONTS.body3,
                  color: COLORS.Neutral1,
                  lineHeight: 24,
                }}>
                {requestCategory}
              </Text>
            </View>
          </View>

          {/* support Doc */}
          <View
            style={{
              marginTop: SIZES.radius,
              marginHorizontal: SIZES.semi_margin,
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                Supporting Document:
              </Text>
            </View>
            <FlatList
              data={documents}
              keyExtractor={item => `${item?.id}`}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              renderItem={({item, index}) => {
                return (
                  <View
                    key={index}
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: SIZES.base,
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
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <TextButton
                        label={'View'}
                        onPress={() =>downloadAndOpenPdf(item)}
                        labelStyle={{color: COLORS.primary1, ...FONTS.h5}}
                        buttonContainerStyle={{
                          marginTop: 0,
                          alignSelf: 'flex-end',
                          backgroundColor: COLORS.white,
                          borderRadius: SIZES.base,
                          borderWidth: 1,
                          borderColor: COLORS.primary1,
                          width: 70,
                          height: 35,
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
            // onPress={() => navigation.navigate('ViewAgreement')}
            buttonContainerStyle={{
              // margin: SIZES.padding,
              marginTop: 50,
              borderRadius: SIZES.base,
              width: 130,
              height: 45,
            }}
          />
        </ScrollView>
      </View>
    </Root>
  );
};

export default StandardDomesticRFQDetail;
