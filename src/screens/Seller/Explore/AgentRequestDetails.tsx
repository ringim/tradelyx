import {View, Platform} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';

import {
  AgentRequestDetailsRouteProp,
  ExploreStackNavigatorParamList,
} from '../../../components/navigation/SellerNav/type/navigation';
import {Header, TextButton} from '../../../components';
import {SIZES, COLORS} from '../../../constants';

const AgentRequestDetails = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();
  const route: any = useRoute<AgentRequestDetailsRouteProp>();

  // console.log(route?.params?.agentItem);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        title={'Agent Request Details'}
        tintColor={COLORS.Neutral1}
        contentStyle={{
          paddingTop: Platform.OS == 'ios' ? 15 : SIZES.radius,
          height: Platform.OS === 'android' ? 40 : 65,
        }}
      />

    </View>
  );
};

export default AgentRequestDetails;
