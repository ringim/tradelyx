import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useQuery} from '@apollo/client';
import dayjs from 'dayjs';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES} from '../../constants';
import {DEFAULT_PROFILE_IMAGE} from '../../utilities/Utils';
import {useAuthContext} from '../../context/AuthContext';
import {
  ListUserChatRoomsQuery,
  ListUserChatRoomsQueryVariables,
  MessagesByDateQuery,
  MessagesByDateQueryVariables,
  User,
  Message,
  ModelSortDirection,
} from '../../API';
import {listUserChatRooms, messagesByDate} from '../../queries/ChatQueries';

const BChatRoomItem = ({chatRoom}: any) => {
  const navigation = useNavigation<any>();

  const {userID} = useAuthContext();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null); // the display user
  const [lastMessage, setLastMessage] = useState<Message | undefined>();

  // FETCH LAST MESSAGES & FILTER BY MESSAGE ID == chatRoomLastMessageId
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

  // FETCH CHAT ROOM FILTER BY CHATROOM ID AND FIND USERS IN THAT CHATROOM
  const {data, loading} = useQuery<
    ListUserChatRoomsQuery,
    ListUserChatRoomsQueryVariables
  >(listUserChatRooms, {
    pollInterval: 500,
    fetchPolicy: 'network-only',
  });
  const fetchedUsers = async () => {
    const userFetched: any =
      data?.listUserChatRooms?.items
        ?.filter(crUser => crUser?.chatRoomId === chatRoom?.id)
        .map(chatRoomUser => chatRoomUser?.user)
        .find(authUsr => authUsr?.id !== userID) || null;
    setUser(userFetched);
  };

  const onPress = () => {
    navigation.navigate('Chat', {id: chatRoom?.id});
  };

  useEffect(() => {
    fetchedUsers();
  }, [loading]);

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
  }, [lastMessage, onLoad]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={COLORS.primary6} />
      </View>
    );
  }

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <FastImage
        source={{uri: imageUri || DEFAULT_PROFILE_IMAGE}}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
      />

      {/* <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{chatRoom?.newMessages}</Text>
      </View> */}

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user?.title || user?.name}</Text>
          <Text style={styles.text}>
            {dayjs(chatRoom?.lastMessage?.updatedAt).fromNow()}
          </Text>
        </View>
        <Text numberOfLines={1} style={styles.text1}>
          {chatRoom?.lastMessage?.text ||
            chatRoom?.lastMessage?.image ||
            chatRoom?.lastMessage?.file}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SIZES.base,
    marginHorizontal: SIZES.base,
    backgroundColor: COLORS.white,
    marginTop: SIZES.radius,
    justifyContent: 'center',
    borderRadius: SIZES.base,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  badgeContainer: {
    backgroundColor: COLORS.secondary1,
    width: 20,
    height: 20,
    borderRadius: 10,
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
    ...FONTS.body3,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: SIZES.base,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    ...FONTS.h5,
    color: COLORS.black,
    marginBottom: 3,
  },
  text: {
    color: COLORS.gray,
    ...FONTS.cap1,
  },
  text1: {
    color: COLORS.gray,
    ...FONTS.cap1,
    paddingTop: 4,
  },
});

export default BChatRoomItem;
