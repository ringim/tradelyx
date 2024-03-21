import {View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {useMutation, useQuery} from '@apollo/client';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  Header,
  LoadingIndicator,
  SellOfferDetail1,
  SellOfferDetail2,
  TextIconButton,
} from '../../../components';
import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {
  HomeStackNavigatorParamList,
  OfferDetailRouteProp,
} from '../../../components/navigation/BuyerNav/type/navigation';
import {getUser} from '../../../queries/UserQueries';
import {
  CreateChatRoomMutation,
  CreateChatRoomMutationVariables,
  CreateUserChatRoomMutation,
  CreateUserChatRoomMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  ListUserChatRoomsQuery,
  ListUserChatRoomsQueryVariables,
  CreateMessageMutation,
  CreateMessageMutationVariables,
  MessageStatus,
  serviceType,
  UpdateChatRoomMutation,
  UpdateChatRoomMutationVariables,
  GetSellOfferQuery,
  GetSellOfferQueryVariables,
} from '../../../API';
import {
  createChatRoom,
  createMessage,
  createUserChatRoom,
  listUserChatRooms,
  updateChatRoom,
} from '../../../queries/ChatQueries';
import {useAuthContext} from '../../../context/AuthContext';
import {getSellOffer} from '../../../queries/SellOfferQueries';

