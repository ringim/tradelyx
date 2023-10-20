import {View, Text} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {COLORS, FONTS, SIZES, constants, dummyData} from '../../../constants';
import {OrderItem, OrderTabItem} from '../../../components';

const replyList = dummyData?.replyList;

const Pending = () => {
  const navigation = useNavigation<any>();

  const [selectedOption, setSelectedOptions] = useState(true);
  const [value, setValue] = useState('All Orders');
  const [filteredItems, setFilteredItems] = useState<any>('');

  useEffect(() => {
    const filteredData = dummyData?.orders?.filter(ty => ty?.type === value);
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
            data={dummyData?.orders}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item.id}`}
            renderItem={({item, index}) => {
              /* Popular items */
              return (
                <OrderItem
                  item={item}
                  showHR={true}
                  btn={true}
                  desc={true}
                  type={item?.type}
                  replies={replyList?.length}
                  onPress={() => navigation.navigate('ReplyList', {sellerItem: item})}
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
              /* Popular items */
              return (
                <OrderItem
                  item={item}
                  showHR={true}
                  btn={true}
                  desc={true}
                  type={item?.type}
                  replies={replyList?.length}
                  onPress={() => navigation.navigate('ReplyList', {sellerItem: item})}
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
