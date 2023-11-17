import {View, Text, Pressable} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, FONTS, icons} from '../../constants';

const SellerOrderItem = ({
  item,
  onPress,
  statusColor,
  contentStyle,
  descStyle,
  desc,
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
              marginLeft: 2,
            }}>
            <View style={{justifyContent: 'center'}}>
              <FastImage
                source={item?.toImg}
                style={{width: 15, height: 15}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View style={{flex: 1, marginLeft: SIZES.base, justifyContent: 'center'}}>
              <Text
                numberOfLines={2}
                style={{
                  ...FONTS.cap1,
                  fontWeight: '500',
                  color: COLORS.Neutral6,
                }}>
                {item?.to}
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
              fontWeight: '500',
              color: COLORS.Neutral1,
              ...descStyle
            }}>
            {item?.desc}
          </Text>
        </View>
      )}

      {/* Horizontal Rule */}
      <View
        style={{
          marginTop: SIZES.semi_margin,
          alignSelf: 'center',
          width: '100%',
          borderWidth: 0.5,
          borderColor: COLORS.Neutral7,
        }}
      />

      {/* status */}
      <View
        style={{
          marginTop: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.base
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.h5, color: statusColor}}>{item?.status}</Text>
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
    </Pressable>
  );
};

export default SellerOrderItem;
