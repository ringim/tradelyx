import {View, Text} from 'react-native';
import React from 'react';
import {AirbnbRating} from 'react-native-ratings';

import {COLORS, FONTS, SIZES} from '../../constants';

const ReviewItem = ({item}: any) => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.semi_margin,
        borderBottomLeftRadius: SIZES.radius,
        borderBottomRightRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        marginHorizontal: SIZES.semi_margin,
        paddingBottom: SIZES.radius,
      }}>
      <View
        style={{
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* name */}
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>
            {item?.name}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* Rating */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <AirbnbRating
            reviewSize={0}
            defaultRating={item?.rate}
            size={15}
            showRating={false}
            ratingContainerStyle={{
              width: '100%',
            }}
          />
        </View>

        {/* rating */}
        <View
          style={{
            marginLeft: SIZES.base,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
            {parseFloat(item?.rating).toFixed(1)}
          </Text>
        </View>

        {/* review */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.base,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
            ({item?.reviews} review)
          </Text>
        </View>
      </View>

      <View style={{marginTop: SIZES.base}}>
        <Text style={{...FONTS.body3, lineHeight: 24, color: COLORS.Neutral6}}>
          {item?.comment}
        </Text>
      </View>

      {/* Horizontal Rule */}
      <View
        style={{
          marginTop: SIZES.radius,
          alignSelf: 'center',
          width: '100%',
          borderWidth: 0.5,
          borderColor: COLORS.Neutral7,
        }}
      />
    </View>
  );
};

export default ReviewItem;
