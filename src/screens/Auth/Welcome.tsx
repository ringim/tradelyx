import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  Animated,
  SafeAreaView,
} from 'react-native';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SIZES, COLORS, FONTS, constants, images} from '../../constants';
import {Paginator, TextButton} from '../../components';
import {AuthStackNavigatorParamList} from '../../components/navigation/navigation';

const Welcome = () => {
  const navigation = useNavigation<AuthStackNavigatorParamList>();

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<any>(null);

  const viewableItemsChanged = useRef(({viewableItems}: any) => {
    setCurrentIndex(viewableItems[0]);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const onPressFinish = async () => {
    try {
      await AsyncStorage.setItem('ONBOARDED', 'true');
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: 'Error while loading screen',
        autoClose: 1000,
      });
    }
  };

  function renderContent() {
    const {width} = useWindowDimensions();

    return (
      <View
        style={{
          alignItems: 'center',
        }}>
        <FlatList
          data={constants.onboarding}
          horizontal
          keyExtractor={item => `${item.id}`}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          showsHorizontalScrollIndicator={false}
          ref={slidesRef}
          pagingEnabled
          bounces={false}
          renderItem={({item, index}: any) => {
            return (
              <View
                key={index}
                style={{
                  width,
                }}>
                <FastImage
                  source={item.image}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width,
                    height: SIZES.height > 700 ? 250 : 200,
                  }}
                />

                <View
                  style={{
                    marginTop: SIZES.radius,
                    paddingVertical: SIZES.radius,
                    marginHorizontal: SIZES.radius,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: COLORS.primary1,
                      ...FONTS.h1,
                    }}>
                    {item.title}
                  </Text>

                  <View
                    style={{
                      paddingTop: SIZES.margin,
                      marginHorizontal: SIZES.radius,
                    }}>
                    <Text
                      style={{
                        ...FONTS.body3,
                        textAlign: 'center',
                        color: COLORS.primary1,
                        fontWeight: '500',
                        lineHeight: 24,
                      }}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
        {/* Paginator */}
        <View
          style={{
            marginTop: SIZES.height > 700 ? 20 : 10,
          }}>
          <Paginator data={constants.onboarding} scrollX={scrollX} />
        </View>
      </View>
    );
  }

  function renderButton() {
    return (
      <>
        <TextButton
          label={'Continue...'}
          buttonContainerStyle={{
            top: -20,
          }}
          onPress={() => {
            navigation.replace('BuyerStack');
            onPressFinish();
          }}
        />
      </>
    );
  }

  return (
    <Root>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <FastImage
            source={images.logo}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 120, height: 120}}
          />
        </View>
        {renderContent()}

        {renderButton()}
      </SafeAreaView>
    </Root>
  );
};

export default Welcome;
