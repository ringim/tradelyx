import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Storage} from 'aws-amplify';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery} from '@apollo/client';
import FastImage from 'react-native-fast-image';
import ViewMoreText from 'react-native-view-more-text';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {FlatList} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

import {COLORS, SIZES, icons, FONTS} from '../../../constants';
import {Header, TextButton} from '../../../components';
import {
  ExploreStackNavigatorParamList,
  StandardDomesticRFQDetailRouteProp,
} from '../../../components/navigation/SellerNav/type/navigation';
import {useAuthContext} from '../../../context/AuthContext';
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
  RFQTYPE,
  UpdateChatRoomMutation,
  UpdateChatRoomMutationVariables,
} from '../../../API';
import {
  listUserChatRooms,
  createChatRoom,
  createUserChatRoom,
  createMessage,
  updateChatRoom,
} from '../../../queries/ChatQueries';
import {getUser, listUsers} from '../../../queries/UserQueries';

const StandardDomesticRFQDetail = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();
  const route: any = useRoute<StandardDomesticRFQDetailRouteProp>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chatRoomUsers, setChatRoomUsers] = useState(null);

  const {authUser}: any = useAuthContext();

  const {
    placeOriginFlag,
    rfqNo,
    description,
    documents,
    userID,
    title,
    placeOrigin,
    requestCategory,
  }: any = route?.params?.rfqItem;

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

  // GET USER
  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      fetchPolicy: 'cache-only',
      nextFetchPolicy: 'network-only',
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

  useEffect(() => {
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
  }, [onLoad]);

  // SEND MESSAGE
  const [doCreateMessage] = useMutation<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >(createMessage);

  // CREATE CHATROOM
  const [doCreateChatRoom] = useMutation<
    CreateChatRoomMutation,
    CreateChatRoomMutationVariables
  >(createChatRoom);

  // UPDATE CHAT ROOM MESSAGE
  const [doUpdateChatRoom] = useMutation<
    UpdateChatRoomMutation,
    UpdateChatRoomMutationVariables
  >(updateChatRoom);

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
              text: "Hello, I'll respond to your RFQ request soon",
              rfqID: route?.params?.rfqItem?.rfqNo,
              requestTitle: route?.params?.rfqItem?.title,
              requestID: route?.params?.rfqItem?.id,
              serviceType: serviceType?.RFQ,
              rfqType: RFQTYPE.STANDARD,
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
              text: "Hello, I'll respond to your RFQ request soon",
              rfqID: route?.params?.rfqItem?.rfqNo,
              requestTitle: route?.params?.rfqItem?.title,
              requestID: route?.params?.rfqItem?.id,
              serviceType: serviceType?.RFQ,
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
        navigation.navigate('Chat', {id: newChatRoom?.id});
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

  if (loading || newLoad || onLoad) {
    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center'}}
        size={'small'}
        color={COLORS.primary6}
      />
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
                {placeOrigin}
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
              <Text>{description}</Text>
            </ViewMoreText>
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
                }}>
                Product Name
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
        </ScrollView>
      </View>
    </Root>
  );
};

export default StandardDomesticRFQDetail;
