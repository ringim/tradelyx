import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';

import {COLORS, SIZES} from '../../../constants';
import Quotation from '../../../screens/Buyer/Home/SaleService/Quotation';
import Freight from '../../../screens/Buyer/Home/SaleService/Freight';

const Tab = createMaterialTopTabNavigator();

const RequestTab = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: COLORS.white,
      }}
      screenOptions={{
        tabBarGap: 10,
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: 'PlusJakartaSans-Regular',
          fontWeight: '500',
          textTransform: 'none',
          color: COLORS.primary1,
        },
        tabBarStyle: {
          marginTop: 2,
          borderRadius: SIZES.base,
          marginHorizontal: SIZES.padding,
        },
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.primary1,
          width: '45%',
          left: 5,
        },
        tabBarContentContainerStyle: {
          borderRadius: SIZES.radius,
        },
        tabBarActiveTintColor: COLORS.primary1,
        tabBarIndicatorContainerStyle: {
          backgroundColor: COLORS.Neutral9,
          borderRadius: SIZES.base,
        },
      }}>
      <Tab.Screen name="Quotation" component={Quotation} />
      <Tab.Screen name="Freight" component={Freight} />
    </Tab.Navigator>
  );
};

export default RequestTab;
