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
  store_image?: any;
}

const VendorItem = ({containerStyle, item, store_image, onPress}: IItem) => {
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

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: SIZES.semi_margin,
        padding: 17,
        paddingBottom: SIZES.semi_margin,
        ...containerStyle,
      }}>
      <View
        style={{
          borderRadius: SIZES.radius,
        }}>
        <FastImage
          source={{
            uri: imageUri || DUMMY_IMAGE,
            priority: FastImage.priority.high,
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: SIZES.radius,
          }}
        />
      </View>

      {/* Supplier Name, */}
      <View
        style={{
          marginTop: SIZES.base,
        }}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.5}
          style={{...FONTS.cap2, fontWeight: '600', color: COLORS.Neutral1}}>
          {item?.title}
        </Text>
      </View>

      {/* Supplier address, */}
      <View
        style={{
          marginTop: 6,
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
        <View style={{flex: 1, paddingLeft: 4, justifyContent: 'center'}}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.5}
            style={{...FONTS.cap2, color: COLORS.Neutral6}}>
            {item?.city}
            {', '}
            {item?.country}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VendorItem;
