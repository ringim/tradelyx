import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, {useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import FastImage from 'react-native-fast-image';

import {
  SellerLocationMapHeader,
  Header,
  ProductDesc,
  Review,
  ReviewItem,
  SeeAll,
  StoreInfo,
} from '../../../components';
import {COLORS, SIZES, dummyData, icons, images} from '../../../constants';
import {BusinessDetailRouteProp} from '../../../components/navigation/BuyerNav/type/navigation';

const reviews = dummyData.reviews;

const BusinessDetail = () => {
  const route: any = useRoute<BusinessDetailRouteProp>();
  // console.log('businessId', route?.params?.businessItem);
  const businessItem: any = route?.params?.businessItem;

  const mapRef = useRef(null);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        title={'Business Details'}
        contentStyle={{marginBottom: 0}}
        tintColor={COLORS.Neutral1}
      />

      <FlatList
        data={reviews}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        ListHeaderComponent={
          <>
            {/* Store Detail */}
            <StoreInfo productItem={businessItem} />

            {/* Overview */}
            <ProductDesc
              productItem={businessItem?.overview}
              sub1={businessItem?.businessType}
              sub2={businessItem?.cert}
              mainMarket={businessItem?.mainMarket}
              language={businessItem?.languages}
              sub3={businessItem?.estRevenue}
              sub4={businessItem?.totalStaff}
              sub5={businessItem?.responseTime}
              sub6={businessItem?.ordersCompleted}
            />

            {/* Map location address */}
            <SellerLocationMapHeader
              showAddress={true}
              showHeader={true}
              address2={businessItem?.address2}>
              {businessItem?.latitude ? (
                <MapView
                  provider={PROVIDER_GOOGLE}
                  ref={mapRef}
                  style={[
                    {
                      borderRadius: SIZES.semi_margin,
                      ...StyleSheet.absoluteFillObject,
                    },
                  ]}
                  scrollEnabled={false}
                  initialRegion={{
                    latitude: businessItem?.latitude,
                    longitude: businessItem?.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}>
                  <Marker
                    ref={mapRef}
                    coordinate={{
                      latitude: businessItem?.latitude,
                      longitude: businessItem?.longitude,
                    }}
                    anchor={{x: 0.84, y: 1}}>
                    <FastImage
                      source={icons.placeholder}
                      resizeMode={FastImage.resizeMode.contain}
                      tintColor={COLORS.primary1}
                      style={{width: 30, height: 30}}
                    />
                  </Marker>
                </MapView>
              ) : (
                <FastImage
                  resizeMode={FastImage.resizeMode.cover}
                  source={images.dummyMap}
                  style={{width: 350, height: 120, alignSelf: 'center'}}
                />
              )}
            </SellerLocationMapHeader>

            {/* Review header */}
            <Review />
          </>
        }
        renderItem={({item, index}) => {
          /* Reviews list */
          return <ReviewItem key={index} item={item} />;
        }}
        ListFooterComponent={
          <View style={{marginBottom: 150}}>
            <SeeAll />
          </View>
        }
      />
    </View>
  );
};

export default BusinessDetail;
