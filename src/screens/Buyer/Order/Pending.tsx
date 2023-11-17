import {View, Text, ActivityIndicator} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';

import {COLORS, FONTS, SIZES, constants} from '../../../constants';
import {OrderTabItem, RFFOrderItem, RFQOrderItem} from '../../../components';
import {
  ModelSortDirection,
  RfqByDateQuery,
  RfqByDateQueryVariables,
  RffByDateQuery,
  RffByDateQueryVariables,
} from '../../../API';
import {rffByDate, rfqByDate} from '../../../queries/RequestQueries';

const Pending = () => {
  const navigation = useNavigation<any>();

  // LIST RFQs
  const {data, loading} = useQuery<RfqByDateQuery, RfqByDateQueryVariables>(
    rfqByDate,
    {
      pollInterval: 500,
      variables: {
        SType: 'RFQ',
        sortDirection: ModelSortDirection.DESC,
      },
    },
  );

  // LIST RFFs
  const {data: newData, loading: newLoad} = useQuery<
    RffByDateQuery,
    RffByDateQueryVariables
  >(rffByDate, {
    pollInterval: 500,
    variables: {
      SType: 'RFF',
      sortDirection: ModelSortDirection.DESC,
    },
  });

  const allRFQs =
    data?.rfqByDate?.items.filter((item: any) => !item?._deleted) || [];
  const allRFFs =
    newData?.rffByDate?.items.filter((item: any) => !item?._deleted) || [];
  const allOrders = [...allRFFs, ...allRFQs];

  const [selectedOption, setSelectedOptions] = useState(true);
  const [itemSelected, setItemSelect] = useState<any>('RFF');
  const [dataList, setDataList] = useState<any>(allOrders);

  useFocusEffect(
    useCallback(() => {
      let isCurrent = true;
      const onChangeSelectionItem = (item: any) => {
        if (itemSelected === 'RFF') {
          isCurrent &&
            setDataList([
              ...allOrders.filter(x => x?.__typename === itemSelected),
            ]);
        } else if (itemSelected === 'RFQ') {
          isCurrent &&
            setDataList([
              ...allOrders.filter(x => x?.__typename === itemSelected),
            ]);
        } else {
          isCurrent && setItemSelect(item);
        }
      };
      onChangeSelectionItem(itemSelected);
      return () => {
        isCurrent = false;
      };
    }, [itemSelected, loading, newLoad]),
  );

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
                setItemSelect(item.label);
              }}
            />
          );
        })}
      </View>

      {/* Order List */}
      <View>
        {itemSelected === 'RFF' ? (
          <FlatList
            data={dataList}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item?.id}`}
            renderItem={({item, index}) => {
              /* Popular items */
              return (
                <RFFOrderItem
                  key={index}
                  item={item}
                  showHR={true}
                  btn={true}
                  desc={true}
                  serviceImage={
                    item?.rffType === 'Air'
                      ? require('../../../assets/images/air.png')
                      : item?.rffType === 'Land'
                      ? require('../../../assets/images/land.png')
                      : require('../../../assets/images/water.png')
                  }
                  type={item?.__typename}
                  // replies={replyList?.length}
                  onPress={() =>
                    navigation.navigate('ReplyList', {sellerItem: item})
                  }
                />
              );
            }}
            ListFooterComponent={
              <View
                style={{
                  marginBottom: dataList?.length - 1 && 250,
                }}>
                {loading && (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <ActivityIndicator size="small" color={COLORS.primary6} />
                  </View>
                )}
              </View>
            }
          />
        ) : (
          <FlatList
            data={dataList}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item?.id}`}
            renderItem={({item, index}) => {
              /* Popular items */
              return (
                <RFQOrderItem
                  key={index}
                  item={item}
                  showHR={true}
                  btn={true}
                  desc={true}
                  type={item?.__typename}
                  serviceImage={
                    item?.rfqType === 'STANDARD'
                      ? require('../../../assets/images/standard.png')
                      : item?.rfqType === 'DOMESTIC'
                      ? require('../../../assets/images/domestic.png')
                      : require('../../../assets/images/international.png')
                  }
                  onPress={() =>
                    navigation.navigate('ReplyList', {sellerItem: item})
                  }
                />
              );
            }}
            ListFooterComponent={
              <View
                style={{
                  marginBottom: dataList?.length - 1 && 250,
                }}>
                {newLoad && (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <ActivityIndicator size="small" color={COLORS.primary6} />
                  </View>
                )}
              </View>
            }
          />
        )}
      </View>
    </View>
  );
};

export default Pending;
