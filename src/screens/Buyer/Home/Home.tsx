import {View, Platform, ActivityIndicator} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';

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
} from '../../../components';
import {COLORS, SIZES} from '../../../constants';
import {toggleCameraModal} from '../../../redux/modal/modalActions';
import {HomeStackNavigatorParamList} from '../../../components/navigation/BuyerNav/type/navigation';
import {
  AccountCategoryType,
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

const Home = ({showCameraModal, toggleCameraModal}: any) => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const {userID} = useAuthContext();

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
    fetchPolicy: 'network-only',
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
    fetchPolicy: 'network-only',
    variables: {limit: 6},
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
          containerStyle={{marginTop: SIZES.margin}}
          onPress={() => navigation.navigate('Search')}
        />

        <FlatList
          data={suppliers}
          keyExtractor={item => `${item?.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <>
              <VendorItem
                key={index}
                item={item}
                store_image={item?.logo}
                onPress={() =>
                  navigation.navigate('CompanyDetail', {
                    ID: item?.id,
                  })
                }
                containerStyle={{
                  marginLeft: index == 0 ? 0 : 12 * 1.4,
                  marginRight:
                    index == suppliers.length - 1 ? SIZES.padding : -30,
                }}
              />
            </>
          )}
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
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator
          style={{justifyContent: 'center'}}
          size={'large'}
          color={COLORS.primary6}
        />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
      <TabHeader
        userImage={user?.logo}
        containerStyle={{
          paddingTop: SIZES.height > 700 ? 50 : SIZES.semi_margin,
          height: Platform.OS == 'ios' ? '14%' : '10%',
          marginBottom: SIZES.base,
        }}
      />

      {/* Modal */}
      <ServiceModal
        bottomSheetModalRef={bottomSheetModalRef}
        hideModal={hideModal}
        hideModalWithNavigation={hideModalWithNavigation}
      />

      {/* Search Box */}
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
            <PromoSection />

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
                  navigation.navigate('ProductDetail', {productItem: item})
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
