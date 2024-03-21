import {View, Pressable, Text, StyleSheet} from 'react-native';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {Storage} from 'aws-amplify';
import FastImage from 'react-native-fast-image';

import {SIZES, COLORS, FONTS} from '../../constants';
import {bucket, imageHandlerURL} from '../../utilities/Utils';

const ProductReply = ({imageUri2, title, onPress, description, qty}: any) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    let unmounted = true;
    if (imageUri2 && unmounted) {
      Storage.get(imageUri2).then(setImageUri);
    }
    return () => {
      unmounted = false;
    };
  }, [imageUri2]);

  // IMAGE REQUEST
  const uriImage = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${imageUri2}`,
      edits: {
        contentModeration: true,
        resize: {
          width: 100,
          height: 80,
          fit: 'cover',
        },
      },
    });
    const encodedImg = Buffer.from(imageRequest).toString('base64');
    return imageHandlerURL + encodedImg;
  }, [imageUri2, imageUri]);

  return (
    <Pressable style={styles.container}>
      <View style={styles.subCont2}>
        <View style={{justifyContent: 'center', marginTop: SIZES.radius}}>
          <FastImage
            source={{uri: uriImage, priority: FastImage.priority.normal}}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        <View style={styles.subCont}>
          {/* title */}
          <Text numberOfLines={2} style={styles.text}>
            {title}
          </Text>

          {/* Qty */}
          <View style={styles.qtyCont}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{...FONTS.cap1, color: COLORS.Neutral6}}>
                Supply Capacity:
              </Text>
            </View>
            <View
              style={{
                paddingRight: SIZES.semi_margin,
                justifyContent: 'center',
              }}>
              <Text style={styles.text}>{qty}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.priceCont}>
            <View
              style={{
                paddingRight: SIZES.semi_margin,
                justifyContent: 'center',
              }}>
              <Text numberOfLines={3} style={styles.text2}>
                {description}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(ProductReply);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginHorizontal: SIZES.radius,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.radius,
    marginVertical: SIZES.base,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.Neutral9,
    borderRadius: SIZES.base,
    paddingVertical: 5,
    paddingHorizontal: SIZES.base,
  },
  text: {
    ...FONTS.cap1,
    fontWeight: '700',
    color: COLORS.NeutralBlue2,
  },
  text2: {
    fontWeight: '500',
    ...FONTS.cap1,
    color: COLORS.NeutralBlue2,
    paddingTop: SIZES.base,
  },
  subCont2: {flexDirection: 'row', justifyContent: 'space-between'},
  subCont: {
    flex: 1,
    marginLeft: SIZES.semi_margin,
    justifyContent: 'center',
  },
  icon: {
    width: 17,
    height: 17,
  },
  image: {
    width: 100,
    height: 80,
    borderRadius: SIZES.base,
  },
  qtyCont: {
    marginTop: SIZES.base,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
