import { Text, View} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';

import {
  GalleryItem,
  Header,
  PopularProducts,
  StoreBannerInfo,
  PopularItem,
} from '../../../components';
import {COLORS, FONTS, SIZES, dummyData} from '../../../constants';
import {
  HomeStackNavigatorParamList,
  ProductDetailRouteProp,
} from '../../../components/navigation/BuyerNav/type/navigation';

const suppliers = dummyData?.storeProducts;

const SellerDetail = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route: any = useRoute<ProductDetailRouteProp>();

  // console.log('SellerId', route?.params?.sellerItem);
  const sellerItem: any = route?.params?.sellerItem;

  function renderGallery() {
    return (
      <FlatList
        data={sellerItem?.img}
        keyExtractor={item => `${item?.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <GalleryItem
            key={index}
            item={item}
            containerStyle={{
              marginLeft: index == 0 ? SIZES.semi_margin : SIZES.radius,
              marginRight:
                index == sellerItem?.img.length - 12 ? SIZES.padding : 0,
            }}
          />
        )}
      />
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        title={'Company Details'}
        contentStyle={{marginBottom: 0}}
        tintColor={COLORS.Neutral1}
        other={true}
      />

      <FlatList
        data={suppliers}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        ListHeaderComponent={
          <>
            {/* Store Contact & Info */}
            <StoreBannerInfo sellerItem={sellerItem} />

            {/* Store images */}
            <View
              style={{
                margin: SIZES.margin,
              }}>
              <Text style={{color: COLORS.Neutral1, ...FONTS.h4}}>Gallery</Text>
            </View>
            {renderGallery()}

            <PopularProducts title={'Most Popular Products'} />
          </>
        }
        renderItem={({item, index}) => {
          /* Popular items */
          return (
            <PopularItem
              key={index}
              item={item}
              onPress={() =>
                navigation.navigate('ProductDetail', {productItem: item})
              }
            />
          );
        }}
        ListFooterComponent={
          <View
            style={{
              marginBottom: 200,
            }}
          />
        }
      />
    </View>
  );
};

export default SellerDetail;
