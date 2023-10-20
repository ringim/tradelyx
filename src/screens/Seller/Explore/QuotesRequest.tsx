import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {COLORS, SIZES, dummyData} from '../../../constants';
import {RFFQuoteItem} from '../../../components';
import {ExploreStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';

const QuotesRequest = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();

  return (
    <View
      style={{
        flex: 1,
        marginTop: SIZES.radius,
        backgroundColor: COLORS.white,
      }}>
      <FlatList
        data={dummyData?.rffItems}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={item => `${item.id}`}
        renderItem={({item, index}) => {
          /* RFF items */
          return (
            <RFFQuoteItem
              key={index}
              item={item}
              onPress={() =>
                navigation.navigate('QuotesRequestDetails', {quoteItem: item})
              }
            />
          );
        }}
        ListFooterComponent={
          <View
            style={{
              marginBottom: 200,
            }}
          />
        }
      />
    </View>
  );
};

export default QuotesRequest;
