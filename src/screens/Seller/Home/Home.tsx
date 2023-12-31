import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {useQuery} from '@apollo/client';

import {
  BalanceSection,
  FinanceTabs,
  PerformanceTab,
  OrderTab,
  ServiceModal2,
  TabHeader2,
  PromoSection,
} from '../../../components';
import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {toggleCameraModal} from '../../../redux/modal/modalActions';
import {GetUserQuery, GetUserQueryVariables} from '../../../API';
import {getUser} from '../../../queries/UserQueries';
import {useAuthContext} from '../../../context/AuthContext';
import {notificationsByDate} from '../../../queries/NotificationQueries';

const Home = ({showCameraModal, toggleCameraModal}: any) => {
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
    {
      variables: {id: userID},
    },
  );
  const user: any = data?.getUser;

  useEffect(() => {
    if (showCameraModal) {
      showModal();
    }
  }, [showCameraModal]);

  if (loading) {
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
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <TabHeader2 userImage={user?.logo} />

      {/* Modal */}
      <ServiceModal2
        bottomSheetModalRef={bottomSheetModalRef}
        hideModal={hideModal}
        hideModalWithNavigation={hideModalWithNavigation}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Promo */}
        <PromoSection />

        {/* Balance section */}
        <BalanceSection balance={user?.ledgerBalance} />

        {/* Financial Stats */}
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
            marginTop: SIZES.base,
            justifyContent: 'space-between',
          }}>
          <FinanceTabs
            text={'Ledger Balance'}
            amount={user?.ledgerBalance}
            icon={icons.ledgerBalance}
          />
          <FinanceTabs
            text={'Total Earnings in June'}
            amount={user?.estRevenue}
            icon={icons.earnings}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
            marginTop: SIZES.base,
            justifyContent: 'space-between',
          }}>
          <OrderTab
            text={'Active Orders'}
            amount={user?.activeOrder}
            icon={icons.activeOrder}
          />
          <OrderTab
            text={'Finished Orders'}
            amount={user?.totalOrders}
            icon={icons.finishedOrder}
          />
        </View>

        {/* Performance Tab */}
        <View style={{margin: SIZES.padding, marginBottom: 200}}>
          <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>
            Your Performance
          </Text>

          <PerformanceTab
            icon={icons.store}
            title={'Seller Level'}
            content={user?.sellerLevel}
          />

          <PerformanceTab
            icon={icons.timer}
            title={'Response Time'}
            content={user?.responseTime}
            contentStyle={{marginTop: SIZES.base}}
          />

          <PerformanceTab
            icon={icons.membership}
            title={'Membership Type'}
            content={user?.memberShipType}
            contentStyle={{marginTop: SIZES.base}}
          />

          <PerformanceTab
            icon={icons.rate}
            title={'Rating'}
            content={user?.rating}
            contentStyle={{marginTop: SIZES.base}}
          />
        </View>
      </ScrollView>
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
