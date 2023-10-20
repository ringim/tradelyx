import {View} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, {useCallback, useEffect, useRef} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {COLORS, FONTS, SIZES, dummyData, icons} from '../../../constants';
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

const reviews = dummyData.reviews;
const ProductDetail = ({showCameraModal, toggleCameraModal}: any) => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<ProductDetailRouteProp>();

  const {storeProductId, savedProductItem, removeProductItem}: any =
    useProductContext();

  // console.log('Product context items', savedProductItem);

  const bottomSheetModalRef = useRef<any>(null);

  const showModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const hideModal = useCallback(() => {
    toggleCameraModal(false);
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const hideModalWithNavigation = useCallback(() => {
    console.log('hideModalWithNavigation');
    toggleCameraModal(false);
    bottomSheetModalRef.current?.dismiss();
    navigation.navigate('ScanProduct');
  }, []);

  useEffect(() => {
    if (showCameraModal) {
      showModal();
    }
  }, [showCameraModal]);

  // console.log(route?.params.productItem);
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

        {productItem?.img.map((item: any, index: number) => {
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
          height: 470,
          marginHorizontal: 17,
          borderRadius: SIZES.padding,
          marginTop: SIZES.margin,
        }}>
        <Animated.FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          decelerationRate="fast"
          snapToInterval={SIZES.width - SIZES.padding}
          scrollEventThrottle={32}
          onScroll={onScroll}
          data={productItem?.img}
          // keyExtractor={item => `${item?.id}`}
          renderItem={({item, index}: any) => {
            return (
              <ImageCaption key={index} productItem={productItem} item={item} />
            );
          }}
        />
        <Dots />
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
        data={reviews}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Product Image & Details */}
            {renderDetail1()}

            {/* Store Detail */}
            <StoreInfo
              productItem={productItem}
              showDetail={true}
              onPress={() =>
                navigation.navigate('SellerDetail', {sellerItem: productItem})
              }
            />

            {/* Product Description */}
            <BusinessDesc
              productItem={productItem?.description}
              title={'Description'}
            />

            {/* Price Qty */}
            <PriceQty productItem={productItem} />

            {/* Review header */}
            <Review />
          </>
        }
        renderItem={({item, index}) => {
          /* Reviews list */
          return <ReviewItem key={index} item={item} />;
        }}
        ListFooterComponent={
          <View
            style={{
              marginBottom: 200,
            }}>
            <SeeAll />

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
