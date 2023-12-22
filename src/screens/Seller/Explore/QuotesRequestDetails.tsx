import {View, Platform, Text, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {useNavigation, useRoute} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  ExploreStackNavigatorParamList,
  QuotesRequestDetailsRouteProp,
} from '../../../components/navigation/SellerNav/type/navigation';
import {
  Header,
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

const QuotesRequestDetails = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();
  const route: any = useRoute<QuotesRequestDetailsRouteProp>();

  const {authUser}: any = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // console.log(route?.params?.quoteItem);

  const onCopy = () => {
    Clipboard.setString(route?.params?.quoteItem?.orderID);
  };

  // GET USER
  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {
        id: route?.params?.quoteItem?.userID,
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
    usrID => usrID?.userId === route?.params?.quoteItem?.userID,
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
              status: MessageStatus.SENT,
              text: "Hello, I'll respond to your RFF request soon",
              rffID: route?.params?.quoteItem?.rffNo,
              requestTitle: route?.params?.quoteItem?.productName,
              requestID: route?.params?.quoteItem?.id,
              serviceType: serviceType?.RFF,
              rffType: route?.params?.quoteItem?.rffType,
              requestPrice: route?.params?.quoteItem?.budget,
              packageType: route?.params?.quoteItem?.packageType,
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
        navigation.navigate('Chat', {
          id: similarChatRoomIDs[0]?.chatRoomId,
        });
      } else {
        // create a new chatRoom
        const chatRoom: any = await doCreateChatRoom({
          variables: {
            input: {
              newMessages: 0,
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
              userId: route?.params?.quoteItem?.userID,
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
              rffID: route?.params?.quoteItem?.rffNo,
              requestTitle: route?.params?.quoteItem?.productName,
              requestID: route?.params?.quoteItem?.id,
              serviceType: serviceType?.RFF,
              rffType: route?.params?.quoteItem?.rffType,
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

  if (loading || newLoad || softLoad) {
    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center'}}
        size={'small'}
        color={COLORS.primary6}
      />
    );
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
          title={'Details'}
          tintColor={COLORS.Neutral1}
          contentStyle={{
            paddingTop: Platform.OS == 'ios' ? 15 : SIZES.radius,
            height: Platform.OS === 'android' ? 40 : 65,
          }}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginHorizontal: SIZES.base,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
            }}>
            <QuoteRequestItem
              to={route?.params?.quoteItem?.placeDestinationName}
              from={route?.params?.quoteItem?.placeOriginName}
              fromImg={route?.params?.quoteItem?.placeOriginFlag}
              toImg={route?.params?.quoteItem?.placeDestinationFlag}
            />

            <QuoteRequestItem2
              orderID={route?.params?.quoteItem?.rffNo}
              onCopy={onCopy}
              packageType={route?.params?.quoteItem?.packageType}
              name={route?.params?.quoteItem?.productName}
              containerCount={route?.params?.quoteItem?.qty}
              transportMode={route?.params?.quoteItem?.rffType}
              containerSize={route?.params?.quoteItem?.containerSize}
              containerDetails={route?.params?.quoteItem?.containerDetails}
              relatedServices={route?.params?.quoteItem?.relatedServices}
              container={route?.params?.quoteItem?.container}
              containerType={route?.params?.quoteItem?.containerType}
              rffType={route?.params?.quoteItem?.rffType}
              weight={route?.params?.quoteItem?.weight}
              notes={route?.params?.quoteItem?.notes}
              handling={route?.params?.quoteItem?.handling}
              length={route?.params?.quoteItem?.length}
              height={route?.params?.quoteItem?.height}
            />

            {/* Origin Details*/}
            <OriginDestinationDetails
              address={route?.params?.quoteItem?.placeOriginName}
              type={'Origin'}
              departDate={route?.params?.quoteItem?.loadDate}
              typeName={'Ready to load date'}
            />

            {/* Destination Details  */}
            <QuoteDetail
              place={route?.params?.quoteItem?.placeDestinationName}
            />

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
        </ScrollView>
      </View>
    </Root>
  );
};

export default QuotesRequestDetails;
