import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';

import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {BottomTabNavigatorParamList} from './type/navigation';
import {ChatRooms, Explore, Home, Order} from '../../../screens/Buyer';
import {toggleCameraModal} from '../../../redux/modal/modalActions';

const Tabs = createBottomTabNavigator<BottomTabNavigatorParamList | any>();

const TabBarCustomButton = ({children, onPress}: any) => {
  return (
    <TouchableOpacity
      style={{
        width: 50,
        height: 50,
        marginTop: Platform.OS === 'ios' ? SIZES.radius : 20,
        marginHorizontal: SIZES.base,
        borderRadius: 60,
        backgroundColor: COLORS.primary1,
      }}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const BBottomTabs = ({toggleCameraModal, showCameraModal}: any) => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopColor: 'transparent',
          borderTopLeftRadius: SIZES.padding,
          borderTopRightRadius: SIZES.padding,
          height: Platform.OS === 'ios' ? (SIZES.height > 700 ? 100 : 90) : 85,
          ...styles.shadow,
        },
      }}>
      <Tabs.Screen
        name="Homes"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  paddingTop: SIZES.radius,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FastImage
                  source={icons.home}
                  resizeMode={FastImage.resizeMode.contain}
                  tintColor={focused ? COLORS.primary1 : COLORS.Neutral5}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
                <Text
                  style={{
                    top: 5,
                    ...FONTS.cap1,
                    color: focused ? COLORS.primary1 : COLORS.Neutral6,
                  }}>
                  Home
                </Text>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  paddingTop: SIZES.radius,
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: 10,
                }}>
                <FastImage
                  source={icons.explore}
                  resizeMode={FastImage.resizeMode.contain}
                  tintColor={focused ? COLORS.primary1 : COLORS.Neutral5}
                  style={{
                    width: 24,
                    height: 24,
                    left: -13,
                  }}
                />
                <Text
                  style={{
                    top: 5,
                    ...FONTS.cap1,
                    right: 13,
                    color: focused ? COLORS.primary1 : COLORS.Neutral6,
                  }}>
                  Explore
                </Text>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="Service"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <FastImage
              source={icons.plus}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 50,
                height: 50,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            toggleCameraModal(!showCameraModal);
          },
        })}
      />
      <Tabs.Screen
        name="Orders"
        component={Order}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  paddingTop: SIZES.radius,
                  alignItems: 'center',
                  justifyContent: 'center',
                  right: 10,
                }}>
                <FastImage
                  source={icons.clipboard}
                  resizeMode={FastImage.resizeMode.contain}
                  tintColor={focused ? COLORS.primary1 : COLORS.Neutral5}
                  style={{
                    width: 24,
                    height: 24,
                    left: 12,
                  }}
                />
                <Text
                  style={{
                    top: 5,
                    ...FONTS.cap1,
                    left: 13,
                    color: focused ? COLORS.primary1 : COLORS.Neutral6,
                  }}>
                  Order
                </Text>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="ChatRooms"
        component={ChatRooms}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  paddingTop: SIZES.radius,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FastImage
                  source={icons.chat}
                  resizeMode={FastImage.resizeMode.contain}
                  tintColor={focused ? COLORS.primary1 : COLORS.Neutral5}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
                <Text
                  style={{
                    top: 5,
                    ...FONTS.cap1,
                    color: focused ? COLORS.primary1 : COLORS.Neutral6,
                  }}>
                  Chat
                </Text>
              </View>
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 1,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 5,
  },
});

function mapStateToProps(state: any) {
  return {
    showCameraModal: state.modalReducer.showCameraModal,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    toggleCameraModal: (toggleValue: any) => {
      return dispatch(toggleCameraModal(toggleValue));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BBottomTabs);
