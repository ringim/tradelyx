import {View, Text} from 'react-native';
import React from 'react';

import {Header} from '../../../components';
import {COLORS} from '../../../constants';

const AddProducts = () => {
  return (
    <View style={{flex: 0, backgroundColor: COLORS.Neutral10}}>
      <Header
        title={'Add Products'}
        contentStyle={{marginBottom: 0}}
        tintColor={COLORS.Neutral1}
      />
    </View>
  );
};

export default AddProducts;
