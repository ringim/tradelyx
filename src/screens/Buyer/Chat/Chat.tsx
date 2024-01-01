import {View} from 'react-native';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useCallback, useState} from 'react';
import {Storage} from 'aws-amplify';
import {FlatList} from 'react-native-gesture-handler';
import {useQuery, useMutation, useSubscription} from '@apollo/client';

import {
  ChatHeader,
  LoadingIndicator,
  Message,
  MessageInput,
} from '../../../components';
import {COLORS} from '../../../constants';
import {ChatRouteProp} from '../../../components/navigation/BuyerNav/type/navigation';
import {useAuthContext} from '../../../context/AuthContext';
import {
  MessagesByDateQuery,
  MessagesByDateQueryVariables,
  ModelSortDirection,
  Message as MessageModel,
  ListUserChatRoomsQuery,
  ListUserChatRoomsQueryVariables,
  OnCreateMessageByChatRoomIDSubscription,
  OnCreateMessageByChatRoomIDSubscriptionVariables,
  UpdateNotificationMutation,
  UpdateNotificationMutationVariables,
  NotificationsByDateQuery,
  NotificationsByDateQueryVariables,
  NotificationType,
} from '../../../API';
import {
  listUserChatRooms,
  messagesByDate,
  onCreateMessageByChatRoomID,
} from '../../../queries/ChatQueries';
import {
  notificationsByDate,
  updateNotification,
} from '../../../queries/NotificationQueries';

const Chat = () => {
  const {userID} = useAuthContext();

  const route: any = useRoute<ChatRouteProp>();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageModel[] | any>([]);

  // FETCH CHAT ROOM ID FILTER BY CHATROOM ID TO FIND USERS NAME & IMAGE IN THAT CHATROOM
  const {data: newData} = useQuery<
    ListUserChatRoomsQuery,
    ListUserChatRoomsQueryVariables
  >(listUserChatRooms);
  const fetchUsers: any =
    newData?.listUserChatRooms?.items
      .filter(cru => cru?.chatRoomId === route?.params?.id)
      .map(chatRoomUser => chatRoomUser?.user)
      .find(authUsr => authUsr?.id !== userID) || null;

  // ON CREATE MESSAGE SUBSCRIPTION
  const {data} = useSubscription<
    OnCreateMessageByChatRoomIDSubscription,
    OnCreateMessageByChatRoomIDSubscriptionVariables
  >(onCreateMessageByChatRoomID, {
    variables: {chatroomID: route?.params?.id},
  });

  // LIST MESSAGES
  const {data: onData, loading: onLoad} = useQuery<
    MessagesByDateQuery,
    MessagesByDateQueryVariables
  >(messagesByDate, {
    fetchPolicy: 'network-only',
    variables: {
      SType: 'MESSAGE',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const fetchedMessages: any =
    onData?.messagesByDate?.items
      ?.filter((msg: any) => msg?.chatroomID === route?.params?.id)
      .filter((item: any) => !item?._deleted) || [];

  // LIST NOTIFICATIONS
  const {data: softData} = useQuery<
    NotificationsByDateQuery,
    NotificationsByDateQueryVariables
  >(notificationsByDate, {
    pollInterval: 500,
    fetchPolicy: 'network-only',
    variables: {
      SType: 'NOTIFICATION',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const allNotifee =
    softData?.notificationsByDate?.items
      ?.filter(type => type?.type === NotificationType?.MESSAGE)
      ?.filter(usrID => usrID?.userID !== userID)
      ?.filter(crID => crID?.Message?.chatroomID === route?.params?.id)
      ?.filter(item => !item?.readAt) || [];

  // UPDATE NOTIFICATION
  const [doUpdateNotification] = useMutation<
    UpdateNotificationMutation,
    UpdateNotificationMutationVariables
  >(updateNotification);

  // RENDER CREATE MESSAGE SUBSCRIPTION UPDATE
  useEffect(() => {
    if (data?.onCreateMessageByChatRoomID) {
      setMessages((existingMessages: MessageModel[]) => [
        data?.onCreateMessageByChatRoomID,
        ...existingMessages,
      ]);
    }
  }, [data]);

  useEffect(() => {
    if (fetchUsers?.logo) {
      Storage.get(fetchUsers?.logo).then(setImageUri);
    }
  }, [fetchUsers?.logo]);

  useFocusEffect(
    useCallback(() => {
      const readNotifications = async () => {
        const unreadNotifee = allNotifee?.filter(n => !n?.readAt);

        await Promise.all(
          unreadNotifee.map(
            notification =>
              notification &&
              doUpdateNotification({
                variables: {
                  input: {
                    id: notification?.id,
                    readAt: new Date().getTime(),
                  },
                },
              }),
          ),
        );
      };
      readNotifications();
    }, [allNotifee]),
  );

  if (onLoad) {
    return <LoadingIndicator />;
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
      <ChatHeader name={fetchUsers?.title} image={imageUri} />

      <FlatList
        data={[...messages, ...fetchedMessages]}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return <Message message={item} />;
        }}
        inverted
        ListFooterComponent={
          <View style={{marginBottom: messages?.length - 1 ? 300 : 300}} />
        }
      />
      <MessageInput chatRoom={route?.params} />
    </View>
  );
};

export default Chat;
