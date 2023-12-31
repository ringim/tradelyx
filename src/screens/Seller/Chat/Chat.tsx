import {View} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
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
import {
  ChatRouteProp,
  ChatStackNavigatorParamList,
} from '../../../components/navigation/SellerNav/type/navigation';
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
  UpdateMessageMutation,
  UpdateMessageMutationVariables,
} from '../../../API';
import {
  listUserChatRooms,
  messagesByDate,
  onCreateMessageByChatRoomID,
  updateMessage,
} from '../../../queries/ChatQueries';

const Chat = () => {
  const {userID} = useAuthContext();

  const navigation = useNavigation<ChatStackNavigatorParamList>();
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

  // UPDATE NOTIFICATION
  const [doUpdateMessage] = useMutation<
    UpdateMessageMutation,
    UpdateMessageMutationVariables
  >(updateMessage);

  useEffect(() => {
    const readMessages = async () => {
      const unreadMessages = fetchedMessages?.filter(
        (n: {readAt: any}) => !n?.readAt,
      );

      await Promise.all(
        unreadMessages.map(
          (message: {id: any}) =>
            message &&
            doUpdateMessage({
              variables: {
                input: {
                  id: message?.id,
                  readAt: new Date().getTime(),
                },
              },
            }),
        ),
      );
    };

    readMessages();
  }, [fetchedMessages]);

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

  if (onLoad) {
    return <LoadingIndicator />;
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
      <ChatHeader
        name={fetchUsers?.name}
        image={imageUri}
        showPlus={true}
        onPress={() =>
          navigation.navigate('CustomSellOffer', {crID: route?.params?.id})
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
        ListFooterComponent={
          <View style={{marginBottom: messages?.length - 1 ? 300 : 300}} />
        }
      />
      <MessageInput chatRoom={route?.params} />
    </View>
  );
};

export default Chat;
