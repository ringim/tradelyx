import {View, Animated, TouchableOpacity} from 'react-native';
import React, {useState, useCallback, useRef} from 'react';
import {useQuery} from '@apollo/client';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {COLORS, SIZES, constants, FONTS} from '../../../constants';
import {LoadingIndicator, TabHeader2} from '../../../components';
import Pending from './Pending';
import InProgress from './InProgress';
import Complete from './Complete';
import {useAuthContext} from '../../../context/AuthContext';
import {GetUserQuery, GetUserQueryVariables} from '../../../API';
import {getUser} from '../../../queries/UserQueries';
import {Platform} from 'react-native';

const scheduleTabs = constants.orderTabs.map(bottom_tab => ({
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
        flexDirection: 'row',
        backgroundColor: COLORS.Neutral9,
        top: -2,
        width: '100%',
        paddingLeft: SIZES.base
      }}>
      {/* Tab Indicator */}
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}

      {/* Tabs */}
      {scheduleTabs.map((item: any, index: any) => {
        const textColor = tabPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [COLORS.Neutral6, COLORS.white, COLORS.Neutral6],
          extrapolate: 'clamp',
        });

        const bgColor = tabPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [COLORS.Neutral9, COLORS.primary1, COLORS.Neutral9],
          extrapolate: 'clamp',
        });

        return (
          <TouchableOpacity
            key={index}
            style={{
              paddingHorizontal: SIZES.margin,
              justifyContent: 'center',
            }}
            onPress={() => onTabPress(index)}>
            <Animated.View
              style={{
                backgroundColor: bgColor,
                padding: SIZES.height > 700 ? SIZES.radius : SIZES.base,
                borderRadius: SIZES.margin,
                marginBottom: 5,
              }}>
              <Animated.Text
                style={{
                  color: textColor,
                  ...FONTS.h5,
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

const Order = () => {
  const flatListRef = useRef<any>();
  const scrollX = useRef<any>(new Animated.Value(0)).current;

  const {userID} = useAuthContext();

  // GET USER DETAILS
  const {loading, data} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: userID}},
  );
  const user: any = data?.getUser;

  const onTabPress = useCallback((tabIndex: number) => {
    flatListRef?.current?.scrollToOffset({
      offset: tabIndex * SIZES.width,
    });
  }, []);

  function renderTopTabBar() {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: COLORS.white,
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
          flex: 1,
          flexDirection: 'row',
        }}>
        <Animated.FlatList
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
          data={constants.orderTabs}
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
                {item?.id == 0 && <Pending />}
                {item?.id == 1 && <InProgress />}
                {item?.id == 2 && <Complete />}
              </View>
            );
          }}
        />
      </View>
    );
  }

  if (loading) {
    return <LoadingIndicator />;
  }
  return (
    <View style={{flex: 1, backgroundColor: COLORS.Neutral9}}>
      <TabHeader2
        userImage={user?.logo}
        containerStyle={{
          paddingTop:
            Platform.OS === 'android'
              ? SIZES.height > 700
                ? 10
                : SIZES.radius
              : 50,
          height: Platform.OS == 'ios' ? '14%' : '10%',
          marginBottom: SIZES.base,
        }}
      />
      {renderTopTabBar()}
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        extraHeight={100}
        bounces={false}
        extraScrollHeight={100}
        enableOnAndroid={true}>
        {renderScheduleTabContent()}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Order;
