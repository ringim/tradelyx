import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {DUMMY_IMAGE} from '../../utilities/Utils';

interface IItem {
  item: string | any;
  onPress: any;
  containerStyle?: any;
  store_image?: string;
}

const PopularItem = ({containerStyle, store_image, item, onPress}: IItem) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    if (store_image) {
      Storage.get(store_image).then(setImageUri);
    }
  }, [store_image]);

  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.radius,
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
            source={{uri: imageUri || DUMMY_IMAGE}}
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
            marginTop: SIZES.base,
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
                  width: 17,
                  height: 17,
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
                style={{...FONTS.cap1, color: COLORS.Neutral6}}>
                {item?.storeName}
              </Text>
            </View>
          </View>

          {/* Product title, */}
          <View style={{justifyContent: 'center', marginTop: 5}}>
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.h5,
                color: COLORS.Neutral1,
                lineHeight: 24,
              }}>
              {item?.title}
            </Text>
          </View>

          <View style={{justifyContent: 'center', marginTop: 4}}>
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
              marginTop:SIZES.base,
            }}>
            <View style={{justifyContent: 'center'}}>
              <FastImage
                source={icons.location}
                resizeMode={FastImage.resizeMode.contain}
                tintColor={COLORS.Neutral6}
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
                {item?.storeAddress}
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
                style={{
                  width: 17,
                  height: 17,
                }}
              />
            </View>

            <View
              style={{
                flex: 1,
                marginLeft: SIZES.base,
                justifyContent: 'center',
              }}>
              <Text style={{...FONTS.cap1, color: COLORS.Neutral6}}>
                {parseFloat(item?.rating).toFixed(1) || 0}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularItem;
