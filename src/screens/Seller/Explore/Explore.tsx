import {
  View,
  Animated,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {useState, useCallback, useRef} from 'react';
import {useQuery} from '@apollo/client';

import {COLORS, SIZES, constants, FONTS} from '../../../constants';
import {TabHeader} from '../../../components';
import RFQList from './RFQList';
import RFFList from './RFFList';
import {useAuthContext} from '../../../context/AuthContext';
import {getUser} from '../../../queries/UserQueries';
import {GetUserQuery, GetUserQueryVariables} from '../../../API';

const scheduleTabs = constants.exploreTabs.map(bottom_tab => ({
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
              justifyContent: 'center',
              width: 180,
            }}
            onPress={() => onTabPress(index)}>
            <Animated.View
              style={{
                backgroundColor: bgColor,
                paddingVertical: SIZES.height > 700 ? SIZES.radius : SIZES.base,
                borderRadius: SIZES.margin,
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

const Explore = () => {
  const flatListRef = useRef<any>();
  const scrollX = useRef<any>(new Animated.Value(0)).current;

  const {userID} = useAuthContext();

  // GET USER DETAILS
  const {loading, data} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: userID}},
  );
  const user: any = data?.getUser;

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={COLORS.primary6} />
      </View>
    );
  }

  const onTabPress = useCallback((tabIndex: number) => {
    flatListRef?.current?.scrollToOffset({
      offset: tabIndex * SIZES.width,
    });
  }, []);

  function renderTopTabBar() {
    return (
      <View
        style={{
          flex: 0.06,
          alignItems: 'center',
          backgroundColor: COLORS.Neutral9,
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
          data={constants.service}
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
                {item?.id == 0 && <RFQList />}
                {item?.id == 1 && <RFFList />}
              </View>
            );
          }}
        />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.Neutral9}}>
      <TabHeader
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        snapToAlignment={'center'}
        scrollEnabled={true}
        contentContainerStyle={{flex: 1}}>
        {renderScheduleTabContent()}
      </ScrollView>
    </View>
  );
};

export default Explore;
