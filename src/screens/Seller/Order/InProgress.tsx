import {View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';

import {COLORS, FONTS, SIZES, constants, dummyData} from '../../../constants';
import {OrderItem, OrderTabItem, SellerOrderItem} from '../../../components';

const InProgress = () => {
  const navigation = useNavigation<any>();

  const [selectedOption, setSelectedOptions] = useState(true);
  const [value, setValue] = useState('All Orders');
  const [filteredItems, setFilteredItems] = useState<any>('');

  const myDate: DateConstructor | any = Date;

  const lastIndex = dummyData?.seller_orders?.length - 1;
  const inProgress = dummyData?.seller_orders
    .filter(
      st => st?.status !== 'Order Completed' && st?.status !== 'Order Canceled',
    )
    .sort((a, b) => myDate(b.time) - myDate(a.time));

  // console.log(inProgress);

  useEffect(() => {
    const filteredData = dummyData?.seller_orders
      .filter(
        st =>
          st?.status !== 'Order Completed' && st?.status !== 'Order Canceled',
      )
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

      {/* Order List */}
      <View>
        {value === 'All Orders' ? (
          <FlatList
            data={inProgress}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item.id}`}
            renderItem={({item, index}) => {
              /* Popular items */
              return (
                <SellerOrderItem
                  item={item}
                  desc={true}
                  descStyle={{color: COLORS.Neutral6}}
                  statusColor={
                    item?.status === 'Dispute Resolution'
                      ? COLORS.Rose5
                      : COLORS.Blue5
                  }
                  onPress={() =>
                    navigation.navigate('ProgressOrderDetail', {
                      orderItem: item,
                    })
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
                <SellerOrderItem
                  item={item}
                  desc={true}
                  descStyle={{color: COLORS.Neutral6}}
                  statusColor={
                    item?.status === 'Dispute Resolution'
                      ? COLORS.Rose5
                      : COLORS.Blue5
                  }
                  onPress={() =>
                    navigation.navigate('ProgressOrderDetail', {
                      orderItem: item,
                    })
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

export default InProgress;
