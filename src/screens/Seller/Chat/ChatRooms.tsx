import {View, ActivityIndicator, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useMutation, useQuery} from '@apollo/client';

import {SChatRoomItem, HR, SearchBox2, TabHeader2} from '../../../components';
import {COLORS, SIZES} from '../../../constants';
import {getUser} from '../../../queries/UserQueries';
import {useAuthContext} from '../../../context/AuthContext';
import {
  GetUserQuery,
  GetUserQueryVariables,
  ListUserChatRoomsQuery,
  ListUserChatRoomsQueryVariables,
  NotificationsByDateQuery,
  NotificationsByDateQueryVariables,
  ModelSortDirection,
  UpdateNotificationMutation,
  UpdateNotificationMutationVariables,
  NotificationType,
} from '../../../API';
import {ChatStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {listUserChatRooms} from '../../../queries/ChatQueries';
import {
  notificationsByDate,
  updateNotification,
} from '../../../queries/NotificationQueries';

const ChatRooms = () => {
  const navigation = useNavigation<ChatStackNavigatorParamList>();
  const {userID} = useAuthContext();

  // GET USER DETAILS
  const {data: newData, loading: newLoad} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {
    variables: {id: userID},
  });
  const user: any = newData?.getUser;

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);

  // FETCH CHAT ROOM USERS
  const {loading, data, refetch} = useQuery<
    ListUserChatRoomsQuery,
    ListUserChatRoomsQueryVariables
  >(listUserChatRooms, {
    fetchPolicy: 'network-only',
  });

  // SEARCH FILTER
  const searchFilterFunction = (text: any) => {
    if (text) {
      const newData = masterDataSource.filter(function (item: any) {
        const newInf = item.name ? item.name.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return newInf.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  // LIST NOTIFICATIONS
  const {data: onData, loading: onLoad} = useQuery<
    NotificationsByDateQuery,
    NotificationsByDateQueryVariables
  >(notificationsByDate, {
    variables: {
      SType: 'NOTIFICATION',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const allNotifee =
    onData?.notificationsByDate?.items
      ?.filter(ty => ty?.type === NotificationType?.MESSAGE)
      ?.filter(usrID => usrID?.userID !== userID)
      ?.filter(msg => msg?.Message)
      ?.filter((item: any) => !item?._deleted && !item?.readAt) || [];

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

  useEffect(() => {
    let isCurrent = true;
    if (!data?.listUserChatRooms?.items || !userID) {
      return;
    }
    const items = data.listUserChatRooms.items
      .filter(cru => cru?.userId === userID)
      .map(chatRoomUser => chatRoomUser?.chatRoom);

    const sortedRooms = items.sort(
      (r1: any, r2: any) => +new Date(r2?.updatedAt) - +new Date(r1?.updatedAt),
    );

    if (isCurrent) {
      setFilteredDataSource(sortedRooms);
      setMasterDataSource(sortedRooms);
    }

    return () => {
      isCurrent = false;
    };
  }, [data, userID]);

  if (loading || newLoad || onLoad) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={COLORS.primary6} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <TabHeader2 userImage={user?.logo} />

      {/* Search Box */}
      <SearchBox2
        searchFilterFunction={(text: any) => searchFilterFunction(text)}
        search={search}
        onPress={() => navigation.navigate('SearchFilter')}
        containerStyle={{
          marginHorizontal: SIZES.margin,
          marginBottom: SIZES.base,
        }}
      />

      <FlatList
        data={filteredDataSource}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item?.id}`}
        renderItem={({item}: any) => {
          return <SChatRoomItem chatRoom={item} />;
        }}
        ItemSeparatorComponent={() => <HR />}
        refreshing={loading}
        onRefresh={() => refetch()}
        ListFooterComponent={
          <View style={{marginBottom: []?.length - 1 ? 300 : 300}} />
        }
      />
    </View>
  );
};

export default ChatRooms;
