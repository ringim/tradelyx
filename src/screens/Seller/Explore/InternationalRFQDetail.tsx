import {View, ScrollView, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';
import {useMutation, useQuery} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import Spinner from 'react-native-loading-spinner-overlay';
import Clipboard from '@react-native-clipboard/clipboard';

import {COLORS} from '../../../constants';
import {
  Header,
  InternationalRFQDetail1,
  InternationalRFQDetail2,
  InternationalRFQDetail3,
} from '../../../components';
import {
  ExploreStackNavigatorParamList,
  StandardDomesticRFQDetailRouteProp,
} from '../../../components/navigation/SellerNav/type/navigation';
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
import {useAuthContext} from '../../../context/AuthContext';

const InternationalDomesticRFQDetail = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();
  const route: any = useRoute<StandardDomesticRFQDetailRouteProp>();
  const {rfqNo, userID, expiryDate, budget}: any = route?.params?.rfqItem;

  const {authUser}: any = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const expiryDateString = expiryDate;
  const expiryPeriod = dayjs(expiryDateString);
  const currentDate = dayjs();
  const daysUntilExpiry = expiryPeriod.diff(currentDate, 'day');

  const onCopy = () => {
    Clipboard.setString(rfqNo);
  };

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

  // LIST CHAT ROOM USERS
  const {data: newData, loading: newLoad} = useQuery<
    ListUserChatRoomsQuery,
    ListUserChatRoomsQueryVariables
  >(listUserChatRooms);
  const allChatRoomUsers: any = newData?.listUserChatRooms?.items.find(
    usrID => usrID?.userId === userID,
  );

  // LIST USERS
  const {data: onData, loading: onLoad} = useQuery<
    ListUsersQuery,
    ListUsersQueryVariables
  >(listUsers);
  const crUsers = onData?.listUsers?.items.some(usrID =>
    usrID?.ChatRooms?.items.find(
      crID => crID?.chatRoomId === allChatRoomUsers?.chatRoomId,
    ),
  );

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
      if (crUsers === true) {
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
              rfqType: RFQTYPE.INTERNATIONAL,
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
              name: userInfo?.name,
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
          <InternationalRFQDetail1
            daysUntilExpiry={daysUntilExpiry}
            onCopy={onCopy}
            placeOriginFlag={route?.params?.rfqItem?.placeOriginFlag}
            placeOriginName={route?.params?.rfqItem?.placeOriginName}
            placeDestinationFlag={route?.params?.rfqItem?.placeDestinationFlag}
            placeDestination={route?.params?.rfqItem?.placeDestination}
            rfqNo={route?.params?.rfqItem?.rfqNo}
            expiryDate={route?.params?.rfqItem?.expiryDate}
          />

          <InternationalRFQDetail2
            description={route?.params?.rfqItem?.description}
            title={route?.params?.rfqItem?.title}
            qty={route?.params?.rfqItem?.qty}
            productName={route?.params?.rfqItem?.productName}
            buyFrequency={route?.params?.rfqItem?.buyFrequency}
            paymentMethod={route?.params?.rfqItem?.paymentMethod}
            incoterms={route?.params?.rfqItem?.incoterms}
            unit={route?.params?.rfqItem?.unit}
            requestCategory={route?.params?.rfqItem?.requestCategory}
          />

          <InternationalRFQDetail3
            tags={route?.params?.rfqItem?.tags}
            budget={route?.params?.rfqItem?.budget}
            onPress={onPress}
            documents={route?.params?.rfqItem?.documents}
          />
        </ScrollView>
      </View>
    </Root>
  );
};

export default InternationalDomesticRFQDetail;
