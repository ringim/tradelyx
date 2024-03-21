import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Root} from 'react-native-alert-notification';
import Clipboard from '@react-native-clipboard/clipboard';
import dayjs from 'dayjs';
import FastImage from 'react-native-fast-image';
import ViewMoreText from 'react-native-view-more-text';

import {COLORS, SIZES, icons, FONTS} from '../../../constants';
import {Header, TextButton} from '../../../components';
import ReplyModal from '../../../components/Modal/ReplyModal';
import {
  OrderStackNavigatorParamList,
  ReplyDetailDomesticRouteProp,
} from '../../../components/navigation/BuyerNav/type/navigation';
import {
  downloadAndOpenPdf,
  formatNumberWithCommas,
} from '../../../utilities/service';
import {FlashList} from '@shopify/flash-list';

const ReplyDetailDomestic = () => {
  const navigation = useNavigation<OrderStackNavigatorParamList>();
  const route: any = useRoute<ReplyDetailDomesticRouteProp>();

  const [showModal, setShowModal] = useState(false);

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
        <View style={{marginHorizontal: 5}}>
          {/* Buyer from */}
          <View
            style={{
              marginTop: SIZES.base,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: SIZES.base,
            }}>
            {/* Buyer Country Name */}
            <View>
              <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
                Buyer from
              </Text>
            </View>

            {/* Buyer from country flag */}
            <View
              style={{
                flex: 1,
                marginLeft: SIZES.radius,
              }}>
              <FastImage
                source={{uri: route?.params?.sellerItem?.placeOriginFlag}}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: 17,
                  height: 17,
                }}
              />
            </View>

            <View
              style={{
                flex: 4,
                alignItems: 'flex-end',
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
                Expire in:
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
              Description
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

          {/* Product Title */}
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
                Product Title
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
                {route?.params?.sellerItem?.productName}
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
                Qty Offered
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
                {route?.params?.sellerItem?.qty}{' '}
                {route?.params?.sellerItem?.unit}
              </Text>
            </View>
          </View>

          {/* Coverage type */}
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
                Coverage Type
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
                {route?.params?.sellerItem?.rfqType}
              </Text>
            </View>
          </View>

          {/* Buying frequency */}
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
                Buying Frequency
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
                {route?.params?.sellerItem?.buyFrequency}
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
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.cap1,
                  color: COLORS.Neutral1,
                }}>
                {route?.params?.sellerItem?.requestCategory}
              </Text>
            </View>
          </View>

          {/* Tags */}
          <View
            style={{
              marginTop: SIZES.base,
              marginHorizontal: SIZES.semi_margin,
            }}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>Tags</Text>
            <View
              style={{
                height: '100%',
              }}>
              <FlashList
                data={route?.params?.sellerItem?.tags}
                keyExtractor={item => `${item}`}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                estimatedItemSize={20000}
                getItemType={({item}: any) => {
                  return item;
                }}
                style={{marginTop: 4}}
                renderItem={({item, index}) => {
                  /* Tags list */
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{justifyContent: 'center'}}>
                        <Text
                          numberOfLines={2}
                          style={{
                            ...FONTS.body3,
                            fontWeight: 'bold',
                            color: COLORS.Neutral1,
                          }}>
                          .
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          marginLeft: SIZES.base,
                          justifyContent: 'center',
                        }}>
                        <Text
                          numberOfLines={2}
                          style={{
                            ...FONTS.body3,
                            fontWeight: 'bold',
                            color: COLORS.Neutral1,
                          }}>
                          {item}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </View>

          {/* landmark */}
          <View
            style={{
              marginTop: SIZES.semi_margin,
              marginHorizontal: SIZES.semi_margin,
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
                Landmark
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
                  paddingTop: 4,
                }}>
                {route?.params?.sellerItem?.landmark}
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
            <View
              style={{
                height: '100%',
              }}>
              <FlashList
                data={route?.params?.sellerItem?.documents}
                keyExtractor={item => `${item}`}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                estimatedItemSize={20000}
                getItemType={({item}: any) => {
                  return item;
                }}
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
                ₦{formatNumberWithCommas(route?.params?.sellerItem?.price)}
              </Text>
            </View>
          </View>

          {/* button */}
          <TextButton
            label={'Accept Offer'}
            // onPress={() => navigation.navigate('ViewAgreement')}
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
              borderWidth: 1,
              borderColor: COLORS.primary1,
              marginBottom: 70,
            }}
          />
        </View>
      </View>
    </Root>
  );
};

export default ReplyDetailDomestic;
