import {View, Platform} from 'react-native';
import React, {useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {useNavigation, useRoute} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {v4 as uuidV4} from 'uuid';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  ExploreStackNavigatorParamList,
  QuotesRequestDetailsRouteProp,
} from '../../../components/navigation/SellerNav/type/navigation';
import {
  Header,
  LoadingIndicator,
  OriginDestinationDetails,
  QuoteDetail,
  QuoteRequestItem,
  QuoteRequestItem2,
  TextButton,
} from '../../../components';
import {SIZES, COLORS} from '../../../constants';
import {
  CreateChatRoomMutation,
  CreateChatRoomMutationVariables,
  CreateMessageMutation,
  CreateMessageMutationVariables,
  CreateUserChatRoomMutation,
  CreateUserChatRoomMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  ListUserChatRoomsQuery,
  ListUserChatRoomsQueryVariables,
  MessageStatus,
  serviceType,
  UpdateChatRoomMutation,
  UpdateChatRoomMutationVariables,
  CreateNotificationMutation,
  CreateNotificationMutationVariables,
  CreateNotificationInput,
  NotificationType,
  GetRFFQuery,
  GetRFFQueryVariables,
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
import {getRFF} from '../../../queries/RFFQueries';

const QuotesRequestDetails = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();
  const route: any = useRoute<QuotesRequestDetailsRouteProp>();

  const {authUser}: any = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // RFQ DETAILS
  const {loading: nowLoad, data: nowData} = useQuery<
    GetRFFQuery,
    GetRFFQueryVariables
  >(getRFF, {variables: {id: route?.params?.rffID}});
  const rffItem: any = nowData?.getRFF;

  const onCopy = () => {
    Clipboard.setString(rffItem?.orderID);
  };

  // GET USER
  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {
        id: rffItem?.userID,
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
    usrID => usrID?.userId === rffItem?.userID,
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
              text: "Hello, I'll respond to your RFF request soon",
              rffID: rffItem?.rffNo,
              requestTitle: rffItem?.productName,
              requestID: rffItem?.id,
              serviceType: serviceType?.RFF,
              rffType: rffItem?.rffType,
              requestPrice: rffItem?.budget,
              packageType: rffItem?.packageType,
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
              userId: rffItem?.userID,
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

        const res = await doCreateMessage({
          variables: {
            input: {
              SType: 'MESSAGE',
              userID: authUser?.attributes?.sub,
              status: MessageStatus.SENT,
              text: "Hello, I'll respond to your RFF request soon",
              rffID: rffItem?.rffNo,
              requestTitle: rffItem?.productName,
              requestID: rffItem?.id,
              serviceType: serviceType?.RFF,
              rffType: rffItem?.rffType,
              chatroomID: newChatRoom?.id,
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
        type: NotificationType?.RFF_REPLY,
        readAt: 0,
        requestType: rffItem?.rffType,
        actorID: authUser?.attributes?.sub,
        SType: 'NOTIFICATION',
        notificationSellOfferId: rffItem?.id,
        chatroomID,
        title: `${rffItem?.rffType} RFF Request`,
        description: `${softData?.getUser?.title} will respond to your request for ${rffItem?.productName}`,
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
        <Header
          title={'RFF Detail'}
          tintColor={COLORS.Neutral1}
          contentStyle={{
            paddingTop: Platform.OS == 'ios' ? 15 : SIZES.radius,
            height: Platform.OS === 'android' ? 40 : 65,
          }}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          bounces={false}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          <View
            style={{
              marginHorizontal: SIZES.base,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
            }}>
            <QuoteRequestItem
              to={rffItem?.placeDestinationName}
              from={rffItem?.placeOriginName}
              fromImg={rffItem?.placeOriginFlag}
              toImg={rffItem?.placeDestinationFlag}
            />

            <QuoteRequestItem2
              orderID={rffItem?.rffNo}
              onCopy={onCopy}
              packageType={rffItem?.packageType}
              name={rffItem?.productName}
              containerCount={rffItem?.qty}
              transportMode={rffItem?.rffType}
              containerSize={rffItem?.containerSize}
              containerDetails={rffItem?.containerDetails}
              relatedServices={rffItem?.relatedServices}
              container={rffItem?.container}
              containerType={rffItem?.containerType}
              rffType={rffItem?.rffType}
              weight={rffItem?.weight}
              notes={rffItem?.notes}
              handling={rffItem?.handling}
              length={rffItem?.length}
              height={rffItem?.height}
            />

            {/* Origin Details*/}
            <OriginDestinationDetails
              address={rffItem?.placeOriginName}
              type={'Origin'}
              departDate={rffItem?.loadDate}
              typeName={'Ready to load date'}
            />

            {/* Destination Details  */}
            <QuoteDetail place={rffItem?.placeDestinationName} />

            {/* Button */}
            <TextButton
              buttonContainerStyle={{
                borderRadius: SIZES.radius,
                marginTop: SIZES.padding,
                marginBottom: 100,
              }}
              label="Contact"
              onPress={onPress}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};

export default QuotesRequestDetails;
