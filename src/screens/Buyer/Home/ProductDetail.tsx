import {ActivityIndicator, FlatList, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Share from 'react-native-share';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {connect} from 'react-redux';
import {useMutation, useQuery} from '@apollo/client';

import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {
  BusinessDesc,
  Header,
  ImageCaption,
  PriceQty,
  ProductSpec,
  Review,
  ReviewItem,
  SeeAll,
  ServiceModal,
  ShowDocs,
  StoreInfo,
  TextIconButton,
} from '../../../components';
import {toggleCameraModal} from '../../../redux/modal/modalActions';
import {
  HomeStackNavigatorParamList,
  ProductDetailRouteProp,
} from '../../../components/navigation/BuyerNav/type/navigation';
import {
  ModelSortDirection,
  ReviewByDateQuery,
  ReviewByDateQueryVariables,
  CreateChatRoomMutation,
  CreateChatRoomMutationVariables,
  CreateUserChatRoomMutation,
  CreateUserChatRoomMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  ListUserChatRoomsQuery,
  ListUserChatRoomsQueryVariables,
  ListUsersQuery,
  ListUsersQueryVariables,
} from '../../../API';
import {getUser, listUsers, reviewByDate} from '../../../queries/UserQueries';
import {shareOptions} from '../../../utilities/service';
import {useProductContext} from '../../../context/ProductContext';
import {useAuthContext} from '../../../context/AuthContext';
import {
  createChatRoom,
  createUserChatRoom,
  listUserChatRooms,
} from '../../../queries/ChatQueries';

const ProductDetail = ({showCameraModal, toggleCameraModal}: any) => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route: any = useRoute<ProductDetailRouteProp>();

  const {authUser}: any = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {storeProductId, savedProductItem, removeProductItem}: any =
    useProductContext();

  const {
    category,
    storeName,
    image,
    images,
    title,
    minOrderQty,
    supplyCapacity,
    commodityCategory,
    paymentType,
    transportMode,
    productSpec,
    productCert,
    productCertDocs,
    productDocs,
    rating,
    packageType,
    userID,
    description,
    id,
  }: any = route?.params.productItem;

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
    savedProductItem.some((itemIdValue: any) => itemIdValue?.title === title);

  // console.log(savedProductItem);

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
        id: route?.params.productItem?.userID,
      },
    },
  );
  const userInfo: any = data?.getUser;

  // LIST REVIEWS
  const {data: softData, loading: newLoad} = useQuery<
    ReviewByDateQuery,
    ReviewByDateQueryVariables
  >(reviewByDate, {
    variables: {
      SType: 'REVIEW',
      sortDirection: ModelSortDirection.DESC,
      limit: 4,
    },
  });
  const allReview: any =
    softData?.reviewByDate?.items.filter((item: any) => !item?._deleted) || [];

  const {data: newData} = useQuery<
    ListUserChatRoomsQuery,
    ListUserChatRoomsQueryVariables
  >(listUserChatRooms);
  const allChatRoomUsers = newData?.listUserChatRooms?.items.find(
    usrID => usrID?.userId === userID,
  );

  const {data: onData} = useQuery<ListUsersQuery, ListUsersQueryVariables>(
    listUsers,
  );
  const crUsers = onData?.listUsers?.items.some(usrID =>
    usrID?.ChatRooms?.items.find(
      crID => crID?.chatRoomId === allChatRoomUsers?.chatRoomId,
    ),
  );

  // CREATE CHATROOM
  const [doCreateChatRoom] = useMutation<
    CreateChatRoomMutation,
    CreateChatRoomMutationVariables
  >(createChatRoom);

  // CREATE USER CHATROOM
  const [doCreateUserChatRoom] = useMutation<
    CreateUserChatRoomMutation,
    CreateUserChatRoomMutationVariables
  >(createUserChatRoom);

  const onPress = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      // if chatRoom exist with user
      if (crUsers === true) {
        navigation.navigate('Chat', {
          id: allChatRoomUsers?.chatRoomId,
          offerDetail: route?.params?.detail,
        });
      } else {
        // create a new chatRoom
        const chatRoom: any = await doCreateChatRoom({
          variables: {
            input: {
              newMessages: 0,
              SType: 'CHATROOM',
              name: userInfo?.title,
            },
          },
        });
        const newChatRoom = chatRoom.data?.createChatRoom;

        // add the clicked user to the chatRoom
        await doCreateUserChatRoom({
          variables: {
            input: {
              chatRoomId: newChatRoom?.id,
              userId: userID,
            },
          },
        });

        // add the AuthUser to the chatRoom
        await doCreateUserChatRoom({
          variables: {
            input: {
              chatRoomId: newChatRoom?.id,
              userId: authUser?.attributes?.sub,
            },
          },
        });

        // navigate to the newly created chatRoom
        navigation.navigate('Chat', {id: newChatRoom?.id});
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Server error, Try again',
        autoClose: 1500,
      });
    } finally {
      setIsSubmitting(false);
    }
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
            rating={rating}
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
              snapToInterval={SIZES.width}
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
                    rating={rating}
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

  const shareDetails = async () => {
    try {
      const shareResponse = await Share.open(shareOptions);
      // console.log('shareOptions', shareResponse);
    } catch (error) {
      return error;
    }
  };

  if (loading || newLoad) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="small" color={COLORS.primary6} />
      </View>
    );
  }

  return (
    <Root>
      <Spinner
        visible={isSubmitting}
        animation={'fade'}
        overlayColor={'rgba(0,0,0,0.5)'}
      />

      <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
        <Header
          title={'Product Details'}
          other={true}
          tintColor={COLORS.Neutral1}
          icon={checkSavedItem() ? icons.bookmark : icons.save}
          contentStyle={{marginBottom: 0}}
          onOther={onSelect}
          onOther2={shareDetails}
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
                address={`${userInfo?.city}${', '} ${userInfo?.country}`}
                image={userInfo?.logo}
                supplier={userInfo?.title}
                showDetail={true}
                onPress={() =>
                  navigation.navigate('CompanyDetail', {
                    ID: productItem?.userID,
                  })
                }
              />
              {/* Product Description */}
              <BusinessDesc productItem={description} title={'Description'} />

              {/* Product Specification */}
              <ProductSpec
                spec={productSpec}
                title="Product Specification"
                icon={icons.info}
              />

              {/* Product Packaging */}
              <PriceQty
                title={'Product Packaging'}
                packageType={packageType}
                icon={icons.packages}
                moq={minOrderQty}
                paymentType={paymentType}
                supply={supplyCapacity}
                cert={productCert}
                transMode={transportMode}
              />

              {/* product brochure */}
              {productDocs.length > 0 && (
                <View
                  style={{
                    marginTop: SIZES.base,
                    padding: SIZES.semi_margin,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.white,
                    marginHorizontal: SIZES.semi_margin,
                  }}>
                  <ShowDocs
                    title="Product Documentation"
                    file={productDocs}
                    icon={icons.brochure}
                    contentStyle={{marginTop: 0}}
                  />
                </View>
              )}
              {/* Product Certifications */}
              {productCertDocs.length > 0 && (
                <View
                  style={{
                    marginTop: SIZES.base,
                    padding: SIZES.semi_margin,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.white,
                    marginHorizontal: SIZES.semi_margin,
                  }}>
                  <ShowDocs
                    title="Product Certifications"
                    icon={icons.cert}
                    file={productCertDocs}
                    contentStyle={{marginTop: 0}}
                  />
                </View>
              )}
            </>
          }
          renderItem={({item, index}) => {
            /* Reviews list */
            return (
              <View>
                {/* Review header */}
                {allReview && (
                  <View
                    style={{
                      backgroundColor: COLORS.white,
                      margin: SIZES.semi_margin,
                      borderRadius: SIZES.radius,
                    }}>
                    <Review />
                    <ReviewItem key={index} item={item} />
                    <SeeAll
                      containerStyle={{marginBottom: 20}}
                      onPress={() => navigation.navigate('AllReviews')}
                    />
                  </View>
                )}
              </View>
            );
          }}
          ListFooterComponent={
            <View>
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
                  marginBottom: 100,
                }}
                iconPosition={'LEFT'}
                icon={icons.chat}
                iconStyle={COLORS.primary1}
                onPress={onPress}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
