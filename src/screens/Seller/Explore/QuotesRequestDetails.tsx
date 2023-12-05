import {View, Platform, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {useNavigation, useRoute} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import {ScrollView} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  ExploreStackNavigatorParamList,
  QuotesRequestDetailsRouteProp,
} from '../../../components/navigation/SellerNav/type/navigation';
import {
  Header,
  OriginDestinationDetails,
  QuoteRequestItem,
  QuoteRequestItem2,
  TextButton,
} from '../../../components';
import {SIZES, COLORS, FONTS, icons} from '../../../constants';
import {
  CreateChatRoomMutation,
  CreateChatRoomMutationVariables,
  CreateMessageMutation,
  CreateMessageMutationVariables,
  CreateUserChatRoomMutation,
  CreateUserChatRoomMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  ListUserChatRoomsQuery,
  ListUserChatRoomsQueryVariables,
  ListUsersQuery,
  ListUsersQueryVariables,
  MessageStatus,
  serviceType,
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
import {useAuthContext} from '../../../context/AuthContext';

const QuotesRequestDetails = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();
  const route: any = useRoute<QuotesRequestDetailsRouteProp>();

  const {authUser}: any = useAuthContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chatRoomUsers, setChatRoomUsers] = useState(null);

  // console.log(route?.params?.quoteItem);
  const {
    loadDate,
    qty,
    containerSize,
    productName,
    container,
    containerType,
    rffType,
    rffNo,
    placeOriginName,
    packageType,
    placeDestinationName,
    placeOriginFlag,
    weight,
    placeDestinationFlag,
    notes,
    relatedServices,
    userID,
    containerDetails,
    handling,
    height,
    length,
  } = route?.params?.quoteItem;

  const onCopy = () => {
    Clipboard.setString(route?.params?.quoteItem?.orderID);
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
              text: "Hello, I'll respond to your RFF request soon",
              rffID: route?.params?.quoteItem?.rffNo,
              requestTitle: route?.params?.quoteItem?.productName,
              requestID: route?.params?.quoteItem?.id,
              serviceType: serviceType?.RFF,
              rffType: rffType,
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

        const res = await doCreateMessage({
          variables: {
            input: {
              SType: 'MESSAGE',
              userID: authUser?.attributes?.sub,
              status: MessageStatus.SENT,
              text: "Hello, I'll respond to your RFF request soon",
              rffID: route?.params?.quoteItem?.rffNo,
              requestTitle: route?.params?.quoteItem?.productName,
              requestID: route?.params?.quoteItem?.id,
              serviceType: serviceType?.RFF,
              rffType: rffType,
              chatroomID: newChatRoom?.id,
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
  if (loading) {
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
        <Header
          title={'Details'}
          tintColor={COLORS.Neutral1}
          contentStyle={{
            paddingTop: Platform.OS == 'ios' ? 15 : SIZES.radius,
            height: Platform.OS === 'android' ? 40 : 65,
          }}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginHorizontal: SIZES.base,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
            }}>
            <QuoteRequestItem
              to={placeDestinationName}
              from={placeOriginName}
              fromImg={placeOriginFlag}
              toImg={placeDestinationFlag}
            />

            <QuoteRequestItem2
              orderID={rffNo}
              onCopy={onCopy}
              packageType={packageType}
              name={productName}
              containerCount={qty}
              transportMode={rffType}
              containerSize={containerSize}
              containerDetails={containerDetails}
              relatedServices={relatedServices}
              container={container}
              containerType={containerType}
              rffType={rffType}
              weight={weight}
              notes={notes}
              handling={handling}
              length={length}
              height={height}
            />

            {/* Origin Details*/}
            <OriginDestinationDetails
              address={placeOriginName}
              type={'Origin'}
              departDate={loadDate}
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
                    {placeDestinationName}
                  </Text>
                </View>
              </View>
            </View>

            {/* Button */}
            <TextButton
              buttonContainerStyle={{
                borderRadius: SIZES.radius,
                marginTop: SIZES.padding,
                marginBottom: 100,
              }}
              label="Contact"
              onPress={onPress}
            />
          </View>
        </ScrollView>
      </View>
    </Root>
  );
};

export default QuotesRequestDetails;
