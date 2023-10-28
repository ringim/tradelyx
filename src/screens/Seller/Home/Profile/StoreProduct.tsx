import {
  View,
  Animated,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback, useRef} from 'react';
import {useQuery} from '@apollo/client';

import {COLORS, SIZES, constants, FONTS} from '../../../../constants';
import {Header} from '../../../../components';
import {useAuthContext} from '../../../../context/AuthContext';
import {
  ModelSortDirection,
  ProductByDateQuery,
  ProductByDateQueryVariables,
} from '../../../../API';
import MyStore from './MyStore';
import MySellOffers from './MySellOffers';
import {productByDate} from '../../../../queries/ProductQueries';

const scheduleTabs = constants.storeProducts.map(bottom_tab => ({
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
        backgroundColor: COLORS.lightYellow,
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
            key={`HomeTabs-${index}`}
            style={{
              paddingHorizontal: 5,
              justifyContent: 'center',
              width: 120,
            }}
            onPress={() => onTabPress(index)}>
            <Animated.View
              style={{
                backgroundColor: bgColor,
                padding: SIZES.radius,
                borderRadius: SIZES.base,
              }}>
              <Animated.Text
                style={{
                  color: textColor,
                  ...FONTS.cap1,
                  fontWeight: 'bold',
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

const StoreProduct = () => {
  const flatListRef = useRef<any>();
  const scrollX = useRef<any>(new Animated.Value(0)).current;

  const {userID} = useAuthContext();

  const {data, loading, refetch} = useQuery<
    ProductByDateQuery,
    ProductByDateQueryVariables
  >(productByDate, {
    pollInterval: 500,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
    variables: {
      SType: 'JOB',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const userProducts =
    data?.productByDate?.items
      ?.filter(usrID => usrID?.userID === userID)
      .filter((item: any) => !item?._deleted) || [];

  if (loading) {
    <ActivityIndicator
      style={{flex: 1, justifyContent: 'center', marginTop: SIZES.margin}}
      size={'large'}
      color={COLORS.primary6}
    />;
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
          flex: 0.07,
          alignItems: 'center',
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
          data={constants.storeProducts}
          keyExtractor={item => `HomeTabs-${item.id}`}
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
                {item?.id == 0 && (
                  <MyStore
                    data={userProducts}
                    loading={loading}
                    refetch={refetch}
                  />
                )}
                {item?.id == 1 && <MySellOffers />}
              </View>
            );
          }}
        />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.Neutral9}}>
      <Header
        title={'Store and Products'}
        contentStyle={{marginBottom: 0}}
        tintColor={COLORS.Neutral1}
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

export default StoreProduct;
