import {View, ActivityIndicator, Text} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';

const LoadingIndicator = ({contentStyle}: any) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...contentStyle,
      }}>
      <ActivityIndicator size="small" color={COLORS.primary6} />
    </View>
  );
};

export default LoadingIndicator;
