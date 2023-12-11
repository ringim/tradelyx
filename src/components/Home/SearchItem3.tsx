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
  profile_image: any;
}

const SearchItem3 = ({containerStyle, profile_image, item, onPress}: IItem) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;
    if (profile_image && isCurrent) {
      Storage.get(profile_image).then(setImageUri);
    }
    return () => {
      isCurrent = false;
    };
  }, [profile_image]);

  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.base,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        padding: SIZES.radius,
        ...containerStyle,
      }}
      onPress={onPress}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {/* Product image */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <FastImage
            source={{uri: imageUri || DUMMY_IMAGE}}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: 100,
              height: 100,
              borderRadius: SIZES.radius,
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <FastImage
                source={icons.location}
                tintColor={COLORS.primary1}
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
                {item?.city}
                {', '}
                {item?.country}
              </Text>
            </View>
          </View>

          {/* Product title, */}
          <View style={{justifyContent: 'center', marginTop: SIZES.base}}>
            <Text
              numberOfLines={1}
              style={{...FONTS.h5, color: COLORS.Neutral1}}>
              {item?.title}
            </Text>
          </View>

          {/* Product title, */}
          <View style={{justifyContent: 'center', marginTop: SIZES.base}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{justifyContent: 'center'}}>
                <FastImage
                  source={icons.category}
                  tintColor={COLORS.secondary1}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    width: 15,
                    height: 15,
                  }}
                />
              </View>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text
                  style={{
                    ...FONTS.cap1,
                    marginLeft: 5,
                    color: COLORS.Neutral1,
                  }}>
                  {item?.businessType}
                </Text>
              </View>
            </View>
          </View>

          {/* description */}
          <View style={{justifyContent: 'center', marginTop: SIZES.base}}>
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.cap1,
                color: COLORS.Neutral6,
              }}>
              {item?.overview}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem3;