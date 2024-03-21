import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import ViewMoreText from 'react-native-view-more-text';

import {COLORS, SIZES, icons, FONTS} from '../../constants';

const StandardRFQDetail1 = ({
  placeOriginFlag,
  placeOriginName,
  rfqNo,
  description,
  title,
}: any) => {
  function renderViewMore(onPress: any) {
    return (
      <TouchableOpacity style={{marginTop: SIZES.radius}} onPress={onPress}>
        <Text
          style={{color: COLORS.primary6, ...FONTS.body3, fontWeight: '500'}}>
          View more
        </Text>
      </TouchableOpacity>
    );
  }

  function renderViewLess(onPress: any) {
    return (
      <TouchableOpacity style={{marginTop: SIZES.radius}} onPress={onPress}>
        <Text
          style={{color: COLORS.primary6, ...FONTS.body3, fontWeight: '500'}}>
          View less
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <View
        style={{
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* Buyer Country Name */}
        <View>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
            Buyer from
          </Text>
        </View>

        {/* Buyer from country flag */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
          }}>
          <FastImage
            source={{uri: placeOriginFlag}}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 17,
              height: 17,
            }}
          />
        </View>

        <View
          style={{
            flex: 4,
            alignItems: 'flex-end',
          }}>
          <Text
            numberOfLines={3}
            style={{
              ...FONTS.cap1,
              fontWeight: '600',
              color: COLORS.Neutral1,
            }}>
            {placeOriginName}
          </Text>
        </View>
      </View>

      {/* RFQ Number */}
      <View
        style={{
          marginTop: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.semi_margin,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>RFQ No</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              ...FONTS.h5,
              color: COLORS.Neutral1,
            }}>
            {rfqNo}
          </Text>
        </View>

        {/* Copy icon */}
        <TouchableOpacity
          style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            source={icons.copy}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Horizontal Rule */}
      <View
        style={{
          alignSelf: 'center',
          width: '95%',
          borderWidth: 0.5,
          borderColor: COLORS.Neutral7,
          marginTop: SIZES.semi_margin,
        }}
      />

      {/* Description */}
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.semi_margin,
          justifyContent: 'center',
        }}>
        <Text style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
          Requirements
        </Text>
        <ViewMoreText
          numberOfLines={5}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
          style={{justifyContent: 'center', marginTop: SIZES.radius}}
          textStyle={{
            ...FONTS.body3,
            fontWeight: '500',
            color: COLORS.Neutral1,
          }}>
          <Text>{description}</Text>
        </ViewMoreText>
      </View>

      {/* Product title */}
      <View
        style={{
          marginTop: SIZES.semi_margin,
          flexDirection: 'row',
          marginHorizontal: SIZES.semi_margin,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.Neutral6,
            }}>
            Request for
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.padding,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.Neutral1,
            }}>
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StandardRFQDetail1;
