import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';
import {Platform, View} from 'react-native';

navigator.geolocation = require('react-native-geolocation-service');

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import PlaceRow from './PlaceRow';
import {GOOGLE_MAPS_API_KEY} from '../../utilities/Utils';
import {NoItem} from '..';

const AddressPickup = ({
  placheholderText,
  fetchAddress,
  locationIconStyle,
  containerStyle,
}: any) => {
  const onPressAddress = (data: any, details: any) => {
    const coords = details.geometry.location;
    const desc = details;
    fetchAddress(coords, desc);
  };

  return (
    <Root>
      <View style={{marginTop: SIZES.margin, marginHorizontal: SIZES.radius}}>
        <GooglePlacesAutocomplete
          placeholder={placheholderText}
          autoFillOnNotFound={true}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          currentLocation={true}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          GooglePlacesSearchQuery={{
            rankby: 'distance',
          }}
          fetchDetails={true}
          onTimeout={() =>
            Toast.show({
              type: ALERT_TYPE.WARNING,
              title: 'Warning',
              textBody: 'Request Timeout',
              autoClose: 1000,
            })
          }
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
          listEmptyComponent={<NoItem contentStyle={{left: 40}} />}
          // renderDescription={data => data.description}
          renderRow={data => <PlaceRow data={data} />}
          onPress={onPressAddress}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
            type: ['establishment', 'address', 'all'],
          }}
          styles={{...containerStyle}}
          textInputProps={{
            placeholderTextColor: COLORS.Neutral7,
            ...FONTS.body3,
          }}
        />

        <FastImage
          source={icons.userLocation}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            position: 'absolute',
            width: 24,
            height: 24,
            top: Platform.OS == 'ios' ? 10 : 15,
            ...locationIconStyle,
          }}
        />
      </View>
    </Root>
  );
};

export default AddressPickup;
