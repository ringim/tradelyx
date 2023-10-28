import {ActivityIndicator, View} from 'react-native';
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

  // LIST SUPPLIERS
  const {data: onData, loading: onLoad} = useQuery<
    ListUsersQuery,
    ListUsersQueryVariables
  >(listUsers, {
    variables: {limit: 4},
    pollInterval: 300,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });
  const suppliers: any =
    onData?.listUsers?.items
      .filter(sup => sup?.accountType === AccountCategoryType?.SELLER)
      .filter((item: any) => !item?._deleted) || [];

  // GET USER DETAILS
  const {loading, data} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: userID}},
  );
  const user: any = data?.getUser;

  useEffect(() => {
    if (showCameraModal) {
      showModal();
    }
  }, [showCameraModal]);

  // ALL SUPPLIERS
  function renderRecommended() {
    return (
      <FlatList
        data={suppliers}
        keyExtractor={item => `${item?.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <VendorItem
            key={index}
            item={item}
            store_image={item?.logo}
            onPress={() =>
              navigation.navigate('BusinessDetail', {businessItem: item})
            }
            containerStyle={{
              marginLeft: index == 0 ? 0 : 12 * 1.4,
              marginRight: index == suppliers.length - 1 ? SIZES.padding : -30,
            }}
          />
        )}
      />
    );
  }

  if (loading || newLoad || onLoad) {
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
        onPress={() => navigation.navigate('Filter')}
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
        keyExtractor={item => `${item.id}`}
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
            <View style={{backgroundColor: COLORS.white}}>
              <PopularItem
                key={index}
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
              marginBottom: allProducts?.length - 1 && 150,
              backgroundColor: COLORS.white,
            }}>
            <SeeAll onPress={() => navigation.navigate('AllProducts')} />
            <PopularProducts
              title={'Recommended Seller'}
              showViewAll={true}
              containerStyle={{marginTop: SIZES.margin}}
              onPress={() => navigation.navigate('AllSellers')}
            />
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
