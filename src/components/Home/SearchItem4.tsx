import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import TextButton from '../Button/TextButton';

interface IItem {
  item: string | any;
  onPress: any;
  containerStyle?: any;
}

const SearchItem4 = ({containerStyle, item, onPress}: IItem) => {
  const options = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.semi_margin,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.Neutral8,
        ...containerStyle,
      }}
      onPress={onPress}>
      <View
        style={{
          margin: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* Supplier image */}
        <View
          style={{
            justifyContent: 'center',
            width: 32,
            height: 32,
            alignSelf: 'center',
            backgroundColor: COLORS.lightYellow,
            borderRadius: SIZES.base,
          }}>
          <FastImage
            source={item?.storeImg}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 20,
              height: 20,
              left: 6,
            }}
          />
        </View>

        {/* Supplier name */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text numberOfLines={2} style={{...FONTS.h5, color: COLORS.Neutral1}}>
            {item?.supplier}
          </Text>

          {/* Rating, */}
          <View
            style={{
              marginTop: 4,
              marginStart: 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <FastImage
                tintColor={COLORS.secondary1}
                resizeMode={FastImage.resizeMode.contain}
                source={icons.rate}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 4,
                justifyContent: 'center',
              }}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
                {parseFloat(item?.rating).toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Product Image */}
      <View style={{marginTop: SIZES.base}}>
        <View
          style={{
            marginHorizontal: SIZES.margin,
            alignSelf: 'center',
          }}>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            source={item?.image}
            style={{
              width: 325,
              height: 145,
              borderRadius: SIZES.radius,
            }}
          />
        </View>

        {/* Product Name */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.semi_margin,
          }}>
          <Text
            numberOfLines={2}
            style={{...FONTS.h4, color: COLORS.Neutral1, lineHeight: 24}}>
            {item?.name}
          </Text>
        </View>

        {/* Supplier Location */}
        <View
          style={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.semi_margin,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              tintColor={COLORS.Neutral6}
              resizeMode={FastImage.resizeMode.contain}
              source={icons.location}
              style={{
                width: 18,
                height: 18,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: SIZES.radius,
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.body3, color: COLORS.Neutral6}}>
              {item?.address2}
            </Text>
          </View>
        </View>

        {/* Qty required */}
        <View
          style={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.semi_margin,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
              Quantity Required
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text
              numberOfLines={2}
              style={{...FONTS.body3, color: COLORS.Neutral1}}>
              {item?.qtyOffered} bags
            </Text>
          </View>
        </View>

        {/* expiry */}
        <View
          style={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: SIZES.base,
            backgroundColor: COLORS.Neutral9,
            padding: SIZES.radius,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.sh3, color: COLORS.Neutral1}}>Exp in:</Text>
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 4,
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.h5, color: COLORS.Neutral1}}>
              {item?.expiryDays} days
            </Text>
          </View>
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
          <View style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
            <Text
              numberOfLines={2}
              style={{...FONTS.sh3, color: COLORS.Neutral5}}>
              {item?.expiry}
            </Text>
          </View>
        </View>
      </View>

      {/* Price */}
      <View
        style={{
          marginTop: SIZES.semi_margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: COLORS.Neutral9,
          borderBottomLeftRadius: SIZES.radius,
          borderBottomRightRadius: SIZES.radius,
          padding: SIZES.base,
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{...FONTS.h3, color: COLORS.primary1, letterSpacing: -1}}>
            ₦{item?.price.toLocaleString('en-US', options)}
          </Text>
        </View>

        <TextButton
          buttonContainerStyle={{
            height: 45,
            width: 85,
            justifyContent: 'center',
            marginTop: 0,
            borderRadius: SIZES.base,
          }}
          label="Chat"
          labelStyle={{...FONTS.h4}}
          // onPress={onView}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem4;
