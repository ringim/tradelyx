import {View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {v4 as uuidV4} from 'uuid';
import dayjs from 'dayjs';
import Clipboard from '@react-native-clipboard/clipboard';
import {useMutation, useQuery} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import Spinner from 'react-native-loading-spinner-overlay';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {COLORS} from '../../../constants';
import {
  DomesticRFQDetail1,
  DomesticRFQDetail2,
  DomesticRFQDetail3,
  Header,
  LoadingIndicator,
} from '../../../components';
import {
  ExploreStackNavigatorParamList,
  DomesticRFQDetailRouteProp,
} from '../../../components/navigation/SellerNav/type/navigation';
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
  RFQTYPE,
  UpdateChatRoomMutation,
  UpdateChatRoomMutationVariables,
  CreateNotificationMutation,
  CreateNotificationMutationVariables,
  NotificationType,
  CreateNotificationInput,
  GetRFQQuery,
  GetRFQQueryVariables,
} from '../../../API';
import {
  listUserChatRooms,
  createChatRoom,
  createUserChatRoom,
  createMessage,
  updateChatRoom,
} from '../../../queries/ChatQueries';
import {getUser} from '../../../queries/UserQueries';
import {useAuthContext} from '../../../context/AuthContext';
import {createNotification} from '../../../queries/NotificationQueries';
import {getRFQ} from '../../../queries/RFQQueries';

const DomesticRFQDetail = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();
  const route: any = useRoute<DomesticRFQDetailRouteProp>();

  // RFQ DETAILS
  const {loading: nowLoad, data: nowData} = useQuery<
    GetRFQQuery,
    GetRFQQueryVariables
  >(getRFQ, {variables: {id: route?.params?.rfqID}});
  const rfqItem: any = nowData?.getRFQ;

  const {authUser}: any = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const expiryDateString = rfqItem?.expiryDate;
  const expiryPeriod = dayjs(expiryDateString);
  const currentDate = dayjs();
  const daysUntilExpiry = expiryPeriod.diff(currentDate, 'day');

  const onCopy = () => {
    Clipboard.setString(rfqItem?.rfqNo);
  };

  // GET USER
  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {
        id: rfqItem?.userID,
      },
    },
  );
  const userInfo: any = data?.getUser;

  // GET CHAT ROOM USERS
  const {data: newData, loading: newLoad} = useQuery<
    ListUserChatRoomsQuery,
    ListUserChatRoomsQueryVariables
  >(listUserChatRooms);
  const allChatRoomUsers: any = newData?.listUserChatRooms?.items.filter(
    usrID => usrID?.userId === rfqItem?.userID,
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
              text: "Hello, I'll respond to your RFQ request soon",
              rfqID: rfqItem?.rfqNo,
              requestTitle: rfqItem?.title,
              requestID: rfqItem?.id,
              serviceType: serviceType?.RFQ,
              rfqType: RFQTYPE.DOMESTIC,
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
        await createNotify(similarChatRoomIDs[0]?.chatRoomId?.id);
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
              userId: rfqItem?.userID,
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
              text: "Hello, I'll respond to your RFQ request soon",
              rfqID: rfqItem?.rfqNo,
              requestTitle: rfqItem?.title,
              requestID: rfqItem?.id,
              requestPrice: rfqItem?.budget,
              packageType: rfqItem?.packageType,
              serviceType: serviceType?.RFQ,
              chatroomID: newChatRoom.id,
            },
          },
        });

        // update last msg function
        const updateLastMessage = async (newMessage: any) => {
          await doUpdateChatRoom({
            variables: {
              input: {
                id: newChatRoom.id,
                SType: 'CHATROOM',
                chatRoomLastMessageId: newMessage,
              },
            },
          });
        };
        updateLastMessage(res?.data?.createMessage?.id);
        await createNotify(newChatRoom?.id);
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

  // CREATE NOTIFICATION FUNCTION
  const createNotify = async (chatroomID: string) => {
    try {
      const input: CreateNotificationInput = {
        id: uuidV4(),
        type: NotificationType?.RFQ_REPLY,
        readAt: 0,
        requestType: RFQTYPE?.DOMESTIC,
        actorID: authUser?.attributes?.sub,
        SType: 'NOTIFICATION',
        notificationRFQId: rfqItem?.id,
        chatroomID,
        title: 'Domestic RFQ Request',
        description: `${softData?.getUser?.title} will respond to your request for ${rfqItem?.title}`,
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

  if (loading || newLoad || nowLoad || softLoad) {
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
        <Header title={'RFQ Detail'} tintColor={COLORS.Neutral1} />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          bounces={false}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          <DomesticRFQDetail1
            placeOriginName={rfqItem?.placeOrigin}
            onCopy={onCopy}
            daysUntilExpiry={daysUntilExpiry}
            placeOriginFlag={rfqItem?.placeOriginFlag}
            rfqNo={rfqItem?.rfqNo}
            expiryDate={rfqItem?.expiryDate}
          />
          <DomesticRFQDetail2
            description={rfqItem?.description}
            title={rfqItem?.title}
            qty={rfqItem?.qty}
            productName={rfqItem?.productName}
            buyFrequency={rfqItem?.buyFrequency}
            paymentMethod={rfqItem?.paymentMethod}
            paymentType={rfqItem?.paymentType}
            unit={rfqItem?.unit}
            requestCategory={rfqItem?.requestCategory}
            coverage={rfqItem?.rfqType}
          />
          <DomesticRFQDetail3
            tags={rfqItem?.tags}
            landmark={rfqItem?.landmark}
            budget={rfqItem?.budget}
            onPress={onPress}
            documents={rfqItem?.documents}
          />
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};

export default DomesticRFQDetail;
