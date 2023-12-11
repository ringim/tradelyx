import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import ImageModal, {ImageDetail} from 'react-native-image-modal';
import {ScrollView} from 'react-native-gesture-handler';
import {Storage} from 'aws-amplify';
import dayjs from 'dayjs';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {useMutation, useQuery} from '@apollo/client';
import ViewMoreText from 'react-native-view-more-text';
import Spinner from 'react-native-loading-spinner-overlay';

import {Header, TextIconButton} from '../../../components';
import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {
  HomeStackNavigatorParamList,
  OfferDetailRouteProp,
} from '../../../components/navigation/BuyerNav/type/navigation';
import {DUMMY_IMAGE} from '../../../utilities/Utils';
import {getUser, listUsers} from '../../../queries/UserQueries';
import {
  CreateChatRoomMutation,
  CreateChatRoomMutationVariables,
  CreateUserChatRoomMutation,
  CreateUserChatRoomMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  ListUserChatRoomsQuery,
  ListUserChatRoomsQueryVariables,
  ListUsersQuery,
  ListUsersQueryVariables,
  CreateMessageMutation,
  CreateMessageMutationVariables,
  MessageStatus,
  serviceType,
  UpdateChatRoomMutation,
  UpdateChatRoomMutationVariables,
} from '../../../API';
import {options} from '../../../utilities/service';
import {
  createChatRoom,
  createMessage,
  createUserChatRoom,
  listUserChatRooms,
  updateChatRoom,
} from '../../../queries/ChatQueries';
import {useAuthContext} from '../../../context/AuthContext';

