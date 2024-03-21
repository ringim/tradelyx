import {
  View,
  Animated,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {useQuery} from '@apollo/client';

import {COLORS, SIZES, constants, FONTS} from '../../../constants';
import {TabHeader} from '../../../components';
import RFQList from './RFQList';
import {useAuthContext} from '../../../context/AuthContext';
import {getUser} from '../../../queries/UserQueries';
import {GetUserQuery, GetUserQueryVariables} from '../../../API';
import RFFList from './RFFList';

const scheduleTabs = constants?.exploreTabs?.map(bottom_tab => ({
  ...bottom_tab,
  ref: React.createRef(),
}));

const TabIndicator = ({measureLayout, scrollX}: any) => {
  if (!measureLayout.length) return null;

  const inputRange = scheduleTabs.map((_, i) => i * SIZES.width - 20);

  const tabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(({width}: any) => width),
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(({x}: any) => x),
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
        transform: [{translateX}],
      }}
    />
  );
};

const Tabs = React.memo(({scrollX, onTabPress}: any) => {
  const [measureLayout, setMeasureLayout] = useState<any>([]);
  const containerRef = useRef<any>();

  const tabPosition = Animated.divide(scrollX, SIZES.width);

  useEffect(() => {
    const ml: any = [];

    scheduleTabs.forEach((home_tab: any) => {
      home_tab?.ref?.current?.measureLayout(
        containerRef.current,
        (x: any, y: any, width: any, height: any) => {
          ml.push({x, y, width, height});

          if (ml.length === scheduleTabs.length) {
            setMeasureLayout(ml);
          }
        },
      );
    });
  }, []);

  return (
    <View
      ref={containerRef}
      style={{
        flexDirection: 'row',
        backgroundColor: COLORS.Neutral9,
        top: -2,
      }}>
      {/* Tab Indicator */}
      <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />

      {/* Tabs */}
      {scheduleTabs.map((item, index) => {
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
                paddingVertical: SIZES.height > 700 ? SIZES.radius : 6,
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
});

const Explore = () => {
  const flatListRef = useRef<any>();
  const scrollX = useRef<any>(new Animated.Value(0)).current;

  const {userID} = useAuthContext();

  const {loading, data} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: userID}},
  );
  const user = data?.getUser;

  const onTabPress = useCallback((tabIndex: any) => {
    flatListRef?.current?.scrollToOffset({
      offset: tabIndex * SIZES.width,
    });
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={COLORS.primary6} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.Neutral9}}>
      <TabHeader
        userImage={user?.logo}
        containerStyle={{
          paddingTop:
            Platform.OS == 'ios'
              ? SIZES.height > 700
                ? 50
                : SIZES.semi_margin
              : 4,
          height:
            Platform.OS === 'android' ? (SIZES.height > 700 ? 70 : 50) : 130,
          marginBottom: 4,
        }}
      />

      <View
        style={{
          flex: 0.06,
          alignItems: 'center',
          backgroundColor: COLORS.Neutral9,
          borderRadius: SIZES.base,
        }}>
        <Tabs scrollX={scrollX} onTabPress={onTabPress} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        snapToAlignment={'center'}
        scrollEnabled={true}
        contentContainerStyle={{flex: 1}}>
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
            data={constants.exploreTabs}
            keyExtractor={item => `${item?.id}`}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {
                useNativeDriver: false,
              },
            )}
            renderItem={({item, index}) => {
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
      </ScrollView>
    </View>
  );
};

export default Explore;
