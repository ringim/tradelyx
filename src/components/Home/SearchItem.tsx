import {View, Text, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import TextButton from '../Button/TextButton';

interface IItem {
  item: string | any;
  onPress: any;
  onView?: any;
  containerStyle?: any;
}

const SearchItem = ({containerStyle, onView, item, onPress}: IItem) => {
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
              width: Platform.OS === 'ios' ? 360 : 350,
              height: 145,
              borderRadius: SIZES.base,
            }}
          />
        </View>

        {/* Product Name */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.semi_margin,
          }}>
          <Text numberOfLines={2} style={{...FONTS.h4, color: COLORS.Neutral1}}>
            {item?.name}
          </Text>
        </View>

        {/* Supplier Location */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
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
                width: 20,
                height: 20,
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

        {/* Qty offered */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
              QTY Offered
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.body3, color: COLORS.Neutral1}}>
              {item?.qtyOffered} bags
            </Text>
          </View>
        </View>

        {/* base price */}
        <View
          style={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
              Base Price (FOB)
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.body3, color: COLORS.Neutral1}}>
              ₦{item?.usdPrice.toLocaleString('en-US', options)}
            </Text>
          </View>
        </View>

        {/* payment type */}
        <View
          style={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
              Payment Type
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.body3, color: COLORS.Neutral1}}>
              {item?.paymentType}
            </Text>
          </View>
        </View>

        {/* delivery duration */}
        <View
          style={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
              Delivery Duration
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.body3, color: COLORS.Neutral1}}>
              {item?.deliveryDuration} days
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
          padding: SIZES.radius,
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>Price</Text>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.primary1,
              letterSpacing: -1,
              paddingTop: SIZES.base,
            }}>
            ₦{item?.price.toLocaleString('en-US', options)}
          </Text>
        </View>

        <TextButton
          buttonContainerStyle={{
            height: 40,
            width: 85,
            justifyContent: 'center',
            marginTop: 0,
            borderRadius: SIZES.base,
          }}
          label="View"
          labelStyle={{...FONTS.h5}}
          onPress={onView}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem;
