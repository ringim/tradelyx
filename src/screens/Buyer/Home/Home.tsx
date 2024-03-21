import {View, Platform} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {
  CategorySection,
  PromoSection,
  SearchBox,
  TabHeader,
  PopularProducts,
  PopularItem,
  VendorItem,
  ServiceModal,
  SeeAll,
  LoadingIndicator,
} from '../../../components';
import {COLORS, SIZES} from '../../../constants';
import {toggleCameraModal} from '../../../redux/modal/modalActions';
import {HomeStackNavigatorParamList} from '../../../components/navigation/BuyerNav/type/navigation';
import {
  GetUserQuery,
  GetUserQueryVariables,
  ModelSortDirection,
  ProductByDateQuery,
  ProductByDateQueryVariables,
  ListUsersQuery,
  ListUsersQueryVariables,
} from '../../../API';
import {getUser, listUsers} from '../../../queries/UserQueries';
import {useAuthContext} from '../../../context/AuthContext';
import {productByDate} from '../../../queries/ProductQueries';
import {AccountCategoryType} from '../../../models';

const Home = ({showCameraModal, toggleCameraModal}: any) => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const {userID, authUser} = useAuthContext();

  const bottomSheetModalRef = useRef<any>(null);

  // callbacks
  const showModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const hideModal = useCallback(() => {
    toggleCameraModal(false);
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const hideModalWithNavigation = useCallback(() => {
    toggleCameraModal(false);
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const [products, setProducts] = useState<any>([]);
  const [suppliers, setSuppliers] = useState<any>([]);

  // LIST PRODUCTS
  const {data: newData, loading: newLoad} = useQuery<
    ProductByDateQuery,
    ProductByDateQueryVariables
  >(productByDate, {
    pollInterval: 500,
    variables: {
      limit: 5,
      SType: 'JOB',
      sortDirection: ModelSortDirection.DESC,
    },
  });

  // LIST SUPPLIERS
  const {data: onData, loading} = useQuery<
    ListUsersQuery,
    ListUsersQueryVariables
  >(listUsers, {
    pollInterval: 500,
    variables: {limit: 5},
  });

  // GET USER DETAILS
  const {data} = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {
    variables: {id: userID},
  });
  const user: any = data?.getUser;

  useEffect(() => {
    const sellers: any =
      onData?.listUsers?.items
        .filter(sup => sup?.accountType === AccountCategoryType?.SELLER)
        .filter((item: any) => !item?._deleted) || [];
    setSuppliers(sellers);
  }, [loading, onData]);

  useEffect(() => {
    const allProducts: any =
      newData?.productByDate?.items
        .filter(st => st?.SType === 'JOB')
        .filter((item: any) => !item?._deleted) || [];
    setProducts(allProducts);
  }, [newLoad, newData]);

  useEffect(() => {
    if (showCameraModal) {
      showModal();
    }
  }, [showCameraModal]);

  // ALL SUPPLIERS
  function renderRecommended() {
    return (
      <>
        <PopularProducts
          title={'Recommended Seller'}
          showViewAll={true}
          containerStyle={{marginTop: SIZES.radius}}
          onPress={() => navigation.navigate('Search')}
        />

        <FlatList
          data={suppliers}
          keyExtractor={item => `${item?.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <VendorItem
                key={index}
                item={item}
                store_image={item?.logo}
                onPress={() =>
                  !authUser
                    ? navigation.navigate('SignUp')
                    : navigation.navigate('CompanyDetail', {
                        ID: item?.id,
                      })
                }
                containerStyle={{
                  marginLeft: index == 0 ? 0 : 12 * 1.4,
                  marginRight:
                    index == suppliers.length - 1 ? SIZES.padding : -30,
                }}
              />
            );
          }}
          ListFooterComponent={
            <View
              style={{
                marginBottom: suppliers?.length - 1 ? 100 : 100,
                backgroundColor: COLORS.white,
              }}
            />
          }
        />
      </>
    );
  }

  if (loading || newLoad) {
    return <LoadingIndicator />;
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
        <TabHeader
          userImage={user?.logo}
          containerStyle={{
            height:
              Platform.OS == 'ios'
                ? SIZES.height > 700
                  ? '15%'
                  : '15%'
                : '10%',
            marginBottom: SIZES.base,
          }}
        />

        {/* Modal */}
        <ServiceModal
          bottomSheetModalRef={bottomSheetModalRef}
          hideModal={hideModal}
          hideModalWithNavigation={hideModalWithNavigation}
        />

        {/* Search box */}
        <SearchBox
          onSearch={() => navigation.navigate('Search')}
          onPress={() => navigation.navigate('SearchFilter')}
          searchTerm={'Search for Products, Sell Offers & Sellers'}
          containerStyle={{
            marginHorizontal: SIZES.semi_margin,
            marginBottom: SIZES.base,
          }}
        />

        {/* ALL PRODUCTS */}
        <FlatList
          data={products}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item?.id}`}
          ListHeaderComponent={
            <View style={{backgroundColor: COLORS.white}}>
              {/* Category Tab */}
              <CategorySection />

              {/* Promo */}
              <PromoSection
                onPress={() => {
                  Toast.show({
                    type: ALERT_TYPE.INFO,
                    title: 'Promotions coming soon',
                    titleStyle: {
                      color: COLORS.Neutral1,
                      fontFamily: 'PlusJakartaSans-Medium',
                      fontWeight: '700',
                      lineHeight: 22,
                    },
                    autoClose: 2000,
                  });
                }}
              />

              <PopularProducts title={'Most Popular Products'} />
            </View>
          }
          renderItem={({item, index}) => {
            /* Popular items */
            return (
              <View key={index} style={{backgroundColor: COLORS.white}}>
                <PopularItem
                  item={item}
                  store_image={item?.productImage}
                  onPress={() =>
                    navigation.navigate('ProductDetail', {productID: item?.id})
                  }
                />
              </View>
            );
          }}
          ListFooterComponent={
            <View
              style={{
                marginBottom: products?.length - 1 ? 150 : 150,
                backgroundColor: COLORS.white,
              }}>
              <SeeAll onPress={() => navigation.navigate('AllProducts')} />
              {/* Recommended sellers */}
              {renderRecommended()}
            </View>
          }
        />
      </View>
    </Root>
  );
};

function mapStateToProps(state: any) {
  return {
    showCameraModal: state.modalReducer.showCameraModal,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    toggleCameraModal: (toggleValue: any) => {
      return dispatch(toggleCameraModal(toggleValue));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
