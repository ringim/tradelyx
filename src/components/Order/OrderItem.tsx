import {View, Text, Pressable} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, FONTS, icons} from '../../constants';
import TextButton from '../Button/TextButton';

const OrderItem = ({
  item,
  onPress,
  replies,
  showHR,
  status,
  btn,
  statusColor,
  contentStyle,
  desc,
  type,
}: any) => {
  return (
    <Pressable
      style={{
        marginHorizontal: SIZES.radius,
        marginTop: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        paddingVertical: SIZES.semi_margin,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.Neutral9,
        ...contentStyle,
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
            padding: SIZES.base,
            backgroundColor: COLORS.lightYellow,
            borderRadius: SIZES.radius,
          }}>
          <FastImage
            source={item?.image}
            style={{width: 24, height: 24}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>

        {/* Service Type */}
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            marginLeft: SIZES.radius,
          }}>
          <Text
            style={{
              ...FONTS.h5,
              fontWeight: '700',
              color: COLORS.Neutral1,
            }}>
            {item?.serviceType}
          </Text>
          {/* to and from destination */}
          <View
            style={{
              marginTop: SIZES.radius,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <FastImage
                source={item?.toImg}
                style={{width: 15, height: 15}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View style={{marginLeft: 3, justifyContent: 'center'}}>
              <Text
                numberOfLines={2}
                style={{
                  ...FONTS.cap1,
                  fontWeight: '700',
                  color: COLORS.Neutral6,
                }}>
                {item?.to}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                marginLeft: 3,
              }}>
              <FastImage
                source={icons.right}
                tintColor={COLORS.Neutral6}
                style={{width: 12, height: 12}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View
              style={{
                marginLeft: SIZES.base,
                justifyContent: 'center',
              }}>
              <FastImage
                source={item?.fromImg}
                style={{width: 16, height: 16}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View style={{marginLeft: 6, justifyContent: 'center'}}>
              <Text
                numberOfLines={2}
                style={{
                  ...FONTS.cap1,
                  fontWeight: '700',
                  color: COLORS.Neutral6,
                }}>
                {item?.from}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            top: -12,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              color: COLORS.Neutral1,
            }}>
            {item?.orderID}
          </Text>
        </View>
      </View>

      {/* Description */}
      {desc && (
        <View
          style={{
            marginTop: SIZES.radius,
          }}>
          <Text
            style={{
              ...FONTS.sh2,
              fontWeight: '600',
              color: COLORS.Neutral1,
            }}>
            {item?.desc}
          </Text>
        </View>
      )}

      {/* Horizontal Rule */}
      {showHR && (
        <View
          style={{
            marginTop: SIZES.semi_margin,
            alignSelf: 'center',
            width: '100%',
            borderWidth: 0.5,
            borderColor: COLORS.Neutral9,
          }}
        />
      )}

      {/* status */}
      {status && (
        <View
          style={{
            marginTop: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.h5, color: statusColor}}>
              {item?.status}
            </Text>
          </View>
          <View
            style={{
              marginLeft: SIZES.base,
              justifyContent: 'center',
            }}>
            <FastImage
              source={icons.right}
              tintColor={COLORS.Neutral6}
              style={{width: 24, height: 24}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </View>
      )}

      {btn && (
        <TextButton
          buttonContainerStyle={{
            height: 40,
            borderRadius: SIZES.base,
            marginTop: SIZES.semi_margin,
          }}
          label={`Show ${type} Replies (${replies})`}
          labelStyle={{...FONTS.h5}}
          onPress={onPress}
        />
      )}
    </Pressable>
  );
};

export default OrderItem;
