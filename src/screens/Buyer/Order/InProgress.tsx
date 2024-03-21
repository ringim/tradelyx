import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import LottieView from 'lottie-react-native';

import {COLORS, FONTS, SIZES, constants, dummyData} from '../../../constants';
import {OrderTabItem, RFFOrderItem, RFQOrderItem} from '../../../components';

const InProgress = () => {
  const navigation = useNavigation<any>();

  const [selectedOption, setSelectedOptions] = useState(true);
  const [value, setValue] = useState('All Orders');
  const [filteredItems, setFilteredItems] = useState<any>('');

  const myDate: DateConstructor | any = Date;

  const lastIndex = dummyData?.orders?.length - 1;
  const inProgress = dummyData?.orders
    .filter(
      st =>
        st?.status !== 'Completed' &&
        st?.status !== 'Canceled' &&
        st?.status !== 'Waiting for Payment',
    )
    .sort((a, b) => myDate(b.time) - myDate(a.time));

  useEffect(() => {
    let isCurrent = true;
    const filteredData =
      isCurrent &&
      dummyData?.orders
        .filter(
          st =>
            st?.status !== 'Completed' &&
            st?.status !== 'Canceled' &&
            st?.status !== 'Waiting for Payment',
        )
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
                setSelectedOptions(item?.id);
                setValue(item.label);
              }}
            />
          );
        })}
      </View>

      {/* Order List */}
      {/* <View>
        {value === 'All Orders' ? (
          <FlatList
            data={inProgress}
            keyExtractor={item => item?.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <RFFOrderItem
                  key={index}
                  item={item}
                  status={true}
                  arrow={true}
                  statusColor={
                    item?.status === 'Waiting for Payment'
                      ? COLORS.Rose5
                      : item?.status === 'Pending'
                      ? COLORS.Yellow5
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
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <RFQOrderItem
                  key={index}
                  item={item}
                  status={true}
                  arrow={true}
                  statusColor={
                    item?.status === 'Waiting for Payment'
                      ? COLORS.Rose5
                      : item?.status === 'Pending'
                      ? COLORS.Yellow5
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

export default InProgress;
