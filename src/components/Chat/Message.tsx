import {
  View,
  Text,
  useWindowDimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import {useQuery} from '@apollo/client';
import {MenuView} from '@react-native-menu/menu';
import dayjs from 'dayjs';
import Clipboard from '@react-native-clipboard/clipboard';
import ImageModal, {ImageDetail} from 'react-native-image-modal';
import {Storage} from 'aws-amplify';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {
  GetUserQuery,
  GetUserQueryVariables,
  Message as MessageModel,
} from '../../API';
import {getUser} from '../../queries/UserQueries';
import {useAuthContext} from '../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import ServiceReply from './ServiceReply';
import ServiceReplyType from './ServiceReplyType';
import SellOfferReply from './SellOfferReply';
import SellOfferReplyType from './SellOfferReplyType';
import ChatStyles from './ChatStyles';
import {
  downloadAndOpenPdf,
  saveImageToCameraRoll,
} from '../../utilities/service';
import {bucket, imageHandlerURL} from '../../utilities/Utils';

const Message = (props: any) => {
  const {message: propMessage} = props;

  const navigation = useNavigation<any>();
  const {width} = useWindowDimensions();
  const {userID} = useAuthContext();
  const element = useRef<ImageDetail>(null);

  const [message, setMessage] = useState<MessageModel>(propMessage);
  const [imageUri, setImageUri] = useState<string | any>(null);
  const [isMe, setIsMe] = useState<boolean | null>(false);

  // GET USER INFO
  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {
        id: message?.userID,
      },
    },
  );
  const userInfo: any = data?.getUser;

  useEffect(() => {
    setMessage(propMessage);
  }, [propMessage]);

  useEffect(() => {
    if (message?.image) {
      Storage.get(message?.image).then(setImageUri);
    }
  }, [message?.image]);

  useEffect(() => {
    const checkIfMe = async () => {
      if (!userInfo) {
        return;
      }
      setIsMe(userInfo.id === userID);
    };
    checkIfMe();
  }, [loading]);

  // copy to clipboard
  const onCopy = (item: any) => {
    Clipboard.setString(item);
  };

  // IMAGE REQUEST
  const uriImage = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${message?.image}`,
      edits: {
        contentModeration: true,
        resize: {
          width: width * 0.5,
          aspectRatio: 3 / 2,
          fit: 'contain',
        },
      },
    });
    const encodedImg = Buffer.from(imageRequest).toString('base64');
    return imageHandlerURL + encodedImg;
  }, [message?.image, imageUri]);

  return (
    <>
      <MenuView
        onPressAction={({nativeEvent}) => {
          if (nativeEvent.event === 'copy') {
            onCopy(message?.text);
          }
        }}
        title=""
        actions={[
          {
            id: 'copy',
            title: 'Copy',
            titleColor: COLORS.Neutral1,
            image: Platform.select({
              ios: 'clipboard',
              android: 'ic_menu_clipboard',
            }),
            imageColor: COLORS.Neutral1,
          },
        ]}
        shouldOpenOnLongPress={true}>
        {/* first RFF request */}
        {message?.text === "Hello, I'll respond to your RFF request soon" && (
          <ServiceReply
            serviceType={message?.serviceType}
            requestID={message?.rffID}
            title={message?.requestTitle}
            messageUserID={message?.userID}
            onCopy={() => onCopy(message?.rffID)}
            onPress={() => {
              message?.rffType === 'AIR'
                ? navigation.navigate('ReplyRFFAir', {
                    rff: message?.requestID,
                    crID: message?.chatroomID,
                  })
                : message?.rffType === 'LAND'
                ? navigation.navigate('ReplyRFFLand', {
                    rff: message?.requestID,
                    crID: message?.chatroomID,
                  })
                : navigation.navigate('ReplyRFFOcean', {
                    rff: message?.requestID,
                    crID: message?.chatroomID,
                  });
            }}
          />
        )}

        {/* first RFf Air reply */}
        {message?.text === "Hello, I've replied your RFF (Air) request" && (
          <ServiceReplyType
            requestID={message?.rffID}
            title={message?.requestTitle}
            serviceType={message?.serviceType}
            onCopy={() => onCopy(message?.rffID)}
            text={"Hello, I've replied your RFF (Air) request"}
            price={message?.requestPrice}
            packageType={message?.packageType}
            qty={message?.requestQty}
            onPress={() =>
              navigation.navigate('RFFReplyDetailAir', {
                rff: message?.requestID,
                crID: message?.chatroomID,
              })
            }
          />
        )}

        {/* first RFf Land request */}
        {message?.text === "Hello, I've replied your RFF (Land) request" && (
          <ServiceReplyType
            requestID={message?.rffID}
            title={message?.requestTitle}
            serviceType={message?.serviceType}
            onCopy={() => onCopy(message?.rffID)}
            text={"Hello, I've replied your RFF (Land) request"}
            price={message?.requestPrice}
            packageType={message?.packageType}
            qty={message?.requestQty}
            onPress={() =>
              navigation.navigate('RFFReplyDetailLand', {
                rff: message?.requestID,
                crID: message?.chatroomID,
              })
            }
          />
        )}

        {/* first RFf Ocean reply */}
        {message?.text === "Hello, I've replied your RFF (Ocean) request" && (
          <ServiceReplyType
            requestID={message?.rffID}
            title={message?.requestTitle}
            serviceType={message?.serviceType}
            onCopy={() => onCopy(message?.rffID)}
            text={"Hello, I've replied your RFF (Ocean) request"}
            price={message?.requestPrice}
            packageType={message?.packageType}
            qty={message?.requestQty}
            onPress={() =>
              navigation.navigate('RFFReplyDetailOcean', {
                rff: message?.requestID,
                crID: message?.chatroomID,
              })
            }
          />
        )}

        {/* first RFQ request */}
        {message?.text === "Hello, I'll respond to your RFQ request soon" && (
          <ServiceReply
            serviceType={message?.serviceType}
            requestID={message?.rfqID}
            title={message?.requestTitle}
            messageUserID={message?.userID}
            onCopy={() => onCopy(message?.rfqID)}
            onPress={() => {
              message?.rfqType === 'STANDARD'
                ? navigation.navigate('ReplyRFQStandard', {
                    rfq: message?.requestID,
                    crID: message?.chatroomID,
                  })
                : message?.rfqType === 'DOMESTIC'
                ? navigation.navigate('ReplyRFQDomestic', {
                    rfq: message?.requestID,
                    crID: message?.chatroomID,
                  })
                : navigation.navigate('ReplyRFQInternational', {
                    rfq: message?.requestID,
                    crID: message?.chatroomID,
                  });
            }}
          />
        )}

        {/* first RFQ International reply */}
        {message?.text ===
          "Hello, I've replied your RFQ (International) request" && (
          <ServiceReplyType
            requestID={message?.rfqID}
            title={message?.requestTitle}
            serviceType={message?.serviceType}
            onCopy={() => onCopy(message?.rffID)}
            text={"Hello, I've replied your RFQ (International) request"}
            price={message?.requestPrice}
            packageType={message?.packageType}
            qty={message?.requestQty}
            onPress={() =>
              navigation.navigate('RFQReplyDetailInternational', {
                rfq: message?.requestID,
                crID: message?.chatroomID,
              })
            }
          />
        )}

        {/* first RFQ Standard reply */}
        {message?.text ===
          "Hello, I've replied your RFQ (Standard) request" && (
          <ServiceReplyType
            requestID={message?.rfqID}
            title={message?.requestTitle}
            serviceType={message?.serviceType}
            onCopy={() => onCopy(message?.rffID)}
            text={"Hello, I've replied your RFQ (Standard) request"}
            price={message?.requestPrice}
            packageType={message?.packageType}
            qty={message?.requestQty}
            onPress={() =>
              navigation.navigate('RFQReplyDetailStandard', {
                rfq: message?.requestID,
                crID: message?.chatroomID,
              })
            }
          />
        )}

        {/* first RFQ Domestic reply */}
        {message?.text ===
          "Hello, I've replied your RFQ (Domestic) request" && (
          <ServiceReplyType
            requestID={message?.rfqID}
            title={message?.requestTitle}
            serviceType={message?.serviceType}
            onCopy={() => onCopy(message?.rffID)}
            text={"Hello, I've replied your RFQ (Domestic) request"}
            price={message?.requestPrice}
            packageType={message?.packageType}
            qty={message?.requestQty}
            onPress={() =>
              navigation.navigate('RFQReplyDetailDomestic', {
                rfq: message?.requestID,
                crID: message?.chatroomID,
              })
            }
          />
        )}

        {/* first sell offer request */}
        {message?.text === "Hello, I'm interested in this Sell Offer" && (
          <SellOfferReply
            imageUri2={message?.serviceImage}
            serviceType={message?.serviceType}
            onCopy={() => onCopy(message?.sellOfferID)}
            requestID={message?.sellOfferID}
            title={message?.requestTitle}
            packageType={message?.packageType}
            qty={message?.requestQty}
            unit={message?.unit}
            price={message?.requestPrice}
            messageUserID={message?.userID}
            onPress={() =>
              navigation.navigate('ReplySellOfferPayment', {
                sellOffer: message?.requestID,
                chatRoomID: props?.message?.chatroomID,
                forUserID: userInfo?.id,
              })
            }
          />
        )}

        {/* sell offer reply */}
        {message?.text === "Hello, I've replied your Sell Offer request" && (
          <SellOfferReplyType
            imageUri2={message?.serviceImage}
            serviceType={message?.serviceType}
            packageType={message?.packageType}
            unit={message?.unit}
            qty={message?.requestQty}
            price={message?.requestPrice}
            title={message?.requestTitle}
            onCopy={() => onCopy(message?.sellOfferID)}
            sellOfferID={message?.sellOfferID}
            offer={'View Sell Offer'}
            requestID={message?.sellOfferID}
            text={"Hello, I've replied your Sell Offer request"}
            onPress={() =>
              navigation.navigate('SellOfferDetails', {
                sellOffer: message?.requestID,
                crID: message?.chatroomID,
              })
            }
          />
        )}

        {/* Custom sell Offer */}
        {message?.text === "Hello, I've sent a Custom Sell Offer" && (
          <SellOfferReplyType
            imageUri2={message?.serviceImage}
            serviceType={message?.serviceType}
            packageType={message?.packageType}
            unit={message?.unit}
            qty={message?.requestQty}
            price={message?.requestPrice}
            title={message?.requestTitle}
            offer={'View Custom Sell Offer'}
            sellOfferID={message?.sellOfferID}
            onCopy={() => onCopy(message?.sellOfferID)}
            requestID={message?.sellOfferID}
            text={"Hello, I've replied your Sell Offer request"}
            onPress={() =>
              navigation.navigate('CustomSellOfferDetail', {
                customSellOffer: message?.requestID,
                crID: message?.chatroomID,
              })
            }
          />
        )}

        <TouchableOpacity
          style={[
            ChatStyles.container,
            isMe ? ChatStyles.rightContainer : ChatStyles.leftContainer,
          ]}>
          {/* message image */}
          {message?.image && (
            <View
              style={{
                marginBottom: message?.text ? 12 : 0,
                borderRadius: SIZES.radius,
              }}>
              <ImageModal
                resizeMode="contain"
                imageBackgroundColor={COLORS.white}
                isTranslucent={false}
                swipeToDismiss={false}
                modalRef={element}
                style={{
                  width: width * 0.5,
                  aspectRatio: 3 / 2,
                  alignSelf: 'center',
                }}
                source={{uri: uriImage, priority: 'high'}}
                onOpen={() => {
                  setTimeout(() => {
                    element.current?.close();
                  }, 10000);
                }}
                onLongPress={() => saveImageToCameraRoll(uriImage)}
              />

              <View style={ChatStyles?.chatTimeCont}>
                <View style={{justifyContent: 'center', marginRight: 4}}>
                  <Text
                    style={{
                      color: isMe ? COLORS.NeutralBlue6 : COLORS.white,
                      ...FONTS.cap2,
                      top: 3,
                      fontWeight: 'bold',
                    }}>
                    {dayjs(message.createdAt).format('HH:mm | MMM-D-YY')}
                  </Text>
                </View>
                <View style={{flex: isMe ? 0 : 1, justifyContent: 'center'}}>
                  <FastImage
                    source={icons.sent}
                    tintColor={isMe ? COLORS.NeutralBlue6 : COLORS.white}
                    resizeMode={FastImage.resizeMode.contain}
                    style={ChatStyles.sentIcon}
                  />
                </View>
              </View>
            </View>
          )}

          {/* message file pdf */}
          {message?.file && (
            <TouchableOpacity
              style={{width: '90%'}}
              onPress={() => downloadAndOpenPdf(message.file)}>
              <View style={ChatStyles.spaceRow}>
                <View style={{justifyContent: 'center'}}>
                  <FastImage
                    source={icons.docs}
                    tintColor={isMe ? COLORS.primary1 : COLORS.white}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </View>
                <View style={ChatStyles.subCont}>
                  <Text
                    numberOfLines={2}
                    style={{
                      ...FONTS.cap2,
                      fontWeight: 'bold',
                      color: isMe ? COLORS.NeutralBlue2 : COLORS.white,
                    }}>
                    {message?.file}
                  </Text>
                </View>
              </View>

              {/* message createdAt time */}
              <View
                style={{
                  justifyContent: 'center',
                  paddingTop: 4,
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                  marginRight: 10,
                }}>
                <View style={ChatStyles.spaceRow}>
                  <View style={{justifyContent: 'center', marginRight: 4}}>
                    <Text
                      style={{
                        color: isMe ? COLORS.NeutralBlue6 : COLORS.white,
                        ...FONTS.cap2,
                        fontWeight: 'bold',
                        top: 3,
                      }}>
                      {dayjs(message.createdAt).format('HH:mm | MMM-D-YY')}
                    </Text>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <FastImage
                      source={icons.sent}
                      tintColor={isMe ? COLORS.NeutralBlue6 : COLORS.white}
                      resizeMode={FastImage.resizeMode.contain}
                      style={ChatStyles.sentIcon}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}

          {/* the message */}
          {message?.text && (
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  color: isMe ? COLORS.NeutralBlue2 : COLORS.white,
                  fontWeight: '500',
                  ...FONTS.cap1,
                }}>
                {message?.text}
              </Text>

              {/* message createdAt time */}
              <View
                style={{
                  justifyContent: 'center',
                  paddingTop: 4,
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                  marginRight: 8,
                }}>
                <View style={ChatStyles.spaceRow}>
                  <View style={{justifyContent: 'center', marginRight: 4}}>
                    <Text
                      style={{
                        color: isMe ? COLORS.NeutralBlue6 : COLORS.white,
                        ...FONTS.cap2,
                        top: 3,
                        fontWeight: 'bold',
                      }}>
                      {dayjs(message.createdAt).format('HH:mm | MMM-D-YY')}
                    </Text>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <FastImage
                      source={icons.sent}
                      tintColor={isMe ? COLORS.NeutralBlue6 : COLORS.white}
                      resizeMode={FastImage.resizeMode.contain}
                      style={ChatStyles.sentIcon}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </MenuView>
    </>
  );
};

export default memo(Message);
