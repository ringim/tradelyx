import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {COLORS, FONTS, SIZES, constants} from '../../../../constants';
import {FreightTab, TextButton} from '../../../../components';
import { HomeStackNavigatorParamList } from '../../../../components/navigation/SellerNav/type/navigation';

const Freight = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const [selectedItem, setSelectedItem] = useState<any>('');
  const [freightItem, setFreightItem] = useState<any>(null);

  // console.log('selectedItem', selectedItem);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: SIZES.margin,
      }}>
      {/* Header Title */}
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.margin,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.Neutral1,
          }}>
          Select Delivery Type
        </Text>
      </View>

      {/* Service Request */}
      <View style={{flex: 1, marginTop: SIZES.radius}}>
        {constants.freight_service.map((item, index) => {
          return (
            <FreightTab
              key={`FreightTab-${index}`}
              item={item}
              selected={item.id == selectedItem}
              onPress={() => {
                setSelectedItem(item.id);
                setFreightItem(item);
              }}
            />
          );
        })}
      </View>

      {/* Button */}
      {selectedItem && (
        <View style={{justifyContent: 'flex-end'}}>
          <TextButton
            buttonContainerStyle={{marginBottom: SIZES.padding, marginTop: 0}}
            label="Continue"
            labelStyle={{...FONTS.h4}}
            onPress={() => {
              selectedItem === '0'
                ? navigation.navigate('AirFreight', {freightType: freightItem})
                : selectedItem === '1'
                ? navigation.navigate('OceanFreight', {
                    freightType: freightItem,
                  })
                : navigation.navigate('LandFreight', {
                    freightType: freightItem,
                  });
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Freight;
