import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import TextButton from '../Button/TextButton';

const RFFQuoteItem = ({containerStyle, onPress, item}: any) => {
  return (
    <View
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.semi_margin,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        borderWidth: 0.5,
        borderColor: COLORS.Neutral8,
        paddingBottom: SIZES.semi_margin,
        ...containerStyle,
      }}>
      <View
        style={{
          margin: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* Buyer from Image */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <FastImage
            source={item?.fromImg}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 23,
              height: 23,
            }}
          />
        </View>

        {/* Buyer Country Name */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.cap1, color: COLORS.Neutral6}}>From</Text>
          <Text
            numberOfLines={2}
            style={{
              ...FONTS.h5,
              marginTop: 2,
              color: COLORS.Neutral1,
            }}>
            {item?.from}
          </Text>
        </View>

        {/* arrow */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <FastImage
            source={icons.right}
            resizeMode={FastImage.resizeMode.contain}
            tintColor={COLORS.Neutral5}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </View>

        {/* Buyer To Image */}
        <View
          style={{
            marginLeft: SIZES.padding,
            justifyContent: 'center',
          }}>
          <FastImage
            source={item?.toImg}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 23,
              height: 23,
            }}
          />
        </View>

        {/* Buyer Country Name */}
        <View
          style={{
            marginLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.cap1, color: COLORS.Neutral6}}>To</Text>
          <Text
            numberOfLines={2}
            style={{
              ...FONTS.h5,
              marginTop: 2,
              color: COLORS.Neutral1,
            }}>
            {item?.to}
          </Text>
        </View>
      </View>

      {/* Horizontal Rule */}
      <View
        style={{
          alignSelf: 'center',
          width: '90%',
          borderWidth: 0.4,
          borderColor: COLORS.Neutral7,
          marginTop: SIZES.base,
        }}
      />

      {/* package type */}
      <View
        style={{
          marginTop: SIZES.radius,
          flexDirection: 'row',
          marginHorizontal: SIZES.semi_margin,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
            Package Type
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral1, lineHeight: 24}}>
            {item?.packageType}
          </Text>
        </View>
      </View>

      {/* Transport Mode */}
      <View
        style={{
          marginTop: 4,
          flexDirection: 'row',
          marginHorizontal: SIZES.semi_margin,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
            Mode of Transport
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral1, lineHeight: 24}}>
            {item?.transportMode}
          </Text>
        </View>
      </View>

      {/* Port of Origin */}
      <View
        style={{
          marginTop: 4,
          flexDirection: 'row',
          marginHorizontal: SIZES.semi_margin,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
            Port of Origin
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral1, lineHeight: 24}}>
            {item?.portOrigin}
          </Text>
        </View>
      </View>

      {/* Port destination */}
      <View
        style={{
          marginTop: 4,
          flexDirection: 'row',
          marginHorizontal: SIZES.semi_margin,
          justifyContent: 'space-between',
          paddingBottom: SIZES.base,
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
            Port of Destination
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral1, lineHeight: 24}}>
            {item?.portDestination}
          </Text>
        </View>
      </View>

      {/* Button */}
      <TextButton
        buttonContainerStyle={{
          height: 40,
          borderRadius: SIZES.radius,
          marginTop: SIZES.base,
          width: 330
        }}
        label="View"
        onPress={onPress}
      />
    </View>
  );
};

export default RFFQuoteItem;
