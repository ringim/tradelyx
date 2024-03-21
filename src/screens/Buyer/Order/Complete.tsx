import {View, Text, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import {COLORS, FONTS, SIZES, constants, dummyData} from '../../../constants';
import {
  NoItem,
  OrderTabItem,
  RFFOrderItem,
  RFQOrderItem,
} from '../../../components';

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
    let isCurrent = true;
    const filteredData =
      isCurrent &&
      dummyData?.orders
        .filter(st => st?.status === 'Completed' || st?.status === 'Canceled')
        .filter(ty => ty?.type === value);
    setFilteredItems(filteredData);
    return () => {
      isCurrent = false;
    };
  }, [value]);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
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
            keyExtractor={item => `${item?.id}`}
            renderItem={({item, index}) => {
              return (
                <RFFOrderItem
                  key={index}
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
            keyExtractor={item => `${item?.id}`}
            renderItem={({item, index}) => {
              return (
                <RFQOrderItem
                  item={item}
                  key={index}
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
            // refreshControl={
            //   <RefreshControl
            //     tintColor={COLORS.primary6}
            //     refreshing={newLoad}
            //     onRefresh={() => refetch()}
            //   />
            // }
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
      <View
        style={{
          marginHorizontal: SIZES.margin,
          alignItems: 'center',
        }}>
        {/* <LottieView
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
        /> */}
      </View>
    </View>
  );
};

export default Complete;
