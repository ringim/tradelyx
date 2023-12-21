import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import TextButton from '../Button/TextButton';
import {DEFAULT_PROFILE_IMAGE, DUMMY_IMAGE} from '../../utilities/Utils';
import {GetUserQuery, GetUserQueryVariables, SellOffer} from '../../API';
import {getUser} from '../../queries/UserQueries';

interface IItem {
  item: SellOffer | any;
  onPress: any;
  onView?: any;
  containerStyle?: any;
  item_image: any;
  item_image2: any;
}

const SearchItem = ({
  containerStyle,
  onView,
  item_image,
  item,
  onPress,
  item_image2,
}: IItem) => {
  // GET USER
  const {data} = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {
    variables: {
      id: item?.userID,
    },
  });
  const userInfo: any = data?.getUser;

  const [imageUri2, setImageUri2] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageUri3, setImageUri3] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;
    if (userInfo?.logo && isCurrent) {
      Storage.get(userInfo?.logo).then(setImageUri2);
    }
    return () => {
      isCurrent = false;
    };
  }, [userInfo?.logo]);

  useEffect(() => {
    let isCurrent = true;
    if (item_image && isCurrent) {
      Storage.get(item_image).then(setImageUri);
    }
    return () => {
      isCurrent = false;
    };
  }, [item_image]);

  useEffect(() => {
    let isCurrent = true;
    if (item_image2 && isCurrent) {
      Storage.get(item_image2).then(setImageUri3);
    }
    return () => {
      isCurrent = false;
    };
  }, [item_image2]);

  const options = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return (
    <Pressable
      onPress={onView}
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.semi_margin,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        borderWidth: 0.5,
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
            source={{
              uri: imageUri2 || DEFAULT_PROFILE_IMAGE,
              priority: FastImage.priority.high,
            }}
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
            {userInfo?.title}
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
                {userInfo?.rating}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Product Image */}
      <View>
        {item?.image ? (
          <View
            style={{
              alignSelf: 'center',
            }}>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: imageUri || DUMMY_IMAGE,
                priority: FastImage.priority.high,
              }}
              style={{
                width: 330,
                height: 150,
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
              source={{
                uri: imageUri3 || DUMMY_IMAGE,
                priority: FastImage.priority.high,
              }}
              style={{
                width: 330,
                height: 150,
                borderRadius: SIZES.base,
              }}
            />
          </View>
        )}

        {/* Product title */}
        <View
          style={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.semi_margin,
          }}>
          <Text numberOfLines={2} style={{...FONTS.h4, color: COLORS.Neutral1}}>
            {item?.title}
          </Text>
        </View>

        {/* Supplier Location */}
        <View
          style={{
            marginTop: SIZES.base,
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
              {userInfo?.city}
              {', '}
              {userInfo?.country}
            </Text>
          </View>
        </View>

        {/* Qty offered */}
        <View
          style={{
            marginTop: SIZES.radius,
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
              {item?.qtyMeasure} {item?.unit}
            </Text>
          </View>
        </View>

        {/* base price */}
        <View
          style={{
            marginTop: SIZES.base,
            marginHorizontal: SIZES.semi_margin,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
              FOB Price
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.body3, color: COLORS.Neutral1}}>
              ₦{item?.fobPrice.toLocaleString('en-US', options)}
            </Text>
          </View>
        </View>

        {/* payment type */}
        <View
          style={{
            marginTop: SIZES.base,
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

        {/* offer Validity*/}
        <View
          style={{
            marginTop: SIZES.base,
            marginHorizontal: SIZES.semi_margin,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
              Offer Expiry Date
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.body3, color: COLORS.Neutral1}}>
              {dayjs(item?.offerValidity).format('MMMM DD, YYYY')}
            </Text>
          </View>
        </View>
      </View>

      {/*Base Price */}
      <View
        style={{
          marginTop: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: COLORS.Neutral10,
          borderBottomLeftRadius: SIZES.radius,
          borderBottomRightRadius: SIZES.radius,
          paddingHorizontal: SIZES.semi_margin,
          padding: SIZES.radius,
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
            Base Price
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.primary1,
              letterSpacing: -1,
              paddingTop: SIZES.base,
            }}>
            ₦{item?.basePrice.toLocaleString('en-US', options)}
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
    </Pressable>
  );
};

export default SearchItem;
