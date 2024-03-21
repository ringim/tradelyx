import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {useQuery} from '@apollo/client';
import {MenuView} from '@react-native-menu/menu';
import dayjs from 'dayjs';
import Clipboard from '@react-native-clipboard/clipboard';
import ImageModal, {ImageDetail} from 'react-native-image-modal';
import {Storage} from 'aws-amplify';
import FastImage from 'react-native-fast-image';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {
  GetUserQuery,
  GetUserQueryVariables,
  Message as MessageModel,
  User,
} from '../../API';
import {getUser} from '../../queries/UserQueries';
import {useAuthContext} from '../../context/AuthContext';
import { downloadAndOpenPdf } from '../../utilities/service';

const MessageReply = (props: any) => {
  const {message: propMessage} = props;

  const {width} = useWindowDimensions();

  const {userID} = useAuthContext();

  const element = useRef<ImageDetail>(null);

  const [message, setMessage] = useState<MessageModel>(propMessage);
  const [user, setUser] = useState<User | undefined>();
  const [isMe, setIsMe] = useState<boolean | null>(null);
  const [imageUri, setImageUri] = useState<string | any>(null);

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
    if (message?.image) {
      Storage.get(message?.image).then(setImageUri);
    }
  }, [message.image]);

  useEffect(() => {
    setMessage(propMessage);
  }, [propMessage]);

  useEffect(() => {
    const checkIfMe = async () => {
      if (!userInfo) {
        return;
      }
      setIsMe(userInfo.id === userID);
    };
    checkIfMe();
  }, [loading]);

  return (
    <Root>
      <TouchableOpacity
        style={[
          styles.container,
          isMe ? styles.rightContainer : styles.leftContainer,
        ]}>
        {message?.image && (
          <View
            style={{
              marginBottom: message?.text ? 12 : 0,
              borderRadius: SIZES.radius,
            }}>
            <ImageModal
              resizeMode="cover"
              imageBackgroundColor={COLORS.white}
              isTranslucent={false}
              swipeToDismiss={false}
              modalRef={element}
              style={{
                width: width * 0.5,
                aspectRatio: 4 / 3,
                alignSelf: 'center',
              }}
              source={{uri: imageUri, priority: 'high'}}
              onOpen={() => {
                setTimeout(() => {
                  element.current?.close();
                }, 10000);
              }}
            />
            <View style={styles?.chatCont}>
              <View style={{justifyContent: 'center', marginRight: 4}}>
                <Text
                  style={[
                    styles?.chatTime,
                    {color: isMe ? COLORS.NeutralBlue6 : COLORS.lightYellow1},
                  ]}>
                  {dayjs(message.createdAt).format('HH:mm')}
                </Text>
              </View>
              <View style={{flex: isMe ? 0 : 1, justifyContent: 'center'}}>
                <FastImage
                  source={icons.sent}
                  tintColor={isMe ? COLORS.NeutralBlue6 : COLORS.white}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    width: 13,
                    height: 13,
                    top: 3,
                  }}
                />
              </View>
            </View>
          </View>
        )}

        {message?.file && (
          <TouchableOpacity
            style={{width: '90%'}}
            onPress={() => downloadAndOpenPdf(message.file)}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
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
              <View
                style={{
                  flex: 1,
                  marginLeft: SIZES.base,
                  justifyContent: 'center',
                }}>
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{justifyContent: 'center', marginRight: 4}}>
                  <Text
                    style={{
                      color: isMe ? COLORS.NeutralBlue6 : COLORS.lightYellow1,
                      ...FONTS.cap2,
                      fontWeight: 'bold',
                      top: 3,
                    }}>
                    {dayjs(message.createdAt).format('HH:mm')}
                  </Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <FastImage
                    source={icons.sent}
                    tintColor={isMe ? COLORS.NeutralBlue6 : COLORS.white}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                      width: 13,
                      height: 13,
                      top: 3,
                    }}
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{justifyContent: 'center', marginRight: 4}}>
                  <Text
                    style={{
                      color: isMe ? COLORS.NeutralBlue6 : COLORS.lightYellow1,
                      ...FONTS.cap2,
                      top: 3,
                      fontWeight: 'bold',
                    }}>
                    {dayjs(message.createdAt).format('HH:mm')}
                  </Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <FastImage
                    source={icons.sent}
                    tintColor={isMe ? COLORS.NeutralBlue6 : COLORS.white}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                      width: 13,
                      height: 13,
                      top: 3,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </Root>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingRight: 10,
    paddingLeft: 10,
    maxWidth: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  leftContainer: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    marginBottom: 5,
    marginLeft: SIZES.radius,
    marginRight: 'auto',
  },
  rightContainer: {
    backgroundColor: COLORS.lightYellow,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    borderBottomLeftRadius: SIZES.radius,
    marginLeft: 'auto',
    marginRight: SIZES.radius,
    marginBottom: 5,
  },
  chatCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  chatTime: {
    ...FONTS.cap2,
    top: 3,
    fontWeight: 'bold',
  },
});

export default memo(MessageReply);
