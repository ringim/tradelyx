import {View, Text} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import ImageModal, {ImageDetail} from 'react-native-image-modal';
import dayjs from 'dayjs';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {DUMMY_IMAGE, bucket, imageHandlerURL} from '../../utilities/Utils';
import HR from '../Others/HR';

const SellOfferDetail1 = ({
  usrImg,
  title,
  soImg,
  productName,
  userInfo,
  deliveryDate,
  placeOrigin,
  paymentType,
  unit,
  category,
  packageType,
  qtyMeasure,
  paymentMethod,
  coverage,
}: any) => {
  const element = useRef<ImageDetail>(null);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageUri2, setImageUri2] = useState<string | null>(null);

  useEffect(() => {
    let unmounted = true;
    if (usrImg && unmounted) {
      Storage.get(usrImg).then(setImageUri);
    }
    return () => {
      unmounted = false;
    };
  }, [usrImg]);

  useEffect(() => {
    let unmounted = true;
    if (soImg && unmounted) {
      Storage.get(soImg).then(setImageUri2);
    }
    return () => {
      unmounted = false;
    };
  }, [soImg]);

  // IMAGE REQUEST
  const uriImage = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${usrImg}`,
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
  }, [usrImg, imageUri]);

  // IMAGE REQUEST
  const uriImage2 = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${soImg}`,
      edits: {
        contentModeration: true,
        resize: {
          width: SIZES.height > 700 ? 360 : 300,
          height: 180,
          fit: 'cover',
        },
      },
    });
    const encodedImg = Buffer.from(imageRequest).toString('base64');
    return imageHandlerURL + encodedImg;
  }, [soImg, imageUri2]);

  return (
    <View>
      <View
        style={{
          margin: SIZES.semi_margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* Supplier image */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <FastImage
            source={{
              uri: uriImage || DUMMY_IMAGE,
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
            marginLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text numberOfLines={2} style={{...FONTS.h5, color: COLORS.Neutral1}}>
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
              <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
                {parseFloat(userInfo?.rating).toFixed(0)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* sellOfferImage */}
      <View>
        {imageUri2 && (
          <View
            style={{
              marginHorizontal: SIZES.margin,
              alignSelf: 'center',
            }}>
            <ImageModal
              resizeMode="cover"
              imageBackgroundColor={COLORS.white}
              isTranslucent={false}
              swipeToDismiss={false}
              modalRef={element}
              style={{
                width: SIZES.height > 700 ? 360 : 300,
                height: 180,
                borderRadius: SIZES.radius,
              }}
              source={{
                uri: uriImage2 || DUMMY_IMAGE,
                priority: 'high',
              }}
              onOpen={() => {
                setTimeout(() => {
                  element.current?.close();
                }, 10000);
              }}
            />
          </View>
        )}

        {/* Product Title */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.margin,
          }}>
          <Text numberOfLines={2} style={{...FONTS.h4, color: COLORS.Neutral1}}>
            {title}
          </Text>
        </View>

        {/* Supplier Location */}
        <View
          style={{
            marginTop: SIZES.base,
            marginHorizontal: SIZES.margin,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
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
          <View
            style={{
              flex: 1,
              marginLeft: SIZES.base,
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={3}
              style={{
                ...FONTS.cap1,
                fontWeight: '500',
                color: COLORS.Neutral5,
              }}>
              {placeOrigin}
            </Text>
          </View>
        </View>
      </View>

      <HR containerStyle={{width: '90%', marginTop: SIZES.semi_margin}} />

      {/* Product Title */}
      <View
        style={{
          marginTop: SIZES.semi_margin,
          marginHorizontal: SIZES.margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
            Product Title
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={2}
            style={{
              ...FONTS.body3,
              fontWeight: '600',
              color: COLORS.Neutral1,
            }}>
            {productName} 
          </Text>
        </View>
      </View>

      {/* Offer Coverage */}
      <View
        style={{
          marginTop: SIZES.base,
          marginHorizontal: SIZES.margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
            Offer Coverage
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={2}
            style={{
              ...FONTS.body3,
              fontWeight: '600',
              color: COLORS.Neutral1,
            }}>
            {coverage}
          </Text>
        </View>
      </View>

      {/* Qty offered */}
      <View
        style={{
          marginTop: SIZES.base,
          marginHorizontal: SIZES.margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
            QTY Offered
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={2}
            style={{
              ...FONTS.body3,
              fontWeight: '600',
              color: COLORS.Neutral1,
            }}>
            {qtyMeasure} {unit}
          </Text>
        </View>
      </View>

      {/* Product Category */}
      <View
        style={{
          marginTop: SIZES.base,
          marginHorizontal: SIZES.margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
            Product Category
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.Neutral1,
              fontWeight: '600',
            }}>
            {category}
          </Text>
        </View>
      </View>

      {/* Packaging */}
      <View
        style={{
          marginTop: SIZES.base,
          marginHorizontal: SIZES.margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
            Packaging
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.Neutral1,
              fontWeight: '600',
            }}>
            {packageType}
          </Text>
        </View>
      </View>

      {/* payment type */}
      <View
        style={{
          marginTop: SIZES.base,
          marginHorizontal: SIZES.margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
            Payment Terms
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={2}
            style={{
              ...FONTS.body3,
              fontWeight: '600',
              color: COLORS.Neutral1,
            }}>
            {paymentType}
          </Text>
        </View>
      </View>

      {/* payment method */}
      <View
        style={{
          marginTop: SIZES.base,
          marginHorizontal: SIZES.margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
            Payment Method
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={2}
            style={{
              ...FONTS.body3,
              fontWeight: '600',
              color: COLORS.Neutral1,
            }}>
            {paymentMethod}
          </Text>
        </View>
      </View>

      {/* offer Validity */}
      <View
        style={{
          marginTop: SIZES.base,
          marginHorizontal: SIZES.margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
            Offer Expiry Date
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={2}
            style={{
              ...FONTS.body3,
              fontWeight: '600',
              color: COLORS.Neutral1,
            }}>
            {dayjs(deliveryDate).format('MMMM DD, YYYY')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SellOfferDetail1;
