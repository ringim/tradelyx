import {View, Text, Pressable} from 'react-native';
import React, {useMemo} from 'react';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import {useQuery} from '@apollo/client';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {DUMMY_IMAGE, bucket, imageHandlerURL} from '../../utilities/Utils';
import {GetUserQuery, GetUserQueryVariables, SellOffer} from '../../API';
import {getUser} from '../../queries/UserQueries';

interface IItem {
  item: SellOffer | any;
  onPress: any;
  containerStyle?: any;
  profile_image: any;
}

const SearchItem4 = ({containerStyle, item, onPress, profile_image}: IItem) => {
  // GET USER
  const {data} = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {
    variables: {
      id: item?.userID,
    },
  });
  const userInfo: any = data?.getUser;

  // IMAGE REQUEST
  const imageRequest = JSON.stringify({
    bucket,
    key: `public/${profile_image}`,
    edits: {
      resize: {
        width: SIZES.height > 700 ? 350 : 330,
        height: 130,
        fit: 'cover',
      },
    },
  });
  const encodedImg = Buffer.from(imageRequest).toString('base64');

  // IMAGE REQUEST
  const imageRequest2 = JSON.stringify({
    bucket,
    key: `public/${userInfo?.logo}`,
    edits: {
      resize: {
        width: 28,
        height: 28,
        fit: 'cover',
      },
    },
  });
  const encodedImg2 = Buffer.from(imageRequest2).toString('base64');

  const expiryDateString = item?.offerValidity;
  const expiryDate = dayjs(expiryDateString);
  const currentDate = dayjs();
  const daysUntilExpiry = expiryDate.diff(currentDate, 'day');

  return (
    <Pressable
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.semi_margin,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.Neutral8,
        paddingBottom: SIZES.radius,
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
          }}>
          <FastImage
            source={{
              uri: imageHandlerURL + encodedImg2,
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
                {parseFloat(userInfo?.rating).toFixed(0)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Sell Offer Image */}
      <View style={{marginTop: SIZES.base}}>
        <View
          style={{
            marginHorizontal: SIZES.margin,
            alignSelf: 'center',
          }}>
          <FastImage
            source={{
              uri: imageHandlerURL + encodedImg || DUMMY_IMAGE,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: SIZES.height > 700 ? 360 : 300,
              height: 140,
              borderRadius: SIZES.radius,
            }}
          />
        </View>

        {/* Product Title */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.semi_margin,
          }}>
          <Text
            numberOfLines={2}
            style={{...FONTS.h4, color: COLORS.Neutral1, lineHeight: 24}}>
            {item?.title}
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
          <View style={{}}>
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
          <View style={{paddingLeft: 4}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
              Location
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 4,
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.cap1,
                color: COLORS.Neutral1,
                fontWeight: '600',
                alignSelf: 'flex-end',
                textAlign: 'right',
              }}>
              {item?.placeOrigin}
            </Text>
          </View>
        </View>

        {/* Qty required */}
        <View
          style={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.margin,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
              Quantity Offered
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.body3,
                fontWeight: '600',
                color: COLORS.Neutral1,
              }}>
              {item?.qtyMeasure} {item?.unit}
            </Text>
          </View>
        </View>

        {/* expiry */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: SIZES.base,
            backgroundColor: COLORS.Neutral9,
            padding: SIZES.radius,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.sh3, color: COLORS.Neutral1}}>Expire in:</Text>
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
              {daysUntilExpiry} days
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
              {dayjs(item?.offerValidity).format('MMMM DD, YYYY')}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default SearchItem4;
