import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';

import {COLORS, FONTS} from '../../constants';

const DEFAULT_VALUE = 100;
const borderWidth = 4;

const SliderContainer = (props: {
  children: React.ReactElement;
  sliderValue?: Array<number>;
  trackMarks?: Array<number>;
  vertical?: boolean;
}) => {
  const {sliderValue, trackMarks} = props;
  const [value, setValue] = useState(sliderValue ? sliderValue : DEFAULT_VALUE);
  let renderTrackMarkComponent: any;

  if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
    renderTrackMarkComponent = (index: any) => {
      const currentMarkValue = trackMarks[index];
      const currentSliderValue =
        value || (Array.isArray(value) && value[0]) || 0;
      const style =
        currentMarkValue > Math.max(currentSliderValue)
          ? trackMarkStyles.activeMark
          : trackMarkStyles.inactiveMark;
      return <View style={style} />;
    };
  }

  const renderChildren = () => {
    return React.Children.map(props.children, (child: React.ReactElement) => {
      if (!!child && child.type === Slider) {
        return React.cloneElement(child, {
          onValueChange: setValue,
          renderTrackMarkComponent,
          trackMarks,
          value,
        });
      }

      return child;
    });
  };

  return (
    <View style={trackMarkStyles.sliderContainer}>
      <View style={trackMarkStyles.titleContainer}>
        <Text style={{color: COLORS.Neutral1, ...FONTS.body3}}>
          ₦{Array.isArray(value) ? value.join(' - ₦') : value}
        </Text>
      </View>
      {renderChildren()}
    </View>
  );
};

export default SliderContainer;

const trackMarkStyles = StyleSheet.create({
  activeMark: {
    borderColor: 'red',
    borderWidth,
    left: -borderWidth / 2,
  },
  inactiveMark: {
    borderColor: 'grey',
    borderWidth,
    left: -borderWidth / 2,
  },
  sliderContainer: {
    paddingVertical: 16,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
