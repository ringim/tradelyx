import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

const SearchBox3 = ({searchFilterFunction, category, search, onPress}: any) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      keyboardVerticalOffset={0}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.radius,
          marginTop: SIZES.semi_margin,
          marginBottom: SIZES.radius,
          height: 50,
          paddingHorizontal: SIZES.base,
          backgroundColor: COLORS.lightYellow,
          marginRight: SIZES.semi_margin,
          borderRadius: SIZES.margin,
        }}>
        <Pressable
          onPress={onPress}
          style={{
            justifyContent: 'center',
          }}>
          {/* Search box */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{paddingLeft: SIZES.base, justifyContent: 'center'}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>
                {category === 'User' ? 'Suppliers' : category}
              </Text>
            </View>
            <View style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
              <FastImage
                source={icons.down}
                tintColor={COLORS.Neutral6}
                style={{width: 12, height: 12}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </View>
        </Pressable>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: COLORS.Neutral7,
            backgroundColor: COLORS.white,
            marginLeft: SIZES.margin,
            marginRight: -10,
            borderTopRightRadius: SIZES.margin,
            borderBottomRightRadius: SIZES.margin,
          }}>
          <TextInput
            autoFocus={false}
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            placeholder={'Search'}
            placeholderTextColor={COLORS.gray}
            style={{
              color: COLORS.Neutral6,
              paddingLeft: SIZES.radius,
              justifyContent: 'center',
              height: 50,
              // flex: 1,
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchBox3;
