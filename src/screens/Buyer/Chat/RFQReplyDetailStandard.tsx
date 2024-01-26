import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery} from '@apollo/client';
import dayjs from 'dayjs';
import {FlashList} from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import ViewMoreText from 'react-native-view-more-text';
import Clipboard from '@react-native-clipboard/clipboard';
import {v4 as uuidV4} from 'uuid';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {COLORS, SIZES, icons, FONTS} from '../../../constants';
import {
  Header,
  LoadingIndicator,
  TextButton,
  TextIconButton,
} from '../../../components';
import {ChatRouteProp} from '../../../components/navigation/SellerNav/type/navigation';
import {
  GetRFQReplyQuery,
  GetRFQReplyQueryVariables,
  CreateNotificationMutation,
  CreateNotificationMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  NotificationType,
  CreateNotificationInput,
} from '../../../API';
import {getRFQReply} from '../../../queries/RFQQueries';
import {
  downloadAndOpenPdf,
  formatNumberWithCommas,
} from '../../../utilities/service';
import {getUser} from '../../../queries/UserQueries';
import {createNotification} from '../../../queries/NotificationQueries';
import {useAuthContext} from '../../../context/AuthContext';
import {ChatStackNavigatorParamList} from '../../../components/navigation/BuyerNav/type/navigation';

const RFQReplyDetailStandard = () => {
  const navigation = useNavigation<ChatStackNavigatorParamList>();
  const {userID}: any = useAuthContext();
  const route: any = useRoute<ChatRouteProp>();

  const {data, loading} = useQuery<GetRFQReplyQuery, GetRFQReplyQueryVariables>(
    getRFQReply,
    {variables: {id: route?.params?.rfq}},
  );
  const rfqDetail: any = data?.getRFQReply;

  const expiryDateString = rfqDetail?.expiryDate;
  const expiryDate = dayjs(expiryDateString);
  const currentDate = dayjs();
  const daysUntilExpiry = expiryDate.diff(currentDate, 'day');

  const onCopy = () => {
    Clipboard.setString(rfqDetail?.rfqNo);
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

  // GET USER 1
  const {data: softData, loading: softLoad} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {
    variables: {
      id: rfqDetail?.forUserID,
    },
  });

  // CREATE NOTIFICATION
  const [doCreateNotification] = useMutation<
    CreateNotificationMutation,
    CreateNotificationMutationVariables
  >(createNotification);

  const createNotify = async () => {
    try {
      const input: CreateNotificationInput = {
        id: uuidV4(),
        type: NotificationType?.RFQ_REPLY,
        readAt: 0,
        requestType: 'Standard Reply',
        actorID: userID,
        userID: rfqDetail?.userID,
        SType: 'NOTIFICATION',
        notificationRFQReplyId: route?.params.rfq,
        chatroomID: route?.params?.crID,
        title: 'Standard RFQ Accepted',
        description: `${softData?.getUser?.name} has accepted your RFQ request`,
      };
      const res = await doCreateNotification({
        variables: {
          input,
        },
      });
      navigation.navigate('Chat', {id: route?.params?.crID});
      // console.log('notification created', res);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: (error as Error).message,
        autoClose: 1500,
      });
    }
  };

  if (loading || softLoad) {
    return <LoadingIndicator />;
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'RFQ Reply Detail'} tintColor={COLORS.Neutral1} />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          bounces={false}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          <View
            style={{
              marginTop: SIZES.base,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: SIZES.semi_margin,
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
                source={{uri: rfqDetail?.placeOriginFlag}}
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
                {rfqDetail?.placeOrigin}
              </Text>
            </View>
          </View>

          {/* RFQ Number */}
          <View
            style={{
              marginTop: SIZES.margin,
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
                {rfqDetail?.rfqNo}
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
              Request
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
              <Text>{rfqDetail?.description}</Text>
            </ViewMoreText>
          </View>

          {/* Product Title */}
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
                {rfqDetail?.title}
              </Text>
            </View>
          </View>

          {/* RFQ Type */}
          <View
            style={{
              marginTop: SIZES.base,
              flexDirection: 'row',
              marginHorizontal: SIZES.semi_margin,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.Neutral6,
                  lineHeight: 24,
                }}>
                RFQ Type
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={3}
                style={{
                  ...FONTS.body3,
                  color: COLORS.Neutral1,
                  lineHeight: 24,
                }}>
                {rfqDetail?.rfqType}
              </Text>
            </View>
          </View>

          {/* payment method */}
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
                Payment Method
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
                {rfqDetail?.paymentMethod}
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
                  lineHeight: 24,
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
                  ...FONTS.body3,
                  color: COLORS.Neutral1,
                  lineHeight: 24,
                }}>
                {rfqDetail?.paymentType}
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
                  lineHeight: 24,
                }}>
                Quantity Offered
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
                {rfqDetail?.qty} {rfqDetail?.unit}
              </Text>
            </View>
          </View>

          {/* Expiry Date */}
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
                Expiring in:
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
                {daysUntilExpiry} days
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
                width: Dimensions.get('screen').width,
              }}>
              <FlashList
                data={rfqDetail?.documents}
                keyExtractor={item => `${item}`}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                estimatedItemSize={20}
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
          </View>

          {/* TOS Doc */}
          {rfqDetail?.agreement && (
            <View
              style={{
                marginTop: SIZES.semi_margin,
                marginHorizontal: SIZES.semi_margin,
              }}>
              <View style={{justifyContent: 'center'}}>
                <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                  Agreement/TOS
                </Text>
              </View>
              <View
                style={{
                  height: '100%',
                  width: Dimensions.get('screen').width,
                }}>
                <FlashList
                  data={rfqDetail?.agreement}
                  keyExtractor={item => `${item}`}
                  showsHorizontalScrollIndicator={false}
                  estimatedItemSize={20}
                  getItemType={({item}: any) => {
                    return item;
                  }}
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
            </View>
          )}
        </KeyboardAwareScrollView>

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
            marginBottom: 50,
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
              ₦{formatNumberWithCommas(rfqDetail?.price)}
            </Text>
          </View>
        </View>

        {/* {userID } */}
        <View style={{justifyContent: 'flex-end'}}>
          <TextIconButton
            label={'Accept'}
            labelStyle={{
              ...FONTS.h4,
              marginLeft: SIZES.radius,
            }}
            iconPosition={'LEFT'}
            icon={icons.pay}
            iconStyle={COLORS.white}
            onPress={createNotify}
            // onPress={() => navigation.navigate('ViewAgreement')}
            containerStyle={{
              marginBottom: SIZES.margin,
              marginTop: SIZES.semi_margin,
              width: 300,
            }}
          />
        </View>
      </View>
    </Root>
  );
};

export default RFQReplyDetailStandard;
