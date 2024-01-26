import {View} from 'react-native';
import React from 'react';

import {COLORS} from '../../../../constants';
import {Header} from '../../../../components';
import RequestTab from '../../../../components/navigation/BuyerNav/RequestTab';

const ChooseService = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title="Choose Service" />
      <RequestTab />
    </View>
  );
};

export default ChooseService;
