import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {DUMMY_IMAGE, bucket, imageHandlerURL} from '../../utilities/Utils';
import {getUser} from '../../queries/UserQueries';
import {GetUserQuery, GetUserQueryVariables, Product} from '../../API';
import {useQuery} from '@apollo/client';

interface IItem {
  item: Product | any;
  onPress?: any;
  containerStyle?: any;
  store_image?: string;
  onRemove?: any;
  showDelete?: boolean;
}

const PopularItem = ({
  containerStyle,
  store_image,
  item,
  onPress,
  onRemove,
  showDelete,
}: IItem) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;
    if (store_image && isCurrent) {
      Storage.get(store_image).then(setImageUri);
    }
    return () => {
      isCurrent = false;
    };
  }, [store_image]);

  // GET USER
  const {data} = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {
    variables: {
      id: item?.userID,
    },
  });
  const userInfo: any = data?.getUser;

  // IMAGE REQUEST
  const uriImage = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${store_image}`,
      edits: {
        contentModeration: true,
        resize: {
          width: 80,
          height: 100,
          fit: 'cover',
        },
      },
    });
    const encodedImg = Buffer.from(imageRequest).toString('base64');
    return imageHandlerURL + encodedImg;
  }, [store_image, imageUri]);

  return (
    <Pressable
      style={{
        marginTop: SIZES.base,
        marginHorizontal: SIZES.semi_margin,
        borderRadius: SIZES.semi_margin,
        backgroundColor: COLORS.white,
        borderWidth: 0.2,
        padding: SIZES.base,
        borderColor: COLORS.Neutral7,
        ...containerStyle,
      }}
      onPress={onPress}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {/* Product image */}
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={{
              uri: uriImage || DUMMY_IMAGE,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: 80,
              height: 100,
              borderRadius: SIZES.radius,
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            marginTop: 2,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <FastImage
                source={icons.store}
                tintColor={COLORS.Neutral6}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: 15,
                  height: 15,
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
                numberOfLines={1}
                style={{
                  ...FONTS.cap1,
                  fontWeight: '500',
                  color: COLORS.Neutral1,
                }}>
                {userInfo?.title}
              </Text>
            </View>
          </View>

          {/* Product title, */}
          <View style={{justifyContent: 'center', marginTop: 6}}>
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.h5,
                color: COLORS.Neutral1,
                lineHeight: 18,
              }}>
              {item?.title}
            </Text>
          </View>

          <View style={{justifyContent: 'center', marginTop: 6}}>
            <Text
              numberOfLines={1}
              style={{...FONTS.sh3, color: COLORS.Neutral6}}>
              MOQ: {item?.minOrderQty}
            </Text>
          </View>

          {/* location and rating */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <View style={{justifyContent: 'center'}}>
              <FastImage
                source={icons.location}
                resizeMode={FastImage.resizeMode.contain}
                tintColor={COLORS.primary1}
                style={{width: 17, height: 17}}
              />
            </View>

            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={1}
                style={{...FONTS.cap1, color: COLORS.Neutral6}}>
                {userInfo?.city}
                {', '} {userInfo?.country}
              </Text>
            </View>

            <View style={{justifyContent: 'center', marginLeft: SIZES.base}}>
              <FastImage
                source={icons.dot}
                resizeMode={FastImage.resizeMode.contain}
                tintColor={COLORS.Neutral6}
                style={{width: 6, height: 6}}
              />
            </View>

            <View style={{justifyContent: 'center', marginLeft: SIZES.base}}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                source={icons.rate}
                tintColor={COLORS.secondary1}
                style={{
                  width: 17,
                  height: 17,
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
                  ...FONTS.body3,
                  fontWeight: '500',
                  color: COLORS.Neutral6,
                }}>
                {item?.rating}
              </Text>
            </View>
          </View>
        </View>

        {/* delete icon */}
        {showDelete && (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              marginRight: SIZES.base,
              top: -30,
            }}
            onPress={onRemove}>
            <FastImage
              source={icons.remove}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={COLORS.Rose4}
              style={{
                width: 23,
                height: 23,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </Pressable>
  );
};

export default PopularItem;
