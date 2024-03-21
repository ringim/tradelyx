import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import {COLORS, FONTS, SIZES, constants, dummyData} from '../../../constants';
import {RFFReplyOrderItem, OrderTabItem} from '../../../components';

const Complete = () => {
  const navigation = useNavigation<any>();

  const [selectedOption, setSelectedOptions] = useState(true);
  const [value, setValue] = useState('All Orders');
  const [filteredItems, setFilteredItems] = useState<any>('');

  // console.log(value);

  const lastIndex = dummyData?.seller_orders?.length - 1;
  const completed = dummyData?.seller_orders.filter(
    st => st?.status === 'Order Completed' || st?.status === 'Order Canceled',
  );

  useEffect(() => {
    let isCurrent = true;
    const filteredData = dummyData?.seller_orders
      .filter(
        st =>
          st?.status === 'Order Completed' || st?.status === 'Order Canceled',
      )
      .filter(ty => ty?.type === value);
    setFilteredItems(filteredData);
    return () => {
      isCurrent = false;
    };
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
      {/* <View>
        {value === 'All Orders' ? (
          <FlatList
            data={completed}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item.id}`}
            renderItem={({item, index}) => {
              return (
                <RFFReplyOrderItem
                  item={item}
                  status={true}
                  desc={true}
                  descStyle={{color: COLORS.Neutral6}}
                  statusColor={
                    item?.status === 'Order Completed'
                      ? COLORS.Teal5
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
              return (
                <RFFReplyOrderItem
                  item={item}
                  status={true}
                  desc={true}
                  descStyle={{color: COLORS.Neutral6}}
                  statusColor={
                    item?.status === 'Order Completed'
                      ? COLORS.Teal5
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
      </View> */}

      {/* <View
        style={{
          marginHorizontal: SIZES.margin,
          alignItems: 'center',
        }}>
        <LottieView
          style={{
            height: 300,
            width: 300,
            alignSelf: 'center',
            marginTop: SIZES.margin,
          }}
          autoPlay
          speed={0.5}
          loop={true}
          source={require('../../../assets/json/comingSoon.json')}
        />
      </View> */}
    </View>
  );
};

export default Complete;
