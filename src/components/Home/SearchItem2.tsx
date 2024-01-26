import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES} from '../../constants';
import {DUMMY_IMAGE, bucket, imageHandlerURL} from '../../utilities/Utils';
import {useQuery} from '@apollo/client';
import {GetUserQuery, GetUserQueryVariables, Product} from '../../API';
import {getUser} from '../../queries/UserQueries';

interface IItem {
  item: Product | any;
  onPress?: any;
  containerStyle?: any;
  profile_image: any;
}

const SearchItem2 = ({containerStyle, profile_image, item, onPress}: IItem) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  // GET USER
  const {data} = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {
    variables: {
      id: item?.userID,
    },
  });
  const userInfo: any = data?.getUser;

  useEffect(() => {
    let isCurrent = true;
    if (profile_image && isCurrent) {
      Storage.get(profile_image).then(setImageUri);
    }
    return () => {
      isCurrent = false;
    };
  }, [profile_image]);

  // IMAGE REQUEST
  const uriImage = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${profile_image}`,
      edits: {
        contentModeration: true,
        resize: {
          width: 80,
          height: 110,
          fit: 'cover',
        },
      },
    });
    const encodedImg = Buffer.from(imageRequest).toString('base64');
    return imageHandlerURL + encodedImg;
  }, [profile_image, imageUri]);

  // IMAGE REQUEST
  const uriImage2 = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${userInfo?.logo}`,
      edits: {
        contentModeration: true,
        resize: {
          width: 20,
          height: 20,
          fit: 'cover',
        },
      },
    });
    const encodedImg = Buffer.from(imageRequest).toString('base64');
    return imageHandlerURL + encodedImg;
  }, [userInfo?.logo]);

  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.semi_margin,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        borderWidth: 0.2,
        padding: SIZES.radius,
        borderColor: COLORS.Neutral7,
        ...containerStyle,
      }}
      onPress={onPress}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {/* Product image */}
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={{uri: uriImage || DUMMY_IMAGE}}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: 80,
              height: 110,
              borderRadius: SIZES.radius,
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: 'center',
            padding: 3,
            paddingStart: 0,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <FastImage
                source={{uri: uriImage2 || DUMMY_IMAGE}}
                resizeMode={FastImage.resizeMode.cover}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                }}
              />
            </View>

            {/* Supplier Name, */}
            <View
              style={{
                flex: 1,
                marginLeft: SIZES.base,
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={2}
                style={{...FONTS.body3, color: COLORS.Neutral1}}>
                {userInfo?.title}
              </Text>
            </View>
          </View>

          {/* Product title, */}
          <View style={{justifyContent: 'center', marginTop: 4}}>
            <Text
              numberOfLines={2}
              style={{...FONTS.h5, color: COLORS.Neutral1, lineHeight: 24}}>
              {item?.title}
            </Text>
          </View>

          {/* Qty required */}
          <View
            style={{
              marginTop: SIZES.base,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{...FONTS.cap1, color: COLORS.Neutral5}}>
                Min. Order Quantity:
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text
                numberOfLines={2}
                style={{...FONTS.cap1, color: COLORS.Neutral1}}>
                {item?.minOrderQty}
              </Text>
            </View>
          </View>

          {/* Supplier Qty */}
          <View
            style={{
              marginTop: 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{...FONTS.cap1, color: COLORS.Neutral5}}>
                Supply Ability:
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text
                numberOfLines={2}
                style={{...FONTS.cap1, color: COLORS.Neutral1}}>
                {item?.supplyCapacity} {item?.unit}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem2;
