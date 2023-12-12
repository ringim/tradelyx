import {View, Text, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

const SearchBox = ({
  containerStyle,
  onSearch,
  searchTerm,
  onPress,
  showFilter,
}: any) => {
  return (
    <View
      style={{
        height: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZES.radius,
        ...containerStyle,
      }}>
      {/* Search Box  */}
      <TouchableOpacity
        onPress={onSearch}
        style={{
          backgroundColor: COLORS.white,
          justifyContent: 'center',
          borderRadius: SIZES.semi_margin,
          borderColor: COLORS.Neutral8,
          borderWidth: 1,
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            justifyContent: 'space-between',
            borderRadius: 15,
          }}>
          {/* search icon */}
          <View style={{justifyContent: 'center'}}>
            <FastImage
              source={icons.search}
              tintColor={COLORS.Neutral6}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                height: 20,
                width: 20,
              }}
            />
          </View>

          {/* search text */}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingLeft: SIZES.radius,
            }}>
            <Text
              style={{
                ...FONTS.cap1,
                color: COLORS.Neutral6,
              }}>
              {searchTerm}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Filter Button */}
      {showFilter && (
        <TouchableOpacity
          onPress={onPress}
          style={{
            justifyContent: 'center',
            backgroundColor: COLORS.primary1,
            borderRadius: SIZES.semi_margin,
            padding: SIZES.semi_margin,
            marginLeft: SIZES.radius,
          }}>
          <FastImage
            source={icons.filter}
            tintColor={COLORS.white}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              height: 24,
              width: 24,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBox;
