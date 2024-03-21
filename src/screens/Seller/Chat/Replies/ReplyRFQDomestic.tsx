import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Root} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';
import Clipboard from '@react-native-clipboard/clipboard';
import ViewMoreText from 'react-native-view-more-text';

import {COLORS, FONTS, SIZES, icons} from '../../../../constants';
import {ChatStackNavigatorParamList} from '../../../../components/navigation/SellerNav/type/navigation';
import {Header, LoadingIndicator, TextButton} from '../../../../components';
import {GetRFQQuery, GetRFQQueryVariables} from '../../../../API';
import {getRFQ} from '../../../../queries/RFQQueries';
import {
  downloadAndOpenPdf,
  formatNumberWithCommas,
} from '../../../../utilities/service';

const ReplyRFQDomestic = () => {
  const navigation = useNavigation<ChatStackNavigatorParamList>();
  const route: any = useRoute<any>();

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

  const onCopy = () => {
    Clipboard.setString(rfqDetails?.rfqNo);
  };

  const {data, loading} = useQuery<GetRFQQuery, GetRFQQueryVariables>(getRFQ, {
    variables: {id: route?.params?.rfq},
  });
  const rfqDetails: any = data?.getRFQ;

  const onPress = async () => {
    navigation.navigate('ReplyRFQDomesticPayment', {
      chatroomID: route?.params?.crID,
      rfqID: route?.params?.rfq,
    });
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header
          title={'Reply RFQ'}
          contentStyle={{marginBottom: 0}}
          tintColor={COLORS.Neutral1}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          bounces={false}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          {/* Buyer from */}
          <View
            style={{
              marginTop: SIZES.base,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: SIZES.base,
            }}>
            {/* buyer from */}
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
                  source={{uri: rfqDetails?.placeOriginFlag}}
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
                  {rfqDetails?.placeOrigin}
                </Text>
              </View>
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
                {rfqDetails?.rfqNo}
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
                {rfqDetails?.expiryDate}
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
                {rfqDetails?.daysUntilExpiry} days
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
              }}>
              <Text>{rfqDetails?.description}</Text>
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
                {rfqDetails?.title}
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
                {rfqDetails?.productName}
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
                {rfqDetails?.qty} {rfqDetails?.unit}
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
                {rfqDetails?.buyFrequency}
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
                {rfqDetails?.paymentType}
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
                {rfqDetails?.paymentMethod}
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
                {rfqDetails?.requestCategory}
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
              <FlatList
                data={rfqDetails?.tags}
                keyExtractor={item => `${item}`}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
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
                            top: 3,
                          }}>
                          {item}
                        </Text>
                      </View>
                    </View>
                  );
                }}
                ListFooterComponent={
                  <View>
                    {/* landmark */}
                    <View
                      style={{
                        marginTop: SIZES.semi_margin,
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
                          {rfqDetails?.landmark}
                        </Text>
                      </View>
                    </View>

                    {/* support Doc */}
                    <View
                      style={{
                        marginTop: SIZES.semi_margin,
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
                        <FlatList
                          data={rfqDetails?.documents}
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
                                <View
                                  style={{flex: 1, justifyContent: 'center'}}>
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
                                    labelStyle={{
                                      color: COLORS.primary1,
                                      ...FONTS.h5,
                                    }}
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
                          ListFooterComponent={
                            <View>
                              {/* Price */}
                              <View
                                style={{
                                  marginTop: SIZES.padding,
                                  backgroundColor: COLORS.Neutral10,
                                  borderRadius: SIZES.radius,
                                  padding: SIZES.semi_margin,
                                }}>
                                <Text
                                  style={{
                                    ...FONTS.body3,
                                    color: COLORS.Neutral6,
                                  }}>
                                  Budget
                                </Text>
                                <Text
                                  style={{
                                    ...FONTS.h3,
                                    color: COLORS.primary1,
                                    letterSpacing: -1,
                                    paddingTop: SIZES.base,
                                  }}>
                                  ₦{formatNumberWithCommas(rfqDetails?.budget)}
                                </Text>
                              </View>

                              <TextButton
                                label={'Continue'}
                                onPress={onPress}
                                buttonContainerStyle={{
                                  borderRadius: SIZES.base,
                                  width: 300,
                                  height: 45,
                                  marginBottom: SIZES.padding * 1.1,
                                  marginTop: SIZES.margin,
                                }}
                              />
                            </View>
                          }
                        />
                      </View>
                    </View>
                  </View>
                }
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};

export default ReplyRFQDomestic;
