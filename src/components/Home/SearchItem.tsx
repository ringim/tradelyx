import {View, Text, TouchableOpacity, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import TextButton from '../Button/TextButton';
import {DUMMY_IMAGE} from '../../utilities/Utils';
import dayjs from 'dayjs';

interface IItem {
  item: string | any;
  onPress: any;
  onView?: any;
  containerStyle?: any;
  logo: any;
  item_image: any;
  item_image2: any;
}

const SearchItem = ({
  containerStyle,
  logo,
  onView,
  item_image,
  item,
  onPress,
  item_image2,
}: IItem) => {
  const [imageUri2, setImageUri2] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageUri3, setImageUri3] = useState<string | null>(null);

  useEffect(() => {
    if (logo) {
      Storage.get(logo).then(setImageUri2);
    }
  }, [logo]);

  useEffect(() => {
    if (item_image) {
      Storage.get(item_image).then(setImageUri);
    }
  }, [item_image]);

  useEffect(() => {
    if (item_image2) {
      Storage.get(item_image2).then(setImageUri3);
    }
  }, [item_image2]);

  const options = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  const expiryDateString = item?.deliveryDate;
  const expiryDate = dayjs(expiryDateString);
  const currentDate = dayjs();
  const daysUntilExpiry = expiryDate.diff(currentDate, 'day');

  return (
    <View
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.semi_margin,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.Neutral8,
        ...containerStyle,
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          margin: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* Supplier image */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <FastImage
            source={{uri: imageUri2 || DUMMY_IMAGE}}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: 32,
              height: 32,
              borderRadius: SIZES.base,
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
            {item?.storeName}
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
                {item?.storeRating}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Product Image */}
      <View style={{marginTop: SIZES.base}}>
        {item?.image ? (
          <View
            style={{
              alignSelf: 'center',
            }}>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              source={{uri: imageUri || DUMMY_IMAGE}}
              style={{
                width: 320,
                height: 140,
                borderRadius: SIZES.base,
              }}
            />
          </View>
        ) : (
          <View
            style={{
              alignSelf: 'center',
            }}>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              source={{uri: imageUri3 || DUMMY_IMAGE}}
              style={{
                width: 320,
                height: 140,
                borderRadius: SIZES.base,
              }}
            />
          </View>
        )}

        {/* Product Name */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.semi_margin,
          }}>
          <Text numberOfLines={2} style={{...FONTS.h4, color: COLORS.Neutral1}}>
            {item?.productName}
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
              {item?.storeAddress}
            </Text>
          </View>
        </View>

        {/* Qty offered */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.semi_margin,
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
              {item?.qtyMeasure} bags
            </Text>
          </View>
        </View>

        {/* base price */}
        <View
          style={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.semi_margin,
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
              ₦{parseFloat(item?.basePrice).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* payment type */}
        <View
          style={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.semi_margin,
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
            marginHorizontal: SIZES.semi_margin,
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
              {daysUntilExpiry} days
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
          paddingHorizontal: SIZES.semi_margin,
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
            ₦{item?.fobPrice.toLocaleString('en-US', options)}
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
    </View>
  );
};

export default SearchItem;
