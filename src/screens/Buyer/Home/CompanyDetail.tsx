import {ActivityIndicator, RefreshControl, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import Share from 'react-native-share';

import {
  Header,
  PopularProducts,
  StoreBannerInfo,
  PopularItem,
} from '../../../components';
import {COLORS} from '../../../constants';
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

  const {ID}: any = route?.params;

  // GET USER
  const {data, loading, refetch} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {
    variables: {
      id: ID,
    },
  });
  const userInfo: any = data?.getUser;

  // LIST PRODUCTS
  const {data: newData, loading: newLoad} = useQuery<
    ProductByDateQuery,
    ProductByDateQueryVariables
  >(productByDate, {
    pollInterval: 500,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
    variables: {
      SType: 'JOB',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const allProducts: any =
    newData?.productByDate?.items
      .filter(st => st?.SType === 'JOB')
      .filter(sp => sp?.userID === ID)
      .filter((item: any) => !item?._deleted) || [];

  const shareDetails = async () => {
    try {
      const shareResponse = await Share.open(shareOptions);
      // console.log('shareOptions', shareResponse);
    } catch (error) {
      return error;
    }
  };

  if (loading || newLoad) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="small" color={COLORS.primary6} />
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
        onOther2={shareDetails}
      />

      <FlatList
        data={allProducts}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item?.id}`}
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
            {/* popular products from store */}
            <PopularProducts title={'Most Popular Products'} />
          </>
        }
        renderItem={({item, index}) => {
          /* Popular items */
          return (
            <>
              {/* Store images */}
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
