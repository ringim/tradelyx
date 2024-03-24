import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {ALERT_TYPE, Toast, Root} from 'react-native-alert-notification';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {FONTS, SIZES, COLORS} from '../../../../constants';
import {AddressPickup, Header, TextButton} from '../../../../components';
import {hasLocationPermission} from '../../../../utilities/service';
import {ProfileStackNavigatorParamList} from '../../../../components/navigation/BuyerNav/type/navigation';

const AccountAddress = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();

  const animationRef = useRef<any>(null);
  const ref: any = useRef<any>(null);

  const [state, setState] = useState({
    userAddressCoords: {},
  });

  const {userAddressCoords}: any = state;

  const checKNavigation = () => {
    const isValid = checkValid();
    if (isValid) {
      let param = ref.current?.getAddressText();
      navigation.navigate({
        name: 'Account',
        params: {userAddress: userAddressCoords},
        merge: true,
      });
    }
    storeHomeAddress(userAddressCoords?.description?.formatted_address);
  };

  const requestUserLocation = async () => {
    let hasPermission = await hasLocationPermission();
    if (!hasPermission) {
      return;
    }
  };

  const storeHomeAddress = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('homeAddress', jsonValue);
    } catch (error) {
      // saving error
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Error',
        textBody: 'Something went wrong',
        autoClose: 1000,
      });
    }
  };

  const checkValid = () => {
    if (Object.keys(userAddressCoords).length === 0) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Please enter your location',
        autoClose: 1000,
      });
      return false;
    }
    return true;
  };

  const fetchUserAddressCords = (coords: any, desc: any) => {
    setState({
      ...state,
      userAddressCoords: {
        location: coords,
        description: desc,
      },
    });
  };

  useEffect(() => {
    let isCurrent = true;
    animationRef.current?.play();
    animationRef.current?.play(30, 120);
    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    let unmounted = true;
    unmounted && requestUserLocation();
    return () => {
      unmounted = false;
    };
  }, []);

  return (
    <Root>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.Neutral9,
        }}>
        <Header
          title={'Choose Address'}
          contentStyle={{marginBottom: 0}}
          tintColor={COLORS.Neutral1}
        />
        <AddressPickup
          placheholderText="Choose your current location"
          placeholderTextColor={{color: COLORS.Neutral7}}
          fetchAddress={fetchUserAddressCords}
          containerStyle={{
            textInput: {
              marginLeft: SIZES.padding * 1.5,
              backgroundColor: COLORS.white,
              borderRadius: SIZES.radius,
              height: 50,
              padding: 10,
              marginVertical: 5,
              borderColor: COLORS.Neutral7,
              borderWidth: 0.5,
              top: -6,
            },
            loader: {
              flexDirection: 'row',
              justifyContent: 'flex-end',
              height: 20,
              padding: 20,
            },
            row: {
              padding: 8,
              marginLeft: 10,
              fontSize: SIZES.body2,
            },
            listView: {
              height: '80%',
            },
            autocompleteContainer: {
              position: 'absolute',
              top: 0,
              left: 10,
              right: 10,
            },
            separator: {
              height: 0.4,
              backgroundColor: COLORS.white,
              marginTop: SIZES.base,
            },
          }}
        />
      </View>

      {/* Navigation Button */}
      <TextButton
        label={'Continue'}
        labelStyle={{color: COLORS.white, ...FONTS.h5}}
        buttonContainerStyle={{
          marginHorizontal: SIZES.radius,
          backgroundColor: COLORS.primary1,
          position: 'absolute',
          marginTop:
            SIZES.height > 700 ? SIZES.padding * 33 : SIZES.padding * 23,
          alignSelf: 'center',
          width: 270,
        }}
        onPress={checKNavigation}
      />
    </Root>
  );
};

export default AccountAddress;
