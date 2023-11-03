import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import dayjs from 'dayjs';

import {SIZES, FONTS, dummyData, COLORS} from '../../../constants';
import {Header, NotificationTab} from '../../../components';
import {HomeStackNavigatorParamList} from '../../../components/navigation/BuyerNav/type/navigation';

const notifications = dummyData?.notifications;

const Notifications = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const myDate: DateConstructor | any = Date;

  // Sort the data by date
  notifications.sort((a, b) => myDate(a.time) - myDate(b.time));

  // Create an object to categorize items by month
  const categorizedData: any = {};
  notifications.forEach(item => {
    const date = new Date(item?.time);
    const monthYearKey = `${dayjs(date).format('MMMM')}, ${date.getFullYear()}`;

    if (!categorizedData[monthYearKey]) {
      categorizedData[monthYearKey] = [];
    }

    categorizedData[monthYearKey].push(item);
  });

  function renderNoNotifications() {
    return (
      <View style={styles.cont}>
        <LottieView
          style={{height: 300, alignSelf: 'center'}}
          autoPlay
          speed={1.5}
          loop={true}
          source={require('../../../assets/json/noNotification.json')}
        />

        <View style={styles.subCont}>
          <Text style={styles.text1}>You currently have no notifications</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'Notification'} tintColor={COLORS.Neutral1} />

      <NotificationTab item={categorizedData} />

      {notifications.length === 0 && <>{renderNoNotifications()}</>}
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: 'center',
    paddingTop: SIZES.radius,
    marginHorizontal: SIZES.padding * 1.5,
  },
  text1: {
    ...FONTS.h4,
    fontWeight: '500',
    color: COLORS.Neutral1,
  },
  subCont: {
    paddingTop: SIZES.radius,
    alignItems: 'center',
  },
});

export default Notifications;
