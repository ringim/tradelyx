import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, icons, FONTS} from '../../constants';

const InternationalRFQDetail1 = ({
  daysUntilExpiry,
  onCopy,
  placeOriginFlag,
  placeOriginName,
  placeDestinationFlag,
  placeDestination,
  rfqNo,
  expiryDate,
}: any) => {
  return (
    <View>
      {/* buyer from */}
      <View
        style={{
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.base,
        }}>
        {/* Buyer Country Name */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
            Buyer from
          </Text>
        </View>

        {/* Buyer from */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <FastImage
            source={{uri: placeOriginFlag}}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 23,
              height: 23,
            }}
          />
        </View>
        <View
          style={{
            flex: 2,
            marginLeft: SIZES.base,
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={3}
            style={{
              ...FONTS.cap1,
              fontWeight: '500',
              color: COLORS.Neutral1,
            }}>
            {placeOriginName}
          </Text>
        </View>
      </View>

      {/* Delivery To */}
      <View
        style={{
          marginTop: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.base,
        }}>
        {/* Buyer Country Name */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
            Delivery To
          </Text>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <FastImage
            source={{uri: placeDestinationFlag}}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </View>

        <View
          style={{
            marginLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={3}
            style={{
              ...FONTS.cap1,
              fontWeight: '500',
              color: COLORS.Neutral1,
            }}>
            {placeDestination}
          </Text>
        </View>
      </View>

      {/* RFQ Number */}
      <View
        style={{
          marginTop: SIZES.margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.base,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>RFQ No</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              ...FONTS.h5,
              color: COLORS.Neutral1,
            }}>
            {rfqNo}
          </Text>
        </View>

        {/* Copy icon */}
        <TouchableOpacity
          style={{marginLeft: SIZES.base, justifyContent: 'center'}}
          onPress={onCopy}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            source={icons.copy}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
      </View>

      {/* expiry */}
      <View
        style={{
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderRadius: SIZES.base,
          backgroundColor: COLORS.Neutral10,
          padding: SIZES.radius,
        }}>
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={icons.calender}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.base,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.sh3, color: COLORS.Neutral5}}>
            {expiryDate}
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>Exp in:</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>
            {' '}
            {daysUntilExpiry} days
          </Text>
        </View>
      </View>

      {/* Horizontal Rule */}
      <View
        style={{
          alignSelf: 'center',
          width: '95%',
          borderWidth: 0.5,
          borderColor: COLORS.Neutral7,
          marginTop: SIZES.semi_margin,
        }}
      />
    </View>
  );
};

export default InternationalRFQDetail1;
