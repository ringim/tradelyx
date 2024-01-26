import {View} from 'react-native';
import {v4 as uuidV4} from 'uuid';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';

import {COLORS} from '../../../constants';
import {
  Header,
  LoadingIndicator,
  StandardRFQDetail1,
  StandardRFQDetail2,
} from '../../../components';
import {
  ExploreStackNavigatorParamList,
  StandardDomesticRFQDetailRouteProp,
} from '../../../components/navigation/SellerNav/type/navigation';
import {useAuthContext} from '../../../context/AuthContext';
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
  CreateNotificationInput,
  UpdateChatRoomMutation,
  UpdateChatRoomMutationVariables,
  CreateNotificationMutation,
  CreateNotificationMutationVariables,
  NotificationType,
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
import {createNotification} from '../../../queries/NotificationQueries';
import {getRFQ} from '../../../queries/RFQQueries';

const StandardRFQDetail = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();
  const route: any = useRoute<StandardDomesticRFQDetailRouteProp>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {authUser}: any = useAuthContext();

  // RFQ DETAILS
  const {loading: nowLoad, data: nowData} = useQuery<
    GetRFQQuery,
    GetRFQQueryVariables
  >(getRFQ, {variables: {id: route?.params?.rfqID}});
  const rfqItem: any = nowData?.getRFQ;

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

  // LIST CHAT ROOM USERS
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

  // CREATE CHATROOM
  const [doCreateChatRoom] = useMutation<
    CreateChatRoomMutation,
    CreateChatRoomMutationVariables
  >(createChatRoom);

  // UPDATE CHAT ROOM MESSAGE
  const [doUpdateChatRoom] = useMutation<
    UpdateChatRoomMutation,
    UpdateChatRoomMutationVariables
  >(updateChatRoom);

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
              rfqType: RFQTYPE.STANDARD,
              requestPrice: rfqItem?.budget,
              packageType: rfqItem?.packageType,
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
                id: newChatRoom?.id,
                SType: 'CHATROOM',
                chatRoomLastMessageId: newMessage,
              },
            },
          });
        };
        updateLastMessage(res?.data?.createMessage?.id);

        await createNotify(newChatRoom?.id);

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

  // CREATE NOTIFICATION FUNCTION
  const createNotify = async (chatroomID: string) => {
    try {
      const input: CreateNotificationInput = {
        id: uuidV4(),
        type: NotificationType?.RFQ_REPLY,
        readAt: 0,
        requestType: RFQTYPE?.STANDARD,
        actorID: authUser?.attributes?.sub,
        SType: 'NOTIFICATION',
        notificationRFQId: rfqItem?.id,
        chatroomID,
        title: 'Standard RFQ Request',
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

  if (loading || nowLoad || newLoad || softLoad) {
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
          <StandardRFQDetail1
            placeOriginFlag={rfqItem?.placeOriginFlag}
            placeOriginName={rfqItem?.placeOrigin}
            rfqNo={rfqItem?.rfqNo}
            description={rfqItem?.description}
            title={rfqItem?.title}
          />

          <StandardRFQDetail2
            onPress={onPress}
            coverage={rfqItem?.rfqType}
            documents={rfqItem?.documents}
            requestCategory={rfqItem?.requestCategory}
          />
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};

export default StandardRFQDetail;