const OfferDetail = () => {
  const {authUser}: any = useAuthContext();

  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route: any = useRoute<OfferDetailRouteProp>();

  // SELL OFFER DETAILS
  const {loading: nowLoad, data: nowData} = useQuery<
    GetSellOfferQuery,
    GetSellOfferQueryVariables
  >(getSellOffer, {variables: {id: route?.params?.detail}});

  const sellOfferItem: any = nowData?.getSellOffer;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const expiryDateString = sellOfferItem?.offerValidity;
  const expiryDate = dayjs(expiryDateString);
  const currentDate = dayjs();
  const daysUntilExpiry = expiryDate.diff(currentDate, 'day');

  // GET USER
  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {
        id: sellOfferItem?.userID,
      },
    },
  );
  const userInfo: any = data?.getUser;

  // LIST CHAT ROOM USERS
  const {data: newData, loading: newLoad} = useQuery<
    ListUserChatRoomsQuery,
    ListUserChatRoomsQueryVariables
  >(listUserChatRooms);
  const allChatRoomUsers: any = newData?.listUserChatRooms?.items.filter(
    usrID => usrID?.userId === sellOfferItem?.userID,
  );
  const newArray = allChatRoomUsers?.map((item: any) => ({
    chatRoomId: item.chatRoomId,
    userId: item.userId,
  }));

  // GET USER 1
  const {data: softData, loading: softLoad} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {
    variables: {
      id: authUser?.attributes?.sub,
    },
  });
  const userDetail: any = softData?.getUser?.ChatRooms?.items;
  const newArray2 = userDetail?.map((item: any) => ({
    chatRoomId: item.chatRoomId,
    userId: item.userId,
  }));

  // SEND MESSAGE
  const [doCreateMessage] = useMutation<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >(createMessage);

  // UPDATE CHAT ROOM MESSAGE
  const [doUpdateChatRoom] = useMutation<
    UpdateChatRoomMutation,
    UpdateChatRoomMutationVariables
  >(updateChatRoom);

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
        // initial message
        const res = await doCreateMessage({
          variables: {
            input: {
              SType: 'MESSAGE',
              userID: authUser?.attributes?.sub,
              forUserID: sellOfferItem?.userID,
              status: MessageStatus.SENT,
              text: `Hello, I'm interested in this Sell Offer - ${sellOfferItem?.title}`,
              title: `${softData?.getUser?.name} Request`,
              sellOfferID: sellOfferItem?.sellOfferID,
              requestTitle: sellOfferItem?.title,
              packageType: sellOfferItem?.packageType,
              unit: sellOfferItem?.unit,
              serviceImage: sellOfferItem?.sellOfferImage,
              requestID: sellOfferItem?.id,
              requestQty: sellOfferItem?.qtyMeasure,
              requestPrice: sellOfferItem?.basePrice,
              serviceType: serviceType?.SELLOFFERS,
              chatroomID: similarChatRoomIDs[0]?.chatRoomId,
              readAt: 0,
            },
          },
        });
        // update last msg function
        const updateLastMessage = async (newMessage: any) => {
          await doUpdateChatRoom({
            variables: {
              input: {
                id: similarChatRoomIDs[0]?.chatRoomId,
                SType: 'CHATROOM',
                chatRoomLastMessageId: newMessage,
              },
            },
          });
        };
        updateLastMessage(res?.data?.createMessage?.id);
        navigation.navigate('Chat', {
          id: similarChatRoomIDs[0]?.chatRoomId,
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
              userId: sellOfferItem?.userID,
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

        // initial message
        const res = await doCreateMessage({
          variables: {
            input: {
              SType: 'MESSAGE',
              userID: authUser?.attributes?.sub,
              forUserID: sellOfferItem?.userID,
              status: MessageStatus.SENT,
              text: `Hello, I'm interested in this Sell Offer - ${sellOfferItem?.title}`,
              title: `${softData?.getUser?.name} Request`,
              sellOfferID: sellOfferItem?.sellOfferID,
              requestTitle: sellOfferItem?.title,
              packageType: sellOfferItem?.package,
              unit: sellOfferItem?.unit,
              serviceImage: sellOfferItem?.sellOfferImage,
              requestID: sellOfferItem?.id,
              requestQty: sellOfferItem?.qtyMeasure,
              requestPrice: sellOfferItem?.basePrice,
              serviceType: serviceType?.SELLOFFERS,
              chatroomID: newChatRoom.id,
              readAt: 0,
            },
          },
        });

        // update last msg function
        const updateLastMessage = async (newMessage: any) => {
          await doUpdateChatRoom({
            variables: {
              input: {
                id: newChatRoom?.id,
                SType: 'CHATROOM',
                chatRoomLastMessageId: newMessage,
              },
            },
          });
        };
        updateLastMessage(res?.data?.createMessage?.id);
        navigation.navigate('Chat', {
          id: newChatRoom?.id,
        });
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

  if (newLoad || softLoad || loading || nowLoad) {
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
        <Header title={'Sell Offer Detail'} tintColor={COLORS.Neutral1} />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          bounces={false}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          <SellOfferDetail1
            userInfo={userInfo}
            soImg={sellOfferItem?.sellOfferImage}
            usrImg={userInfo?.logo}
            placeOrigin={sellOfferItem?.placeOrigin}
            title={sellOfferItem?.title}
            unit={sellOfferItem?.unit}
            deliveryDate={sellOfferItem?.offerValidity}
            paymentType={sellOfferItem?.paymentType}
            basePrice={sellOfferItem?.basePrice}
            productName={sellOfferItem?.productName}
            qtyMeasure={sellOfferItem?.qtyMeasure}
            category={sellOfferItem?.requestCategory}
            packageType={sellOfferItem?.packageType}
            paymentMethod={sellOfferItem?.paymentMethod}
            coverage={sellOfferItem?.rfqType}
          />

          <SellOfferDetail2
            basePrice={sellOfferItem?.basePrice}
            daysUntilExpiry={daysUntilExpiry}
            packageDesc={sellOfferItem?.packageDesc}
            description={sellOfferItem?.description}
            onPress={onPress}
            image={sellOfferItem?.image}
            images={sellOfferItem?.images}
            showBtn={true}
            createdAtd={sellOfferItem?.createdAtd}
            containerStyle={{marginBottom: SIZES.padding * 2}}
          />

          {/* <TextIconButton
            label={'Coming Soon'}
            labelStyle={{
              color: COLORS.primary1,
              ...FONTS.h4,
              marginLeft: SIZES.radius,
            }}
            iconPosition={'LEFT'}
            icon={icons.pay}
            iconStyle={COLORS.primary1}
            // onPress={() => navigation.navigate('ViewAgreement')}
            containerStyle={{
              marginBottom: SIZES.padding * 2.5,
              backgroundColor: COLORS.white,
              marginTop: SIZES.radius,
              width: 350,
            }}
          /> */}
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};

export default OfferDetail;
