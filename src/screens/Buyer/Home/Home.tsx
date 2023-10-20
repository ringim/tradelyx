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
import {COLORS, SIZES, dummyData} from '../../../constants';
import {toggleCameraModal} from '../../../redux/modal/modalActions';
import {HomeStackNavigatorParamList} from '../../../components/navigation/BuyerNav/type/navigation';
import {GetUserQuery, GetUserQueryVariables} from '../../../API';
import {getUser} from '../../../queries/UserQueries';
import {useAuthContext} from '../../../context/AuthContext';

const suppliers = dummyData?.storeProducts;
const stores = dummyData?.stores;

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

  function renderRecommended() {
    return (
      <FlatList
        data={stores}
        keyExtractor={item => `${item?.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <VendorItem
            key={index}
            item={item}
            onPress={() =>
              navigation.navigate('ProviderProfile', {productItem: item})
            }
            containerStyle={{
              marginLeft: index == 0 ? SIZES.semi_margin : SIZES.padding,
              marginRight: index == stores.length - 12 ? SIZES.padding : -18,
            }}
          />
        )}
      />
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
        onPress={() => navigation.navigate('Filter')}
        searchTerm={'Search product or seller'}
        containerStyle={{
          marginHorizontal: SIZES.semi_margin,
          marginBottom: SIZES.base,
        }}
      />

      <FlatList
        data={suppliers}
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
              marginBottom: 150,
              backgroundColor: COLORS.white,
            }}>
            <SeeAll />

            {/* Recommended Sellers */}
            <PopularProducts
              title={'Recommended Seller'}
              showViewAll={true}
              containerStyle={{marginTop: 32}}
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
