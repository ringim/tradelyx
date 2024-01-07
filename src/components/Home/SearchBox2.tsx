import {View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, icons} from '../../constants';

const SearchBox2 = ({
  search,
  showFiler,
  searchFilterFunction,
  containerStyle,
  onPress,
  contentStyle,
  children
}: any) => {
  return (
    <View style={{alignItems: 'center', marginHorizontal: SIZES.semi_margin, ...contentStyle}}>
      <View
        style={{
          backgroundColor: COLORS.white,
          height: 45,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          borderColor: COLORS.Neutral8,
          borderWidth: 1,
          borderRadius: SIZES.semi_margin,
          ...containerStyle,
        }}>
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={icons.search}
            tintColor={COLORS.Neutral6}
            style={{width: 20, height: 20, justifyContent: 'center'}}
          />
        </View>

        <TextInput
          autoFocus={false}
          onChangeText={text => searchFilterFunction(text)}
          value={search}
          placeholder={'Search'}
          placeholderTextColor={COLORS.gray}
          style={{
            color: COLORS.Neutral2,
            paddingLeft: SIZES.radius,
            justifyContent: 'center',
            backgroundColor: COLORS.white,
            flex: 1,
          }}
        />

        {showFiler && (
          <TouchableOpacity
            style={{
              left: SIZES.semi_margin,
              justifyContent: 'center',
              backgroundColor: COLORS.primary1,
              borderRadius: SIZES.semi_margin,
              padding: SIZES.radius,
            }}
            onPress={onPress}>
            <FastImage
              source={icons.filter}
              tintColor={COLORS.white}
              resizeMode={FastImage.resizeMode.contain}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );
};

export default SearchBox2;
