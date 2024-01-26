import {StyleSheet, FlatList, View} from 'react-native';
import React, {useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import {useQuery} from '@apollo/client';

import {
  SellerLocationMapHeader,
  Header,
  ProductDesc,
  Review,
  ReviewItem,
  SeeAll,
  StoreInfo,
  LanguageSpoken,
  LoadingIndicator,
} from '../../../components';
import {
  COLORS,
  FONTS,
  SIZES,
  dummyData,
  icons,
  images,
} from '../../../constants';
import {BusinessDetailRouteProp} from '../../../components/navigation/BuyerNav/type/navigation';
import {ReviewByDateQueryVariables, ReviewByDateQuery} from '../../../API';
import {reviewByDate} from '../../../queries/UserQueries';

const reviews = dummyData.reviews;

const BusinessDetail = () => {
  const mapRef = useRef(null);
  const route: any = useRoute<BusinessDetailRouteProp>();

  const {
    responseTime,
    lat,
    lng,
    address,
    totalOrders,
    city,
    country,
    certifications,
    mainMarkets,
    languages,
    businessType,
    title,
    totalStaff,
    logo,
    overview,
    estRevenue,
  }: any = route?.params?.businessItem;

  // LIST REVIEWS
  const {
    data: newData,
    loading: newLoad,
    refetch,
  } = useQuery<ReviewByDateQuery, ReviewByDateQueryVariables>(reviewByDate);
  const allReview: any =
    newData?.reviewByDate?.items.filter((item: any) => !item?._deleted) || [];

  if (newLoad) {
    return <LoadingIndicator />;
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
      <Header
        title={'Business Details'}
        contentStyle={{marginBottom: 0}}
        tintColor={COLORS.Neutral1}
      />

      <FlatList
        data={allReview}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item}
        ListHeaderComponent={
          <>
            {/* Store Detail */}
            <StoreInfo
              address={`${city}${`, `} ${country}`}
              image={logo}
              supplier={title}
              addressStyle={{...FONTS.body3}}
              locationStyle={{height: 20, width: 20}}
              supplierStyle={{...FONTS.h3}}
              logoStyle={{height: 50, width: 50}}
            />

            {/* Overview */}
            <ProductDesc
              productItem={overview}
              sub1={businessType}
              sub2={certifications}
              mainMarket={mainMarkets}
              sub3={estRevenue}
              sub4={totalStaff}
              sub5={responseTime}
              sub6={totalOrders}>
              <LanguageSpoken languages={languages} />
            </ProductDesc>

            {/* Map location address */}
            <SellerLocationMapHeader
              showAddress={true}
              showHeader={true}
              address2={address}
              contentStyle={{backgroundColor: COLORS.white, padding: 13}}>
              {route?.params?.businessItem?.lat ? (
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
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}>
                  <Marker
                    ref={mapRef}
                    coordinate={{
                      latitude: lat,
                      longitude: lng,
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
                  style={{
                    width: 350,
                    height: 120,
                    alignSelf: 'center',
                    marginTop: -25,
                  }}
                />
              )}
            </SellerLocationMapHeader>

            {/* Review header */}
            {!allReview && (
              <>
                <Review contentStyle={{gap: 10}} />
                <SeeAll />
              </>
            )}
          </>
        }
        refreshing={newLoad}
        onRefresh={() => refetch()}
        renderItem={({item, index}) => {
          /* Reviews list */
          return <ReviewItem key={index} item={item} />;
        }}
        ListFooterComponent={
          <View style={{marginBottom: reviews?.length - 1 ? 100 : 100}} />
        }
      />
    </View>
  );
};

export default BusinessDetail;
