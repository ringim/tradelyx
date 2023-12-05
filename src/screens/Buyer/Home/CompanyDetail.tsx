import {ActivityIndicator, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useMutation, useQuery} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import Share from 'react-native-share';

import {
  Header,
  PopularProducts,
  StoreBannerInfo,
  PopularItem,
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
  ListUsersQuery,
  ListUsersQueryVariables,
} from '../../../API';
import {getUser, listUsers} from '../../../queries/UserQueries';
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
      .filter(st => st?.SType === 'JOB')
      .filter(sp => sp?.userID === ID)
      .filter((item: any) => !item?._deleted) || [];
  const nextToken = newData?.productByDate?.nextToken;

  const {data: softData} = useQuery<
    ListUserChatRoomsQuery,
    ListUserChatRoomsQueryVariables
  >(listUserChatRooms);
  const allChatRoomUsers = softData?.listUserChatRooms?.items.find(
    usrID => usrID?.userId === ID,
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
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="small" color={COLORS.primary6} />
      </View>
    );
  }

  return (
    <Root>
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
                marginBottom: allProducts?.length - 1 && 200,
              }}
            />
          }
          onEndReached={() => loadMoreItem()}
        />
      </View>
    </Root>
  );
};

export default CompanyDetail;
