import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';
import {FlatList} from 'react-native-gesture-handler';

import {COLORS, SIZES, FONTS, icons} from '../../constants';
import {DUMMY_IMAGE} from '../../utilities/Utils';

const ProductInfo = ({image, tags, name}: any) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      Storage.get(image).then(setImageUri);
    }
  }, [image]);

  return (
    <View
      style={{
        padding: SIZES.semi_margin,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.semi_margin,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={icons.info}
            resizeMode={FastImage.resizeMode.cover}
            tintColor={COLORS.secondary1}
            style={{width: 20, height: 20}}
          />
        </View>

        <View
          style={{flex: 1, marginLeft: SIZES.radius, justifyContent: 'center'}}>
          <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>Information</Text>
        </View>
      </View>
      {/* product image */}
      <View style={{marginTop: SIZES.semi_margin}}>
        <FastImage
          source={{uri: imageUri || DUMMY_IMAGE}}
          resizeMode={FastImage.resizeMode.cover}
          style={{width: 200, height: 200, borderRadius: SIZES.radius}}
        />
      </View>

      {/* Product name */}
      <View
        style={{
          alignItems: 'center',
          marginTop: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
            Product Name:
          </Text>
        </View>
        <View
          style={{flex: 1, marginLeft: SIZES.base, justifyContent: 'center'}}>
          <Text
            numberOfLines={2}
            style={{...FONTS.sh3, letterSpacing: -0.5, color: COLORS.Neutral1}}>
            {name}
          </Text>
        </View>
      </View>

      {/* tags */}
      <View style={{marginTop: SIZES.radius}}>
        <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>Tags</Text>
        <FlatList
          data={tags}
          keyExtractor={item => `${item?.id}`}
          showsVerticalScrollIndicator={false}
          style={{marginTop: 4}}
          renderItem={({item, index}) => {
            /* Tags list */
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{justifyContent: 'center'}}>
                  <Text
                    numberOfLines={2}
                    style={{
                      ...FONTS.body3,
                      fontWeight: 'bold',
                      color: COLORS.Neutral1,
                    }}>
                    .
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginLeft: SIZES.base,
                    justifyContent: 'center',
                  }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      ...FONTS.body3,
                      fontWeight: 'bold',
                      color: COLORS.Neutral1,
                    }}>
                    {item}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ProductInfo;
