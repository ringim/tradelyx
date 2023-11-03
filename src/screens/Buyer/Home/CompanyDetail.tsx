import {ActivityIndicator, RefreshControl, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import Share from 'react-native-share';

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
import {shareOptions} from '../../../utilities/service';

const CompanyDetail = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route: any = useRoute<ProductDetailRouteProp>();

  const {id}: any = route?.params?.sellerItem;

  // GET USER
  const {data, loading, refetch} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {
    variables: {
      id: id,
    },
  });
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

  if (loading || newLoad) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="small" color={COLORS.primary6} />
      </View>
    );
  }

  const shareDetails = async () => {
    try {
      const shareResponse = await Share.open(shareOptions);
      console.log('shareOptions', shareResponse);
    } catch (error) {
      return error;
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        title={'Company Details'}
        contentStyle={{marginBottom: 0}}
        tintColor={COLORS.Neutral1}
        other={true}
        onOther2={shareDetails}
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
              supplierName={userInfo?.title}
              banner_image={userInfo?.backgroundImage}
              logo={userInfo?.logo}
            />
          </>
        }
        renderItem={({item, index}) => {
          /* Popular items */
          return (
            <>
              {/* Store images */}
              <View
                style={{
                  margin: SIZES.margin,
                  marginTop: SIZES.padding * 1.5,
                }}>
                <Text style={{color: COLORS.Neutral1, ...FONTS.h4}}>
                  Gallery
                </Text>
              </View>
              <GalleryItem sellerItem={route?.params?.sellerItem} />
              <PopularProducts title={'Most Popular Products'} />
              <PopularItem
                key={index}
                item={item}
                store_image={item?.productImage}
                onPress={() =>
                  navigation.navigate('ProductDetail', {productItem: item})
                }
              />
            </>
          );
        }}
        refreshControl={
          <RefreshControl
            tintColor={COLORS.primary4}
            refreshing={newLoad}
            onRefresh={() => refetch()}
          />
        }
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

export default CompanyDetail;
