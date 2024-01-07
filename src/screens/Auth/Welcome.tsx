import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  Platform,
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
      navigation.replace('SignIn');
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: 'Error while loading screen',
        autoClose: 1000,
      });
    }
  };

  function renderHeaderSection() {
    return (
      <View
        style={{
          marginTop: SIZES.margin,
          marginHorizontal: SIZES.margin,
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <FastImage
            source={images.logo}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 120,
              height: 100,
            }}
          />
        </View>
        <TouchableOpacity
          style={{alignSelf: 'flex-end'}}
          onPress={onPressFinish}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.black,
            }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

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
                  marginTop: SIZES.height > 700 ? 80 : 50,
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
                    marginTop: SIZES.margin,
                    paddingVertical: SIZES.radius,
                    marginHorizontal: SIZES.radius,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: COLORS.primary1,
                      ...FONTS.d2,
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
                        ...FONTS.body2,
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
          label={'Login?'}
          buttonContainerStyle={{
            top: -20,
          }}
          onPress={() => {
            onPressFinish();
            navigation.navigate('SignIn');
          }}
        />

        <TextButton
          label={'New to TradelyX? Sign Up'}
          labelStyle={{color: COLORS.primary1}}
          buttonContainerStyle={{
            backgroundColor: null,
            marginTop: -SIZES.base,
          }}
          onPress={() => {
            onPressFinish();
            navigation.navigate('SignUp');
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
        {renderHeaderSection()}
        {renderContent()}

        {renderButton()}
      </SafeAreaView>
    </Root>
  );
};

export default Welcome;
