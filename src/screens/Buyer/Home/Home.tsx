import {ActivityIndicator, RefreshControl, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useCallback, useEffect, useRef} from 'react';
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

  // LIST PRODUCTS
  const {data: newData, refetch} = useQuery<
    ProductByDateQuery,
    ProductByDateQueryVariables
  >(productByDate, {
    pollInterval: 500,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'network-only',
    variables: {
      limit: 4,
      SType: 'JOB',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const allProducts: any =
    newData?.productByDate?.items
      .filter(st => st?.SType === 'JOB')
      .filter((item: any) => !item?._deleted) || [];

  // LIST SUPPLIERS
  const {data: onData, loading} = useQuery<
    ListUsersQuery,
    ListUsersQueryVariables
  >(listUsers, {
    variables: {limit: 4},
    pollInterval: 300,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'network-only',
  });
  const suppliers: any =
    onData?.listUsers?.items
      .filter(sup => sup?.accountType === AccountCategoryType?.SELLER)
      .filter((item: any) => !item?._deleted) || [];

  // GET USER DETAILS
  const {data} = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {
    variables: {id: userID},
  });
  const user: any = data?.getUser;

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
        />
      </>
    );
  }

  if (loading) {
    <ActivityIndicator
      style={{flex: 1, justifyContent: 'center'}}
      size={'large'}
      color={COLORS.primary6}
    />;
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
      <TabHeader userImage={user?.logo} />

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
        searchTerm={'Search product or seller'}
        containerStyle={{
          marginHorizontal: SIZES.semi_margin,
          marginBottom: SIZES.base,
        }}
      />

      {/* ALL PRODUCTS */}
      <FlatList
        data={allProducts}
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
        refreshControl={
          <RefreshControl
            tintColor={COLORS.primary4}
            refreshing={loading}
            onRefresh={() => refetch()}
          />
        }
        ListFooterComponent={
          <View
            style={{
              marginBottom: allProducts?.length - 1 && 150,
              backgroundColor: COLORS.white,
            }}>
            <SeeAll onPress={() => navigation.navigate('Search')} />
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
