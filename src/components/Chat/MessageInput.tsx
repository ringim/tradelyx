import React, {memo, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {Storage} from 'aws-amplify';
import FastImage from 'react-native-fast-image';
import path from 'path';
import {useMutation} from '@apollo/client';
import {v4 as uuidV4} from 'uuid';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {createMessage, updateChatRoom} from '../../queries/ChatQueries';
import {
  CreateMessageMutation,
  CreateMessageMutationVariables,
  MessageStatus,
  UpdateChatRoomMutation,
  UpdateChatRoomMutationVariables,
} from '../../API';
import {useAuthContext} from '../../context/AuthContext';
import ChatStyles from './ChatStyles';
import LoadingIndicator from '../Others/LoadingIndicator';

const MessageInput = ({chatRoom}: any) => {
  const {userID} = useAuthContext();

  const [message, setMessage] = useState<any>('');
  const [fileName, setFileName] = useState<any>('');
  const [singleFile, setSingleFile] = useState<any>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<any | Asset>(null);
  const [progress, setProgress] = useState(0);

  // SEND MESSAGE
  const [doCreateMessage, {loading}] = useMutation<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >(createMessage);
  const sendMessage = async () => {
    try {
      const res: any = await doCreateMessage({
        variables: {
          input: {
            SType: 'MESSAGE',
            text: message,
            userID: userID,
            chatroomID: chatRoom.id,
            status: MessageStatus?.SENT,
            // replyToMessageID: messageReplyTo?.id,
          },
        },
      });
      updateLastMessage(res?.data?.createMessage?.id);
      resetFields();
    } catch (error) {
      return error;
    }
  };

  // UPDATE CHAT ROOM MESSAGE
  const [doUpdateChatRoom] = useMutation<
    UpdateChatRoomMutation,
    UpdateChatRoomMutationVariables
  >(updateChatRoom);
  const updateLastMessage = async (newMessage: any) => {
    const res = await doUpdateChatRoom({
      variables: {
        input: {
          id: chatRoom?.id,
          SType: 'CHATROOM',
          chatRoomLastMessageId: newMessage,
        },
      },
    });
  };

  // FILE BLOG NAME & EXTENSION
  const getBlob = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  // reset fields on message send
  const resetFields = () => {
    setMessage('');
    setSelectedPhoto(null);
    setProgress(0);
    setSingleFile('');
    setFileName('');
    // removeMessageReplyTo();
  };

  // SEND IMAGE && MESSAGE
  const sendImage = async () => {
    if (!selectedPhoto?.uri) {
      return;
    }
    const blob = await getBlob(selectedPhoto?.uri);
    const {key} = await Storage.put(`${uuidV4()}.png`, blob, {
      progressCallback,
    });

    // send message
    try {
      const res: any = await doCreateMessage({
        variables: {
          input: {
            SType: 'MESSAGE',
            text: message,
            userID: userID,
            image: key,
            status: MessageStatus?.SENT,
            chatroomID: chatRoom.id,
            // replyToMessageID: messageReplyTo?.id,
          },
        },
      });
      updateLastMessage(res?.data?.createMessage?.id);
      resetFields();
    } catch (error) {
      return error;
    }
  };

  // SEND FILE && MESSAGE
  const sendFile = async () => {
    if (!singleFile) {
      return;
    }
    const response = await fetch(singleFile);
    const blob = await response?.blob();

    const extractFileName = (filePath: any) => {
      const fileNameWithExtension = path.basename(filePath);
      return fileNameWithExtension;
    };

    const fileName = extractFileName(singleFile);

    const {key} = await Storage.put(fileName, blob, {
      progressCallback,
    });
    // send message
    try {
      const res: any = await doCreateMessage({
        variables: {
          input: {
            SType: 'MESSAGE',
            text: message,
            userID: userID,
            file: key,
            status: MessageStatus?.SENT,
            chatroomID: chatRoom.id,
            // replyToMessageID: messageReplyTo?.id,
          },
        },
      });
      updateLastMessage(res?.data?.createMessage?.id);
      resetFields();
      // console.log('SEND MESSAGE', res);
    } catch (error) {
      return error;
    }
  };

  // UPLOAD PROFILE IMAGE
  const onPhotoChange = () => {
    launchImageLibrary(
      {mediaType: 'photo', quality: 0.5, selectionLimit: 1},
      ({didCancel, errorCode, assets}) => {
        if (!didCancel && !errorCode && assets && assets.length > 0) {
          setSelectedPhoto(assets[0]);
        }
      },
    );
  };

  // SELECT FILE
  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.plainText],
        allowMultiSelection: false,
      });
      setSingleFile(res.uri);
      setFileName(res.name);
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        return;
      } else {
        throw err;
      }
    }
  };

  // Upload progress
  const progressCallback = (progress: {loaded: number; total: number}) => {
    setProgress(progress.loaded / progress.total);
  };

  // on send message function
  const onPress = () => {
    if (selectedPhoto?.uri) {
      sendImage();
    } else if (singleFile) {
      sendFile();
    } else if (message) {
      sendMessage();
    } else {
      return;
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <KeyboardAvoidingView
      style={[ChatStyles.root]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10}>
      {/* image picked */}
      {selectedPhoto && (
        <View>
          <View style={ChatStyles.sendImageContainer}>
            <View style={{justifyContent: 'space-between'}}>
              <FastImage
                source={{
                  uri: selectedPhoto?.uri,
                  priority: FastImage.priority.high,
                }}
                style={{width: 150, height: 150, borderRadius: SIZES.base}}
              />
              <View style={ChatStyles.progressContainer}>
                <Text style={{color: COLORS.white, ...FONTS.h4}}>
                  {(progress * 100).toFixed(0)} %
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{justifyContent: 'space-between', marginLeft: SIZES.base}}
              onPress={() => setSelectedPhoto(null)}>
              <FastImage
                source={icons.remove}
                resizeMode={FastImage.resizeMode.contain}
                tintColor={COLORS.Rose4}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* FILE picked */}
      {singleFile && (
        <View>
          <View style={ChatStyles.sendFileContainer}>
            <View style={{justifyContent: 'center'}}>
              <Text numberOfLines={3} style={ChatStyles?.fileNameTxt}>
                {fileName}
              </Text>
            </View>

            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text style={ChatStyles?.progressText}>
                {(progress * 100).toFixed(0)} %
              </Text>
            </View>

            <TouchableOpacity
              style={{paddingRight: 4, justifyContent: 'center'}}
              onPress={() => setSingleFile(null)}>
              <FastImage
                source={icons.remove}
                resizeMode={FastImage.resizeMode.contain}
                tintColor={COLORS.Rose4}
                style={{width: 22, height: 22}}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={ChatStyles.row}>
        <View style={ChatStyles.inputContainer}>
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={selectFile}>
            <FastImage
              source={icons.attach}
              resizeMode={FastImage.resizeMode.contain}
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{justifyContent: 'center', marginLeft: SIZES.base}}
            onPress={onPhotoChange}>
            <FastImage
              source={icons.gallery}
              tintColor={COLORS.secondary1}
              resizeMode={FastImage.resizeMode.contain}
              style={{width: 22, height: 22}}
            />
          </TouchableOpacity>

          {/* text input */}
          <TextInput
            style={ChatStyles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type message..."
            placeholderTextColor={COLORS.Neutral6}
            returnKeyType={'send'}
          />

          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={onPress}>
            <FastImage
              source={icons.send}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={COLORS.primary1}
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default memo(MessageInput);
