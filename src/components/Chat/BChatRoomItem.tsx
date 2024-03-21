import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useQuery} from '@apollo/client';
import dayjs from 'dayjs';
import {Buffer} from 'buffer';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES} from '../../constants';
import {bucket, imageHandlerURL} from '../../utilities/Utils';
import {useAuthContext} from '../../context/AuthContext';
import {
  ListUserChatRoomsQuery,
  ListUserChatRoomsQueryVariables,
  MessagesByDateQuery,
  MessagesByDateQueryVariables,
  User,
  Message,
  ModelSortDirection,
  NotificationsByDateQuery,
  NotificationsByDateQueryVariables,
  NotificationType,
} from '../../API';
import {listUserChatRooms, messagesByDate} from '../../queries/ChatQueries';
import {notificationsByDate} from '../../queries/NotificationQueries';

const BChatRoomItem = ({chatRoom}: any) => {
  const navigation = useNavigation<any>();

  const {userID} = useAuthContext();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null); // the display user
  const [lastMessage, setLastMessage] = useState<Message | undefined>();
  const [msgLength, setMsgLength] = useState<any>('');

  // FETCH LAST MESSAGES & FILTER BY MESSAGE ID == chatRoomLastMessageId
  const {data: onData} = useQuery<
    MessagesByDateQuery,
    MessagesByDateQueryVariables
  >(messagesByDate, {
    fetchPolicy: 'network-only',
    variables: {
      SType: 'MESSAGE',
      sortDirection: ModelSortDirection.DESC,
    },
  });

  // FETCH CHAT ROOM FILTER BY CHATROOM ID AND FIND A USER IN THAT CHATROOM
  const {data} = useQuery<
    ListUserChatRoomsQuery,
    ListUserChatRoomsQueryVariables
  >(listUserChatRooms, {pollInterval: 500});
  const fetchedUsers = async () => {
    const userFetched: any =
      data?.listUserChatRooms?.items
        ?.filter(crUser => crUser?.chatRoomId === chatRoom?.id)
        .map(chatRoomUser => chatRoomUser?.user)
        .find(authUsr => authUsr?.id !== userID) || null;
    setUser(userFetched);
  };

  // LIST NOTIFICATIONS
  const {data: newData} = useQuery<
    NotificationsByDateQuery,
    NotificationsByDateQueryVariables
  >(notificationsByDate, {
    pollInterval: 500,
    variables: {
      SType: 'NOTIFICATION',
      sortDirection: ModelSortDirection.DESC,
    },
  });

  const getAllNotifications = () => {
    const allNotifee =
      newData?.notificationsByDate?.items
        ?.filter(type => type?.type === NotificationType?.MESSAGE)
        ?.filter(usrID => usrID?.actorID !== userID)
        ?.filter(crID => crID?.chatroomID === chatRoom?.id)
        ?.filter(item => !item?.readAt) || [];

    const number = allNotifee?.length;

    if (isNaN(number)) {
      return undefined;
    } else {
      setMsgLength(number > 99 ? '100+' : `${number}`);
    }
  };

  const onPress = () => {
    navigation.navigate('Chat', {id: chatRoom?.id});
  };

  useEffect(() => {
    getAllNotifications();
  }, [newData]);

  useEffect(() => {
    fetchedUsers();
  }, [data]);

  useEffect(() => {
    if (user?.logo) {
      Storage.get(user?.logo).then(setImageUri);
    }
  }, [user?.logo]);

  useEffect(() => {
    if (!chatRoom.chatRoomLastMessageId) {
      return;
    }
    const getLM: any = onData?.messagesByDate?.items?.find(
      lm => lm?.id === chatRoom?.chatRoomLastMessageId,
    );
    setLastMessage(getLM);
  }, [lastMessage]);

  // IMAGE REQUEST
  const uriImage = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${user?.logo}`,
      contentModeration: true,
      edits: {
        resize: {
          width: 50,
          height: 50,
          fit: 'cover',
        },
      },
    });
    const encodedImg = Buffer.from(imageRequest).toString('base64');
    return imageHandlerURL + encodedImg;
  }, [user?.logo, imageUri]);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={{justifyContent: 'center'}}>
        <FastImage
          source={{uri: uriImage}}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />

        {msgLength > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{msgLength}</Text>
          </View>
        )}
      </View>

      <View
        style={[
          styles.rightContainer,
          {marginLeft: msgLength > 99 ? SIZES.semi_margin : 0},
        ]}>
        <View>
          <Text numberOfLines={1} style={styles.name}>
            {user?.title || user?.name}
          </Text>
        </View>
        <Text numberOfLines={1} style={styles.text1}>
          {chatRoom?.lastMessage?.text ||
            chatRoom?.lastMessage?.image ||
            chatRoom?.lastMessage?.file}
        </Text>
      </View>

      <View style={{justifyContent: 'center'}}>
        <Text style={styles.text}>
          {dayjs(chatRoom?.lastMessage?.updatedAt).fromNow()}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SIZES.base,
    marginHorizontal: 4,
    backgroundColor: COLORS.white,
    marginTop: 4,
    justifyContent: 'center',
    borderRadius: SIZES.base,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.primary1,
  },
  badgeContainer: {
    backgroundColor: COLORS.secondary1,
    padding: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 45,
    top: 10,
  },
  badgeText: {
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: '600',
    ...FONTS.body3,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    ...FONTS.h5,
    color: COLORS.black,
    marginBottom: 3,
  },
  text: {
    color: COLORS.gray,
    ...FONTS.cap2,
  },
  text1: {
    color: COLORS.Neutral5,
    ...FONTS.cap2,
    paddingTop: 2,
  },
});

export default BChatRoomItem;
