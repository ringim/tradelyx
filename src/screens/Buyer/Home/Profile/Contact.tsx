import {View, Text, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import {Header, TextButton} from '../../../../components';
import {COLORS, SIZES, FONTS, dummyData, icons} from '../../../../constants';

const Contact = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'Contact Tradely'} tintColor={COLORS.Neutral1}/>
    </View>
  );
};

export default Contact;
