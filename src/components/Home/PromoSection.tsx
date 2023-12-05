import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import {COLORS, FONTS, SIZES, dummyData} from '../../constants';

const promos = dummyData.promos;
interface IPromo {
  containerStyle?: any;
}

const PromoSection = ({containerStyle}: IPromo) => {
  const navigation = useNavigation<any>();

  return (
    <View>
      <FlatList
        data={promos}
        keyExtractor={item => `${item?.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={{
              marginTop: SIZES.radius,
              marginLeft: index == 0 ? SIZES.semi_margin : SIZES.radius,
              marginRight: index == promos.length - 12 ? SIZES.padding : 0,
              width: 340,
              borderRadius: SIZES.padding,
              backgroundColor: item?.bg_color,
              ...containerStyle,
            }}
            onPress={() =>
              navigation.navigate('ProviderProfile', {profileId: item})
            }>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {/* name */}
              <View
                style={{
                  padding: SIZES.semi_margin,
                  flex: 1,
                  justifyContent: 'center',
                  marginRight: SIZES.margin,
                }}>
                <Text style={{...FONTS.sh3, color: COLORS.white}}>
                  {item?.name}
                </Text>

                <Text
                  numberOfLines={2}
                  style={{
                    ...FONTS.sh2,
                    color: COLORS.white,
                    marginTop: SIZES.radius,
                  }}>
                  {item?.subText}
                </Text>
              </View>

              {/* promo image */}
              <View style={{justifyContent: 'center'}}>
                <FastImage
                  source={item?.image}
                  resizeMode={FastImage.resizeMode.cover}
                  style={{
                    width: 144,
                    height: 144,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PromoSection;
