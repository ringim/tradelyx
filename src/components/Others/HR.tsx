import {View} from 'react-native';
import React from 'react';

import {COLORS, SIZES} from '../../constants';

const HR = ({containerStyle}: any) => {
  return (
    <View
      style={{
        alignSelf: 'center',
        width: '95%',
        borderWidth: 0.5,
        borderColor: COLORS.Neutral8,
        marginTop: SIZES.base,
        ...containerStyle,
      }}
    />
  );
};

export default HR;
