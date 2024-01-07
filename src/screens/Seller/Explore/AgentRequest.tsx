import {View, FlatList} from 'react-native';
import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import {COLORS, SIZES, dummyData} from '../../../constants';
import {AgentRequestItem} from '../../../components';
import {ExploreStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';

const AgentRequest = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();

  return (
    <View
      style={{
        flex: 1,
        marginTop: SIZES.radius,
        backgroundColor: COLORS.white,
      }}>
      <View
        style={{
          marginHorizontal: SIZES.margin,
          alignItems: 'center',
        }}>
        <LottieView
          style={{height: 300, width: 300, alignSelf: 'center', marginTop: SIZES.margin}}
          autoPlay
          speed={0.5}
          loop={true}
          source={require('../../../assets/json/comingSoon.json')}
        />
      </View>

      {/* <FlatList
        data={dummyData?.rffAgentReq}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={item => item?.id}
        renderItem={({item, index}) => {
          return (
            <AgentRequestItem
              key={index}
              item={item}
              onPress={() =>
                navigation.navigate('AgentRequestDetails', {agentItem: item})
              }
            />
          );
        }}
        ListFooterComponent={
          <View
            style={{
              marginBottom: dummyData?.rffAgentReq?.length - 1 && 100,
            }}
          />
        }
      />  */}
    </View>
  );
};

export default AgentRequest;
