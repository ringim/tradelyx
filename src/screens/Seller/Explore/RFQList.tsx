import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';

import {COLORS, SIZES, FONTS, dummyData} from '../../../constants';
import {PromoSection, RFQItem, SearchBox} from '../../../components';
import {ExploreStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';

const RFQList = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <FlatList
        data={dummyData?.rfqItems}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        ListHeaderComponent={
          <View style={{marginTop: SIZES.radius}}>
            {/* Promo */}
            <PromoSection
              containerStyle={{
                marginLeft: SIZES.radius,
              }}
            />

            {/* Search Box */}
            <View
              style={{
                marginHorizontal: SIZES.radius,
                marginTop: SIZES.semi_margin,
              }}>
              <SearchBox
                searchTerm={'Search RFQ item'}
                onSearch={() => navigation.navigate('RFQSearch')}
                onPress={() => navigation.navigate('RFQFilter')}
              />
            </View>

            <View
              style={{marginTop: SIZES.margin, marginHorizontal: SIZES.margin}}>
              <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>
                Latest RFQ
              </Text>
            </View>
          </View>
        }
        renderItem={({item, index}) => {
          // copy to clipboard
          const copyToClipboard = () => {
            Clipboard.setString(item?.rfqNo);
          };
          /* RFQ items */
          return (
            <RFQItem
              key={index}
              item={item}
              onCopy={copyToClipboard}
              onPress={() =>
                navigation.navigate('RFQDetail', {sellerItem: item})
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

export default RFQList;
