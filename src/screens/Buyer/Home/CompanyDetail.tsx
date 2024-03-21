import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useMutation, useQuery} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import Share from 'react-native-share';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  Header,
  PopularProducts,
  StoreBannerInfo,
  PopularItem,
  LoadingIndicator,
  NoItem,
} from '../../../components';
import {COLORS} from '../../../constants';
import {
  HomeStackNavigatorParamList,
  ProductDetailRouteProp,
} from '../../../components/navigation/BuyerNav/type/navigation';
import {
  ModelSortDirection,
  ProductByDateQuery,
  ProductByDateQueryVariables,
  CreateChatRoomMutation,
  CreateChatRoomMutationVariables,
  CreateUserChatRoomMutation,
  CreateUserChatRoomMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  ListUserChatRoomsQuery,
  ListUserChatRoomsQueryVariables,
} from '../../../API';
import {getUser} from '../../../queries/UserQueries';
import {
  createChatRoom,
  createUserChatRoom,
  listUserChatRooms,
} from '../../../queries/ChatQueries';
import {productByDate} from '../../../queries/ProductQueries';
import {shareOptions} from '../../../utilities/service';
import {useAuthContext} from '../../../context/AuthContext';

const CompanyDetail = () => {
  const {authUser}: any = useAuthContext();
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const route: any = useRoute<ProductDetailRouteProp>();
  const {ID}: any = route?.params;
  // console.log('company details', route.params);

  const [fetchingMore, setFetchingMore] = useState<any>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // GET USER
  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {
        id: ID,
      },
    },
  );
  const userInfo: any = data?.getUser;

  // LIST PRODUCTS
  const {
    data: newData,
    loading: newLoad,
    fetchMore,
  } = useQuery<ProductByDateQuery, ProductByDateQueryVariables>(productByDate, {
    variables: {
      SType: 'JOB',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const allProducts: any =
    newData?.productByDate?.items
      .filter(sp => sp?.userID === ID)
      .filter((item: any) => !item?._deleted) || [];
  const nextToken = newData?.productByDate?.nextToken;

  // LIST CHAT ROOM USERS
  const {data: softData} = useQuery<
    ListUserChatRoomsQuery,
    ListUserChatRoomsQueryVariables
  >(listUserChatRooms);
  const allChatRoomUsers: any = softData?.listUserChatRooms?.items.filter(
    usrID => usrID?.userId === ID,
  );
  const newArray = allChatRoomUsers?.map((item: any) => ({
    chatRoomId: item.chatRoomId,
    userId: item.userId,
  }));

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
              userId: ID,
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

  const loadMoreItem = async () => {
    if (!nextToken || fetchingMore) {
      return;
    }
    setFetchingMore(true);
    await fetchMore({variables: {nextToken}});
    setFetchingMore(false);
  };

  const shareDetails = async () => {
    try {
      const shareResponse = await Share.open(shareOptions);
      // console.log('shareOptions', shareResponse);
    } catch (error) {
      return error;
    }
  };

  if (newLoad || loading) {
    return <LoadingIndicator />;
  }

  return (
    <Root>
      <Spinner
        visible={isSubmitting}
        animation={'fade'}
        overlayColor={'rgba(0,0,0,0.5)'}
      />
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header
          title={'Company Details'}
          contentStyle={{marginBottom: 0}}
          tintColor={COLORS.Neutral1}
          other={true}
          onOther2={shareDetails}
        />
        <FlatList
          data={allProducts}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item?.id}`}
          ListHeaderComponent={
            <>
              {/* Store Contact & Info */}
              <StoreBannerInfo
                onPress={() =>
                  navigation.navigate('BusinessDetail', {
                    businessItem: userInfo,
                  })
                }
                onPress2={onPress}
                address={`${userInfo?.city}${', '} ${userInfo?.country}`}
                supplierName={userInfo?.title}
                banner_image={userInfo?.backgroundImage}
                logo={userInfo?.logo}
              />
              {/* popular products from store */}
              <PopularProducts title={'Most Popular Products'} />
            </>
          }
          renderItem={({item, index}) => {
            /* Popular items */
            return (
              <>
                {/* Store images */}
                <PopularItem
                  key={index}
                  item={item}
                  store_image={item?.productImage}
                  onPress={() =>
                    navigation.navigate('ProductDetail', {productItem: item})
                  }
                />
              </>
            );
          }}
          ListFooterComponent={
            <View
              style={{
                marginBottom: allProducts?.length - 1 ? 300 : 300,
              }}>
              {allProducts?.length === 0 && <NoItem contentStyle={{flex: 1}} />}
            </View>
          }
          onEndReached={() => loadMoreItem()}
        />
      </View>
    </Root>
  );
};

export default CompanyDetail;
