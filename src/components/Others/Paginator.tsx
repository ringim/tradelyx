import {View, useWindowDimensions, Animated} from 'react-native';
import React from 'react';

import {COLORS, SIZES} from '../../constants';

const Paginator = ({data, scrollX}: any) => {
  const {width} = useWindowDimensions();

  return (
    <View style={{flexDirection: 'row', height: 60}}>
      {data.map((_: any, i: {toString: () => React.Key | null | undefined}) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [20, 20, 20],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.2],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={i.toString()}
            style={{
              height: SIZES.margin,
              width: dotWidth,
              opacity: opacity,
              borderRadius: SIZES.padding,
              backgroundColor: COLORS.primary1,
              marginHorizontal: 5,
            }}
          />
        );
      })}
    </View>
  );
};

export default Paginator;
