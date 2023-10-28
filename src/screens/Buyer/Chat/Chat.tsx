import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {useQuery} from '@apollo/client';
import {TabHeader} from '../../../components';
import {useNavigation} from '@react-navigation/native';

import {COLORS} from '../../../constants';
import {getUser} from '../../../queries/UserQueries';
import {useAuthContext} from '../../../context/AuthContext';
import {GetUserQuery, GetUserQueryVariables} from '../../../API';
import {HomeStackNavigatorParamList} from '../../../components/navigation/BuyerNav/type/navigation';

const Chat = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const {userID} = useAuthContext();

  // GET USER DETAILS
  const {loading, data} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: userID}},
  );
  const user: any = data?.getUser;

  if (loading) {
    <ActivityIndicator
      style={{flex: 1, justifyContent: 'center'}}
      size={'large'}
      color={COLORS.primary6}
    />;
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <TabHeader userImage={user?.logo} />

      <Text>Chat</Text>
    </View>
  );
};

export default Chat;
