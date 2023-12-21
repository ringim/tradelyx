import {View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {Storage} from 'aws-amplify';
import dayjs from 'dayjs';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {useMutation, useQuery} from '@apollo/client';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  Header,
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
} from '../../../API';
import {
  createChatRoom,
  createMessage,
  createUserChatRoom,
  listUserChatRooms,
  updateChatRoom,
} from '../../../queries/ChatQueries';
import {useAuthContext} from '../../../context/AuthContext';

const OfferDetail = () => {
  const {authUser}: any = useAuthContext();

  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route: any = useRoute<OfferDetailRouteProp>();
  const {image, images, userID, id}: any = route?.params?.detail;

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageUri2, setImageUri2] = useState<string | null>(null);
  const [imageUri3, setImageUri3] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const expiryDateString = route?.params?.detail?.offerValidity;
  const expiryDate = dayjs(expiryDateString);
  const currentDate = dayjs();
  const daysUntilExpiry = expiryDate.diff(currentDate, 'day');

  // GET USER
  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {
        id: userID,
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
    usrID => usrID?.userId === userID,
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
              text: "Hello, I'm interested in this Sell Offer",
              sellOfferID: route?.params?.detail?.sellOfferID,
              requestTitle: route?.params?.detail?.title,
              packageType: route?.params?.detail?.packageType,
              serviceImage: route?.params?.detail?.sellOfferImage,
              requestID: id,
              requestQty: route?.params?.detail?.qtyMeasure,
              requestPrice: route?.params?.detail?.basePrice,
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

        // initial message
        const res = await doCreateMessage({
          variables: {
            input: {
              SType: 'MESSAGE',
              userID: authUser?.attributes?.sub,
              status: MessageStatus.SENT,
              text: "Hello, I'm interested in this Sell Offer",
              sellOfferID: route?.params?.detail?.sellOfferID,
              requestTitle: route?.params?.detail?.title,
              packageType: route?.params?.detail?.packageType,
              serviceImage: route?.params?.detail?.sellOfferImage,
              requestID: id,
              requestQty: route?.params?.detail?.qtyMeasure,
              requestPrice: route?.params?.detail?.basePrice,
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

  useEffect(() => {
    let isCurrent = true;
    if (userInfo?.logo && isCurrent) {
      Storage.get(userInfo?.logo).then(setImageUri);
    }
    return () => {
      isCurrent = false;
    };
  }, [userInfo?.logo]);

  useEffect(() => {
    let isCurrent = true;
    if (image && isCurrent) {
      Storage.get(image).then(setImageUri2);
    }
    return () => {
      isCurrent = false;
    };
  }, [image]);

  useEffect(() => {
    let isCurrent = true;
    if (images[0] && isCurrent) {
      Storage.get(images[0]).then(setImageUri3);
    }
    return () => {
      isCurrent = false;
    };
  }, [images[0]]);

  if (newLoad || softLoad || loading) {
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

      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'Sell Offer Detail'} tintColor={COLORS.Neutral1} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <SellOfferDetail1
            userInfo={userInfo}
            imageUri={imageUri}
            imageUri2={imageUri2}
            imageUri3={imageUri3}
            image={image}
            title={route?.params?.detail?.title}
            unit={route?.params?.detail?.unit}
            deliveryDate={route?.params?.detail?.offerValidity}
            paymentType={route?.params?.detail?.paymentType}
            fobPrice={route?.params?.detail?.fobPrice}
            qtyMeasure={route?.params?.detail?.qtyMeasure}
          />

          <SellOfferDetail2
            basePrice={route?.params?.detail?.basePrice}
            daysUntilExpiry={daysUntilExpiry}
            packageDesc={route?.params?.detail?.packageDesc}
            description={route?.params?.detail?.description}
            onPress={onPress}
            image={image}
            images={images}
            offerValidity={route?.params?.detail?.offerValidity}
          />

          <TextIconButton
            label={'Buy'}
            labelStyle={{
              color: COLORS.primary1,
              ...FONTS.h4,
              marginLeft: SIZES.radius,
            }}
            iconPosition={'LEFT'}
            icon={icons.pay}
            iconStyle={COLORS.primary1}
            onPress={() => navigation.navigate('ViewAgreement')}
            containerStyle={{
              marginBottom: SIZES.padding * 2.5,
              backgroundColor: COLORS.white,
              marginTop: SIZES.radius,
              width: 350,
            }}
          />
        </ScrollView>
      </View>
    </Root>
  );
};

export default OfferDetail;
