import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons, images} from '../../constants';
import TextIconButton from '../Button/TextIconButton';

const StoreBannerInfo = ({sellerItem}: any) => {
  const navigation = useNavigation<any>();

  return (
    <View>
      <ImageBackground
        source={sellerItem?.storeBanner || images.DEFAULT_STORE_BANNER}
        resizeMode="cover"
        style={{width: '100%', height: 207}}>
        <View
          style={{
            justifyContent: 'center',
            padding: SIZES.radius,
            width: 100,
            height: 100,
            alignSelf: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.lightYellow,
            borderRadius: SIZES.radius,
            marginTop: 90,
          }}>
          <FastImage
            source={sellerItem?.storeImg}
            style={{width: 60, height: 60}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </ImageBackground>

      {/* Supplier Name */}
      <View style={{marginTop: 15, alignItems: 'center'}}>
        <Text style={{...FONTS.h1, color: COLORS.Neutral1}}>
          {sellerItem?.supplier}
        </Text>
      </View>

      {/* Supplier address, */}
      <View
        style={{
          alignSelf: 'center',
          marginTop: SIZES.radius,
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
        <View style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
          <Text numberOfLines={2} style={{...FONTS.h5, color: COLORS.Neutral6}}>
            {sellerItem?.address2}
          </Text>
        </View>
      </View>

      {/* info buttons */}
      <View
        style={{
          alignSelf: 'center',
          marginTop: SIZES.margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TextIconButton
          label={'About'}
          labelStyle={{color: COLORS.primary1, marginLeft: SIZES.radius}}
          containerStyle={{
            backgroundColor: COLORS.white,
            borderColor: COLORS.primary1,
            borderWidth: 2,
            width: 160,
          }}
          iconPosition={'LEFT'}
          icon={icons.info}
          iconStyle={COLORS.primary1}
          onPress={() =>
            navigation.navigate('BusinessDetail', {
              businessItem: sellerItem,
            })
          }
        />
        <TextIconButton
          label={'Contact'}
          labelStyle={{marginLeft: SIZES.radius}}
          containerStyle={{
            width: 160,
            marginLeft: SIZES.base,
          }}
          iconPosition={'LEFT'}
          icon={icons.chat}
          iconStyle={COLORS.white}
          // onPress={() => navigation.navigate('AllCategories')}
        />
      </View>
    </View>
  );
};

export default StoreBannerInfo;
