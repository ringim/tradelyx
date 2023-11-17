import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';

import {COLORS, FONTS, SIZES, constants, icons} from '../../constants';
import TextIconButton from '../Button/TextIconButton';

const CategorySection = () => {
  const navigation = useNavigation<any>();

  const first8Cate = constants.allCategories.slice(0, 8)

  return (
    <View
      style={{
        padding: SIZES.margin,
        backgroundColor: COLORS.primary1,
        borderRadius: SIZES.semi_margin,
        margin: SIZES.semi_margin,
      }}>
      <View>
        <FlatList
          data={first8Cate}
          keyExtractor={item => `${item?.id}`}
          showsVerticalScrollIndicator={false}
          numColumns={4}
          style={{marginTop: -10, marginLeft: -8}}
          renderItem={({item, index}) =>
            item && (
              <TouchableOpacity
                key={index}
                style={{justifyContent: 'center', margin: SIZES.radius}}
                onPress={() =>
                  navigation.navigate('CategoryItemList', {
                    cateItem: item,
                  })
                }>
                <FastImage
                  source={item?.image}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    height: 60,
                    width: 60,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.sh3,
                    color: COLORS.white,
                    textAlign: 'center',
                    paddingTop: 4,
                  }}>
                  {item?.title}
                </Text>
              </TouchableOpacity>
            )
          }
        />
      </View>

      <TextIconButton
        label={'All Category'}
        labelStyle={{color: COLORS.primary1, marginRight: SIZES.radius}}
        containerStyle={{
          backgroundColor: COLORS.white,
          alignSelf: 'center',
          // width: 190,
        }}
        iconPosition={'RIGHT'}
        icon={icons.right_arrow}
        iconStyle={COLORS.primary1}
        onPress={() => navigation.navigate('AllCategories')}
      />
    </View>
  );
};

export default CategorySection;
