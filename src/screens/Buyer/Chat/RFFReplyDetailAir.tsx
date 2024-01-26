import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {useNavigation, useRoute} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import FastImage from 'react-native-fast-image';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {v4 as uuidV4} from 'uuid';
import {FlashList} from '@shopify/flash-list';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Header,
  LoadingIndicator,
  OriginDestinationDetails,
  QuoteRequestItem,
  QuoteRequestItem2,
  TextButton,
} from '../../../components';
import {COLORS, SIZES, icons, FONTS} from '../../../constants';
import {
  ChatRouteProp,
  ChatStackNavigatorParamList,
} from '../../../components/navigation/BuyerNav/type/navigation';
import {
  GetRFFReplyQuery,
  GetRFFReplyQueryVariables,
  CreateNotificationMutation,
  CreateNotificationMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  NotificationType,
  CreateNotificationInput,
  RFFTYPE,
} from '../../../API';
import {getRFFReply} from '../../../queries/RFFQueries';
import {TextIconButton} from '../../../components';
import {
  downloadAndOpenPdf,
  formatNumberWithCommas,
} from '../../../utilities/service';
import {getUser} from '../../../queries/UserQueries';
import {createNotification} from '../../../queries/NotificationQueries';
import {useAuthContext} from '../../../context/AuthContext';

const RFFReplyDetailAir = () => {
  const navigation = useNavigation<ChatStackNavigatorParamList>();
  const {userID} = useAuthContext();
  const route: any = useRoute<ChatRouteProp>();

  const {data, loading} = useQuery<GetRFFReplyQuery, GetRFFReplyQueryVariables>(
    getRFFReply,
    {variables: {id: route?.params?.rff}},
  );
  const rffDetails: any = data?.getRFFReply;

  const onCopy = () => {
    Clipboard.setString(rffDetails?.rffNo);
  };

  // GET OTHER USER 1
  const {data: softData, loading: softLoad} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {
    variables: {
      id: rffDetails?.forUserID,
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
        type: NotificationType?.RFF_REPLY,
        readAt: 0,
        requestType: `${RFFTYPE.AIR} Reply`,
        actorID: userID,
        userID: rffDetails?.userID,
        SType: 'NOTIFICATION',
        chatroomID: route?.params?.crID,
        notificationRFFReplyId: route?.params.rff,
        title: 'Air RFF Accepted',
        description: `${softData?.getUser?.name} has accepted your RFF request`,
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
        <Header title={'RFF Reply Detail'} tintColor={COLORS.Neutral1} />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          bounces={false}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          <View
            style={{
              marginTop: SIZES.radius,
              marginHorizontal: SIZES.base,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
            }}>
            <QuoteRequestItem
              to={rffDetails?.placeDestinationName}
              from={rffDetails?.placeOriginName}
              fromImg={rffDetails?.placeOriginFlag}
              toImg={rffDetails?.placeDestinationFlag}
            />

            <QuoteRequestItem2
              orderID={rffDetails?.rffNo}
              onCopy={onCopy}
              packageType={rffDetails?.packageType}
              name={rffDetails?.productName}
              containerCount={rffDetails?.qty}
              transportMode={rffDetails?.rffType}
              containerSize={rffDetails?.containerSize}
              containerDetails={rffDetails?.containerDetails}
              relatedServices={rffDetails?.relatedServices}
              container={rffDetails?.container}
              containerType={rffDetails?.containerType}
              rffType={rffDetails?.rffType}
              weight={rffDetails?.weight}
              notes={rffDetails?.notes}
              handling={rffDetails?.handling}
              length={rffDetails?.length}
              height={rffDetails?.height}
            />

            {/* payment method */}
            <View
              style={{
                marginTop: SIZES.base,
                flexDirection: 'row',
                marginHorizontal: SIZES.base,
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
                    ...FONTS.body3,
                    color: COLORS.Neutral1,
                  }}>
                  {rffDetails?.paymentMethod}
                </Text>
              </View>
            </View>

            {/* Payment terms */}
            <View
              style={{
                marginTop: SIZES.base,
                flexDirection: 'row',
                marginHorizontal: SIZES.base,
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
                    ...FONTS.body3,
                    color: COLORS.Neutral1,
                  }}>
                  {rffDetails?.paymentType}
                </Text>
              </View>
            </View>

            {/* Origin Details*/}
            <OriginDestinationDetails
              address={rffDetails?.placeOriginName}
              type={'Origin'}
              departDate={rffDetails?.loadDate}
              typeName={'Ready to load date'}
            />

            {/* Destination Details  */}
            <View
              style={{
                marginTop: SIZES.semi_margin,
                marginHorizontal: SIZES.base,
                borderRadius: SIZES.radius,
                padding: SIZES.radius,
                backgroundColor: COLORS.Neutral10,
              }}>
              <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>
                Destination
              </Text>
              <View
                style={{
                  marginTop: SIZES.base,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    marginTop: 5,
                    justifyContent: 'center',
                    padding: SIZES.base,
                    width: 32,
                    height: 32,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.secondary10,
                  }}>
                  <FastImage
                    source={icons?.location}
                    tintColor={COLORS.secondary1}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    marginLeft: SIZES.radius,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      paddingTop: 4,
                      ...FONTS.body3,
                      color: COLORS.Neutral6,
                    }}>
                    {rffDetails?.placeDestinationName}
                  </Text>
                </View>
              </View>
            </View>

            {/* TOS Doc */}
            {rffDetails?.agreement && (
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
                    data={rffDetails?.agreement}
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
            )}

            {/* Price */}
            <View
              style={{
                marginTop: SIZES.radius,
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
                  Base Price (Exc. Delivery)
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.primary1,
                    letterSpacing: -1,
                    paddingTop: SIZES.base,
                  }}>
                  ₦{formatNumberWithCommas(rffDetails?.price)}
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
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
    </Root>
  );
};

export default RFFReplyDetailAir;
