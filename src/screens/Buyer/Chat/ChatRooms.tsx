import {View, ActivityIndicator} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {FlatList} from 'react-native-gesture-handler';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {
  BChatRoomItem,
  HR,
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
  const {data: newData} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {id: userID},
    },
  );
  const user: any = newData?.getUser;

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);

  // FETCH CHAT ROOM USERS
  const {loading, data, refetch} = useQuery<
    ListUserChatRoomsQuery,
    ListUserChatRoomsQueryVariables
  >(listUserChatRooms, {
    pollInterval: 500,
    fetchPolicy: 'network-only',
  });

  // SEARCH FILTER
  const searchFilterFunction = (text: any) => {
    if (text) {
      const newData = masterDataSource.filter(function (item: any) {
        const itemData = item.name ? item.name.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const keyExtractor = useCallback(
    (item: any, i: number) => `${i}-${item.id}`,
    [],
  );

  useFocusEffect(
    useCallback(() => {
      let isCurrent = true;
      try {
        const items =
          isCurrent &&
          data?.listUserChatRooms?.items
            ?.filter(cru => cru?.userId === userID)
            .map(chatRoomUser => chatRoomUser?.chatRoom)
            .sort((a: any, b: any) => b?.updatedAt > a?.updatedAt)
            .filter(item => !item?._deleted);
        setFilteredDataSource(items);
        setMasterDataSource(items);
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
    }, [data]),
  );

  if (loading) {
    <ActivityIndicator
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
      }}
      size={'large'}
      color={COLORS.primary6}
    />;
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <TabHeader userImage={user?.logo} />

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

        {filteredDataSource?.length === 0 && <NoItem />}

        <FlatList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={({item}: any) => {
            return <BChatRoomItem chatRoom={item} />;
          }}
          ItemSeparatorComponent={() => <HR />}
          refreshing={loading}
          onRefresh={() => refetch()}
          ListFooterComponent={
            <View style={{marginBottom: []?.length - 1 && 100}}>
              {loading && (
                <ActivityIndicator
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  color={COLORS.primary6}
                />
              )}
            </View>
          }
        />
      </View>
    </Root>
  );
};

export default ChatRooms;
