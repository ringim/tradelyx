import React, {useState, useRef, useEffect} from 'react';
import {Platform, Text, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';

import {Header} from '../../../../components';
import {COLORS, FONTS, SIZES, icons} from '../../../../constants';
import PlaceRow from '../../../../components/Others/PlaceRow';

const UserAddress = () => {
  const navigation = useNavigation<any>();

  const animationRef = useRef<any>(null);
  const ref: any = useRef<any>(null);

  const [address, setAddress] = useState<any>(null);

  const storeWorkAddress = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('workAddress', jsonValue);
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

  const checKNavigation = () => {
    if (address) {
      const {lat, lng} = address?.details.geometry.location;
      let param = ref.current?.getAddressText();
      navigation.navigate({
        name: 'Account',
        params: {userAddress: param},
        merge: true,
      });
      storeWorkAddress({lat: lat, lng: lng});
    }
  };

  useEffect(() => {
    let unmounted = true;
    checKNavigation();
    return () => {
      unmounted = false;
    };
  }, [address]);

  return (
    <Root>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.Neutral9,
        }}>
        <Header
          title={'User Address'}
          contentStyle={{marginBottom: 0}}
          tintColor={COLORS.Neutral1}
        />
        <View
          style={{
            padding: SIZES.radius,
            height: '100%',
          }}>
          <GooglePlacesAutocomplete
            ref={ref}
            placeholder="Search for a new address"
            minLength={4}
            nearbyPlacesAPI="GooglePlacesSearch"
            listViewDisplayed="auto"
            debounce={400}
            currentLocation={true}
            currentLocationLabel="Current location"
            enablePoweredByContainer={false}
            suppressDefaultStyles
            onTimeout={() =>
              Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Request Timeout',
                autoClose: 1000,
              })
            }
            onPress={(data, details = null) => {
              setAddress({data, details});
            }}
            onFail={() =>
              Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Warning',
                textBody: 'Address Failed',
                autoClose: 1000,
              })
            }
            onNotFound={() =>
              Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Address Not Found',
                autoClose: 1000,
              })
            }
            fetchDetails={true}
            query={{
              key: 'AIzaSyDPMHmRw3LbdXZCfrLu7DxmhDgv2u_9SKU',
              language: 'en',
            }}
            renderDescription={data => data.description}
            renderRow={data => <PlaceRow data={data} />}
            textInputProps={{
              placeholderTextColor: COLORS.Neutral7,
              ...FONTS.body3,
            }}
            styles={{
              textInput: {
                marginLeft: SIZES.padding,
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
                position: 'absolute',
                top: 50,
                height: 300,
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
          <FastImage
            source={icons.userLocation}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              position: 'absolute',
              width: 25,
              height: 25,
              left: 5,
              top: Platform.OS == 'ios' ? 25 : 15,
            }}
          />
        </View>

        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            alignItems: 'center',
            marginTop: SIZES.padding * 21,
          }}>
          <LottieView
            style={{
              width: 150,
              alignSelf: 'center',
            }}
            autoPlay
            loop
            ref={animationRef}
            source={require('../../../../assets/json/location.json')}
          />

          <Text
            style={{
              color: COLORS.Neutral1,
              textAlign: 'center',
              ...FONTS.body2,
              top: -20,
            }}>
            We’ll show you a list of nearby addresses.
          </Text>
        </View>
      </View>
    </Root>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default UserAddress;
