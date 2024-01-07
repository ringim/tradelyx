import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import dayjs from 'dayjs';
import {useQuery, useMutation} from '@apollo/client';
import FastImage from 'react-native-fast-image';

import {SIZES, FONTS, COLORS, icons, constants} from '../../../../constants';
import {AltHeader, LoadingIndicator} from '../../../../components';
import {
  ModelSortDirection,
  NotificationsByDateQueryVariables,
  NotificationsByDateQuery,
  NotificationType,
  UpdateNotificationMutation,
  UpdateNotificationMutationVariables,
} from '../../../../API';
import {HomeStackNavigatorParamList} from '../../../../components/navigation/SellerNav/type/navigation';
import {
  notificationsByDate,
  updateNotification,
} from '../../../../queries/NotificationQueries';
import {useAuthContext} from '../../../../context/AuthContext';

const BNotifications = constants?.notifyTypes;

const Notifications = () => {
  const {userID} = useAuthContext();
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const [fetchingMore, setFetchingMore] = useState<any>(false);

  // LIST NOTIFICATIONS
  const {loading, data, refetch, fetchMore} = useQuery<
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
          type?.type !== NotificationType?.PRODUCT &&
          type?.type !== NotificationType?.MESSAGE,
      )
      ?.filter(usrID => usrID?.actorID !== userID)
      ?.filter((item: any) => !item?._deleted) || [];

  const showNotifications =
    data?.notificationsByDate?.items
      ?.filter(
        type =>
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

  // UPDATE NOTIFICATION
  const [doUpdateNotification] = useMutation<
    UpdateNotificationMutation,
    UpdateNotificationMutationVariables
  >(updateNotification);

  useFocusEffect(
    useCallback(() => {
      const readNotifications = async () => {
        const unreadNotifee = allNotifee?.filter(n => !n?.readAt);

        await Promise.all(
          unreadNotifee.map(
            notification =>
              notification &&
              doUpdateNotification({
                variables: {
                  input: {
                    id: notification?.id,
                    readAt: new Date().getTime(),
                  },
                },
              }),
          ),
        );
      };
      readNotifications();
    }, [allNotifee]),
  );

  if (loading) {
    return <LoadingIndicator />;
  }

  // ALL SUPPLIERS
  function renderRecommended() {
    return (
      <FlatList
        data={showNotifications}
        keyExtractor={item => `${item?.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              item?.requestType === 'STANDARD'
                ? navigation.navigate('StandardRFQDetail', {
                    rfqID: item?.RFQ?.id,
                  })
                : item?.requestType === 'DOMESTIC'
                ? navigation.navigate('DomesticRFQDetail', {
                    rfqID: item?.RFQ?.id,
                  })
                : item?.requestType === 'INTERNATIONAL'
                ? navigation.navigate('InternationalRFQDetail', {
                    rfqID: item?.RFQ?.id,
                  })
                : item?.requestType === 'LAND'
                ? navigation.navigate('QuotesRequestDetails', {
                    rffID: item?.RFF?.id,
                  })
                : item?.requestType === 'OCEAN'
                ? navigation.navigate('QuotesRequestDetails', {
                    rffID: item?.RFF?.id,
                  })
                : item?.requestType === 'OCEAN'
                ? navigation.navigate('QuotesRequestDetails', {
                    rffID: item?.RFF?.id,
                  })
                : navigation.navigate('Chat', {
                    id: item?.chatroomID,
                  });
            }}>
            <View style={styles.container}>
              <View style={styles.subCont}>
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
                  {item?.type === 'SELLOFFER'
                    ? 'Sell Offer Request'
                    : `${item?.requestType} Quotation`}
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
            <TouchableOpacity
              key={index}
              onPress={() => {
                item?.type === 'ORDER'
                  ? navigation.navigate('OrderNotifications')
                  : navigation.navigate('PromotionNotifications');
              }}>
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
    paddingVertical: SIZES.semi_margin,
    marginHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
  subCont: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.radius,
    width: 25,
    height: 25,
    borderRadius: 30,
    backgroundColor: COLORS.primary1,
  },
  logoImg: {
    width: 15,
    height: 15,
  },
  cont2: {
    flex: 1,
    marginLeft: SIZES.base,
    justifyContent: 'center',
    marginRight: SIZES.margin,
  },
  cont3: {
    justifyContent: 'center',
  },
  text1: {
    ...FONTS.sh3,
    fontWeight: '700',
    color: COLORS.Neutral1,
  },
  text2: {
    paddingTop: 4,
    ...FONTS.cap2,
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
