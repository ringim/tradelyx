import {View, Text, Animated, TouchableOpacity, Dimensions} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import {COLORS, FONTS, SIZES, constants} from '../../../constants';
import {ExploreStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import RFQStandard from './RFQStandard';
import RFQDomestic from './RFQDomestic';
import RFQInternational from './RFQInternational';

const scheduleTabs = constants.RFQType.map(bottom_tab => ({
  ...bottom_tab,
  ref: React.createRef(),
}));

const TabIndicator = ({measureLayout, scrollX}: any) => {
  const inputRange = scheduleTabs.map((_, i) => i * SIZES.width - 20);

  const tabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure: {width: any}) => measure.width),
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure: {x: any}) => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        height: 3,
        top: 30,
        width: tabIndicatorWidth,
        borderRadius: SIZES.radius,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const Tabs = ({scrollX, onTabPress}: any) => {
  const [measureLayout, setMeasureLayout] = useState<any>([]);
  const containerRef = useRef<any>();

  const tabPosition = Animated.divide(scrollX, SIZES.width);

  React.useEffect(() => {
    let ml: any = [];

    scheduleTabs.forEach((home_tab: any) => {
      home_tab?.ref?.current?.measureLayout(
        containerRef.current,
        (x: any, y: any, width: any, height: any) => {
          ml.push({
            x,
            y,
            width,
            height,
          });

          if (ml.length === scheduleTabs.length) {
            setMeasureLayout(ml);
          }
        },
      );
    });
  }, [containerRef.current]);

  return (
    <View
      ref={containerRef}
      style={{
        flex: 1,
        flexDirection: 'row',
      }}>
      {/* Tab Indicator */}
      {measureLayout.length > 0 ? (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      ) : (
        <View />
      )}

      {/* Tabs */}
      {scheduleTabs.map((item: any, index: any) => {
        const textColor = tabPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [COLORS.Neutral1, COLORS.primary1, COLORS.Neutral1],
          extrapolate: 'clamp',
        });

        const bgColor = tabPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [COLORS.white, COLORS.primary10, COLORS.white],
          extrapolate: 'clamp',
        });

        return (
          <TouchableOpacity
            key={index}
            style={{
              paddingHorizontal: 5,
              width: 120,
              justifyContent: 'center',
            }}
            onPress={() => onTabPress(index)}>
            <Animated.View
              style={{
                backgroundColor: bgColor,
                padding: SIZES.radius,
                borderWidth: 0.5,
                borderColor: COLORS.primary1,
                borderRadius: SIZES.padding,
              }}>
              <Animated.Text
                style={{
                  color: textColor,
                  ...FONTS.cap1,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                {item.label}
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const RFFList = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();

  const flatListRef = useRef<any>();
  const scrollX = useRef<any>(new Animated.Value(0)).current;

  const onTabPress = useCallback((tabIndex: number) => {
    flatListRef?.current?.scrollToOffset({
      offset: tabIndex * SIZES.width,
    });
  }, []);

  function renderTopTabBar() {
    return (
      <View
        style={{
          flex: 0.07,
          alignItems: 'center',
          marginTop: SIZES.radius,
          marginBottom: SIZES.base,
          borderRadius: SIZES.base,
        }}>
        <Tabs scrollX={scrollX} onTabPress={onTabPress} />
      </View>
    );
  }

  function renderScheduleTabContent() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: '100%',
          width: Dimensions.get('screen').width,
        }}>
        <FlatList
          horizontal
          ref={flatListRef}
          scrollEnabled={false}
          pagingEnabled
          style={{
            flexDirection: 'row',
          }}
          snapToAlignment="center"
          decelerationRate="fast"
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          data={constants.RFQType}
          keyExtractor={item => `${item?.id}`}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          renderItem={({item, index}: any) => {
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  width: SIZES.width,
                }}>
                {item?.id == 0 && <RFQStandard />}
                {item?.id == 1 && <RFQDomestic />}
                {item?.id == 2 && <RFQInternational />}
              </View>
            );
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {/* header title */}
      <View style={{marginTop: SIZES.base}}>
        <View
          style={{
            marginHorizontal: SIZES.margin,
            marginBottom: SIZES.base,
            marginTop: SIZES.radius,
          }}>
          <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>Latest Request for Quotations (RFQ)</Text>
        </View>
      </View>
      <FlashList
        data={[]}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={200}
        getItemType={({item}: any) => {
          return item;
        }}
        renderItem={() => <View />}
        ListFooterComponent={
          <View
            style={{
              marginBottom: constants.RFQType?.length - 1 && 200,
            }}>
            {renderTopTabBar()}

            {renderScheduleTabContent()}
          </View>
        }
      />
    </View>
  );
};

export default RFFList;
