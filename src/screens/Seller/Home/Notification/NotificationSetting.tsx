import {View, Text, Switch} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {COLORS, FONTS, SIZES} from '../../../../constants';
import {Header, NotifySwitch} from '../../../../components';
import {HomeStackNavigatorParamList} from '../../../../components/navigation/SellerNav/type/navigation';

const NotificationSetting = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        title={'Notification Settings'}
        contentStyle={{marginBottom: 0}}
        tintColor={COLORS.Neutral1}
      />

      <View style={{marginTop: SIZES.radius, marginHorizontal: SIZES.radius}}>
        <Text style={{...FONTS.h5, fontWeight: '600', color: COLORS.Neutral1}}>
          Notifications
        </Text>

        <Text
          style={{
            ...FONTS.cap1,
            color: COLORS.Neutral1,
            paddingTop: SIZES.base,
          }}>
          Manage in-app & push notifications by going to the Settings on your
          mobile device.
        </Text>
      </View>

      {/* Notification Switches */}
      <View style={{marginTop: SIZES.radius, marginHorizontal: SIZES.radius}}>
        <NotifySwitch
          title={'Orders'}
          subTitle={'Order status, tracking updates, dispute progress and more'}
          toggleSwitch={toggleSwitch}
          value={isEnabled}
        />
        <NotifySwitch
          title={'Promotions'}
          subTitle={'Discounts, sale & price alerts, any more'}
          toggleSwitch={toggleSwitch1}
          value={isEnabled1}
        />
        <NotifySwitch
          title={'RFQ'}
          subTitle={'Standard, Domestic & International services'}
          toggleSwitch={toggleSwitch1}
          value={isEnabled1}
        />
        <NotifySwitch
          title={'RFF'}
          subTitle={'Land, Ocean, Air services'}
          toggleSwitch={toggleSwitch1}
          value={isEnabled1}
        />
        <NotifySwitch
          title={'Activities'}
          subTitle={'Notification for related to your account'}
          toggleSwitch={toggleSwitch2}
          value={isEnabled2}
        />
      </View>
    </View>
  );
};

export default NotificationSetting;
