import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import TextButton from '../Button/TextButton';

interface IItem {
  item: string | any;
  onPress?: any;
  containerStyle?: any;
  onCopy?: any;
}

const RFQItem = ({containerStyle, item, onCopy, onPress}: IItem) => {
  const options = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return (
    <View
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        borderWidth: 0.5,
        borderColor: COLORS.Neutral8,
        ...containerStyle,
      }}>
      <View
        style={{
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.semi_margin,
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
            source={item?.toImg}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 23,
              height: 23,
            }}
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            padding: SIZES.base,
            borderRadius: SIZES.radius,
          }}>
          <Text
            style={{
              ...FONTS.h5,
              color: COLORS.Neutral1,
            }}>
            {item?.to}
          </Text>
        </View>
      </View>

      {/* RFQ Number */}
      <View
        style={{
          marginTop: SIZES.radius,
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
            {item?.rfqNo}
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
          marginHorizontal: SIZES.radius,
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
          style={{flex: 1, marginLeft: SIZES.base, justifyContent: 'center'}}>
          <Text style={{...FONTS.sh3, color: COLORS.Neutral5}}>
            {item?.expiryDate}
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
            {item?.expiry} days
          </Text>
        </View>
      </View>

      {/* Horizontal Rule */}
      <View
        style={{
          alignSelf: 'center',
          width: '95%',
          borderWidth: 0.4,
          borderColor: COLORS.Neutral7,
          marginTop: SIZES.semi_margin,
        }}
      />

      {/* Description */}
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.semi_margin,
          justifyContent: 'center',
        }}>
        <Text numberOfLines={2} style={{...FONTS.h5, color: COLORS.Neutral1}}>
          {item?.desc}
        </Text>
      </View>

      {/* Product Name */}
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
            Product Name
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.h5, color: COLORS.Neutral1, lineHeight: 24}}>
            {item?.productName}
          </Text>
        </View>
      </View>

      {/* Qty */}
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
            Qty Required
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.h5, color: COLORS.Neutral1, lineHeight: 24}}>
            {item?.qty} bags
          </Text>
        </View>
      </View>

      {/* Payment terms */}
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
            Payment Terms
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.h5, color: COLORS.Neutral1, lineHeight: 24}}>
            {item?.paymentTerms}
          </Text>
        </View>
      </View>

      {/* Price */}
      <View
        style={{
          marginTop: SIZES.semi_margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: COLORS.Neutral10,
          borderBottomLeftRadius: SIZES.radius,
          borderBottomRightRadius: SIZES.radius,
          padding: SIZES.radius,
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>Budget</Text>
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
            width: 100,
            borderRadius: SIZES.base,
            justifyContent: 'center',
            marginTop: 0,
          }}
          label="View"
          labelStyle={{...FONTS.h4}}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default RFQItem;
