import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES} from '../../constants';
import {DUMMY_IMAGE} from '../../utilities/Utils';

interface IItem {
  item: string | any;
  onPress?: any;
  containerStyle?: any;
  profile_image: any;
  profile_image2: any;
}

const SearchItem2 = ({
  containerStyle,
  profile_image,
  profile_image2,
  item,
  onPress,
}: IItem) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageUri2, setImageUri2] = useState<string | null>(null);

  useEffect(() => {
    if (profile_image) {
      Storage.get(profile_image).then(setImageUri);
    }
  }, [profile_image]);

  useEffect(() => {
    if (profile_image2) {
      Storage.get(profile_image).then(setImageUri2);
    }
  }, [profile_image2]);

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
            source={{uri: imageUri || DUMMY_IMAGE}}
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
                source={{uri: imageUri2 || DUMMY_IMAGE}}
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
                {item?.storeName}
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
                Min. Order:
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
                {item?.supplyCapacity}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem2;
