import {View} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {useQuery, useMutation, useSubscription} from '@apollo/client';

import {
  ChatHeader,
  LoadingIndicator,
  Message,
  MessageInput,
} from '../../../components';
import {COLORS} from '../../../constants';
import {ChatRouteProp} from '../../../components/navigation/SellerNav/type/navigation';
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
  User,
} from '../../../API';
import {
  notificationsByDate,
  updateNotification,
} from '../../../queries/NotificationQueries';
import {
  listUserChatRooms,
  messagesByDate,
  onCreateMessageByChatRoomID,
} from '../../../queries/ChatQueries';
import {FlatList} from 'react-native-gesture-handler';

const Chat = () => {
  const {userID} = useAuthContext();

  const navigation = useNavigation<any>();
  const route: any = useRoute<ChatRouteProp>();

  const [messages, setMessages] = useState<MessageModel[] | any>([]);
  const [user, setUser] = useState<User | null>(null); // the display user

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

  // FETCH CHAT ROOM FILTER BY CHATROOM ID AND FIND A USER IN THAT CHATROOM
  const {data: nowData, loading: nowLoad} = useQuery<
    ListUserChatRoomsQuery,
    ListUserChatRoomsQueryVariables
  >(listUserChatRooms, {pollInterval: 500});
  const fetchedUsers = async () => {
    const userFetched: any =
      nowData?.listUserChatRooms?.items
        ?.filter(crUser => crUser?.chatRoomId === route?.params?.id)
        .map(chatRoomUser => chatRoomUser?.user)
        .find(authUsr => authUsr?.id !== userID) || null;
    setUser(userFetched);
  };

  useEffect(() => {
    fetchedUsers();
  }, [nowData]);

  // LIST NOTIFICATIONS
  const {data: softData} = useQuery<
    NotificationsByDateQuery,
    NotificationsByDateQueryVariables
  >(notificationsByDate, {
    pollInterval: 500,
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

  // RENDER CREATE MESSAGE SUBSCRIPTION UPDATE
  useEffect(() => {
    if (data?.onCreateMessageByChatRoomID && navigation) {
      setMessages((existingMessages: MessageModel[]) => [
        data?.onCreateMessageByChatRoomID,
        ...existingMessages,
      ]);
    }
  }, [data, navigation]);

  if (onLoad || nowLoad) {
    return <LoadingIndicator />;
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
      <ChatHeader
        name={user?.name}
        userImage={user?.logo}
        showPlus={true}
        onPress={() =>
          navigation.navigate('CustomSellOffer', {
            crID: route?.params?.id,
            forUserID: user?.id,
          })
        }
      />

      <FlatList
        data={[...messages, ...fetchedMessages]}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return <Message message={item} />;
        }}
        inverted
      />
      <MessageInput chatRoom={route?.params} />
    </View>
  );
};

export default Chat;
