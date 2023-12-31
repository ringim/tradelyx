import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import {useQuery} from '@apollo/client';
import FastImage from 'react-native-fast-image';

import {SIZES, FONTS, COLORS, icons, constants} from '../../../../constants';
import {AltHeader} from '../../../../components';
import {
  ModelSortDirection,
  NotificationsByDateQueryVariables,
  NotificationsByDateQuery,
  NotificationType,
} from '../../../../API';
import {HomeStackNavigatorParamList} from '../../../../components/navigation/SellerNav/type/navigation';
import {
  notificationsByDate,
  onCreateNotification,
} from '../../../../queries/NotificationQueries';
import {useAuthContext} from '../../../../context/AuthContext';

const BNotifications = constants?.notifyTypes;

const Notifications = () => {
  const {userID} = useAuthContext();
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const [fetchingMore, setFetchingMore] = useState<any>(false);

  const {loading, data, refetch, fetchMore, subscribeToMore} = useQuery<
    NotificationsByDateQuery,
    NotificationsByDateQueryVariables
  >(notificationsByDate, {
    pollInterval: 500,
    fetchPolicy: 'network-only',
    variables: {
      SType: 'NOTIFICATION',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const allNotifee =
    data?.notificationsByDate?.items
      ?.filter(
        type =>
          type?.type !== NotificationType?.SELLOFFER &&
          type?.type !== NotificationType?.PRODUCT &&
          type?.type !== NotificationType?.MESSAGE,
      )
      ?.filter(usrID => usrID?.actorID !== userID)
      ?.filter((item: any) => !item?._deleted) || [];

  const nextToken = data?.notificationsByDate?.nextToken;

  const loadMoreItem = async () => {
    if (!nextToken || fetchingMore) {
      return;
    }
    setFetchingMore(true);
    await fetchMore({variables: {nextToken: nextToken}});
    setFetchingMore(false);
  };

  useEffect(() => {
    if (!subscribeToMore || !userID) {
      return;
    }
    subscribeToMore({
      document: onCreateNotification,
      variables: {filter: {userID: {eq: userID}}},
      updateQuery: (prev: any, next: any) => {
        console.log('prev');
        console.log(JSON.stringify(prev, null, 2));
        console.log('next');
        console.log(JSON.stringify(next, null, 2));
        return {
          ...prev,
          notificationsByDate: {
            ...prev?.notificationsByDate,
            items: [
              ...(prev?.notificationsByDate?.items || []),
              next?.subscriptionData?.data?.notificationsByDate,
            ],
          },
        };
      },
    });
  }, [subscribeToMore, userID]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="small" color={COLORS.primary6} />
      </View>
    );
  }

  // ALL SUPPLIERS
  function renderRecommended() {
    return (
      <FlatList
        data={allNotifee}
        keyExtractor={item => `${item?.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              item?.requestType === 'STANDARD'
                ? navigation.navigate('StandardRFQDetail', {
                    rfqItem: item?.RFQ,
                  })
                : item?.requestType === 'DOMESTIC'
                ? navigation.navigate('DomesticRFQDetail', {
                    rfqItem: item?.RFQ,
                  })
                : item?.requestType === 'INTERNATIONAL'
                ? navigation.navigate('InternationalRFQDetail', {
                    rfqItem: item?.RFQ,
                  })
                : item?.requestType === 'LAND'
                ? navigation.navigate('QuotesRequestDetails', {
                    quoteItem: item?.RFF,
                  })
                : item?.requestType === 'OCEAN'
                ? navigation.navigate('QuotesRequestDetails', {
                    quoteItem: item?.RFF,
                  })
                : navigation.navigate('QuotesRequestDetails', {
                    quoteItem: item?.RFF,
                  });
            }}>
            <View style={styles.container}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: SIZES.semi_margin,
                  width: 26,
                  height: 26,
                  borderRadius: 30,
                  backgroundColor: COLORS.primary1,
                }}>
                <FastImage
                  source={icons.bell2}
                  style={styles.logoImg}
                  tintColor={COLORS.white}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
              <View style={styles.cont2}>
                <Text
                  style={{
                    ...FONTS.h5,
                    color: COLORS.Neutral1,
                    textTransform: 'capitalize',
                  }}>
                  {item?.requestType} Quotation
                </Text>

                {/* description */}
                <Text numberOfLines={1} style={styles.text2}>
                  {item?.description}
                </Text>
              </View>

              {/* created At */}
              <View style={styles.cont3}>
                <Text
                  numberOfLines={1}
                  style={[styles.text2, {color: COLORS.Neutral3}]}>
                  {dayjs(item?.createdAt).format('DD/MM/YY, HH:MM')}
                </Text>
              </View>
            </View>
            <View style={styles.hr} />
          </TouchableOpacity>
        )}
        refreshing={loading}
        onRefresh={() => refetch()}
        ListFooterComponent={
          <View
            style={{
              marginBottom: allNotifee?.length - 1 ? 100 : 100,
              backgroundColor: COLORS.white,
            }}
          />
        }
        onEndReached={() => loadMoreItem()}
      />
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <AltHeader
        title={'Notifications'}
        tintColor={COLORS.Neutral1}
        other={true}
        icon={icons.config}
        tintColor2={COLORS.primary1}
        otherStyle={{left: SIZES.radius}}
        onOther={() => navigation.navigate('NotificationSetting')}
        onPress={() => navigation.goBack()}
      />

      {/* Buyer Notification Type */}
      <FlatList
        data={BNotifications}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item?.id}`}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity key={index}>
              <View style={styles.container}>
                <View
                  style={[
                    styles.subCont,
                    {
                      backgroundColor:
                        item?.type === 'ORDER' ? COLORS.Teal5 : COLORS.Rose5,
                    },
                  ]}>
                  <FastImage
                    source={item?.icon}
                    style={styles.logoImg}
                    tintColor={COLORS.white}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={styles.cont2}>
                  {/* title */}
                  <Text style={[styles.text1, {color: COLORS.Neutral1}]}>
                    {item?.title}
                  </Text>

                  {/* description */}
                  <Text numberOfLines={1} style={styles.text2}>
                    {item?.text}
                  </Text>
                </View>
              </View>
              <View style={styles.hr} />
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={
          <View
            style={{
              marginBottom: BNotifications.length - 1 ? 300 : 300,
            }}>
            {renderRecommended()}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SIZES.margin,
    marginHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
  subCont: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.semi_margin,
    width: 26,
    height: 26,
    borderRadius: 30,
  },
  logoImg: {
    width: 15,
    height: 15,
  },
  cont2: {
    flex: 1,
    marginLeft: SIZES.radius,
    justifyContent: 'center',
    marginRight: SIZES.margin,
  },
  cont3: {
    justifyContent: 'center',
  },
  text1: {
    ...FONTS.h5,
    color: COLORS.Neutral1,
  },
  text2: {
    paddingTop: 4,
    ...FONTS.cap1,
    color: COLORS.Neutral5,
  },
  hr: {
    alignSelf: 'center',
    width: '90%',
    borderWidth: 0.5,
    borderColor: COLORS.Neutral8,
  },
});

export default Notifications;
