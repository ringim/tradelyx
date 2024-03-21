import {View, Text, Pressable} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {Order} from '../../API';
import TextButton from '../Button/TextButton';

interface IItem {
  item: Order | any;
  onPress?: any;
  containerStyle?: any;
  serviceImage?: any;
}

const OrderNotificationTab = ({
  containerStyle,
  item,
  onPress,
  serviceImage,
}: IItem) => {
  return (
    <Pressable
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* service type img */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <FastImage
            source={serviceImage}
            style={{width: 24, height: 24, top: -5}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>

        {/* Service Type */}
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            marginLeft: SIZES.semi_margin,
          }}>
          <Text
            style={{
              ...FONTS.h5,
              fontWeight: '700',
              color: COLORS.Neutral1,
              textTransform: 'capitalize',
            }}>
            {item?.rfqType}
          </Text>

          <View
            style={{
              marginTop: 4,
            }}>
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: '500',
                color: COLORS.Neutral1,
              }}>
              {item?.rfqNo}
            </Text>
          </View>

          {/* to and from destination */}
          <View
            style={{
              marginTop: SIZES.semi_margin,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {/* from location */}
            <View
              style={{
                justifyContent: 'center',
              }}>
              <FastImage
                source={{uri: item?.placeOriginFlag}}
                style={{width: 15, height: 15}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View
              style={{
                flex: item?.rfqType !== 'INTERNATIONAL' ? 0 : 6,
                marginLeft: SIZES.base,
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  ...FONTS.cap1,
                  fontWeight: '700',
                  color: COLORS.Neutral6,
                }}>
                {item?.placeOrigin}
              </Text>
            </View>

            {/* right arrow */}
            {item?.placeDestinationFlag && (
              <View
                style={{
                  marginLeft: 10,
                  justifyContent: 'center',
                }}>
                <FastImage
                  source={icons.right}
                  tintColor={COLORS.Neutral1}
                  style={{width: 15, height: 15}}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
            )}

            {/* to destination */}
            <View
              style={{
                flex: 0,
                justifyContent: 'center',
                marginLeft: SIZES.base,
              }}>
              <FastImage
                source={{uri: item?.placeDestinationFlag}}
                style={{width: 16, height: 16}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View
              style={{
                flex: 5,
                marginLeft: SIZES.base,
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  ...FONTS.cap1,
                  fontWeight: '700',
                  color: COLORS.Neutral6,
                }}>
                {item?.placeDestination}
              </Text>
            </View>
          </View>
        </View>

        {/* created At */}
        <View
          style={{
            top: 0,
            position: 'absolute',
            right: 10,
          }}>
          <Text
            style={{
              ...FONTS.cap2,
              fontWeight: '500',
              color: COLORS.Neutral5,
            }}>
            {item?.createdAt}
          </Text>
        </View>
      </View>

      {/* description */}
      <View
        style={{
          marginTop: SIZES.semi_margin,
        }}>
        <Text
          numberOfLines={2}
          style={{
            ...FONTS.cap2,
            fontWeight: '400',
            color: COLORS.Neutral1,
          }}>
          {item?.title}
        </Text>
      </View>

      <TextButton
        buttonContainerStyle={{
          height: 40,
          borderRadius: SIZES.base,
          marginTop: SIZES.semi_margin,
        }}
        label={`View details`}
        labelStyle={{...FONTS.h5}}
        onPress={onPress}
      />
    </Pressable>
  );
};

export default OrderNotificationTab;
