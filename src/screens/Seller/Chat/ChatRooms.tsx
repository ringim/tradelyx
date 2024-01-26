import {Platform, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';

import {
  SChatRoomItem,
  SearchBox2,
  TabHeader2,
  LoadingIndicator,
  NoItem,
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
import {ChatStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
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
  // const handleSearch = (text: any) => {
  //   setSearch(text);
  //   const filteredItems = filteredDataSource.filter((item: any) =>
  //     item?.name.toLowerCase().includes(text.toLowerCase()),
  //   );
  //   setFilteredDataSource(filteredItems);
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
      <TabHeader2
        userImage={user?.logo}
        containerStyle={{
          paddingTop:
            Platform.OS == 'ios'
              ? SIZES.height > 700
                ? 50
                : SIZES.semi_margin
              : SIZES.base,
          height: Platform.OS == 'ios' ? '14%' : '9%',
          marginBottom: SIZES.base,
        }}
      />

      {/* Search Box */}
      {/* <SearchBox2
        searchFilterFunction={(text: any) => handleSearch(text)}
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
          return <SChatRoomItem chatRoom={item} />;
        }}
        refreshing={loading}
        onRefresh={() => refetch()}
        ListFooterComponent={
          <View style={{marginBottom: []?.length - 1 ? 300 : 300}} />
        }
      />

      {filteredDataSource?.length === 0 && (
        <NoItem containerStyle={{top: -350}} textCont={{top: -350}} />
      )}
    </View>
  );
};

export default ChatRooms;
