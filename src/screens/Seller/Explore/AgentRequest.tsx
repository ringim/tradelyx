import {View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';

import {COLORS, SIZES, dummyData} from '../../../constants';
import {AgentRequestItem, NoItem} from '../../../components';
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
      {dummyData?.rffAgentReq?.length === 0 && <NoItem />}

      <FlashList
        data={dummyData?.rffAgentReq}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={item => `${item}`}
        estimatedItemSize={200}
        getItemType={({item}: any) => {
          return item;
        }}
        renderItem={({item, index}) => {
          /* AgentRequestItem items */
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
              marginBottom: dummyData?.rffAgentReq?.length - 1 && 200,
            }}
          />
        }
      />
    </View>
  );
};

export default AgentRequest;
