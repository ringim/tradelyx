import {StyleSheet, FlatList, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {useMutation, useQuery} from '@apollo/client';

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
  TextButton,
} from '../../../components';
import {
  COLORS,
  FONTS,
  SIZES,
  dummyData,
  icons,
  images,
} from '../../../constants';
import {
  BusinessDetailRouteProp,
  HomeStackNavigatorParamList,
} from '../../../components/navigation/BuyerNav/type/navigation';
import {
  ReviewByDateQueryVariables,
  ReviewByDateQuery,
  ModelSortDirection,
  CreateChatRoomMutation,
  CreateChatRoomMutationVariables,
  CreateUserChatRoomMutation,
  CreateUserChatRoomMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  ListUserChatRoomsQuery,
  ListUserChatRoomsQueryVariables,
} from '../../../API';
import {getUser, reviewByDate} from '../../../queries/UserQueries';
import {
  createChatRoom,
  createUserChatRoom,
  listUserChatRooms,
} from '../../../queries/ChatQueries';
import {useAuthContext} from '../../../context/AuthContext';

const reviews = dummyData.reviews;

const BusinessDetail = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const {authUser}: any = useAuthContext();

  const mapRef = useRef(null);
  const route: any = useRoute<BusinessDetailRouteProp>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {city, country, id}: any = route?.params?.businessItem;

  // LIST REVIEWS
  const {
    data: newData,
    loading: newLoad,
    refetch,
  } = useQuery<ReviewByDateQuery, ReviewByDateQueryVariables>(reviewByDate, {
    pollInterval: 500,
    variables: {
      limit: 5,
      SType: 'REVIEW',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const allReview: any =
    newData?.reviewByDate?.items.filter((item: any) => !item?._deleted) || [];

  // GET USER
  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {
        id,
      },
    },
  );
  const userInfo: any = data?.getUser;

  // GET USER 1
  const {data: onData} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {
        id: authUser?.attributes?.sub,
      },
    },
  );
  const userDetail: any = onData?.getUser?.ChatRooms?.items;
  const newArray2 = userDetail?.map((item: any) => ({
    chatRoomId: item.chatRoomId,
    userId: item.userId,
  }));

  // LIST CHAT ROOM USERS
  const {data: softData} = useQuery<
    ListUserChatRoomsQuery,
    ListUserChatRoomsQueryVariables
  >(listUserChatRooms);
  const allChatRoomUsers: any = softData?.listUserChatRooms?.items.filter(
    usrID => usrID?.userId === id,
  );
  const newArray = allChatRoomUsers?.map((item: any) => ({
    chatRoomId: item.chatRoomId,
    userId: item.userId,
  }));

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
      const similarChatRoomIDs = newArray?.filter((obj1: any) =>
        newArray2?.some((obj2: any) => obj1?.chatRoomId === obj2?.chatRoomId),
      );
      // if chatRoom exist with user
      if (similarChatRoomIDs?.length > 0) {
        navigation.navigate('Chat', {
          id: similarChatRoomIDs[0]?.chatRoomId,
          offerDetail: route?.params?.detail,
        });
      } else {
        // create a new chatRoom
        const chatRoom: any = await doCreateChatRoom({
          variables: {
            input: {
              SType: 'CHATROOM',
              name: userInfo?.id,
            },
          },
        });
        const newChatRoom = chatRoom.data?.createChatRoom;

        // add the clicked user to the chatRoom
        await doCreateUserChatRoom({
          variables: {
            input: {
              chatRoomId: newChatRoom?.id,
              userId: id,
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

  if (newLoad || loading) {
    return <LoadingIndicator />;
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
        <Header
          title={'Business Details'}
          contentStyle={{marginBottom: 0}}
          tintColor={COLORS.Neutral1}
        />

        <FlatList
          data={allReview}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item?.id}
          ListHeaderComponent={
            <>
              {/* Store Detail */}
              <StoreInfo
                address={`${city}${`, `} ${country}`}
                image={route?.params?.businessItem?.logo}
                supplier={route?.params?.businessItem?.title}
                addressStyle={{...FONTS.body3}}
                locationStyle={{height: 20, width: 20}}
                supplierStyle={{...FONTS.h3}}
                logoStyle={{height: 50, width: 50}}
              />

              {/* Overview */}
              <ProductDesc
                productItem={route?.params?.businessItem?.overview}
                sub1={route?.params?.businessItem?.businessType}
                sub2={route?.params?.businessItem?.certifications}
                mainMarket={route?.params?.businessItem?.mainMarkets}
                sub3={route?.params?.businessItem?.estRevenue}
                sub4={route?.params?.businessItem?.totalStaff}
                sub5={route?.params?.businessItem?.responseTime}
                sub6={route?.params?.businessItem?.totalOrders}>
                <LanguageSpoken
                  languages={route?.params?.businessItem?.languages}
                />
              </ProductDesc>

              {/* Map location address */}
              <SellerLocationMapHeader
                showAddress={true}
                showHeader={true}
                address2={route?.params?.businessItem?.address}
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
                      latitude: route?.params?.businessItem?.lat,
                      longitude: route?.params?.businessItem?.lng,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    }}>
                    <Marker
                      ref={mapRef}
                      coordinate={{
                        latitude: route?.params?.businessItem?.lat,
                        longitude: route?.params?.businessItem?.lng,
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
          renderItem={({item}) => {
            /* Reviews list */
            return <ReviewItem item={item} />;
          }}
          ListFooterComponent={
            <View style={{marginBottom: reviews?.length - 1 ? 100 : 100}}>
              <TextButton
                label={'Contact Supplier'}
                buttonContainerStyle={{
                  alignSelf: 'center',
                  marginTop: SIZES.radius,
                  marginBottom: 100,
                }}
                onPress={onPress}
              />
            </View>
          }
        />
      </View>
    </Root>
  );
};

export default BusinessDetail;
