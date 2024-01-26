import {View, Switch, Text} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../constants';

const NotifySwitch = ({title, subTitle, toggleSwitch, isEnabled}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: SIZES.margin,
      }}>
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
        }}>
        <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>{title}</Text>
        <Text
          style={{
            ...FONTS.cap1,
            color: COLORS.Neutral5,
            width: 300,
            paddingTop: 4,
          }}>
          {subTitle}
        </Text>
      </View>
      <View style={{}}>
        <Switch
          trackColor={{false: COLORS.Neutral8, true: COLORS.primary1}}
          thumbColor={isEnabled ? COLORS.white : COLORS.white}
          ios_backgroundColor="#fff"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

export default NotifySwitch;
