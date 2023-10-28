import {ActivityIndicator, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';

import {
  GalleryItem,
  Header,
  PopularProducts,
  StoreBannerInfo,
  PopularItem,
} from '../../../components';
import {COLORS, FONTS, SIZES} from '../../../constants';
import {
  HomeStackNavigatorParamList,
  ProductDetailRouteProp,
} from '../../../components/navigation/BuyerNav/type/navigation';
import {
  GetUserQuery,
  GetUserQueryVariables,
  ModelSortDirection,
  ProductByDateQuery,
  ProductByDateQueryVariables,
} from '../../../API';
import {getUser} from '../../../queries/UserQueries';
import {productByDate} from '../../../queries/ProductQueries';

const SellerDetail = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route: any = useRoute<ProductDetailRouteProp>();

  const sellerItem: any = route?.params?.sellerItem?.userID;

  // GET USER
  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {
        id: route?.params?.sellerItem?.userID,
      },
    },
  );
  const userInfo: any = data?.getUser;

  // LIST PRODUCTS
  const {data: newData, loading: newLoad} = useQuery<
    ProductByDateQuery,
    ProductByDateQueryVariables
  >(productByDate, {
    pollInterval: 500,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
    variables: {
      limit: 4,
      SType: 'JOB',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const allProducts: any =
    newData?.productByDate?.items.filter((item: any) => !item?._deleted) || [];

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

  if (loading || newLoad) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.primary6} />
      </View>
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
        data={allProducts}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        ListHeaderComponent={
          <>
            {/* Store Contact & Info */}
            <StoreBannerInfo
              onPress={() =>
                navigation.navigate('BusinessDetail', {businessItem: userInfo})
              }
              address={`${userInfo?.city}${', '} ${userInfo?.country}`}
              supplierName={userInfo?.businessName}
              banner_image={userInfo?.backgroundImage}
              logo={userInfo?.logo}
            />

            {/* Store images */}
            <View
              style={{
                margin: SIZES.margin,
                marginTop: SIZES.padding * 1.5,
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
              store_image={item?.productImage}
              onPress={() =>
                navigation.navigate('ProductDetail', {productItem: item})
              }
            />
          );
        }}
        ListFooterComponent={
          <View
            style={{
              marginBottom: allProducts?.length - 1 && 200,
            }}
          />
        }
      />
    </View>
  );
};

export default SellerDetail;
