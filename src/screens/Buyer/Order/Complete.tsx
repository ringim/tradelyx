import {View, Text} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';

import {COLORS, FONTS, SIZES, constants, dummyData} from '../../../constants';
import {OrderItem, OrderTabItem} from '../../../components';

const Complete = () => {
  const navigation = useNavigation<any>();

  const [selectedOption, setSelectedOptions] = useState(true);
  const [value, setValue] = useState('All Orders');
  const [filteredItems, setFilteredItems] = useState<any>('');

  // console.log(value);

  const lastIndex = dummyData?.orders?.length - 1;
  const completed = dummyData?.orders.filter(
    st => st?.status === 'Completed' || st?.status === 'Canceled',
  );

  useEffect(() => {
    const filteredData = dummyData?.orders
      .filter(st => st?.status === 'Completed' || st?.status === 'Canceled')
      .filter(ty => ty?.type === value);
    setFilteredItems(filteredData);
  }, [value]);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{marginHorizontal: SIZES.margin, marginTop: SIZES.margin}}>
        <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>Orders</Text>
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

      {/* OrderItem */}
      <View>
        {value === 'All Orders' ? (
          <FlatList
            data={completed}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item.id}`}
            renderItem={({item, index}) => {
              /* Popular items */
              return (
                <OrderItem
                  item={item}
                  status={true}
                  arrow={true}
                  statusColor={
                    item?.status === 'Completed'
                      ? COLORS.Teal5
                      : item?.status === 'Canceled'
                      ? COLORS.Rose5
                      : COLORS.Neutral6
                  }
                  onPress={() =>
                    navigation.navigate('OrderDetail', {sellerItem: item})
                  }
                />
              );
            }}
            ListFooterComponent={
              <View
                style={{
                  marginBottom: lastIndex ? 300 : 300,
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
              /* Popular items */
              return (
                <OrderItem
                  item={item}
                  status={true}
                  arrow={true}
                  statusColor={
                    item?.status === 'Completed'
                      ? COLORS.Teal5
                      : item?.status === 'Canceled'
                      ? COLORS.Rose5
                      : COLORS.Neutral6
                  }
                  onPress={() =>
                    navigation.navigate('OrderDetail', {sellerItem: item})
                  }
                />
              );
            }}
            ListFooterComponent={
              <View
                style={{
                  marginBottom: lastIndex ? 300 : 300,
                }}
              />
            }
          />
        )}
      </View>
    </View>
  );
};

export default Complete;
