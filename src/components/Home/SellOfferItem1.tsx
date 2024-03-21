import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import {useMutation, useQuery} from '@apollo/client';
import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import TextButton from '../Button/TextButton';
import {DUMMY_IMAGE, bucket, imageHandlerURL} from '../../utilities/Utils';
import {
  DeleteSellOfferMutation,
  DeleteSellOfferMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  SellOffer,
} from '../../API';
import {getUser} from '../../queries/UserQueries';
import {deleteSellOffer} from '../../queries/SellOfferQueries';
import {formatNumberWithCommas} from '../../utilities/service';

interface IItem {
  item: SellOffer | any;
  onPress?: any;
  onView?: any;
  containerStyle?: any;
  item_image2: any;
}

const SellOfferItem1 = ({
  containerStyle,
  onView,
  item,
  onPress,
  item_image2,
}: IItem) => {
  const win = Dimensions.get('window');
  const ratio = win.width / 841;

  // GET USER
  const {data} = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {
    variables: {
      id: item?.userID,
    },
  });
  const userInfo: any = data?.getUser;

  const currentDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const expiryDate = currentDate >= item?.offerValidity ? true : false;

  const [doDeleteSellOffer] = useMutation<
    DeleteSellOfferMutation,
    DeleteSellOfferMutationVariables
  >(deleteSellOffer, {
    variables: {
      input: {
        id: item.id,
      },
    },
  });

  useEffect(() => {
    const startDelete = async () => {
      try {
        if (expiryDate === true) {
          await doDeleteSellOffer();
        } else {
          return;
        }
      } catch (error) {
        return error;
      }
    };
    startDelete();
  }, [item]);

  // IMAGE REQUEST
  const imageRequest = JSON.stringify({
    bucket,
    key: `public/${item_image2}`,
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

  return (
    <Pressable
      onPress={() => onView}
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
        <View>
          <FastImage
            source={{
              uri: imageHandlerURL + encodedImg2,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: 28,
              height: 28,
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
          <Text
            numberOfLines={1}
            style={{...FONTS.cap1, fontWeight: 'bold', color: COLORS.Neutral1}}>
            {userInfo?.title}
          </Text>

          {/* Rating, */}
          <View
            style={{
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
                  width: 15,
                  height: 15,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 2,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.cap1,
                  color: COLORS.Neutral6,
                }}>
                {userInfo?.rating}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Sell Offer Image */}
      <View>
        {imageHandlerURL && (
          <View
            style={{
              alignSelf: 'center',
              marginHorizontal: SIZES.semi_margin,
            }}>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: imageHandlerURL + encodedImg || DUMMY_IMAGE,
                priority: FastImage.priority.high,
              }}
              style={{
                width: win.width / 1.18,
                height: 362 * ratio, //362 is actual height of image
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
          <Text numberOfLines={2} style={{...FONTS.h5, color: COLORS.Neutral1}}>
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

        {/* Qty offered */}
        <View
          style={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.semi_margin,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.cap1, color: COLORS.Neutral6}}>
              Qty Offered
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.cap1, color: COLORS.Neutral1}}>
              {item?.qtyMeasure} {item?.unit}
            </Text>
          </View>
        </View>

        {/* payment type */}
        <View
          style={{
            marginTop: 6,
            marginHorizontal: SIZES.semi_margin,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.cap1, color: COLORS.Neutral6}}>
              Payment Type
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.cap1, color: COLORS.Neutral1}}>
              {item?.paymentType}
            </Text>
          </View>
        </View>

        {/* offer Validity*/}
        <View
          style={{
            marginTop: 6,
            marginHorizontal: SIZES.semi_margin,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.cap1, color: COLORS.Neutral6}}>
              Offer Expiry Date
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.cap1, color: COLORS.Neutral1}}>
              {dayjs(item?.offerValidity).format('MMMM DD, YYYY')}
            </Text>
          </View>
        </View>
      </View>

      {/*Base Price */}
      <View
        style={{
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: COLORS.lime,
          borderBottomLeftRadius: SIZES.radius,
          borderBottomRightRadius: SIZES.radius,
          paddingHorizontal: SIZES.semi_margin,
          padding: SIZES.base,
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{...FONTS.cap1, color: COLORS.black}}>Base Price</Text>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.primary1,
              letterSpacing: -1,
              paddingTop: 4,
            }}>
            ₦{formatNumberWithCommas(item?.basePrice)}
          </Text>
        </View>

        <TextButton
          buttonContainerStyle={{
            height: 35,
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

export default SellOfferItem1;
