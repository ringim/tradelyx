import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useQuery} from '@apollo/client';
import {Storage} from 'aws-amplify';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import TextButton from '../Button/TextButton';
import {GetUserQuery, GetUserQueryVariables, RFFReply} from '../../API';
import {getUser} from '../../queries/UserQueries';
import {bucket, imageHandlerURL} from '../../utilities/Utils';
import HR from '../Others/HR';
import {formatNumberWithCommas} from '../../utilities/service';

interface IReplyListItem {
  item: RFFReply | any;
  onPress?: any;
  onPress2?: any;
  containerStyle?: any;
}

const ReplyListItem = ({
  containerStyle,
  item,
  onPress2,
  onPress,
}: IReplyListItem) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  // GET SELLER DETAIL
  const {data: newData} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: item?.forUserID}},
  );
  const getSellerInfo: any = newData?.getUser;

  useEffect(() => {
    if (getSellerInfo?.logo) {
      Storage.get(getSellerInfo?.logo).then(setImageUri);
    }
  }, [getSellerInfo?.logo]);

  // IMAGE REQUEST
  const uriImage = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${getSellerInfo?.logo}`,
      edits: {
        contentModeration: true,
        resize: {
          width: 32,
          height: 32,
          fit: 'cover',
        },
      },
    });
    const encodedImg = Buffer.from(imageRequest).toString('base64');
    return imageHandlerURL + encodedImg;
  }, [getSellerInfo?.logo, imageUri]);

  return (
    <View
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.semi_margin,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        borderWidth: 0.5,
        borderColor: COLORS.Neutral8,
        ...containerStyle,
      }}>
      <Pressable
        style={{
          margin: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={onPress2}>
        {/* Supplier image */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <FastImage
            source={{
              uri: uriImage,
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
            marginLeft: SIZES.base,
            justifyContent: 'center',
          }}>
          <Text numberOfLines={2} style={{...FONTS.h5, color: COLORS.Neutral1}}>
            {getSellerInfo?.title}
          </Text>

          {/* Rating, */}
          <View
            style={{
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
              <Text style={{...FONTS.cap1, color: COLORS.Neutral6}}>
                {parseFloat(getSellerInfo?.rating).toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>

      <View>
        {/* Product Title */}
        <View
          style={{
            marginHorizontal: SIZES.semi_margin,
            marginTop: -6
          }}>
          <Text numberOfLines={2} style={{...FONTS.h5, color: COLORS.Neutral1}}>
            {item?.title}
          </Text>
        </View>

        {/* Supplier Location */}
        <View
          style={{
            marginTop: SIZES.base,
            marginHorizontal: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              tintColor={COLORS.Neutral6}
              resizeMode={FastImage.resizeMode.contain}
              source={icons.location}
              style={{
                width: 16,
                height: 16,
              }}
            />
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
                color: COLORS.Neutral5,
                fontWeight: '500',
              }}>
              {item?.placeOrigin}
            </Text>
          </View>
        </View>

        {/* base Price */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: SIZES.semi_margin,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.cap1, color: COLORS.Neutral6}}>
              Base Price
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.cap1,
                fontWeight: '700',
                color: COLORS.Neutral1,
              }}>
              ₦{formatNumberWithCommas(item?.price)}
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
            padding: SIZES.base,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.sh3, color: COLORS.Neutral6}}>
              Expiry Date:
            </Text>
          </View>
          <View
            style={{
              marginLeft: 4,
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.h5, color: COLORS.Neutral1}}>
              {item?.expiryDate}
            </Text>
          </View>
        </View>
      </View>

      {/* Budget */}
      {item?.budget && (
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.semi_margin,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body2, color: COLORS.Neutral6}}>Budget</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.cap1,
                fontWeight: '500',
                color: COLORS.Neutral1,
              }}>
              ₦{item?.budget}
            </Text>
          </View>
        </View>
      )}

      {/* Price */}
      <HR containerStyle={{marginTop: SIZES.radius}} />

      <TextButton
        buttonContainerStyle={{
          height: 45,
          borderRadius: SIZES.radius,
          width: '80%',
          justifyContent: 'center',
          marginTop: SIZES.radius,
          marginBottom: SIZES.radius,
        }}
        label="View"
        onPress={onPress}
      />
    </View>
  );
};

export default ReplyListItem;
