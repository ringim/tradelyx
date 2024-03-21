import {Platform, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';

import {
  BChatRoomItem,
  LoadingIndicator,
  NoItem,
  SearchBox2,
  TabHeader,
} from '../../../components';
import {COLORS, SIZES} from '../../../constants';
import {getUser} from '../../../queries/UserQueries';
import {useAuthContext} from '../../../context/AuthContext';
import {
  GetUserQuery,
  GetUserQueryVariables,
  ListUserChatRoomsQuery,
  ListUserChatRoomsQueryVariables,
} from '../../../API';
import {ChatStackNavigatorParamList} from '../../../components/navigation/BuyerNav/type/navigation';
import {listUserChatRooms} from '../../../queries/ChatQueries';

const ChatRooms = () => {
  const navigation = useNavigation<ChatStackNavigatorParamList>();
  const {userID} = useAuthContext();

  // GET USER DETAILS
  const {data: newData, loading: newLoad} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {variables: {id: userID}});
  const user: any = newData?.getUser;

  // const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);

  // FETCH CHAT ROOM USERS
  const {loading, data, refetch} = useQuery<
    ListUserChatRoomsQuery,
    ListUserChatRoomsQueryVariables
  >(listUserChatRooms, {
    pollInterval: 500,
  });

  // SEARCH FILTER
  // const searchFilterFunction = (text: any) => {
  //   if (text) {
  //     const newData = masterDataSource.filter(function (item: any) {
  //       const itemData = item.name ? item.name.toLowerCase() : ''.toLowerCase();
  //       const textData = text.toLowerCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     setFilteredDataSource(newData);
  //     setSearch(text);
  //   } else {
  //     setFilteredDataSource(masterDataSource);
  //     setSearch(text);
  //   }
  // };

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
    }

    return () => {
      isCurrent = false;
    };
  }, [data, userID]);

  if (loading || newLoad) {
    return <LoadingIndicator />;
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
      <TabHeader
        userImage={user?.logo}
        containerStyle={{
          height:
            Platform.OS == 'ios' ? (SIZES.height > 700 ? '15%' : '15%') : '10%',
          marginBottom: SIZES.base,
        }}
      />

      {/* Search Box */}
      {/* <SearchBox2
        searchFilterFunction={(text: any) => searchFilterFunction(text)}
        search={search}
        onPress={() => navigation.navigate('SearchFilter')}
        containerStyle={{
          marginHorizontal: SIZES.margin,
          marginBottom: SIZES.base,
        }}
      /> */}

      <FlatList
        data={filteredDataSource}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item?.id}`}
        renderItem={({item}: any) => {
          return <BChatRoomItem chatRoom={item} />;
        }}
        refreshing={loading}
        onRefresh={() => refetch()}
        ListFooterComponent={
          <View style={{marginBottom: []?.length - 1 ? 300 : 300}} />
        }
      />

      {filteredDataSource?.length === 0 && (
        <NoItem containerStyle={{top: -250}} textCont={{top: -250}} />
      )}
    </View>
  );
};

export default ChatRooms;
