import {View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {v4 as uuidV4} from 'uuid';
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
  CreateNotificationMutation,
  CreateNotificationMutationVariables,
  CreateNotificationInput,
  NotificationType,
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
import {createNotification} from '../../../queries/NotificationQueries';
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

  // CREATE NOTIFICATION
  const [doCreateNotification] = useMutation<
    CreateNotificationMutation,
    CreateNotificationMutationVariables
  >(createNotification);

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
              status: MessageStatus.SENT,
              text: "Hello, I'm interested in this Sell Offer",
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
        await createNotify(similarChatRoomIDs[0]?.chatRoomId);
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
              status: MessageStatus.SENT,
              text: "Hello, I'm interested in this Sell Offer",
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

        await createNotify(newChatRoom.id);

        // navigate to the newly created chatRoom
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

  // CREATE NOTIFICATION FUNCTION
  const createNotify = async (chatroomID: string) => {
    try {
      const input: CreateNotificationInput = {
        id: uuidV4(),
        type: NotificationType?.SELLOFFER,
        readAt: 0,
        requestType: 'Sell Offer',
        actorID: authUser?.attributes?.sub,
        SType: 'NOTIFICATION',
        notificationSellOfferId: sellOfferItem?.id,
        chatroomID,
        title: 'Sell Offer Request',
        description: `${softData?.getUser?.name} has requested about ${sellOfferItem?.productName} Sell Offer`,
      };
      const res = await doCreateNotification({
        variables: {
          input,
        },
      });
      // console.log('notification created', res);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: (error as Error).message,
        autoClose: 1500,
      });
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
          />

          <TextIconButton
            label={'Buy (Coming Soon!!!)'}
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
          />
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};

export default OfferDetail;
