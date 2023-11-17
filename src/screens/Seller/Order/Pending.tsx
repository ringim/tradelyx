import {View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {COLORS, FONTS, SIZES, constants, dummyData} from '../../../constants';
import {OrderTabItem, SellerOrderItem} from '../../../components';

const replyList = dummyData?.replyList;

const Pending = () => {
  const navigation = useNavigation<any>();

  const [selectedOption, setSelectedOptions] = useState(true);
  const [value, setValue] = useState('All Orders');
  const [filteredItems, setFilteredItems] = useState<any>('');

  useEffect(() => {
    const filteredData = dummyData?.sellPendingOrders?.filter(
      ty => ty?.type === value,
    );
    setFilteredItems(filteredData);
  }, [value]);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{marginHorizontal: SIZES.margin, marginTop: SIZES.margin}}>
        <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>Manage Reply</Text>
      </View>

      {/* Tab Filter Button */}
      <View
        style={{
          marginTop: SIZES.margin,
          marginHorizontal: SIZES.semi_margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: SIZES.base,
          alignSelf: 'flex-start',
        }}>
        {constants.OrderTabItem.map((item: any, index: any) => {
          return (
            <OrderTabItem
              key={`OrderTabItem-${index}`}
              item={item}
              selected={item.id == selectedOption}
              containerStyle={{
                marginLeft: index != 0 ? SIZES.radius : 0,
              }}
              onPress={() => {
                setSelectedOptions(item.id);
                setValue(item.label);
              }}
            />
          );
        })}
      </View>

      {/* Order List */}
      <View>
        {value === 'All Orders' ? (
          <FlatList
            data={dummyData?.sellPendingOrders}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item.id}`}
            renderItem={({item, index}) => {
              return (
                <SellerOrderItem
                  item={item}
                  desc={true}
                  service={true}
                  statusColor={COLORS.Yellow5}
                  onPress={() =>
                    navigation.navigate('DomesticRFQDetail', {sellerItem: item})
                  }
                />
              );
            }}
            ListFooterComponent={
              <View
                style={{
                  marginBottom: filteredItems?.length - 1 && 250,
                }}
              />
            }
          />
        ) : (
          <FlatList
            data={filteredItems}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item.id}`}
            renderItem={({item, index}) => {
              return (
                <SellerOrderItem
                  item={item}
                  desc={true}
                  statusColor={COLORS.Yellow5}
                  onPress={() =>
                    navigation.navigate('DomesticRFQDetail', {sellerItem: item})
                  }
                />
              );
            }}
            ListFooterComponent={
              <View
                style={{
                  marginBottom: filteredItems?.length - 1 && 250,
                }}
              />
            }
          />
        )}
      </View>
    </View>
  );
};

export default Pending;
