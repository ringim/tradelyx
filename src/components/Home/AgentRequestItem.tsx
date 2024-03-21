import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import TextButton from '../Button/TextButton';

const AgentRequestItem = ({containerStyle, onPress, item}: any) => {
  return (
    <View
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.semi_margin,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        borderWidth: 0.5,
        borderColor: COLORS.Neutral8,
        paddingBottom: SIZES.semi_margin,
        ...containerStyle,
      }}>
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.semi_margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* to img */}
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={item?.toImg}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </View>
        {/* to Description */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.base,
            justifyContent: 'center',
          }}>
          <Text numberOfLines={2} style={{...FONTS.h5, color: COLORS.Neutral1}}>
            {item?.to}
          </Text> 
        </View>
      </View>
      {/* from img */}
      <View
        style={{
          paddingTop: 4,
          marginHorizontal: SIZES.semi_margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={item?.fromImg}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </View>
        {/* from Description */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.base,
            justifyContent: 'center',
          }}>
          <Text numberOfLines={2} style={{...FONTS.h5, color: COLORS.Neutral1}}>
            {item?.from}
          </Text>
        </View>
      </View>

      {/* Horizontal Rule */}
      <View
        style={{
          alignSelf: 'center',
          width: '90%',
          borderWidth: 0.5,
          borderColor: COLORS.Neutral7,
          marginTop: SIZES.base,
        }}
      />
      {/* Posted date */}
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderRadius: SIZES.base,
          backgroundColor: COLORS.Neutral10,
          padding: SIZES.radius,
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>Posted</Text>
        </View>

        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={icons.calender}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </View>
        <View
          style={{
            marginLeft: SIZES.base,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.h5, color: COLORS.Neutral6}}>
            {item?.posted}
          </Text>
        </View>
      </View>
      {/* For */}
      <View
        style={{
          marginTop: 4,
          flexDirection: 'row',
          marginHorizontal: SIZES.semi_margin,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
            For
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.h5, color: COLORS.Neutral1, lineHeight: 24}}>
            {item?.for}
          </Text>
        </View>
      </View>
      {/* Status*/}
      <View
        style={{
          marginTop: 4,
          flexDirection: 'row',
          marginHorizontal: SIZES.semi_margin,
          justifyContent: 'space-between',
          marginBottom: SIZES.base,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text
            style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
            Status
          </Text>
        </View>

        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={icons.live}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </View>
        <View
          style={{
            marginLeft: SIZES.base,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.h5, color: COLORS.Neutral1, lineHeight: 24}}>
            {item?.status}
          </Text>
        </View>
      </View>
      {/* Button */}
      <TextButton
        buttonContainerStyle={{
          height: 40,
          width: 320,
          borderRadius: SIZES.radius,
          marginTop: SIZES.radius,
        }}
        label="View"
        labelStyle={{...FONTS.h4}}
        onPress={onPress}
      />
    </View>
  );
};

export default AgentRequestItem;
