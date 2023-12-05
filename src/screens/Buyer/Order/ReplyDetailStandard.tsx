import {View, Text, ScrollView, TouchableOpacity, Linking} from 'react-native';
import React, {useState} from 'react';
import {Storage} from 'aws-amplify';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import Clipboard from '@react-native-clipboard/clipboard';
import dayjs from 'dayjs';
import FastImage from 'react-native-fast-image';
import ViewMoreText from 'react-native-view-more-text';
import {FlatList} from 'react-native-gesture-handler';

import {COLORS, SIZES, icons, FONTS} from '../../../constants';
import {Header, TextButton} from '../../../components';
import ReplyModal from '../../../components/Modal/ReplyModal';
import {
  OrderStackNavigatorParamList,
  ReplyDetailStandardRouteProp,
} from '../../../components/navigation/BuyerNav/type/navigation';

const ReplyDetailStandard = () => {
  const navigation = useNavigation<OrderStackNavigatorParamList>();
  const route: any = useRoute<ReplyDetailStandardRouteProp>();

  const [showModal, setShowModal] = useState(false);

  const options = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  const expiryDateString = route?.params?.sellerItem?.expiryDate;
  const expiryDate = dayjs(expiryDateString);
  const currentDate = dayjs();
  const daysUntilExpiry = expiryDate.diff(currentDate, 'day');

  const onCopy = () => {
    Clipboard.setString(route?.params?.sellerItem?.rfqNo);
  };

  function renderViewMore(onPress: any) {
    return (
      <TouchableOpacity style={{marginTop: SIZES.radius}} onPress={onPress}>
        <Text
          style={{color: COLORS.primary6, ...FONTS.body3, fontWeight: '500'}}>
          View more
        </Text>
      </TouchableOpacity>
    );
  }

  function renderViewLess(onPress: any) {
    return (
      <TouchableOpacity style={{marginTop: SIZES.radius}} onPress={onPress}>
        <Text
          style={{color: COLORS.primary6, ...FONTS.body3, fontWeight: '500'}}>
          View less
        </Text>
      </TouchableOpacity>
    );
  }

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
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'RFQ Reply Detail'} tintColor={COLORS.Neutral1} />

        {showModal && (
          <ReplyModal
            isVisible={showModal}
            onClose={() => setShowModal(false)}
          />
        )}

        <ScrollView
          style={{marginHorizontal: 5}}
          showsVerticalScrollIndicator={false}>
          {/* Buyer from */}
          <View
            style={{
              marginTop: SIZES.base,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: SIZES.base,
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
                source={{uri: route?.params?.sellerItem?.placeOriginFlag}}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: 23,
                  height: 23,
                }}
              />
            </View>

            <View
              style={{
                flex: 2,
                marginLeft: SIZES.radius,
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={3}
                style={{
                  ...FONTS.cap1,
                  fontWeight: '600',
                  color: COLORS.Neutral1,
                }}>
                {route?.params?.sellerItem?.placeOrigin}
              </Text>
            </View>
          </View>

          {/* RFQ Number */}
          <View
            style={{
              marginTop: SIZES.semi_margin,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: SIZES.base,
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
                {route?.params?.sellerItem?.rfqNo}
              </Text>
            </View>
            {/* Copy icon */}
            <TouchableOpacity
              style={{marginLeft: SIZES.base, justifyContent: 'center'}}
              onPress={onCopy}>
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

          {/* expiry */}
          <View
            style={{
              marginTop: SIZES.radius,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderRadius: SIZES.base,
              backgroundColor: COLORS.Neutral10,
              padding: SIZES.radius,
            }}>
            <View style={{justifyContent: 'center'}}>
              <FastImage
                source={icons.calender}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: SIZES.base,
                justifyContent: 'center',
              }}>
              <Text style={{...FONTS.sh3, color: COLORS.Neutral5}}>
                {expiryDateString}
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                Exp in:
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>
                {' '}
                {daysUntilExpiry} days
              </Text>
            </View>
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
              marginTop: SIZES.semi_margin,
              marginHorizontal: SIZES.semi_margin,
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
              Detail Description
            </Text>
            <ViewMoreText
              numberOfLines={5}
              renderViewMore={renderViewMore}
              renderViewLess={renderViewLess}
              style={{justifyContent: 'center', marginTop: SIZES.radius}}
              textStyle={{
                ...FONTS.body3,
                fontWeight: '500',
                color: COLORS.Neutral1,
                paddingTop: SIZES.base,
              }}>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.Neutral1,
                }}>
                {route?.params?.sellerItem?.description}
              </Text>
            </ViewMoreText>
          </View>

          {/* Request */}
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
                Request For
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: SIZES.padding,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  ...FONTS.cap1,
                  color: COLORS.Neutral1,
                }}>
                {route?.params?.sellerItem?.title}
              </Text>
            </View>
          </View>

          {/* Qty */}
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
                Qty Required
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
                {route?.params?.sellerItem?.qty} bags
              </Text>
            </View>
          </View>

          {/* Payment terms */}
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
                Payment Terms
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
                {route?.params?.sellerItem?.paymentType}
              </Text>
            </View>
          </View>

          {/* Payment methods */}
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
                Payment Method
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
                {route?.params?.sellerItem?.paymentMethod}
              </Text>
            </View>
          </View>

          {/* Unit */}
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
                Unit
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
                {route?.params?.sellerItem?.unit}
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
            <FlatList
              data={route?.params?.sellerItem?.documents}
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
                    <View
                      style={{
                        marginLeft: SIZES.margin,
                        justifyContent: 'center',
                      }}>
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

          {/* Price */}
          <View
            style={{
              marginTop: SIZES.padding,
              marginHorizontal: SIZES.radius,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: COLORS.Neutral10,
              borderRadius: SIZES.radius,
              padding: SIZES.semi_margin,
            }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
                Base Price
              </Text>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.primary1,
                  letterSpacing: -1,
                  paddingTop: SIZES.base,
                }}>
                ₦
                {route?.params?.sellerItem?.price.toLocaleString(
                  'en-US',
                  options,
                )}
              </Text>
            </View>
          </View>

          {/* button */}
          <TextButton
            label={'Accept Offer'}
            onPress={() => navigation.navigate('ViewAgreement')}
            buttonContainerStyle={{
              marginTop: SIZES.padding,
              width: 300,
            }}
          />

          <TextButton
            label={'Decline Offer'}
            labelStyle={{color: COLORS.primary1}}
            onPress={() => setShowModal(true)}
            buttonContainerStyle={{
              marginTop: SIZES.semi_margin,
              width: 300,
              backgroundColor: COLORS.white,
              borderWidth: 2,
              borderColor: COLORS.primary1,
              marginBottom: 70,
            }}
          />
        </ScrollView>
      </View>
    </Root>
  );
};

export default ReplyDetailStandard;