const OfferDetail = () => {
  const {authUser}: any = useAuthContext();

  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route: any = useRoute<OfferDetailRouteProp>();
  const {image, images, userID, id, offerValidity}: any = route?.params?.detail;
  const element = useRef<ImageDetail>(null);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageUri2, setImageUri2] = useState<string | null>(null);
  const [imageUri3, setImageUri3] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chatRoomUsers, setChatRoomUsers] = useState(null);

  const expiryDateString = offerValidity;
  const expiryDate = dayjs(expiryDateString);
  const currentDate = dayjs();
  const daysUntilExpiry = expiryDate.diff(currentDate, 'day');

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

  // GET USER
  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {
        id: userID,
      },
    },
  );
  const userInfo: any = data?.getUser;

  const {data: newData, loading: newLoad} = useQuery<
    ListUserChatRoomsQuery,
    ListUserChatRoomsQueryVariables
  >(listUserChatRooms);
  const allChatRoomUsers: any = newData?.listUserChatRooms?.items.find(
    usrID => usrID?.userId === userID,
  );

  const {data: onData, loading: onLoad} = useQuery<
    ListUsersQuery,
    ListUsersQueryVariables
  >(listUsers);

  useFocusEffect(
    useCallback(() => {
      let isCurrent = true;
      try {
        const crUsers: any =
          isCurrent &&
          onData?.listUsers?.items.some(usrID =>
            usrID?.ChatRooms?.items.find(
              crID => crID?.chatRoomId === allChatRoomUsers?.chatRoomId,
            ),
          );
        setChatRoomUsers(crUsers);
      } catch (error) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          textBody: `${(error as Error).message}`,
          autoClose: 1500,
        });
      }
      return () => {
        isCurrent = false;
      };
    }, [onData]),
  );

  // console.log(crUsers);

  // SEND MESSAGE
  const [doCreateMessage] = useMutation<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >(createMessage);

  // UPDATE CHAT ROOM MESSAGE
  const [doUpdateChatRoom] = useMutation<
    UpdateChatRoomMutation,
    UpdateChatRoomMutationVariables
  >(updateChatRoom);

  // CREATE CHATROOM
  const [doCreateChatRoom] = useMutation<
    CreateChatRoomMutation,
    CreateChatRoomMutationVariables
  >(createChatRoom);

  // CREATE USER CHATROOM
  const [doCreateUserChatRoom] = useMutation<
    CreateUserChatRoomMutation,
    CreateUserChatRoomMutationVariables
  >(createUserChatRoom);

  const onPress = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      // if chatRoom exist with user
      if (chatRoomUsers === true) {
        // initial message
        const res = await doCreateMessage({
          variables: {
            input: {
              SType: 'MESSAGE',
              userID: authUser?.attributes?.sub,
              status: MessageStatus.SENT,
              text: "Hello, I'm interested in this Sell Offer",
              sellOfferID: route?.params?.detail?.sellOfferID,
              requestTitle: route?.params?.detail?.title,
              packageType: route?.params?.detail?.packageType,
              serviceImage: route?.params?.detail?.sellOfferImage,
              requestID: id,
              requestQty: route?.params?.detail?.qtyMeasure,
              requestPrice: route?.params?.detail?.basePrice,
              serviceType: serviceType?.SELLOFFERS,
              chatroomID: allChatRoomUsers?.chatRoomId,
            },
          },
        });
        // update last msg function
        const updateLastMessage = async (newMessage: any) => {
          await doUpdateChatRoom({
            variables: {
              input: {
                id: allChatRoomUsers?.chatRoomId,
                SType: 'CHATROOM',
                chatRoomLastMessageId: newMessage,
              },
            },
          });
        };
        updateLastMessage(res?.data?.createMessage?.id);
        navigation.navigate('Chat', {
          id: allChatRoomUsers?.chatRoomId,
        });
      } else {
        // create a new chatRoom
        const chatRoom: any = await doCreateChatRoom({
          variables: {
            input: {
              newMessages: 0,
              SType: 'CHATROOM',
              name: userInfo?.title,
            },
          },
        });
        const newChatRoom = chatRoom.data?.createChatRoom;

        // add the clicked user to the chatRoom
        await doCreateUserChatRoom({
          variables: {
            input: {
              chatRoomId: newChatRoom?.id,
              userId: userID,
            },
          },
        });

        // add the AuthUser to the chatRoom
        await doCreateUserChatRoom({
          variables: {
            input: {
              chatRoomId: newChatRoom?.id,
              userId: authUser?.attributes?.sub,
            },
          },
        });

        // initial message
        const res = await doCreateMessage({
          variables: {
            input: {
              SType: 'MESSAGE',
              userID: authUser?.attributes?.sub,
              status: MessageStatus.SENT,
              text: "Hello, I'm interested in this Sell Offer",
              sellOfferID: route?.params?.detail?.sellOfferID,
              requestTitle: route?.params?.detail?.title,
              packageType: route?.params?.detail?.packageType,
              serviceImage: route?.params?.detail?.sellOfferImage,
              requestID: id,
              requestQty: route?.params?.detail?.qtyMeasure,
              requestPrice: route?.params?.detail?.basePrice,
              serviceType: serviceType?.SELLOFFERS,
              chatroomID: newChatRoom.id,
            },
          },
        });

        // update last msg function
        const updateLastMessage = async (newMessage: any) => {
          await doUpdateChatRoom({
            variables: {
              input: {
                id: newChatRoom?.id,
                SType: 'CHATROOM',
                chatRoomLastMessageId: newMessage,
              },
            },
          });
        };
        updateLastMessage(res?.data?.createMessage?.id);

        // navigate to the newly created chatRoom
        navigation.navigate('Chat', {
          id: newChatRoom?.id,
        });
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Server error, Try again',
        autoClose: 1500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    let isCurrent = true;
    if (userInfo?.logo && isCurrent) {
      Storage.get(userInfo?.logo).then(setImageUri);
    }
    return () => {
      isCurrent = false;
    };
  }, [userInfo?.logo]);

  useEffect(() => {
    let isCurrent = true;
    if (image && isCurrent) {
      Storage.get(image).then(setImageUri2);
    }
    return () => {
      isCurrent = false;
    };
  }, [image]);

  useEffect(() => {
    let isCurrent = true;
    if (images[0] && isCurrent) {
      Storage.get(images[0]).then(setImageUri3);
    }
    return () => {
      isCurrent = false;
    };
  }, [images[0]]);

  if (onLoad || newLoad || loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="small" color={COLORS.primary6} />
      </View>
    );
  }

  return (
    <Root>
      <Spinner
        visible={isSubmitting}
        animation={'fade'}
        overlayColor={'rgba(0,0,0,0.5)'}
      />

      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'Sell Offer Detail'} tintColor={COLORS.Neutral1} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              margin: SIZES.semi_margin,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {/* Supplier image */}
            <View
              style={{
                justifyContent: 'center',
              }}>
              <FastImage
                source={{uri: imageUri || DUMMY_IMAGE}}
                resizeMode={FastImage.resizeMode.cover}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: SIZES.base,
                }}
              />
            </View>

            {/* Supplier name */}
            <View
              style={{
                flex: 1,
                marginLeft: SIZES.radius,
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={2}
                style={{...FONTS.h5, color: COLORS.Neutral1}}>
                {userInfo?.title}
              </Text>

              {/* Rating, */}
              <View
                style={{
                  margin: SIZES.base,
                  marginStart: 0,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{justifyContent: 'center'}}>
                  <FastImage
                    tintColor={COLORS.secondary1}
                    resizeMode={FastImage.resizeMode.contain}
                    source={icons.rate}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    marginLeft: 4,
                    justifyContent: 'center',
                  }}>
                  <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
                    {parseFloat(userInfo?.rating).toFixed(0)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Product Image */}
          <View style={{}}>
            {image ? (
              <View
                style={{
                  marginHorizontal: SIZES.margin,
                  alignSelf: 'center',
                }}>
                <FastImage
                  resizeMode={FastImage.resizeMode.cover}
                  source={{uri: imageUri2 || DUMMY_IMAGE}}
                  style={{
                    width: 380,
                    height: 180,
                    borderRadius: SIZES.radius,
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  marginHorizontal: SIZES.margin,
                  alignSelf: 'center',
                }}>
                <ImageModal
                  resizeMode="cover"
                  imageBackgroundColor={COLORS.white}
                  isTranslucent={false}
                  swipeToDismiss={false}
                  modalRef={element}
                  style={{
                    width: 380,
                    height: 180,
                    borderRadius: SIZES.radius,
                  }}
                  source={{
                    uri: imageUri3 || DUMMY_IMAGE,
                  }}
                  onOpen={() => {
                    setTimeout(() => {
                      element.current?.close();
                    }, 10000);
                  }}
                />
              </View>
            )}

            {/* Product Name */}
            <View
              style={{
                marginTop: SIZES.semi_margin,
                marginHorizontal: SIZES.margin,
              }}>
              <Text
                numberOfLines={2}
                style={{...FONTS.h4, color: COLORS.Neutral1}}>
                {route?.params?.detail?.title}
              </Text>
            </View>

            {/* Supplier Location */}
            <View
              style={{
                marginTop: SIZES.radius,
                marginHorizontal: SIZES.margin,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{justifyContent: 'center'}}>
                <FastImage
                  tintColor={COLORS.Neutral6}
                  resizeMode={FastImage.resizeMode.contain}
                  source={icons.location}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  marginLeft: SIZES.base,
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={2}
                  style={{...FONTS.body3, color: COLORS.Neutral5}}>
                  {userInfo?.city}
                  {', '}
                  {userInfo?.country}
                </Text>
              </View>
            </View>

            {/* Qty offered */}
            <View
              style={{
                marginTop: SIZES.semi_margin,
                marginHorizontal: SIZES.margin,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{justifyContent: 'center'}}>
                <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                  QTY Offered
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={2}
                  style={{
                    ...FONTS.body3,
                    fontWeight: '600',
                    color: COLORS.Neutral1,
                  }}>
                  {route?.params?.detail?.qtyMeasure}{' '}
                  {route?.params?.detail?.unit}
                </Text>
              </View>
            </View>

            {/* base price */}
            <View
              style={{
                marginTop: SIZES.radius,
                marginHorizontal: SIZES.margin,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{justifyContent: 'center'}}>
                <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                  FOB Price
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={2}
                  style={{
                    ...FONTS.body3,
                    fontWeight: '600',
                    color: COLORS.Neutral1,
                  }}>
                  ₦
                  {route?.params?.detail?.fobPrice.toLocaleString(
                    'en-US',
                    options,
                  )}
                </Text>
              </View>
            </View>

            {/* payment type */}
            <View
              style={{
                marginTop: SIZES.radius,
                marginHorizontal: SIZES.margin,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{justifyContent: 'center'}}>
                <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                  Payment Type
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={2}
                  style={{
                    ...FONTS.body3,
                    fontWeight: '600',
                    color: COLORS.Neutral1,
                  }}>
                  {route?.params?.detail?.paymentType}
                </Text>
              </View>
            </View>

            {/* delivery duration */}
            <View
              style={{
                marginTop: SIZES.radius,
                marginHorizontal: SIZES.margin,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{justifyContent: 'center'}}>
                <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                  Delivery Date
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={2}
                  style={{
                    ...FONTS.body3,
                    fontWeight: '600',
                    color: COLORS.Neutral1,
                  }}>
                  {route?.params?.detail?.deliveryDate}
                </Text>
              </View>
            </View>
          </View>

          {/* Horizontal Rule */}
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              borderWidth: 0.5,
              borderColor: COLORS.Neutral7,
              marginTop: SIZES.margin,
            }}
          />

          {/* detailed desc */}
          <View
            style={{
              marginTop: SIZES.margin,
              marginHorizontal: SIZES.margin,
            }}>
            <View style={{justifyContent: 'center', marginBottom: SIZES.base}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                Detailed Description
              </Text>
            </View>
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
              <Text>{route?.params?.detail?.description}</Text>
            </ViewMoreText>
          </View>

          {/* package des */}
          <View
            style={{
              marginTop: SIZES.semi_margin,
              marginHorizontal: SIZES.margin,
            }}>
            <View style={{justifyContent: 'center', marginBottom: SIZES.base}}>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.Neutral5,
                }}>
                Packaging Description
              </Text>
            </View>
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
              <Text>{route?.params?.detail?.packageDesc}</Text>
            </ViewMoreText>
          </View>

          {/* expiry */}
          <View
            style={{
              marginTop: SIZES.margin,
              marginHorizontal: SIZES.margin,
              flexDirection: 'row',
              backgroundColor: COLORS.Neutral9,
              justifyContent: 'space-between',
              borderRadius: SIZES.base,
              padding: SIZES.radius,
              marginBottom: 100,
            }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>
                Expiry Date:{' '}
                <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>
                  {route?.params?.detail?.offerValidity}
                </Text>
              </Text>
            </View>
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
            <View style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
              <Text style={{...FONTS.sh3, color: COLORS.Neutral5}}>
                {daysUntilExpiry} days
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Price && bTn */}
        <View
          style={{
            backgroundColor: COLORS.Neutral9,
            borderBottomLeftRadius: SIZES.radius,
            borderBottomRightRadius: SIZES.radius,
            padding: SIZES.radius,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: SIZES.radius,
            }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{...FONTS.h3, color: COLORS.Neutral5}}>
                Base Price
              </Text>
            </View>

            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.primary1,
                  letterSpacing: -1,
                }}>
                ₦
                {route?.params?.detail?.basePrice.toLocaleString(
                  'en-US',
                  options,
                )}
              </Text>
            </View>
          </View>
          <TextIconButton
            label={'Chat'}
            labelStyle={{
              color: COLORS.white,
              ...FONTS.h4,
              marginLeft: SIZES.radius,
            }}
            iconPosition={'LEFT'}
            icon={icons.chat}
            iconStyle={COLORS.white}
            onPress={onPress}
            containerStyle={{
              marginTop: SIZES.semi_margin,
              width: 350,
            }}
          />

          <TextIconButton
            label={'Buy'}
            labelStyle={{
              color: COLORS.primary1,
              ...FONTS.h4,
              marginLeft: SIZES.radius,
            }}
            iconPosition={'LEFT'}
            icon={icons.pay}
            iconStyle={COLORS.primary1}
            onPress={() => navigation.navigate('ViewAgreement')}
            containerStyle={{
              marginBottom: SIZES.margin,
              backgroundColor: COLORS.white,
              marginTop: SIZES.semi_margin,
              width: 350,
            }}
          />
        </View>
      </View>
    </Root>
  );
};

export default OfferDetail;
