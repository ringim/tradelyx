import {ActivityIndicator, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useCallback, useEffect, useRef} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useQuery} from '@apollo/client';

import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {
  BusinessDesc,
  Header,
  ImageCaption,
  PriceQty,
  Review,
  ReviewItem,
  SeeAll,
  ServiceModal,
  StoreInfo,
  TextIconButton,
} from '../../../components';
import {toggleCameraModal} from '../../../redux/modal/modalActions';
import {useProductContext} from '../../../context/ProductContext';
import {connect} from 'react-redux';
import {
  HomeStackNavigatorParamList,
  ProductDetailRouteProp,
} from '../../../components/navigation/BuyerNav/type/navigation';
import {
  GetUserQuery,
  GetUserQueryVariables,
  ListReviewsQuery,
  ListReviewsQueryVariables,
} from '../../../API';
import {getUser, listReviews} from '../../../queries/UserQueries';

const ProductDetail = ({showCameraModal, toggleCameraModal}: any) => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<ProductDetailRouteProp>();

  const {
    category,
    storeName,
    userID,
    image,
    images,
    title,
    storeAddress,
    minOrderQty,
    supplyCapacity,
    commodityCategory,
    paymentType,
    fobPrice,
    description,
    id
  }: any = route?.params.productItem;

  const {storeProductId, savedProductItem, removeProductItem}: any =
    useProductContext();

  const bottomSheetModalRef = useRef<any>(null);

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
    navigation.navigate('ScanProduct');
  }, []);

  useEffect(() => {
    if (showCameraModal) {
      showModal();
    }
  }, [showCameraModal]);

  const productItem: any = route?.params.productItem;

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
  });

  const checkSavedItem = () =>
    savedProductItem.some((itemIdValue: any) => itemIdValue === productItem);

  const onSelect = () => {
    if (checkSavedItem()) {
      return removeProductItem(productItem);
    }
    return storeProductId(productItem);
  };

  // GET USER
  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {
        id: userID,
      },
    },
  );
  const userInfo: any = data?.getUser;

  // LIST REVIEWS
  const {data: newData, loading: newLoad} = useQuery<
    ListReviewsQuery,
    ListReviewsQueryVariables
  >(listReviews);
  const allReview: any =
    newData?.listReviews?.items.filter((item: any) => !item?._deleted) || [];

  const Dots = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          alignSelf: 'center',
          bottom: SIZES.semi_margin,
        }}>
        {/* // Modal */}
        <ServiceModal
          bottomSheetModalRef={bottomSheetModalRef}
          hideModal={hideModal}
          hideModalWithNavigation={hideModalWithNavigation}
        />

        {images.map((item: any, index: number) => {
          const dotOpacityAnimatedStyle = useAnimatedStyle(() => {
            return {
              opacity: interpolate(
                scrollX.value / (SIZES.width - SIZES.padding * 2),
                [index - 1, index, index + 1],
                [0.2, 1, 0.2],
                Extrapolate.CLAMP,
              ),
            };
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              style={[
                {
                  borderRadius: 5,
                  marginHorizontal: 4,
                  width: 15,
                  height: 5,
                  backgroundColor: COLORS.primary1,
                },
                dotOpacityAnimatedStyle,
              ]}
            />
          );
        })}
      </View>
    );
  };

  function renderDetail1() {
    return (
      <View
        style={{
          height: 450,
          borderRadius: SIZES.padding,
          marginTop: SIZES.margin,
        }}>
        {image ? (
          <ImageCaption
            productItem={productItem}
            item={image}
            name={title}
            supplierName={storeName}
            commodityCategory={commodityCategory}
            category={category}
            banner_image={image}
          />
        ) : (
          <>
            <Animated.FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToAlignment="start"
              decelerationRate="fast"
              snapToInterval={SIZES.width - SIZES.padding * 2}
              scrollEventThrottle={16}
              onScroll={onScroll}
              data={images}
              keyExtractor={item => `${item}`}
              renderItem={({item, index}: any) => {
                return (
                  <ImageCaption
                    key={index}
                    productItem={productItem}
                    item={item}
                    name={title}
                    supplierName={storeName}
                    commodityCategory={commodityCategory}
                    category={category}
                    banner_image={item}
                  />
                );
              }}
            />
            <Dots />
          </>
        )}
      </View>
    );
  }

  if (loading || newLoad) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="small" color={COLORS.primary6} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
      <Header
        title={'Product Details'}
        other={true}
        onOther={onSelect}
        tintColor={COLORS.Neutral1}
        icon={checkSavedItem() ? icons.bookmark : icons.save}
        contentStyle={{marginBottom: 0}}
      />

      <FlatList
        data={allReview}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Product Image & Details */}
            {renderDetail1()}

            {/* Store Detail */}
            <StoreInfo
              address={storeAddress}
              image={userInfo?.logo}
              supplier={storeName}
              showDetail={true}
              onPress={() =>
                navigation.navigate('CompanyDetail', {sellerItem: productItem})
              }
            />

            {/* Product Description */}
            <BusinessDesc productItem={description} title={'Description'} />

            {/* Price Qty */}
            <PriceQty
              price={fobPrice}
              moq={minOrderQty}
              paymentType={paymentType}
              supply={supplyCapacity}
            />

            {/* Review header */}
            {!allReview && (
              <>
                <Review />
                <SeeAll />
              </>
            )}
          </>
        }
        renderItem={({item, index}) => {
          /* Reviews list */
          return <ReviewItem key={index} item={item} />;
        }}
        ListFooterComponent={
          <View
            style={{
              marginBottom: allReview?.length - 1 && 200,
            }}>
            <TextIconButton
              label={'Offer'}
              labelStyle={{
                marginLeft: SIZES.radius,
                ...FONTS.h4,
              }}
              containerStyle={{
                width: 340,
              }}
              iconPosition={'LEFT'}
              icon={icons.offer}
              iconStyle={COLORS.white}
              onPress={() => toggleCameraModal(!showCameraModal)}
            />

            <TextIconButton
              label={'Contact Seller'}
              labelStyle={{
                marginLeft: SIZES.radius,
                color: COLORS.primary1,
                ...FONTS.h4,
              }}
              containerStyle={{
                marginTop: SIZES.radius,
                backgroundColor: COLORS.white,
                width: 340,
                borderWidth: 2,
                borderColor: COLORS.primary1,
              }}
              iconPosition={'LEFT'}
              icon={icons.chat}
              iconStyle={COLORS.primary1}
              // onPress={handleSubmit}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
