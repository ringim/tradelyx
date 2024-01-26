import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, icons, FONTS} from '../../constants';

const DomesticRFQDetail1 = ({
  daysUntilExpiry,
  onCopy,
  placeOriginFlag,
  placeOriginName,
  rfqNo,
  expiryDate,
}: any) => {
  return (
    <View>
      {/* Buyer from */}
      <View
        style={{
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* Buyer Country Name */}
        <View>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
            Buyer from
          </Text>
        </View>

        {/* Buyer from country flag */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
          }}>
          <FastImage
            source={{uri: placeOriginFlag}}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 17,
              height: 17,
            }}
          />
        </View>

        <View
          style={{
            flex: 4,
            alignItems: 'flex-end',
          }}>
          <Text
            numberOfLines={3}
            style={{
              ...FONTS.cap1,
              fontWeight: '600',
              color: COLORS.Neutral1,
            }}>
            {placeOriginName}
          </Text>
        </View>
      </View>

      {/* RFQ Number */}
      <View
        style={{
          marginTop: SIZES.semi_margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.semi_margin,
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
          marginTop: SIZES.radius,
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

export default DomesticRFQDetail1;
